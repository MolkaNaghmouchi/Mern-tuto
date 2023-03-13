const express = require("express");
const router = express.Router();
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");
const {protect} = require('../middleware/authMiddleware')

//
//f 3oudh lehnee to9e3d taamel koul wahdaa wahddha donc temchii taamel maa baadhhom 
//router.route("/") o tfraaa9 beenthom b "/////" : get / post
// router.route("/:id") tfraaa9 b " l'id"  : put / delete 
// avec protect : pour protéger une route 
router.route("/").get(protect , getGoals).post(protect , setGoal);
router.route("/:id").delete(protect, deleteGoal).put(protect ,updateGoal);

module.exports = router;
