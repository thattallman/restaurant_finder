const RESTAURANTS = require("../Models/restaurant");
const { Types } = require("mongoose");
const {calculateAverageRating} = require('../services/averageRating')

// for handling CRUD operation  on the restaurants 

// Create 
const handleAddRestaurant = async (req, res) => {
  const { name, description, location, ratings } = req.body;
  const userId = req.user._id;
  try {
    const existingRestaurant = await RESTAURANTS.findOne({ name });

    if (existingRestaurant) {
      return res
        .status(400)
        .json({ status: "Failed", msg: "Restaurant already exists" });
    }

    const newRestaurant = await RESTAURANTS.create({
      name,
      description,
      location,
      ratings,
      createdBy: userId,
    });

    res.status(200).json({ status: "Success", data: newRestaurant });
  } catch (error) {
    res.status(500).json({ status: "Failed", msg: error.message });
  }
};

// Read
const handleGetRestaurants = async (req, res) => {
  try {
    const userId = req.user._id;
    const stores = await RESTAURANTS.find({ createdBy: userId });
    if (!stores) res.status(200).json({ Status: "No stores added currently " });
    else res.status(200).json(stores);
  } catch (error) {
    res.status(500).json({ status: "Failed", msg: error.message });
  }
};

// Delete 
const handelDeleteRestaurant = async (req, res) => {
  const { id } = req.params;

  const userId = new Types.ObjectId(req.user._id);

  try {
    const restaurant = await RESTAURANTS.findById(id);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    if (!restaurant.createdBy.equals(userId)) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this restaurant" });
    }
    await RESTAURANTS.deleteOne(restaurant);
    res.json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

 // Update 
const handleUpdateRestaurant = async (req, res) => {
  const { id } = req.params;
  const { name, description, location, ratings } = req.body;
  const userId = new Types.ObjectId(req.user._id);
  const updatedLocation = { ...location, type: "Point" };

  try {
    const restaurant = await RESTAURANTS.findById(id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    if (!restaurant.createdBy.equals(userId)) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this restaurant" });
    }
    const updatedRestaurant = await RESTAURANTS.updateOne(
      { _id: id },
      {
        $set: {
          name: name,
          description: description,
          location: updatedLocation,
          ratings: ratings,
        },
      },
      { new: true }
    );
    res.json({ status: "Upadted successfully ", Data: updatedRestaurant });
  } catch (error) {
    res.status(500).json({ status: "Failed", msg: error.message });
  }
};

// for handling the request to fetch the restaurants withing the given radius in meteres in ascending order 
const handleGetByRadius = async (req, res) => {
  try {
    const { Latitude, Longitude, Radius } = req.body;
    const stores = await RESTAURANTS.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(Longitude), parseFloat(Latitude)],
          },
          $maxDistance: Radius,
        },
      },
    });
    const transformedRestaurants = stores.map(restaurant => ({
      "Name of restaurant": restaurant.name,
      "Description of restaurant": restaurant.description,
      "Location": {
        "latitude": restaurant.location.coordinates[1],
        "longitude": restaurant.location.coordinates[0]
      },
      "Average Rating of the restaurant": calculateAverageRating(restaurant.ratings),
      "No. of Ratings": restaurant.ratings.length
    }));



    res.status(200).json(transformedRestaurants);
  } catch (err) {
    res.status(400).json({ success: false, msg: err.message });
  }
};

// for handling the request to fetch the restaurants in the given range in meters 
const handleGetByRange = async (req, res) => {
  try {
    const { Latitude, Longitude, minimumDistance, maximumDistance } = req.body;
    const stores = await RESTAURANTS.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(Longitude), parseFloat(Latitude)],
          },
          $minDistance: minimumDistance,
          $maxDistance: maximumDistance,
        },
      },
    });
    const transformedRestaurants = stores.map(restaurant => ({
      "Name of restaurant": restaurant.name,
      "Description of restaurant": restaurant.description,
      "Location": {
        "latitude": restaurant.location.coordinates[1],
        "longitude": restaurant.location.coordinates[0]
      },
      "Average Rating of the restaurant": calculateAverageRating(restaurant.ratings),
      "No. of Ratings": restaurant.ratings.length
    }));


    res.status(200).json(transformedRestaurants);
  } catch (error) {
    res.status(400).json({ success: false, msg: err.message });
  }

  // exporting all the functions 
};
module.exports = {
  handleAddRestaurant,
  handleGetRestaurants,
  handelDeleteRestaurant,
  handleUpdateRestaurant,
  handleGetByRadius,
  handleGetByRange,
};
