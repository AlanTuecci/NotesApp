const express = require("express");
const router = express.Router();
const fs = require("fs/promises");
const path = require("path");

const collegeGradeLevels = [
  "Freshman College",
  "Sophomore College",
  "Junior College",
  "Senior College",
];
const collegeSemesters = ["Fall Semester", "Spring Semester"];

router.get("/", async (req, res) => {
  try {
    const dirPath = path.join(__dirname, "../../../../../college");
    let dirContents = await fs.readdir(dirPath);
    dirContents = dirContents.filter(
      (entry) =>
        !entry.includes(".") &&
        !entry.includes("Makefile") &&
        !entry.includes("main")
    );
    res.json(dirContents);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.meessage });
  }
});

router.get("/:GradeLevel", async (req, res) => {
  try {
    const dirPath = path.join(
      __dirname,
      "../../../../../College",
      req.params.GradeLevel
    );
    const prevPath = path.join(dirPath, "../");

    if (collegeGradeLevels.indexOf(req.params.GradeLevel) != -1) {
      let dirContents = await fs.readdir(dirPath);
      dirContents = dirContents.filter(
        (entry) =>
          !entry.includes(".") &&
          !entry.includes("Makefile") &&
          !entry.includes("main")
      );
      res.json(dirContents);
    } else {
      res
        .status(404)
        .send(
          "Invalid college grade level entered. Note: Improperly capitalized strings will lead to an unsuccessful result!"
        );
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.meessage });
  }
});

router.get("/:GradeLevel/:Semester", async (req, res) => {
  try {
    const dirPath = path.join(
      __dirname,
      "../../../../../College",
      req.params.GradeLevel,
      req.params.Semester
    );
    const prevPath = path.join(dirPath, "../");

    if (
      collegeGradeLevels.indexOf(req.params.GradeLevel) != -1 &&
      collegeSemesters.indexOf(req.params.Semester) != -1
    ) {
      let dirContents = await fs.readdir(dirPath);
      dirContents = dirContents.filter(
        (entry) =>
          !entry.includes(".") &&
          !entry.includes("Makefile") &&
          !entry.includes("main")
      );
      res.json(dirContents);
    } else {
      res
        .status(404)
        .send(
          "Invalid college grade level or semester entered. Note: Improperly capitalized strings will lead to an unsuccessful result!"
        );
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.meessage });
  }
});

router.get("/:GradeLevel/:Semester/:ClassName", async (req, res) => {
  try {
    if (
      collegeGradeLevels.indexOf(req.params.GradeLevel) == -1 ||
      collegeSemesters.indexOf(req.params.Semester) == -1
    ) {
      res
        .status(404)
        .send(
          "Invalid college grade level or semester entered. Note: Improperly capitalized strings will lead to an unsuccessful result!"
        );
    } else {
      const dirPath = path.join(
        __dirname,
        "../../../../../College",
        req.params.GradeLevel,
        req.params.Semester,
        req.params.ClassName
      );
      const prevPath = path.join(dirPath, "../");

      let prevDirFolders = await fs.readdir(prevPath);
      prevDirFolders = prevDirFolders.filter((entry) => !entry.includes("."));

      if (prevDirFolders.indexOf(req.params.ClassName) != -1) {
        let dirContents = await fs.readdir(dirPath);
        dirContents = dirContents.filter(
          (entry) =>
            !entry.endsWith(".ini") &&
            !entry.includes("Makefile") &&
            !entry.includes("main")
        );
        res.json(dirContents);
      } else {
        res
          .status(404)
          .send(
            "Invalid class name entered. Note: Improperly capitalized strings will lead to an unsuccessful result!"
          );
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.meessage });
  }
});

