import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URL || "", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  poolSize: Number(process.env.MONGO_POOLSIZE) || 20,
});
