// function to calculate the average rating 
const calculateAverageRating = (ratings) => {
  if (ratings.length === 0) {
    return 0;
  }
  const sum = ratings.reduce((total, rating) => total + rating, 0);
  const average = sum / ratings.length;
  return parseFloat(average.toFixed(2));
};
module.exports = { calculateAverageRating };
