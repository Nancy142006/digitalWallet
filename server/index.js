require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// databse connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static("uploads"));

app.use("/api", require("./routes/authRoutes"));
app.use("/api", require("./routes/Transaction"));
app.use("/api",require("./routes/Receipt"));
app.use("/api", require("./routes/ProfileRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
