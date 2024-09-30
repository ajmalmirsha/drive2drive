const SuccessResponse = (res, data, message, status = 200) => {
  res.status(status).json({ success: true, data, message });
};

const ErrorResponse = (res, err = "something went wrong", status = 500) => {
  console.log("Error :", err);
  res.status(status).json({ success: false, message: err?.message || err });
};

module.exports = {
  SuccessResponse,
  ErrorResponse,
};
