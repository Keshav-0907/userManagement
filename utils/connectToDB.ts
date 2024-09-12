import mongoose from "mongoose";

const connectToDB = async () => {
    await mongoose
        .connect("mongodb://localhost:27017/devrajBhaiya")
        .then(() => {
            console.log("Connected to DB");
        })
        .catch((err) => {
            console.log("Error connecting to DB", err);
        });
};


export default connectToDB;