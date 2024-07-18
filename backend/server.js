const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const collegeDirInfoRouter = require("./routes/college-router/dir-info-router.js")
const collegeClassFileAccessRouter = require("./routes/college-router/file-download-router.js")

//C:\School\College\Junior College\Spring Semester\CSCI 49375
//C:\School\NotesApp\backend

app.use("/API/College", collegeDirInfoRouter);
app.use("/API/FileAccess/College", collegeClassFileAccessRouter);


app.listen(3000, (req, res) => {
  console.log("Server listening on port 3000!");
});
