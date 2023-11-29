const sendResponse = (res, status, ok, data, error = null) => {
  if(ok){
    res.status(status).json({
      ok,
      data,
    });
  }else{
    res.status(status).json({
      ok,
      error,
    });
  }

  };
  
  module.exports = { sendResponse };
  
  