import mongoose from "mongoose";
import { fileURLToPath } from "url";
import { dirname } from "path";
import * as dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
});

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);

const foodData = [
  {
    name: "Greek salad",
    image: "food_1.png",
    price: 12,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Salad"
  },
  {
    name: "Veg salad",
    image: "food_2.png",
    price: 18,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Salad"
  },
  {
    name: "Clover Salad",
    image: "food_3.png",
    price: 16,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Salad"
  },
  {
    name: "Chicken Salad",
    image: "food_4.png",
    price: 24,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Salad"
  },
  {
    name: "Lasagna Rolls",
    image: "food_5.png",
    price: 14,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Rolls"
  },
  {
    name: "Peri Peri Rolls",
    image: "food_6.png",
    price: 12,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Rolls"
  },
  {
    name: "Chicken Rolls",
    image: "food_7.png",
    price: 20,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Rolls"
  },
  {
    name: "Veg Rolls",
    image: "food_8.png",
    price: 15,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Rolls"
  },
  {
    name: "Ripple Ice Cream",
    image: "food_9.png",
    price: 14,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Desserts"
  },
  {
    name: "Fruit Ice Cream",
    image: "food_10.png",
    price: 22,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Desserts"
  },
  {
    name: "Jar Ice Cream",
    image: "food_11.png",
    price: 10,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Desserts"
  },
  {
    name: "Vanilla Ice Cream",
    image: "food_12.png",
    price: 12,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Desserts"
  }
];

const seedFood = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing food items
    await foodModel.deleteMany({});
    console.log("Cleared existing food items");

    // Add new food items
    await foodModel.insertMany(foodData);
    console.log(`Added ${foodData.length} food items to the database`);

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error seeding food items:", error);
    process.exit(1);
  }
};

seedFood(); 