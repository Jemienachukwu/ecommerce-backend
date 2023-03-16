import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";

export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    const order = await Order.create({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    res.status(201).json(order);
  }
});

export const getOrderItems = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

export const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

export const updatePaystack = asyncHandler(async (req, res) => {
  const { id, reference } = req.body;
  const order = await Order.findById(id);
  if (order) {
    const update = await Order.findByIdAndUpdate(id, {
      payStackReference: reference,
      isPaid: true,
      paidAt: new Date(),
    });

    await update.save();

    const getOrder = await Order.findById(id);
    if (update) {
      res.json({
        hasError: false,
        message: "Payment Successful",
        update,
        getOrder,
      });
    } else {
      res.status(404);
      throw new Error("Somthing Went Wrong");
    }
  } else {
    res.status(404);
    throw new Error("order not found");
  }
});

export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.json(orders);
});
