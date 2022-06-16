const express = require('express')
const router = express.Router()
const multer = require("multer");
const upload = multer({ dest: "uploads" });
const {getProduct, getProductId, setProduct, updateProduct, deleteProduct} = require('../controllers/productController')

router.route('/').get(getProduct).post(upload.single("image"), setProduct)

router.route('/:id').get(getProductId).put(upload.single("image"), updateProduct).delete(upload.single("image"), deleteProduct)

module.exports = router