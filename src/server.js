const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "API funcionando" });
});

app.listen(3000, () => console.log("🔥 Backend mamalón en http://localhost:3000"));
