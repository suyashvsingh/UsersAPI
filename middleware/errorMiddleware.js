const errorHandler = (error, req, res, next) => {
  res.status(404).json({ msg: error.message, stack: error.stack });
};

module.exports = { errorHandler };
