import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token)
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: "Unauthorized!",
    });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return res.status(401).json({
        success: false,
        statusCode: 403,
        message: "Forbidden!",
      });

    req.user = user;
    next();
  });
};
