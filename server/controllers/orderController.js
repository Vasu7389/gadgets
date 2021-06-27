import Order from "../models/orderModel.js";

//@desc Create new order
//@routes POST /api/orders
//@access Private
const addOrderItems = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;
    if (orderItems && orderItems.length === 0) {
      res.status(400);
      res.json({ message: "No order items" });
    } else {
      const order = new Order({
        user: req.user._id,
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });
      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    }
  } catch (error) {
    //handle
  }
};

//@desc Update order to paid
//@routes PUT /api/orders/:id/pay
//@access Private
const updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = req.body.paymentMethodData;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      res.json({ message: "Order update failed" });
    }
  } catch (error) {
    //handle
  }
};

//@desc Update order to delivered
//@routes PUT /api/orders/:id/deliver
//@access Private/Admin
const updateOrderToDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      res.json({ message: "Order update failed" });
    }
  } catch (error) {
    //handle
  }
};

//@desc Get order by id
//@routes GET /api/orders/:id
//@access Private
const getOrderById = async (req, res) => {
  try {
    const orders = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    ); //this will attach name and email to our order object
    if (orders) {
      res.json(orders);
    } else {
      res.status(404);
      res.json({ message: "Order not found" });
    }
  } catch (error) {
    //handle
  }
};

//@desc Get loggedin user orders
//@routes GET /api/orders/myorders
//@access Private
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    //handle
  }
};

//@desc Get all orders
//@routes GET /api/orders
//@access Private/Admin
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "id name");
    res.json(orders);
  } catch (error) {
    //handle
  }
};

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
};
