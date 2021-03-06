import express from 'express';
import Event from '../Controllers/Events';
import  { verifyToken, EventsValidator } from '../middlewares'

const route = express.Router();

route.post('/create', verifyToken, EventsValidator.EventAddValidation(), Event.create);
route.get('/readall', Event.readAll);
route.get('/read/:id', verifyToken, Event.read);
route.get('/subscribe/:id', verifyToken, Event.subscribe);
route.get('/subscribed/:id', verifyToken, Event.subscribedEvents);
export default route;