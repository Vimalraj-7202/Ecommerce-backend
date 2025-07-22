import Product from '../models/productModel.js'

export const createProduct=async(data)=>{
    const product=new Product(data);
    return await product.save();
}

export const getAllProducts=async()=>{
    return await Product.find();
} 

export const getProductByID=async(id)=>{
    return await Product.findById(id);
}

export const updateProduct=async(id,data)=>{
    return await Product.findByIdAndUpdate(id,data,{new:true});
}

export const deleteproduct=async(id)=>{
    return await Product.findByIdAndDelete(id);
}