router.get("/:GradeLevel/:Semester/:ClassName/:SubFolder", async (req, res) => {
  try {
    if (
      collegeGradeLevels.indexOf(req.params.GradeLevel) == -1 ||
      collegeSemesters.indexOf(req.params.Semester) == -1
    ) {
      res
        .status(404)
        .send(
          "Invalid college grade level or semester entered. Note: Improperly capitalized strings will lead to an unsuccessful result!"
        );
    } else {
      const dirPath = path.join(
        __dirname,
        "../../../../../College",
        req.params.GradeLevel,
        req.params.Semester,
        req.params.ClassName,
        req.params.SubFolder
      );
      const prevPath = path.join(dirPath, "../");

      let prevDirFolders = await fs.readdir(prevPath);
      prevDirFolders = prevDirFolders.filter((entry) => !entry.includes("."));

      if (prevDirFolders.indexOf(req.params.SubFolder) != -1) {
        let dirContents = await fs.readdir(dirPath);
        dirContents = dirContents.filter(
          (entry) =>
            !entry.endsWith(".ini") &&
            !entry.includes("Makefile") &&
            !entry.includes("main")
        );
        res.json(dirContents);
      } else {
        res
          .status(404)
          .send(
            "Invalid class name or subfolder name entered. Note: Improperly capitalized strings will lead to an unsuccessful result!"
          );
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.meessage });
  }
});

router.get(
  "/:GradeLevel/:Semester/:ClassName/:SubFolder/:SubSubFolder",
  async (req, res) => {
    try {
      if (
        collegeGradeLevels.indexOf(req.params.GradeLevel) == -1 ||
        collegeSemesters.indexOf(req.params.Semester) == -1
      ) {
        res
          .status(404)
          .send(
            "Invalid college grade level or semester entered. Note: Improperly capitalized strings will lead to an unsuccessful result!"
          );
      } else {
        const dirPath = path.join(
          __dirname,
          "../../../../../College",
          req.params.GradeLevel,
          req.params.Semester,
          req.params.ClassName,
          req.params.SubFolder,
          req.params.SubSubFolder
        );
        const prevPath = path.join(dirPath, "../");

        let prevDirFolders = await fs.readdir(prevPath);
        prevDirFolders = prevDirFolders.filter((entry) => !entry.includes("."));

        if (prevDirFolders.indexOf(req.params.SubSubFolder) != -1) {
          let dirContents = await fs.readdir(dirPath);
          dirContents = dirContents.filter(
            (entry) =>
              !entry.endsWith(".ini") &&
              !entry.includes("Makefile") &&
              !entry.includes("main")
          );
          res.json(dirContents);
        } else {
          res
            .status(404)
            .send(
              "Invalid class name, subfolder, or sub-subfolder name entered. Note: Improperly capitalized strings will lead to an unsuccessful result!"
            );
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.meessage });
    }
  }
);

router.get(
  "/:GradeLevel/:Semester/:ClassName/:SubFolder/:SubSubFolder/:SubSubSubFolder",
  async (req, res) => {
    try {
      if (
        collegeGradeLevels.indexOf(req.params.GradeLevel) == -1 ||
        collegeSemesters.indexOf(req.params.Semester) == -1
      ) {
        res
          .status(404)
          .send(
            "Invalid college grade level or semester entered. Note: Improperly capitalized strings will lead to an unsuccessful result!"
          );
      } else {
        const dirPath = path.join(
          __dirname,
          "../../../../../College",
          req.params.GradeLevel,
          req.params.Semester,
          req.params.ClassName,
          req.params.SubFolder,
          req.params.SubSubFolder,
          req.params.SubSubSubFolder
        );
        const prevPath = path.join(dirPath, "../");

        let prevDirFolders = await fs.readdir(prevPath);
        prevDirFolders = prevDirFolders.filter((entry) => !entry.includes("."));

        if (prevDirFolders.indexOf(req.params.SubSubSubFolder) != -1) {
          let dirContents = await fs.readdir(dirPath);
          dirContents = dirContents.filter(
            (entry) =>
              !entry.endsWith(".ini") &&
              !entry.includes("Makefile") &&
              !entry.includes("main")
          );
          res.json(dirContents);
        } else {
          res
            .status(404)
            .send(
              "Invalid class name, subfolder, sub-subfolder, or sub-sub-subfolder name entered. Note: Improperly capitalized strings will lead to an unsuccessful result!"
            );
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.meessage });
    }
  }
);

