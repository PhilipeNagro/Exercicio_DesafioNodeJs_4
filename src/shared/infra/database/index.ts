import mongoose from "mongoose";

console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL || "", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  poolSize: Number(process.env.MONGO_POOLSIZE) || 20,
});
