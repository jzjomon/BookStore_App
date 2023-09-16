import mongoose from "mongoose";

export const dbConnet = async () => {
    try{
        const connectDB = await mongoose.connect('mongodb://127.0.0.1:27017/bookStore',{
            useNewUrlParser : true
        })
        console.log(`MongoDB Connected: {conn.connection.host}`);
    }
    catch (err) {
        console.log(err);
    }
}

