const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint
//===============================================================================

// find all tags
router.get("/", (req, res) => {
  Tag.findAll({
    attributes: ["id", "tag_name"],
    include: Product,
  })
    .then(dbTagData => res.json(dbTagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// find a single tag by its `id`
router.get("/:id", (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["tag_name"],
    include: Product,
  })
    .then(dbTagData => {
      if (!dbTagData) {
        res.status(404).json({ message: "Tag not found in database." });
      } else {
        res.json(dbTagData);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create a new tag
router.post("/", (req, res) => {
  //expects: {tag_name: "Jewelry"}
  Tag.create({
    tag_name: req.body.tag_name,
  })
    .then(createdTag => res.json(createdTag))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// update a tag's name by its `id` value
router.put("/:id", (req, res) => {
  //expects: {tag_name: "Jewelry"}
  Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then(dbUpdatedData => {
      if (!dbUpdatedData[0]) {
        res.status(404).json({ message: "Tag not found or no update made." });
      } else {
        res.json({ message: "Update made successfully" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete on tag by its `id` value
router.delete("/:id", (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(destroyedData => {
      if (!destroyedData) {
        res.status(404).json({ message: "Tag not found in database." });
      } else {
        res.json({ message: "Tag successfully deleted." });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
