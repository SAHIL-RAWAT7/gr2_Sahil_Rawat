import Product from '../models/Product.js';
import Category from '../models/Category.js';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('categoryId', 'name');
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, categoryId } = req.body;
    
    if (categoryId) {
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(400).json({ error: 'Invalid category ID' });
      }
    }
    
    const newProduct = new Product({
      name,
      description,
      price,
      stock,
      categoryId: categoryId || null,
    });
    
    await newProduct.save();
    const populatedProduct = await newProduct.populate('categoryId', 'name');
    res.status(201).json(populatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { price, stock } = req.body;
    
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    if (price !== undefined) product.price = price;
    if (stock !== undefined) product.stock = stock;
    
    await product.save();
    const populatedProduct = await product.populate('categoryId', 'name');
    res.json(populatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};