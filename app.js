const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

// Local modules
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/errors");

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));

// static files (images, css)
app.use(express.static(path.join(rootDir, 'public')));

// routes
app.use(storeRouter);
app.use("/host", hostRouter);

// 404 page
app.use(errorsController.pageNotFound);

const PORT = 3000;

const DB_PATH =
"mongodb+srv://rimi:rimi123@cluster0.a4yif5e.mongodb.net/airbnb";

mongoose.connect(DB_PATH)
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
})
.catch(err => {
  console.log('MongoDB connection error:', err);
});