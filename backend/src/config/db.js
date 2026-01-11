import mongoose from "mongoose";

export const connectDB = async() => {
    try {
        // MONGO_URI is a variable declared in the .env file
        // in order to keep the connection a secret when we upload to github
        // we use git ignore for the .env file
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGODB CONNECTED SUCCESSFULLY");
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
        process.exit(1); // exit with error
    }
}