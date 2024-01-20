const express = require("express")

const app = express()

//middleware
app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname + "/public"))
app.use("/api", require("./routes/bookRoutes"))

app.use("/", (req, res) => {
  return res.render("index")
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
