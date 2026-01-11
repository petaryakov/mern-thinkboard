import express from "express";
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";

// dotenv library is used to be able to create the .env file and is initiated with dotenv.config()
dotenv.config();

console.log(process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 5001;

// middleware
// middleware is a function that is being called after the server sends the response and before it get to the client

// if the frontend needs to acces different domains for the backend we need cors to enable it
app.use(
    cors({
        origin: "http://localhost:5173",
    })
);
app.use(express.json()); // gives access to req.body
app.use(rateLimiter)

// This is already implemented middleware/rateLimiter.js
// app.use((req, res, next) => {
//     console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//     next();
// });

// use the notesRoutes file for the routes
// we declare the /api/notes endpont and we can skip it in the notesRoutes.js
app.use("/api/notes", notesRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT:", PORT);
    });
});

// mongodb+srv://petaryakov2_db_user:x5flh8i7jc2WBr1x@cluster0.g1qzqne.mongodb.net/?appName=Cluster0