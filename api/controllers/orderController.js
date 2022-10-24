import Orders from "../models/orderModel.js";
import Products from "../models/productsModel.js";
import Users from "../models/userModel.js";

//Order SAVE
export const saveOrder = async (req, res) => {
  try {
    const newOrders = await Orders.create(req.body);
    res.status(201).json(newOrders);
  } catch (error) {
    res.status(500).json(error);
  }
};

//ALL Orders
export const getOrders = async (req, res) => {
  try {
    // const orders = await Orders.findAll(
    //   {
    //     include: Users
    //   }
    // );
    const orders = await Orders.findAll(
      {
        include: Users
      }
    );
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
};

// ONE Order
export const getOrder = async (req, res) => {
  try {
    const orders = await Orders.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
};

// UPDATE
export const updateOrder = async (req, res) => {
  try {
    const orders = await Orders.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
};

//DELETE
export const deleteOrder = async (req, res) => {
  try {
    const orders = await Orders.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json("Order has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
};
