const { Schema, model, Types } = require("mongoose");
// Schema for restaurant
const restaurantSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
  },
  location: {
    type: {
      type: String,
      default: "Point",
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  ratings: [
    {
      type: Number,
      min: 1,
      max: 5,
    },
  ],
  createdBy: {
    type: Types.ObjectId,
    ref: "User", 
  },
});

restaurantSchema.index({ location: "2dsphere" });

const RESTAURANTS = model("restaurants", restaurantSchema);
module.exports = RESTAURANTS;
