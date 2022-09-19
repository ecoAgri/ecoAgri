import Products from "../models/productsModel.js";
import ProductImage from "../models/productImagesModel.js";

//PRODUCT SAVE
export const saveProduct = async (req, res) => {
  try {
    const newProducts = await Products.create(req.body);
    res.status(201).json(newProducts);
    // try {
    //   const products = await Products.findAll();
    //   res.status(201).json(products);
    // } catch (error) {
    //   res.status(501).json(error);
    // }
  } catch (error) {
    res.status(500).json(error);
  }
};

//ALL PRODUCTS
export const getProducts = async (req, res) => {
  try {
    // const users = await Users.findAll({
    //   attributes: ["id", "username", "email", "userrole", "refresh_token"],
    // });
    const products = await ProductImage.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

// ONE PRODUCT
export const getProduct = async (req, res) => {
  try {
    const products = await Products.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

// UPDATE
export const updateProduct = async (req, res) => {
  try {
    // const product_update = await Products.update(
    //   {
    //     address: "466",
    //   },
    //   {
    //     where: {
    //       id: req.params.id,
    //     },
    //   }
    // );
    const products = await Products.findOne({
      where: {
        id: req.params.id,
      },
    });
    // const users = await Users.findOrCreate(
    //   {
    //     where: {
    //       id: req.params.id,
    //     },
    //     defaults: {
    //       address: 'Technical Lead JavaScript'
    //     }
    //   }
    // );
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

//DELETE
export const deleteProduct = async (req, res) => {
  try {
    const products = await Products.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json("User has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
};
