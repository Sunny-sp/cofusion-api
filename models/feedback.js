import mongoose from "mongoose";

const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    telNum: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    agree: {
        type: Boolean,
        required: true,
        default: false
    },
    contactType: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
});

const Feedbacks = mongoose.model('Feedback', feedbackSchema);
export default Feedbacks;
