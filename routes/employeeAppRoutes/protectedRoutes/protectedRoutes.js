import { Router } from "express";
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct
} from "#controllers/productController.js";
import {
    createProductColor,
    deleteProductColor,
    getAllProductColors,
    updateProductColor
} from "#controllers/productColorController.js";
import {
    createProductSize,
    deleteProductSize,
    getAllProductSizes,
    updateProductSize
} from "#controllers/productSizeController.js";
import {
    createCategory,
    deleteCategory,
    getAllCategories,
    updateCategory
} from "#controllers/categoryController.js";
import {
    deleteOrder,
    getOrders,
    getOrderById,
    updateOrderStatus
} from "#controllers/order/orderController.js";
import {
    createPromoCode,
    deletePromoCode,
    getAllPromoCodes,
    updatePromoCode
} from "#controllers/promoCodeController.js";

const protectedRoutes = Router();

// Product Routes
protectedRoutes.post('/product', createProduct);
protectedRoutes.patch('/product/:id', updateProduct);
protectedRoutes.delete('/product/:id', deleteProduct);
protectedRoutes.get('/product', getAllProducts);
protectedRoutes.get('/product/:id', getSingleProduct);

// Product Color Routes
protectedRoutes.post('/productColor', createProductColor);
protectedRoutes.patch('/productColor/:id', updateProductColor);
protectedRoutes.delete('/productColor/:id', deleteProductColor);
protectedRoutes.get('/productColor', getAllProductColors);

// Product Size Routes
protectedRoutes.post('/productSize', createProductSize);
protectedRoutes.patch('/productSize/:id', updateProductSize);
protectedRoutes.delete('/productSize/:id', deleteProductSize);
protectedRoutes.get('/productSize', getAllProductSizes);

// Category Routes
protectedRoutes.post('/category', createCategory);
protectedRoutes.patch('/category/:id', updateCategory);
protectedRoutes.delete('/category/:id', deleteCategory);
protectedRoutes.get('/category', getAllCategories);

// Order Routes
// Note: getAllOrders in controller might need adjustment if it expects specific filters
protectedRoutes.get('/order', getOrders);
protectedRoutes.get('/order/:orderId', getOrderById);
protectedRoutes.patch('/order/:orderId', updateOrderStatus);
protectedRoutes.delete('/order/:orderId', deleteOrder);

// Promo Code Routes
protectedRoutes.post('/promoCode', createPromoCode);
protectedRoutes.patch('/promoCode/:id', updatePromoCode);
protectedRoutes.delete('/promoCode/:id', deletePromoCode);
protectedRoutes.get('/promoCode', getAllPromoCodes);

export default protectedRoutes;
