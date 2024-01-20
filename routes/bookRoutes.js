const express = require("express")
const router = express.Router()
const pool = require("../config/database")

router.route("/submitBookReview").post(async (req, res) => {
  const { BookTitle, BookAuthor, BookImage, Description } = req.body

  if (
    BookTitle.length > 3 &&
    BookAuthor.length > 3 &&
    BookImage.length > 3 &&
    Description.length > 3
  ) {
    try {
      // Assuming you have a table named "book_reviews"
      const insertQuery = `
        INSERT INTO books (BookTitle, BookAuthor, BookImage, Description)
        VALUES ($1, $2, $3, $4)
        RETURNING *;`

      const values = [BookTitle, BookAuthor, BookImage, Description]

      const result = await pool.query(insertQuery, values)

      // Assuming the response should be the newly inserted book review
      const newBookReview = result.rows[0]

      res.status(201).json({ success: true, data: newBookReview })
    } catch (error) {
      console.error("Error submitting book review:", error)
      res.status(500).json({ success: false, error: "Internal Server Error" })
    }
  } else {
    res.status(400).json({ success: false, error: "Invalid input data" })
  }
})

module.exports = router
