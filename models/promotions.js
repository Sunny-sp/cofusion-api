import mongoose from "mongoose";

const Schema = mongoose.Schema;

const promotionsSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        required: true,
        min: 0,
        get: price => (price/100).toFixed(2),
        set: price => price*100
    },
    description: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    }
});

const Promotions = mongoose.model('Promotion', promotionsSchema);

export default Promotions;
