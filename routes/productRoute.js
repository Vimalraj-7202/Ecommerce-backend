import express from 'express';
import {addProduct,getAllProduct,getproductByID,updateproduct,deleteProduct} from '../controllers/productController.js';

const router = express.Router();
router.post('/addProduct', addProduct);
router.get('/getAllproducts', getAllProduct);
router.get('/:id', getproductByID);
router.put('/:id', updateproduct);
router.delete('/:id', deleteProduct);

export default router;
