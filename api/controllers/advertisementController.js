import Advertisements from "../models/advertisementModel.js";

//Advertisement SAVE
export const saveAdvertisement = async (req, res) => {
  try {
    const newAdvertisements = await Advertisements.create(req.body);
    res.status(201).json(newAdvertisements);
  } catch (error) {
    res.status(500).json(error);
  }
};

//ALL Advertisements
export const getAdvertisements = async (req, res) => {
  try {
    const advertisements = await Advertisements.findAll();
    res.status(200).json(advertisements);
  } catch (error) {
    res.status(500).json(error);
  }
};

// ONE Advertisement
export const getAdvertisement = async (req, res) => {
  try {
    const advertisements = await Advertisements.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(advertisements);
  } catch (error) {
    res.status(500).json(error);
  }
};

// UPDATE
export const updateAdvertisement = async (req, res) => {
  try {
    const Advertisement_update = await Advertisements.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    const advertisement = await Advertisements.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(advertisement);
  } catch (error) {
    res.status(500).json(error);
  }
};

//DELETE
export const deleteAdvertisement = async (req, res) => {
  try {
    const advertisement = await Advertisements.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json("Advertisement has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
};
