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

//remove periods and any character that cannot be used in a Windows file name
const sanitizeInput = (input) => {
  return input.replace(/[\/:\*\?"<>\|\.]/g, "");
};

router.get("/", async (req, res) => {
  try {
    //construct the directory path
    const dirPath = path.join(__dirname, "../../../../../college");

    //list the contents of the grade directory, filtering out certain files
    let dirContents = await fs.readdir(dirPath);
    dirContents = dirContents.filter(
      (entry) =>
        !entry.includes(".") &&
        !entry.includes("Makefile") &&
        !entry.includes("main")
    );

    //send the filtered contents of the grade directory
    res.json(dirContents);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/:GradeLevel", async (req, res) => {
  try {
    if (collegeGradeLevels.indexOf(req.params.GradeLevel) != -1) {
      //input sanitization is not needed since any parameters here that do not match the expected values will automatically lead to an error response
      //construct directory path
      const basePath = path.resolve(__dirname, "../../../../../College");
      const dirPath = path.join(basePath, req.params.GradeLevel);
      const resolvedDirPath = path.resolve(dirPath);

      //prevent path traversal by ensuring the resolved path is within the base path
      if (!resolvedDirPath.startsWith(basePath)) {
        return res.status(400).send("Invalid path.");
      }

      // Check if the directory exists
      const dirExists = await fs
        .stat(resolvedDirPath)
        .then((stat) => stat.isDirectory())
        .catch(() => false);
      if (!dirExists) {
        return res.status(404).send("Grade directory does not exist.");
      }

      //list the contents of the semester directory, filtering out certain files
      let dirContents = await fs.readdir(resolvedDirPath);
      dirContents = dirContents.filter(
        (entry) =>
          !entry.endsWith(".ini") &&
          !entry.includes("Makefile") &&
          !entry.includes("main")
      );

      //send the filtered contents of the class directory
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
    res.status(500).json({ error: error.message });
  }
});

router.get("/:GradeLevel/:Semester", async (req, res) => {
  try {
    if (
      collegeGradeLevels.indexOf(req.params.GradeLevel) != -1 &&
      collegeSemesters.indexOf(req.params.Semester) != -1
    ) {
      //input sanitization is not needed since any parameters here that do not match the expected values will automatically lead to an error response
      //construct directory path
      const basePath = path.resolve(__dirname, "../../../../../College");
      const dirPath = path.join(
        basePath,
        req.params.GradeLevel,
        req.params.Semester
      );
      const resolvedDirPath = path.resolve(dirPath);

      //prevent path traversal by ensuring the resolved path is within the base path
      if (!resolvedDirPath.startsWith(basePath)) {
        return res.status(400).send("Invalid path.");
      }

      // Check if the directory exists
      const dirExists = await fs
        .stat(resolvedDirPath)
        .then((stat) => stat.isDirectory())
        .catch(() => false);
      if (!dirExists) {
        return res.status(404).send("Semester directory does not exist.");
      }

      //list the contents of the class directory, filtering out certain files
      let dirContents = await fs.readdir(resolvedDirPath);
      dirContents = dirContents.filter(
        (entry) =>
          !entry.endsWith(".ini") &&
          !entry.includes("Makefile") &&
          !entry.includes("main")
      );

      //send the filtered contents of the class directory
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
    res.status(500).json({ error: error.message });
  }
});

router.get("/:GradeLevel/:Semester/:ClassName", async (req, res) => {
  try {
    //validate grade level and semester
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
      //sanitize class name
      const sanitizedClassName = sanitizeInput(req.params.ClassName);

      //construct path securely
      const basePath = path.resolve(__dirname, "../../../../../College");
      const dirPath = path.join(
        basePath,
        req.params.GradeLevel,
        req.params.Semester,
        sanitizedClassName
      );
      const resolvedDirPath = path.resolve(dirPath);

      //prevent path traversal by ensuring the resolved path is within the base path
      if (!resolvedDirPath.startsWith(basePath)) {
        return res.status(400).send("Invalid path.");
      }

      // Check if the directory exists
      const classDirExists = await fs
        .stat(resolvedDirPath)
        .then((stat) => stat.isDirectory())
        .catch(() => false);
      if (!classDirExists) {
        return res.status(404).send("Class directory does not exist.");
      }

      //list the contents of the class directory, filtering out certain files
      let dirContents = await fs.readdir(resolvedDirPath);
      dirContents = dirContents.filter(
        (entry) =>
          !entry.endsWith(".ini") &&
          !entry.includes("Makefile") &&
          !entry.includes("main")
      );

      //send the filtered contents of the class directory
      res.json(dirContents);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
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
      //sanitize inputs
      const sanitizedClassName = sanitizeInput(req.params.ClassName);
      const sanitizedSubFolder = sanitizeInput(req.params.SubFolder);

      // Construct the path securely
      const basePath = path.resolve(__dirname, "../../../../../College");
      const dirPath = path.join(
        basePath,
        req.params.GradeLevel,
        req.params.Semester,
        sanitizedClassName,
        sanitizedSubFolder
      );
      const resolvedDirPath = path.resolve(dirPath);

      // Prevent path traversal by ensuring the resolved path is within the base path
      if (!resolvedDirPath.startsWith(basePath)) {
        return res.status(400).send("Invalid path.");
      }

      // Check if the parent directory exists
      const prevPath = path.resolve(path.join(resolvedDirPath, "../"));
      const parentDirExists = await fs
        .stat(prevPath)
        .then((stat) => stat.isDirectory())
        .catch(() => false);
      if (!parentDirExists) {
        return res
          .status(404)
          .send("Invalid class name or parent directory does not exist.");
      }

      // Check if the subfolder exists in the parent directory
      const prevDirFolders = await fs
        .readdir(prevPath)
        .then((folders) => folders.filter((entry) => !entry.includes(".")))
        .catch(() => []);
      if (!prevDirFolders.includes(sanitizedSubFolder)) {
        return res.status(404).send("Invalid subfolder name entered.");
      }

      // List the contents of the subfolder, filtering out certain files
      let dirContents = await fs.readdir(resolvedDirPath);
      dirContents = dirContents.filter(
        (entry) =>
          !entry.endsWith(".ini") &&
          !entry.includes("Makefile") &&
          !entry.includes("main")
      );

      //send the filtered contents of the subfolder directory
      res.json(dirContents);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
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
        //sanitize inputs
        const sanitizedClassName = sanitizeInput(req.params.ClassName);
        const sanitizedSubFolder = sanitizeInput(req.params.SubFolder);
        const sanitizedSubSubFolder = sanitizeInput(req.params.SubSubFolder);

        // Construct the path securely
        const basePath = path.resolve(__dirname, "../../../../../College");
        const dirPath = path.join(
          basePath,
          req.params.GradeLevel,
          req.params.Semester,
          sanitizedClassName,
          sanitizedSubFolder,
          sanitizedSubSubFolder
        );
        const resolvedDirPath = path.resolve(dirPath);

        // Prevent path traversal by ensuring the resolved path is within the base path
        if (!resolvedDirPath.startsWith(basePath)) {
          return res.status(400).send("Invalid path.");
        }

        // Check if the parent directory exists
        const prevPath = path.resolve(path.join(resolvedDirPath, "../"));
        const parentDirExists = await fs
          .stat(prevPath)
          .then((stat) => stat.isDirectory())
          .catch(() => false);
        if (!parentDirExists) {
          return res
            .status(404)
            .send("Invalid class name or parent directory does not exist.");
        }

        // Check if the subfolder exists in the parent directory
        const prevDirFolders = await fs
          .readdir(prevPath)
          .then((folders) => folders.filter((entry) => !entry.includes(".")))
          .catch(() => []);
        if (!prevDirFolders.includes(sanitizedSubSubFolder)) {
          return res.status(404).send("Invalid subsubfolder name entered.");
        }

        // List the contents of the subfolder, filtering out certain files
        let dirContents = await fs.readdir(resolvedDirPath);
        dirContents = dirContents.filter(
          (entry) =>
            !entry.endsWith(".ini") &&
            !entry.includes("Makefile") &&
            !entry.includes("main")
        );

        //send the filtered contents of the subfolder directory
        res.json(dirContents);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
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
        //sanitize inputs
        const sanitizedClassName = sanitizeInput(req.params.ClassName);
        const sanitizedSubFolder = sanitizeInput(req.params.SubFolder);
        const sanitizedSubSubFolder = sanitizeInput(req.params.SubSubFolder);
        const sanitizedSubSubSubFolder = sanitizeInput(
          req.params.SubSubSubFolder
        );

        // Construct the path securely
        const basePath = path.resolve(__dirname, "../../../../../College");
        const dirPath = path.join(
          basePath,
          req.params.GradeLevel,
          req.params.Semester,
          sanitizedClassName,
          sanitizedSubFolder,
          sanitizedSubSubFolder,
          sanitizedSubSubSubFolder
        );
        const resolvedDirPath = path.resolve(dirPath);

        // Prevent path traversal by ensuring the resolved path is within the base path
        if (!resolvedDirPath.startsWith(basePath)) {
          return res.status(400).send("Invalid path.");
        }

        // Check if the parent directory exists
        const prevPath = path.resolve(path.join(resolvedDirPath, "../"));
        const parentDirExists = await fs
          .stat(prevPath)
          .then((stat) => stat.isDirectory())
          .catch(() => false);
        if (!parentDirExists) {
          return res.status(404).send("Parent directory does not exist.");
        }

        // Check if the subfolder exists in the parent directory
        const prevDirFolders = await fs
          .readdir(prevPath)
          .then((folders) => folders.filter((entry) => !entry.includes(".")))
          .catch(() => []);
        if (!prevDirFolders.includes(sanitizedSubSubSubFolder)) {
          return res.status(404).send("Invalid subsubfolder name entered.");
        }

        // List the contents of the subfolder, filtering out certain files
        let dirContents = await fs.readdir(resolvedDirPath);
        dirContents = dirContents.filter(
          (entry) =>
            !entry.endsWith(".ini") &&
            !entry.includes("Makefile") &&
            !entry.includes("main")
        );

        //send the filtered contents of the subfolder directory
        res.json(dirContents);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
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
        //sanitize inputs
        const sanitizedClassName = sanitizeInput(req.params.ClassName);
        const sanitizedSubFolder = sanitizeInput(req.params.SubFolder);
        const sanitizedSubSubFolder = sanitizeInput(req.params.SubSubFolder);
        const sanitizedSubSubSubFolder = sanitizeInput(
          req.params.SubSubSubFolder
        );
        const sanitizedSubSubSubSubFolder = sanitizeInput(
          req.params.SubSubSubSubFolder
        );

        // Construct the path securely
        const basePath = path.resolve(__dirname, "../../../../../College");
        const dirPath = path.join(
          basePath,
          req.params.GradeLevel,
          req.params.Semester,
          sanitizedClassName,
          sanitizedSubFolder,
          sanitizedSubSubFolder,
          sanitizedSubSubSubFolder,
          sanitizedSubSubSubSubFolder
        );
        const resolvedDirPath = path.resolve(dirPath);

        // Prevent path traversal by ensuring the resolved path is within the base path
        if (!resolvedDirPath.startsWith(basePath)) {
          return res.status(400).send("Invalid path.");
        }

        // Check if the parent directory exists
        const prevPath = path.resolve(path.join(resolvedDirPath, "../"));
        const parentDirExists = await fs
          .stat(prevPath)
          .then((stat) => stat.isDirectory())
          .catch(() => false);
        if (!parentDirExists) {
          return res.status(404).send("Parent directory does not exist.");
        }

        // Check if the subfolder exists in the parent directory
        const prevDirFolders = await fs
          .readdir(prevPath)
          .then((folders) => folders.filter((entry) => !entry.includes(".")))
          .catch(() => []);
        if (!prevDirFolders.includes(sanitizedSubSubSubSubFolder)) {
          return res.status(404).send("Invalid subsubfolder name entered.");
        }

        // List the contents of the subfolder, filtering out certain files
        let dirContents = await fs.readdir(resolvedDirPath);
        dirContents = dirContents.filter(
          (entry) =>
            !entry.endsWith(".ini") &&
            !entry.includes("Makefile") &&
            !entry.includes("main")
        );

        //send the filtered contents of the subfolder directory
        res.json(dirContents);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
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
        //sanitize inputs
        const sanitizedClassName = sanitizeInput(req.params.ClassName);
        const sanitizedSubFolder = sanitizeInput(req.params.SubFolder);
        const sanitizedSubSubFolder = sanitizeInput(req.params.SubSubFolder);
        const sanitizedSubSubSubFolder = sanitizeInput(
          req.params.SubSubSubFolder
        );
        const sanitizedSubSubSubSubFolder = sanitizeInput(
          req.params.SubSubSubSubFolder
        );
        const sanitizedSubSubSubSubSubFolder = sanitizeInput(
          req.params.SubSubSubSubSubFolder
        );

        // Construct the path securely
        const basePath = path.resolve(__dirname, "../../../../../College");
        const dirPath = path.join(
          basePath,
          req.params.GradeLevel,
          req.params.Semester,
          sanitizedClassName,
          sanitizedSubFolder,
          sanitizedSubSubFolder,
          sanitizedSubSubSubFolder,
          sanitizedSubSubSubSubFolder,
          sanitizedSubSubSubSubSubFolder
        );
        const resolvedDirPath = path.resolve(dirPath);

        // Prevent path traversal by ensuring the resolved path is within the base path
        if (!resolvedDirPath.startsWith(basePath)) {
          return res.status(400).send("Invalid path.");
        }

        // Check if the parent directory exists
        const prevPath = path.resolve(path.join(resolvedDirPath, "../"));
        const parentDirExists = await fs
          .stat(prevPath)
          .then((stat) => stat.isDirectory())
          .catch(() => false);
        if (!parentDirExists) {
          return res.status(404).send("Parent directory does not exist.");
        }

        // Check if the subfolder exists in the parent directory
        const prevDirFolders = await fs
          .readdir(prevPath)
          .then((folders) => folders.filter((entry) => !entry.includes(".")))
          .catch(() => []);
        if (!prevDirFolders.includes(sanitizedSubSubSubSubSubFolder)) {
          return res.status(404).send("Invalid subsubfolder name entered.");
        }

        // List the contents of the subfolder, filtering out certain files
        let dirContents = await fs.readdir(resolvedDirPath);
        dirContents = dirContents.filter(
          (entry) =>
            !entry.endsWith(".ini") &&
            !entry.includes("Makefile") &&
            !entry.includes("main")
        );

        //send the filtered contents of the subfolder directory
        res.json(dirContents);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
);

router.get(
  "/:GradeLevel/:Semester/:ClassName/:SubFolder/:SubSubFolder/:SubSubSubFolder/:SubSubSubSubFolder/:SubSubSubSubSubFolder/:SubSubSubSubSubSubFolder",
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
        //sanitize inputs
        const sanitizedClassName = sanitizeInput(req.params.ClassName);
        const sanitizedSubFolder = sanitizeInput(req.params.SubFolder);
        const sanitizedSubSubFolder = sanitizeInput(req.params.SubSubFolder);
        const sanitizedSubSubSubFolder = sanitizeInput(
          req.params.SubSubSubFolder
        );
        const sanitizedSubSubSubSubFolder = sanitizeInput(
          req.params.SubSubSubSubFolder
        );
        const sanitizedSubSubSubSubSubFolder = sanitizeInput(
          req.params.SubSubSubSubSubFolder
        );
        const sanitizedSubSubSubSubSubSubFolder = sanitizeInput(
          req.params.SubSubSubSubSubSubFolder
        );

        // Construct the path securely
        const basePath = path.resolve(__dirname, "../../../../../College");
        const dirPath = path.join(
          basePath,
          req.params.GradeLevel,
          req.params.Semester,
          sanitizedClassName,
          sanitizedSubFolder,
          sanitizedSubSubFolder,
          sanitizedSubSubSubFolder,
          sanitizedSubSubSubSubFolder,
          sanitizedSubSubSubSubSubFolder,
          sanitizedSubSubSubSubSubSubFolder
        );
        const resolvedDirPath = path.resolve(dirPath);

        // Prevent path traversal by ensuring the resolved path is within the base path
        if (!resolvedDirPath.startsWith(basePath)) {
          return res.status(400).send("Invalid path.");
        }

        // Check if the parent directory exists
        const prevPath = path.resolve(path.join(resolvedDirPath, "../"));
        const parentDirExists = await fs
          .stat(prevPath)
          .then((stat) => stat.isDirectory())
          .catch(() => false);
        if (!parentDirExists) {
          return res.status(404).send("Parent directory does not exist.");
        }

        // Check if the subfolder exists in the parent directory
        const prevDirFolders = await fs
          .readdir(prevPath)
          .then((folders) => folders.filter((entry) => !entry.includes(".")))
          .catch(() => []);
        if (!prevDirFolders.includes(sanitizedSubSubSubSubSubSubFolder)) {
          return res.status(404).send("Invalid subsubfolder name entered.");
        }

        // List the contents of the subfolder, filtering out certain files
        let dirContents = await fs.readdir(resolvedDirPath);
        dirContents = dirContents.filter(
          (entry) =>
            !entry.endsWith(".ini") &&
            !entry.includes("Makefile") &&
            !entry.includes("main")
        );

        //send the filtered contents of the subfolder directory
        res.json(dirContents);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
);

router.get(
  "/:GradeLevel/:Semester/:ClassName/:SubFolder/:SubSubFolder/:SubSubSubFolder/:SubSubSubSubFolder/:SubSubSubSubSubFolder/:SubSubSubSubSubSubFolder/:SubSubSubSubSubSubSubFolder",
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
        //sanitize inputs
        const sanitizedClassName = sanitizeInput(req.params.ClassName);
        const sanitizedSubFolder = sanitizeInput(req.params.SubFolder);
        const sanitizedSubSubFolder = sanitizeInput(req.params.SubSubFolder);
        const sanitizedSubSubSubFolder = sanitizeInput(
          req.params.SubSubSubFolder
        );
        const sanitizedSubSubSubSubFolder = sanitizeInput(
          req.params.SubSubSubSubFolder
        );
        const sanitizedSubSubSubSubSubFolder = sanitizeInput(
          req.params.SubSubSubSubSubFolder
        );
        const sanitizedSubSubSubSubSubSubFolder = sanitizeInput(
          req.params.SubSubSubSubSubSubFolder
        );
        const sanitizedSubSubSubSubSubSubSubFolder = sanitizeInput(
          req.params.SubSubSubSubSubSubSubFolder
        );

        // Construct the path securely
        const basePath = path.resolve(__dirname, "../../../../../College");
        const dirPath = path.join(
          basePath,
          req.params.GradeLevel,
          req.params.Semester,
          sanitizedClassName,
          sanitizedSubFolder,
          sanitizedSubSubFolder,
          sanitizedSubSubSubFolder,
          sanitizedSubSubSubSubFolder,
          sanitizedSubSubSubSubSubFolder,
          sanitizedSubSubSubSubSubSubFolder,
          sanitizedSubSubSubSubSubSubSubFolder
        );
        const resolvedDirPath = path.resolve(dirPath);

        // Prevent path traversal by ensuring the resolved path is within the base path
        if (!resolvedDirPath.startsWith(basePath)) {
          return res.status(400).send("Invalid path.");
        }

        // Check if the parent directory exists
        const prevPath = path.resolve(path.join(resolvedDirPath, "../"));
        const parentDirExists = await fs
          .stat(prevPath)
          .then((stat) => stat.isDirectory())
          .catch(() => false);
        if (!parentDirExists) {
          return res.status(404).send("Parent directory does not exist.");
        }

        // Check if the subfolder exists in the parent directory
        const prevDirFolders = await fs
          .readdir(prevPath)
          .then((folders) => folders.filter((entry) => !entry.includes(".")))
          .catch(() => []);
        if (!prevDirFolders.includes(sanitizedSubSubSubSubSubSubSubFolder)) {
          return res.status(404).send("Invalid subsubfolder name entered.");
        }

        // List the contents of the subfolder, filtering out certain files
        let dirContents = await fs.readdir(resolvedDirPath);
        dirContents = dirContents.filter(
          (entry) =>
            !entry.endsWith(".ini") &&
            !entry.includes("Makefile") &&
            !entry.includes("main")
        );

        //send the filtered contents of the subfolder directory
        res.json(dirContents);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;
