import { MongoMemoryReplSet } from "mongodb-memory-server";
import mongoose, { Mongoose } from "mongoose";

class MongoMock {
  private database: Mongoose | undefined;

  private replSet: MongoMemoryReplSet | undefined;

  async connect(): Promise<void> {
    this.replSet = new MongoMemoryReplSet({
      replSet: { storageEngine: "wiredTiger" },
    });
    await this.replSet.waitUntilRunning();
    const uri = await this.replSet.getUri();
    this.database = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  }

  async disconnect(): Promise<void> {
    if (this.database) {
      await this.database.connection.close();
    }
  }
}

export default new MongoMock();
