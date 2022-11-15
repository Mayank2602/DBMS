const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

//Create Product --Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    req.body.user = req.user.id

    const product = await Product.create(req.body);
    //201 status means that the product has been successfully created
    res.status(201).json({
        success: true,
        product
    });
});

//Get All Products - here products means we are sending all the products stored in db
exports.getAllProducts = catchAsyncErrors(async (req, res) => {

    const resultPerPage = 5;
    const productCount = await Product.countDocuments(); //this is to help display products properly in frontend

    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage);
    const products = await apiFeature.query;

    res.status(200).json({
        success: true,
        products
    });
});

//Get Product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHander("Product not found", 404)); //next here is the callback function
    }

    res.status(200).json({
        success: true,
        product,
        productCount
    });
});

//Update Product -- Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHander("Product not found", 404)); //next here is the callback function
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    })
});

//Delete Product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHander("Product not found", 404)); //next here is the callback function
    }

    await product.remove();

    res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    });
});

//Create new review or update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {

    const { rating, comment, productId } = req.body;
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };

    const product = await Product.findById(productId);
    //the reviews array contains fields like user, id, review etc, so in the LOC we are trying to fing the id of the user who created the review
    const isReviewed = product.reviews.find((rev) => rev.user.toString() === req.user._id.toString()
    ); //we are comparing the review id with the id of the user who just logged in

    if (isReviewed) {
        product.reviews.forEach(rev => {
            if (rev.user.toString() === req.user._id.toString())
                rev.rating = rating,
                    rev.comment = comment
        });
    }
    else {
        product.reviews.push(review); //this review array has been declared inside productModel
        product.numOfReviews = product.reviews.length
    }

    let avg = 0;
    product.reviews.forEach(rev => {
        avg += rev.rating;
    })
    product.ratings = avg / product.reviews.length;


    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    })
});

//Get all Reviews of a product
