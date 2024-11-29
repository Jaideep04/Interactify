require("dotenv").config();

const express = require("express");
const cors = require("cors");//npm i cors
const app = express();//instance of express
const authRoute = require("./routes/auth-route");
const contactRoute = require("./routes/contact-route");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");

//connecting frontEnd with backEnd
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};
app.use(cors(corsOptions));


app.use(express.json());

app.use("/auth", authRoute);
app.use("/contact", contactRoute);

app.use(express.json());

app.use(errorMiddleware);

const PORT = 5002;
connectDb().then(() => {
    app.listen(PORT, () => {
      console.log(`server is running at port: ${PORT}`);
    });
});



