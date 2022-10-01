import Articles from "../models/articleModel.js";

//Article SAVE
export const saveArticle = async (req, res) => {
  try {
    const newArticles = await Articles.create(req.body);
    res.status(201).json(newArticles);
  } catch (error) {
    res.status(500).json(error);
  }
};

//ALL Articles
export const getArticles = async (req, res) => {
  try {
    const articles = await Articles.findAll();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json(error);
  }
};

// ONE Article
export const getArticle = async (req, res) => {
  try {
    const articles = await Articles.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json(error);
  }
};

// UPDATE
export const updateArticle = async (req, res) => {
  try {
    const article_update = await Articles.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    const article = await Articles.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json(error);
  }
};

//DELETE
export const deleteArticle = async (req, res) => {
  try {
    const articles = await Articles.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json("Article has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
};
