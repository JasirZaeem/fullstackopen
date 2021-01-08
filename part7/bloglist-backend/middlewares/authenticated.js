const jwt = require("jsonwebtoken");

const authenticated = (req, res, next) => {
  try {
    const { token } = req;
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    if (!token || !req.user) {
      return res.status(401).json({ error: "missing or invalid token" });
    }
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = authenticated;
