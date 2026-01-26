import { Router } from "express";
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct
} from "#controllers/productController.js";

const productRoutes = Router();

productRoutes.post('/', createProduct);
productRoutes.patch('/:id', updateProduct);
productRoutes.delete('/:id', deleteProduct);
productRoutes.get('/', getAllProducts);
productRoutes.get('/:id', getSingleProduct);

export default productRoutes;
