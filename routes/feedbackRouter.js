import express, { json } from "express";
import bodyParser from "body-parser";
import * as cors from './cors.js';
import Feedbacks from "../models/feedback.js";

const feedbackRouter = express.Router();
feedbackRouter.use(bodyParser.json());

feedbackRouter.route('/')
.post(cors.openCors, (req, res, next)=>{
    Feedbacks.create(req.body)
    .then(resp => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json({success: true, feedback: resp, status: 'Thank you for the feedback!'});
    })
    .catch(err => next(err));
});

export default feedbackRouter;
