import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;
  console.log("Received token:", token ? "Present" : "Missing");
  console.log("JWT Secret:", process.env.JWT_SECRET);
  
  if (!token) {
    return res.json({ success: false, message: "Not Authorized Login Again" });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token decoded successfully:", token_decode);
    req.body.userId = token_decode.id;
    req.user = { id: token_decode.id };
    next();
  } catch (error) {
    console.log("JWT Verification Error:", error.message);
    res.json({success:false,message:"Error"});
  }
};
export default authMiddleware;
