import mongoose, { Mongoose } from "mongoose";

const connectDb = async () => {
   try {
     const conn = await mongoose.connect(process.env.MONGO_URI);
     if(conn){
        console.log('MongoDb Connected Successfully');
     }
   } catch (error) {
    console.log('Error Connecting to database',error);
   }

}

export default connectDb;