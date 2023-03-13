//importer json web token
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
//@desc Register new User
//@route POST/api/users
//@access Public
//etape 1  :
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("please  add all fields ");
  }

  //etape2 : bch ylawj aala luser par findOne({email})
  //check if User exists

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists ");
  }

  //Etape 3 : "hashed password "
  //Hash password on utilison "bcrypt"
  //on a besion d'utiliser salt pour hacher le mot de passe

  const salt = await bcrypt.genSalt(10);
  //hash prend deux chose en "parameter" : 1)password , 2)Salt
  const hashedPassword = await bcrypt.hash(password, salt); // ====> nous donnerons le mot de passe hachée

  //Etape 4
  //Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword, //the hash password
  });
  //Vérificationnnnn: if user mawjoudd // if user created on passe status (201) Ok
  //on va renvoyer les données utilisateur comme : id /
  if (user) {
    res.status(201).json({
      //  //on va renvoyer les données utilisateur comme : id / name /email
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
// @desc Authenticate a user
//@route POST/api/users/login
//@access Public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //Check for user email
  const user = await User.findOne({ email });
  //comparer password bin eli dakhlou l'utilisateur o bin l"passsword" eli fy lbase de donnée
  //avec bcrypt.compare(password) on compare le password en texte_brut ====>  le mot de passe qui est envoyé à partir du formullaire (1er para)
  //(2eme parametre) : (l'utilisateur que nous besoins de récupérer le mot de passe qui est haché  )

  if (user && (await bcrypt.compare(password, user.password))) {
    //on renvoyer les memes données que nous envoyons dans partie "enregistrée" donc ce
    //on va renvoyer token

    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials ");
  }
});
// @desc GET USER DATA
//@route GET/api/users/me
//@access Private
//quelque soit les utilisateurs connectés lorsqu'ils emprunte cette route , il devraient obtenir leurs propres informations 
const getMe = asyncHandler(async (req , res) => {

const {_id , name , email} = await User.findById(req.user.id)
res.status(200).json({
  id:_id ,
  name , 
  email
})
}); 
// Generate JWT: jeson web token
// on passe seulement l' id  dans generate token
//nous défnissons l'id 
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    //expiresIn : 30 JOURS
    //signera un noveau jeton avec l 'id  qui est passe ena + JWT-SE0000000
    expiresIn: "30d",
  });
};
module.exports = {
  registerUser,
  loginUser,
  getMe,
};
