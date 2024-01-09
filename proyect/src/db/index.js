import mongoose from "mongoose";
import MongoStore from "connect-mongo";

const mongoConnect = async () => {
  try {
    await mongoose.connect("mongodb+srv://sama:suarez@cluster0.iy6wjg4.mongodb.net/your-database-name", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("db connected");
  } catch (error) {
    console.log("error connecting to the database");
  }
};

const sessionStore = new MongoStore({
  mongoUrl: "mongodb+srv://sama:suarez@cluster0.iy6wjg4.mongodb.net/your-database-name",
  ttl: 60,
});

export { mongoConnect, sessionStore};
