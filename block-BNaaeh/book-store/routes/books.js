var express = require("express");
var router = express.Router();
var Book = require("../models/Book");
var Comment = require("../models/Comment");

/* GET users listing. */
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json({ books: books });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/", async(req, res, next) => {
  try{
    const book = await Book.create(req.body);
    res.status(200).redirect('/api/books')
  }catch(e) {
    res.status(400).send(e);
  }

  // Book.create(req.body, (err, book) => {
  //   if (err) return res.status(400).send(err);
  //   res.status(200).json({ book: book });
  // });
});

router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("commentId");
    res.status(200).json({ book: book });
  } catch (e) {
    res.status(400).send(e);
  }
});


router.delete('/:id',  async (req, res)=> {
  try{
    const book = await Book.findByIdAndDelete(req.params.id)
    console.log(book)
  }catch(e) {
    res.status(400).send(e)
  }
    // Book.findByIdAndDelete(req.params.id, (err, coyntent)=> {
    //   Comment.deleteMany({bookId:content.id}, (err, update)=> {
    //     res.status(200)
    //   })
    // })
})

module.exports = router;
