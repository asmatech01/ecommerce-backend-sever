// controllers/orderController.js

const Order = require('../models/orderSchema');

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { items, total, shippingInfoId, orderStatus } = req.body;
    const userId = req.user._id;

    const order = new Order({
      user: userId,
      items,
      total,
      shippingInfo: shippingInfoId,
      orderStatus,
    });

    await order.save();
    res.status(201).json({ message: 'Order created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Retrieve order details
exports.getOrderDetails = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const userId = req.user._id;

    const order = await Order.findOne({ _id: orderId, user: userId });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const userId = req.user._id;
    const { orderStatus } = req.body;

    const order = await Order.findOne({ _id: orderId, user: userId });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Update the order status array (for example, marking "packed" as completed)
    const updatedOrderStatus = order.orderStatus.map((status) => {
      if (status.type === orderStatus.type) {
        return {
          ...status,
          date: new Date(), // Update the date when the status was marked as completed
          isCompleted: true,
        };
      }
      return status;
    });

    order.orderStatus = updatedOrderStatus;

    await order.save();
    res.status(200).json({ message: 'Order status updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// List user's order history
exports.listUserOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ user: userId });

    if (!orders) {
      return res.status(404).json({ message: 'No orders found' });
    }

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
