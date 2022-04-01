const { Subcategory } = require("../db");

const getSubCategories = async (req, res, next) => {
  try {
    let dataSubCategory = await Subcategory.findAll({});
    if (!dataSubCategory.length) {
      res.status(404).send({ errorMsg: "Subcategories not found." });
    }
    dataSubCategory = dataSubCategory.map((sub) => {
      return {
        name: sub.name,
        id: sub.id,
        CategoryId: sub.CategoryId,
      };
    });
    res.status(200).send({
      successMsg: "Here are your subcategories.",
      data: dataSubCategory,
    });
  } catch (error) {
    res.status(500).send({ errorMsg: error });
  }
};

const createSubCategory = async (req, res, next) => {
  try {
    let { name, CategoryId } = req.body;
    if (!name || !CategoryId) {
      res.status(400).send({ errorMsg: "Missing data" });
    } else {
      const [newSubCategory, created] = await Subcategory.findOrCreate({
        where: {
          name,
          CategoryId,
        },
      });
      created
        ? res.status(201).send({
            successMsg: "Subcategory successfully created.",
            data: newSubCategory,
          })
        : res.status(400).send({ errorMsg: "Subcategory already exists." });
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error});
  }
};

module.exports = { getSubCategories, createSubCategory };
