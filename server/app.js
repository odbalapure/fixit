const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("express-async-errors");

// Db connection
const connectDb = require("./db/connect");

// Auth middleware
const authMiddleware = require("./middleware/authentication");

// Routers
const authRouter = require("./routes/auth");
const vehiclesRouter = require("./routes/vehicles");
const cartRouter = require("./routes/cart");
const pickupRouter = require("./routes/pickup");
const serviceStatusRouter = require("./routes/servicestatus");
const finalizedServicesRouter = require("./routes/finalizedservices");

// Error handlers
const notFoundMiddleware = require("./middleware/not-found");
app.use(cors({ origin: "*" }));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send(`<h1>Welcome to FixIt</h1>
    <div>
      <h3>REST Endpoints</h3>
      <p><b>Auth:</b>/api/v1/auth</p>
      <p><b>Vehicle:</b>/api/v1/vehicles</p>
      <p><b>Cart:</b>/api/v1/cart</p>
      <p><b>Pikcup:</b>/api/v1/pickup</p>
      <p><b>Status:</b>/api/v1/status</p>
    </div>
  `);
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1", vehiclesRouter);
app.use("/api/v1/cart", authMiddleware, cartRouter);
app.use("/api/v1/pickup", authMiddleware, pickupRouter);
app.use("/api/v1/status", authMiddleware, serviceStatusRouter);
app.use("/api/v1/finalized", authMiddleware, finalizedServicesRouter);
app.use(notFoundMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

// require("dotenv").config();
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = require("twilio")(accountSid, authToken);

// client.messages
//   .create({
//     body: "This is a test message from twilio!",
//     from: process.env.TWILIO_PHONE_NO,
//     to: "+91-8956764442",
//   })
//   .then((msg) => console.log("The message: ", msg))
//   .catch((err) => console.log("The error: ", err));

// require("dotenv").config();
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = require("twilio")(accountSid, authToken);

// const name = "Om Balapure";
// const date = new Date();

// client.messages
//   .create({
//     from: "whatsapp:+14155238886",
//     to: "whatsapp:91-8956764442",
//     body: `Hi ${
//       name.split(" ")[0]
//     }!\nYour appointment has been confirmed for ${date}.\nThanks,\nDr. Bhalme's Clinic`,
//   })
//   .then((msg) => console.log("The message: ", msg))
//   .catch((err) => console.log("The error: ", err));
