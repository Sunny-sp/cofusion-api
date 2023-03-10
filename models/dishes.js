import mongoose from "mongoose";
const Schema = mongoose.Schema;

const dishSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    image:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    label:{
        type: String,
        default: ''
    },
    price: {
        type: Number,
        required: true,
        min: 0,
        get: price => (price).toFixed(2),
        set: price => price
    },
    featured:{
        type: Boolean,
        default: false
    },
    description:{
        type: String,
        required: true
    }
},
{
    timestamps:true
});
const Dishes = mongoose.model('Dish', dishSchema);
export default Dishes;
