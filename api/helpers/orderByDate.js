const orderByDate = (array) => {
    return array.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      
      return dateB - dateA;
    });
  };
  
  module.exports = { orderByDate };