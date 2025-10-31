const express = require("express");
const { registerSeller, loginSeller } = require("../controllers/sellerController");


const router = express.Router();

router.post("/sellerRegister",registerSeller);
router.post("/sellerLogin",loginSeller);

module.exports = router;