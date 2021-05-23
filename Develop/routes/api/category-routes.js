const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint
//============================================================================

// find all categories
router.get("/", (req, res) => {
  Category.findAll({
    attributes: ["id", "category_name"],
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// find one category by its `id` value
router.get("/:id", (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "category_name"],
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: "Category not found in database." });
      } else {
        res.json(dbCategoryData);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create a new category
router.post("/", (req, res) => {
  //expects: { "category_name": "Tech"}
  const { category_name } = req.body;

  Category.create({
    category_name,
  })
    .then(newCategory => res.json(newCategory))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// update a category by its `id` value
router.put("/:id", (req, res) => {
  //expects: { "category_name": "Tech"}
  const { category_name } = req.body;

  Category.update(
    {
      category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then(updatedCategory => {
      if (!updatedCategory[0]) {
        res.status(404).json({ message: "Category not found in database." });
      } else {
        res.json({ message: "Category has been successfully updated." });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete a category by its `id` value
router.delete("/:id", (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(destroyedData => {
      if (!destroyedData) {
        res.status(404).json({ message: "Category not found in database." });
      } else {
        res.json({ message: "Category has been successfully deleted." });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
