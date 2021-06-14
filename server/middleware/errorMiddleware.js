const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandle = (err, req, res, next) => {
  const error = res.statusCode === 200 ? 500 : res.statusCode; //sometimes it gives 200 with error
  res.status(error);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { notFound, errorHandle };
