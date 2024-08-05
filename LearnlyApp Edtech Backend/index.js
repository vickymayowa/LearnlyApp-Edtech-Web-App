const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const userRoutes = require("./routes/userRoutes.js");
const productRoutes = require("./routes/productRoutes.js");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { notFound, errorHandler } = require("./middleware/errorMiddleware.js");

dotenv.config();

const port = process.env.PORT || 5000;

connectDB();

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// User Routes
app.use("/api/users", userRoutes);
app.use("/api/product", productRoutes);

app.get("/", (req, res) => {
  res.status(201).json({
    message: "Welcome to my LearnlyApp Server",
    status: true,
  });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

app.listen(port, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
);
