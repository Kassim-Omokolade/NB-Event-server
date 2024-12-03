const Event =require("../models/events")

const createEvent= async (req,res)=>{

    console.log(req.files);
    
    res.send("create event")

}

const getUpcomingEvents =async (req,res)=>{
    res.send("get upcoming events");

}

const getFreeEvents = async (req, res) => {
  res.send("get free dvents");
};

module.exports={createEvent,getUpcomingEvents,getFreeEvents}