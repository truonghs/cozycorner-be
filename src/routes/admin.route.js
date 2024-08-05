const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/product.controller");
const upload = require("../middlewares/upload");

//Product routes

router.post("/product/store", upload, (req, res) => ProductController.store(req, res));

module.exports = router;
