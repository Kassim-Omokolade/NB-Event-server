const EVENT = require("../models/events");
const USER = require("../models/user");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const createEvent = async (req, res) => {
  const { userId } = req.user;
  const {
    date,
    title,
    startTime,
    endTime,
    location,
    description,
    tags,
    free,
    online,
    category,
  } = req.body;
  try {
    if (
      !date ||
      !startTime ||
      !description ||
      !tags ||
      !free ||
      !title ||
      !category ||
      (!location && !online)
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All field are required" });
    }

    //image upload files
const imageFile = req.files.image.tempFilePath
//upload image to cloudinary
const uploadedImage = await cloudinary.uploader.upload(imageFile,{
    use_filename:true,
    folder:"mbevents"

})

//delete the file from our server
fs.unlinkSync(req.files.image.tempFilePath);

//create a new event
const newEvent = new EVENT({
  image: uploadedImage.secure_url,
  title,
  date,
  startTime,
  endTime,
  description,
  category,
  location: online === "true" ? "online" : location,
  tags,
  price: {
    free: free === "true",
    regular: free === "true" ? 0 : req.body?.regularPrice,
    vip: free === "true" ? 0 : req.body?.vipPrice,
  },
  hostedBy: userId,
});

const event =await newEvent.save()
res.status(201).json({success:true,event})

  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const getUpcomingEvents = async (req, res) => {
 try {
    const currentDate = new Date()
    const upcomingEvents=await Event.find({date: {$gte: currentDate}})
    .sort("date")//sort by date in asceding order
    .limit(4); //limit the no of event to 4

    res.status(200).json({ success: true, events:upcomingEvents });
 } catch (error) {
     res
       .status(400)
       .json({ message: error.message });
 }
};

const getFreeEvents = async (req, res) => {
  res.send("get free dvents");
};

module.exports = { createEvent, getUpcomingEvents, getFreeEvents };
