const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const stripeRoute = require("./routes/stripe");

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("connected to MongoDB"))
  .catch((err) =>{console.log(err);
});

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.use("/api/checkout", stripeRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running");
});