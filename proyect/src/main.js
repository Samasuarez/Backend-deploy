import express from "express";
import compression from "express-compression";
import passport from "passport";
import router from "./routes/main.routes.js";
import session from "express-session";
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import { __dirname } from "./path.js";
import { mongoConnect } from "./db/index.js";
import path from "path";
import cookieParser from "cookie-parser";
import initializePassport from "./config/passport.js";

const app = express();
const port = 4000;

app.use(compression());

mongoConnect();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views/"));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "mi-session-secreta",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true,
      httpOnly: true,
    },
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(passport.initialize());
app.use(passport.session());
initializePassport();
app.get("/home", (req, res) => {
  res.render("home");
});

app.use("/", router);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({ error: "Error interno del servidor" });
});

const server = app.listen(port, () => {
  console.log(`Server on port ${port}`);
});

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("Connected to io server");
  socket.on("disconnect", () => {
    console.log("Disconnected from io server");
  });
});