router.get(
  "/:GradeLevel/:Semester/:ClassName/:SubFolder/:SubSubFolder/:SubSubSubFolder/:SubSubSubSubFolder",
  async (req, res) => {
    try {
      if (
        collegeGradeLevels.indexOf(req.params.GradeLevel) == -1 ||
        collegeSemesters.indexOf(req.params.Semester) == -1
      ) {
        res
          .status(404)
          .send(
            "Invalid college grade level or semester entered. Note: Improperly capitalized strings will lead to an unsuccessful result!"
          );
      } else {
        const dirPath = path.join(
          __dirname,
          "../../../../../College",
          req.params.GradeLevel,
          req.params.Semester,
          req.params.ClassName,
          req.params.SubFolder,
          req.params.SubSubFolder,
          req.params.SubSubSubFolder,
          req.params.SubSubSubSubFolder
        );
        const prevPath = path.join(dirPath, "../");

        let prevDirFolders = await fs.readdir(prevPath);
        prevDirFolders = prevDirFolders.filter((entry) => !entry.includes("."));

        if (prevDirFolders.indexOf(req.params.SubSubSubSubFolder) != -1) {
          let dirContents = await fs.readdir(dirPath);
          dirContents = dirContents.filter(
            (entry) =>
              !entry.endsWith(".ini") &&
              !entry.includes("Makefile") &&
              !entry.includes("main")
          );
          res.json(dirContents);
        } else {
          res
            .status(404)
            .send(
              "Invalid class name, subfolder, sub-subfolder, or sub-sub-sub-subfolder name entered. Note: Improperly capitalized strings will lead to an unsuccessful result!"
            );
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.meessage });
    }
  }
);

router.get(
  "/:GradeLevel/:Semester/:ClassName/:SubFolder/:SubSubFolder/:SubSubSubFolder/:SubSubSubSubFolder/:SubSubSubSubSubFolder",
  async (req, res) => {
    try {
      if (
        collegeGradeLevels.indexOf(req.params.GradeLevel) == -1 ||
        collegeSemesters.indexOf(req.params.Semester) == -1
      ) {
        res
          .status(404)
          .send(
            "Invalid college grade level or semester entered. Note: Improperly capitalized strings will lead to an unsuccessful result!"
          );
      } else {
        const dirPath = path.join(
          __dirname,
          "../../../../../College",
          req.params.GradeLevel,
          req.params.Semester,
          req.params.ClassName,
          req.params.SubFolder,
          req.params.SubSubFolder,
          req.params.SubSubSubFolder,
          req.params.SubSubSubSubFolder,
          req.params.SubSubSubSubSubFolder
        );
        const prevPath = path.join(dirPath, "../");

        let prevDirFolders = await fs.readdir(prevPath);
        prevDirFolders = prevDirFolders.filter((entry) => !entry.includes("."));

        if (prevDirFolders.indexOf(req.params.SubSubSubSubSubFolder) != -1) {
          let dirContents = await fs.readdir(dirPath);
          dirContents = dirContents.filter(
            (entry) =>
              !entry.endsWith(".ini") &&
              !entry.includes("Makefile") &&
              !entry.includes("main")
          );
          res.json(dirContents);
        } else {
          res
            .status(404)
            .send(
              "Invalid class name, subfolder, sub-subfolder, sub-sub-subfolder, sub-sub-sub-subfolder or sub-sub-sub-sub-subfolder name entered. Note: Improperly capitalized strings will lead to an unsuccessful result!"
            );
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.meessage });
    }
  }
);

module.exports = router;
