const router = require("express").Router()
const {createEvent,getUpcomingEvents,getFreeEvents}= require("../controllers/eventController")

router.post("/",createEvent)
router.get("/upcoming",getUpcomingEvents)
router.get("/free", getFreeEvents)

module.exports = router