export const validateProduct = (req, res, next) => {
  const { name, price, stock } = req.body;

  if (!name) return res.status(400).json({ error: 'Product name is required' });
  if (price === undefined) return res.status(400).json({ error: 'Price is required' });
  if (stock === undefined) return res.status(400).json({ error: 'Stock is required' });
  
  if (typeof price !== 'number' || price < 0) {
    return res.status(400).json({ error: 'Price must be a number >= 0' });
  }
  
  if (!Number.isInteger(stock) || stock < 0) {
    return res.status(400).json({ error: 'Stock must be an integer >= 0' });
  }
  
  next();
};