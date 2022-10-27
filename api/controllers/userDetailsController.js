import Users from "../models/userModel.js";

//ALL USERS
export const getUsers = async (req, res) => {
  try {
    // const users = await Users.findAll({
    //   attributes: ["id", "username", "email", "userrole", "refresh_token"],
    // });
    const users = await Users.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

//ONE USER
export const getUser = async (req, res) => {
  try {
    const users = await Users.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

//UPDATE
export const updateUser = async (req, res) => {
  try {
    const update_update = await Users.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    const users = await Users.findOne({
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
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

//DELETE
export const deleteUser = async (req, res) => {
  try {
    const users = await Users.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json("User has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
};
