const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try{
    // grabbing the Authorization and set token
    let token = req.header("Authorization");
    // handle if token doesn't exist
    if(!token) {
      return res.status(403).send("Access Denied");
    }
    // token starts with Bearer and place token after Bearer
    if(token.startsWith("Bearer ")){
      token = token.slice(7, token.length).trimleft();
    }
    // verify token
    const verified = jwt.verify(token, process.env.JWT_SEC);
    req.user = verified;
    next();
  }catch(err){
    res.status(500).json({ error: err.message });
  }
};

const verifyTokenAndAuthorization = async(req, res, next) => {
  try{
    // using verifyToken and looking if id matches userId or if user is Admin (granting user/client access to feature and Admin)
    verifyToken(req, res, ()=>{
      if(req.user.id === req.params.id || req.user.isAdmin){
        next();
      }
    })
  }catch(err){
    res.status(500).json({ error: err.message });
  }
};

const verifyTokenAndAdmin = async(req, res, next) => {
  try{
    // using verifyToken and looking if User is Admin (only granting Admin access)
    verifyToken(req, res, ()=>{
      if(req.user.isAdmin){
        next();
      }
    })
  }catch(err){
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};