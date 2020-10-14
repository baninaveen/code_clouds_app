const express = require("express");
const mongoose = require("mongoose");
const httpStatus = require("http-status");
const cors = require("cors");
const bodyParser = require("body-parser");
const ApiError = require("./utils/ApiError");
const { errorConverter, errorHandler } = require("./middleware/error");

//Routes
const attributes = require("./routes/v1/Attribute");
const templates = require("./routes/v1/Template");

const app = express();

// Middleware
app.use(bodyParser.json());
// enable cors
app.use(cors());
app.options("*", cors());

// DB Config
const db = require("./config/config").mongoURI;

// Mongo connection
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Mongo DB Connected..."))
  .catch((err) => console.log(err));

// Use Routes
app.use("/api/v1/attributes", attributes);
app.use("/api/v1/templates", templates);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
