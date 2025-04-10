import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

// placing user order for frontend
const placeOrder = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      status: "Food Processing" // Add initial status
    });
    await newOrder.save();
    // Clear user's cart after successful order
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
    res.json({ 
      success: true, 
      message: "Order placed successfully",
      orderId: newOrder._id 
    });
  } catch (error) {
    console.log(error);
    res.json({ 
      success: false, 
      message: "Error placing order" 
    });
  }
};

// user orders for frontend
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Listing orders for admin panel
const listOrders = async (req, res) => {
  try {
    // Get user from token
    const token = req.headers.token;
    if (!token) {
      return res.json({ success: false, message: "Token not provided" });
    }

    // Verify token and get user
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userData = await userModel.findById(decoded.id);

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    if (userData.role !== "admin") {
      return res.json({ success: false, message: "You are not admin" });
    }

    // Get all orders and populate user details
    const orders = await orderModel.find({})
      .populate('userId', 'name email') // Populate user details
      .sort({ createdAt: -1 }); // Sort by newest first

    console.log("Found orders:", orders.length);
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("Error in listOrders:", error);
    res.json({ success: false, message: "Error fetching orders" });
  }
};

// api for updating status
const updateStatus = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    if (userData && userData.role === "admin") {
      await orderModel.findByIdAndUpdate(req.body.orderId, {
        status: req.body.status,
      });
      res.json({ success: true, message: "Status Updated Successfully" });
    } else {
      res.json({ success: false, message: "You are not an admin" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { placeOrder, userOrders, listOrders, updateStatus };
