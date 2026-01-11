import express from "express";
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";

// dotenv library is used to be able to create the .env file and is initiated with dotenv.config()
dotenv.config();

console.log(process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// middleware
// middleware is a function that is being called after the server sends the response and before it get to the client

// if the frontend needs to acces different domains for the backend we need cors to enable it
// we only need cors config while in dev because when we deploy the project we combine frontend and backend to the same port
// NODE_ENV is declared in the .env file
if(process.env.NODE_ENV !== "production"){
    app.use(
        cors({
            origin: "http://localhost:5173",
        })
    );
}
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

// only use this when in production
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));
    
    // when we get something other than /api/notes routes
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname,"../frontend", "dist", "index.html"));
    })
}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT:", PORT);
    });
});
