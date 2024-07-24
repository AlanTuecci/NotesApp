const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const cors = require("cors");
const collegeDirAccessRouter = require("./routes/college-router/dir-access-router.js")
const collegeClassFileAccessRouter = require("./routes/college-router/file-download-router.js")

//C:\School\College\Junior College\Spring Semester\CSCI 49375
//C:\School\NotesApp\backend

app.use(express.static("../frontend/build"))
app.use(cors());
app.use("/API/DirAccess/College", collegeDirAccessRouter);
app.use("/API/FileAccess/College", collegeClassFileAccessRouter);


app.listen(3001, (req, res) => {
  console.log("Server listening on port 3001!");
});
