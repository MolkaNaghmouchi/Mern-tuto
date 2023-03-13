//route specifiquee
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const protect = asyncHandler(async (req, res, next) => {
  let token;
  //lorsque le jeton est envoyé dans l'entete d'autorisation
  // Vérifions l'entete d'authorization en s'assurent qu'il s'agit d'un jeton porteur 
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //Get token from header
      //nous attribuons le jeton à cette variable ============> nous décodons : decoded /
      token = req.headers.authorization.split(" ")[1];

      //verify token
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

   
      //trouver l' utilisateur par l'id qui est dans le jeton mais je ne veux pas que le hachage du mot de passe
      // req.user.password
//===================================> nous obtenons l'utilisateur men jeton 
// apres avec next() ===> appelant le prochain middleware 

        //GET user from the token
      req.user = await User.findById(decoded.id).select('-password');
      //appeller la prochaine middleware
      next();
      // si ce n'est pas le cas ==> error(401) ==> et dire non autorisé s'il n'y pas **Not authorized
      //SINON SI IL N Y PAS ERROR 
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }
  // si il n y 'a pas de jeton (token)
  if (!token){
  res.status(401) 
  throw new Error('Not authorized , no token  ')

}
})
module.exports = { protect };
