const { Router } = require("express");
const router = Router();
const {
  handleAddRestaurant,
  handleGetRestaurants,
  handelDeleteRestaurant,
  handleUpdateRestaurant,
  handleGetByRadius,
  handleGetByRange,
} = require("../Controller/restaurants");

// for adding a restaurant 
router.post("/add", handleAddRestaurant);

// for retrieving all restaurant  that the user added 
router.get("/get", handleGetRestaurants);

// for deleting the restaurant  that were added by the user 
router.delete("/:id", handelDeleteRestaurant);

// for updating the restaurant  that were added by the user
router.put("/:id", handleUpdateRestaurant);

// for retrieving all the restaurant in ascending order by specifieng a redius  in meters 
router.post("/within", handleGetByRadius);

// for retrieving all the restaurant in  by specifieng a range in meters 
router.post("/range", handleGetByRange);

module.exports = router;
