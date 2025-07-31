import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
}, {
  timestamps: true,
});

const Category = mongoose.model('Category', categorySchema);

// Create default categories if they don't exist
const createDefaultCategories = async () => {
  try {
    const categories = [
      { name: 'Electronics' },
      { name: 'Clothing' },
    ];

    for (const category of categories) {
      await Category.findOneAndUpdate(
        { name: category.name },
        { $setOnInsert: category },
        { upsert: true, new: true }
      );
    }
  } catch (error) {
    console.error('Error creating default categories:', error);
  }
};

// Run on startup
createDefaultCategories();

export default Category;