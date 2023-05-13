/////////////////////////////
///////// IMPORTS //////////
///////////////////////////
import { Router } from "express";
import { addProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controllers/productController";

// INITIALIZE ROUTER
const productRoutes = Router();
// ROUTES
// POST
productRoutes.post('', addProduct); // ADD PRODUCT
productRoutes.delete('/:productId', deleteProduct); // DELETE PRODUCT
productRoutes.put('/:productId', updateProduct); // UPDATE PRODUCT
productRoutes.get('', getAllProducts); // GET ALL PRODUCTS
productRoutes.get('/:productId', getProductById); // GET PRODUCT BY ID

// EXPORTS
export default productRoutes;