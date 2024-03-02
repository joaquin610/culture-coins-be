async function updatePoints(user, points, isAdding) {
    try {
      if (isAdding) {
        user.points += points;
      } else {
        user.points -= points;
      }
  
      await user.save();
  
      return user;
    } catch (error) {
      console.error(error);
    }
  }
  
  module.exports = {updatePoints};