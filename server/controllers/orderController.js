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
//@routes GET /api/orders/:id/pay
//@access Private
const updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentMethod = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };
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

export { addOrderItems, getOrderById, updateOrderToPaid };
