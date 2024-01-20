const express = require("express");
const app = express();
app.use(express.json());

const urlsRouter = require("./urls/urls.router")
const usesRouter = require("./uses/uses.router")

// TODO: Add code to meet the requirements and make the tests pass.
app.use("/uses", usesRouter);
app.use("/urls", urlsRouter);

// Not found handler
app.use((request, response, next) => {
  next({ status:404, message:`Not found: ${request.originalUrl}`});
});

// Error handler
app.use((error, req, res, next) => {
  const { status = 500, message = "Something went wront!" } = error;
  res.status(status).json({ error: message });
});

module.exports = app;