import {createProduct,getAllProducts,getProductByID,updateProduct,deleteproduct} from '../services/productService.js';

export const addProduct=async(req,res)=>{
    try{
        const product= await createProduct(req.body);
        res.status(201).json({message:'product added successfully!',product})

    }catch(error){
        res.status(500).json({message:'Failed to create a product',error:error.message})

    }
}

export const getAllProduct=async(req,res)=>{
    try{
        const getallproduct=await getAllProducts();
        res.status(200).json({message:'products fetched successfully',getallproduct})
    }catch(error){
        res.status(500).json({message:'Failed to fetch all products',error:error.message})
    }
}

export const getproductByID=async(req,res)=>{
    try{
        const getProductbyId=await getProductByID(req.params.id);
        if(!getProductbyId) return res.status(404).json({message:'product not found'})
        res.status(200).json({message:'product fetched successfully',getProductbyId})
    }catch(error){
        res.status(500).json({message:'Failed to fetch the product',error:error.message})

    }
}

export const updateproduct=async(req,res)=>{
    try{

        const updateproduct=await updateProduct(req.params.id,req.body);
        if(!updateproduct) return res.status(404).json({ message: 'Product not found' });
            res.status(200).json(updateproduct);
        }catch(error){
            res.status(500).json({ message: error.message });
    }
}

export const deleteProduct=async(req,res)=>{
    try{
        const deleteProduct=await deleteproduct(req.params.id);
 if(!deleteProduct) return res.status(404).json({ message: 'Product not found' });
            res.status(200).json({message:'Product deleted succesfully'});
        }catch(error){
            res.status(500).json({ message: error.message });
    }
}