const express = require("express");
const {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductDetails,
    createProductReview,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get( getAllProducts); //user can access all the products once they have logged in

router.route("/admin/product/new").post(createProduct); //here only Admin can create a product that's why we check if the user is authentic admin or not

router
    .route("/admin/product/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router.route("/product/:id").get(getProductDetails);



router.route("/review").put(isAuthenticatedUser, createProductReview)

module.exports = router