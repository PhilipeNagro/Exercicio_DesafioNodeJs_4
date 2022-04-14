import "dotenv/config";
import express from "express";
import routes from "./routes";
import "../database";

const app = express();

app.use(express.json());
app.use(routes);

app.get("/", (request, response) =>
  response.json({
    teste: "ok",
  })
);

app.listen(3331, () => {
  console.log("server on port 3331");
});
