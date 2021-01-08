const getToken = (req, res, next) => {
  if (req.get("authorization")?.startsWith("Bearer")) {
    [, req.token] = req.get("authorization").split(" ");
  }
  next();
};

module.exports = getToken;
