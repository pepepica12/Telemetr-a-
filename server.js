const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "Nefosys API running" });
});

app.post("/analyze", (req, res) => {
  res.json({
    received: req.body,
    message: "Analysis endpoint operational"
  });
});

app.listen(port, () => {
  console.log(`API running on port ${port}`);
});
