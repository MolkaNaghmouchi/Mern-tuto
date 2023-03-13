const express = require("express");
const router = express.Router();
//import controllers ( userController )
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userController")
//on apporter la fonction de protection de notre middleware
const {protect} = require('../middleware/authMiddleware')

//ecrire routes : registerUser:
router.post("/", registerUser);
//ecrire routes : loginUser:
router.post("/login", loginUser);
//ecrire routes : getMe :
//avec route dans le  route : nous ne somme pas autorisées sans jeton ====> NOT AUTHORZIED 
//L'ID SE TROUVE à l'intérieur de ce jeton   
router.get("/me",protect, getMe);

module.exports = router;
