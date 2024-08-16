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

//remove any character that cannot be used in a Windows file name
const sanitizeInput = (input) => {
  return input.replace(/[\/:\*\?"<>\|]/g, "");
};

router.get("/:GradeLevel/:Semester/:ClassName/:Resource", async (req, res) => {
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
      const sanitizedResource = sanitizeInput(req.params.Resource);

      //construct the path securely
      const basePath = path.resolve(__dirname, "../../../../../College");
      const dirPath = path.join(
        basePath,
        req.params.GradeLevel,
        req.params.Semester,
        sanitizedClassName
      );
      const resolvedDirPath = path.resolve(dirPath);

      // Prevent path traversal by ensuring the resolved path is within the base path
      if (!resolvedDirPath.startsWith(basePath)) {
        return res.status(400).send("Invalid path.");
      }

      // Check if the directory exists
      const dirExists = await fs
        .stat(resolvedDirPath)
        .then((stat) => stat.isDirectory())
        .catch(() => false);
      if (!dirExists) {
        return res.status(404).send("Directory does not exist.");
      }

      // Check if the resource exists in the directory
      const resourcePath = path.join(resolvedDirPath, sanitizedResource);
      const resolvedResourcePath = path.resolve(resourcePath);
      if (!resolvedResourcePath.startsWith(resolvedDirPath)) {
        return res.status(400).send("Invalid resource path.");
      }

      const resourceExists = await fs
        .stat(resolvedResourcePath)
        .then((stat) => stat.isFile())
        .catch(() => false);
      if (!resourceExists) {
        return res.status(404).send("Resource not found.");
      }

      // Send the file
      res.sendFile(resolvedResourcePath);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.get(
  "/:GradeLevel/:Semester/:ClassName/:SubFolder/:Resource",
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
        const sanitizedResource = sanitizeInput(req.params.Resource);

        //construct the path securely
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

        // Check if the directory exists
        const dirExists = await fs
          .stat(resolvedDirPath)
          .then((stat) => stat.isDirectory())
          .catch(() => false);
        if (!dirExists) {
          return res.status(404).send("Directory does not exist.");
        }

        // Check if the resource exists in the directory
        const resourcePath = path.join(resolvedDirPath, sanitizedResource);
        const resolvedResourcePath = path.resolve(resourcePath);
        if (!resolvedResourcePath.startsWith(resolvedDirPath)) {
          return res.status(400).send("Invalid resource path.");
        }
        const resourceExists = await fs
          .stat(resolvedResourcePath)
          .then((stat) => stat.isFile())
          .catch(() => false);
        if (!resourceExists) {
          return res.status(404).send("Resource not found.");
        }

        // Send the file
        res.sendFile(resolvedResourcePath);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
);

router.get(
  "/:GradeLevel/:Semester/:ClassName/:SubFolder/:SubSubFolder/:Resource",
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
        const sanitizedResource = sanitizeInput(req.params.Resource);

        //construct the path securely
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

        // Check if the directory exists
        const dirExists = await fs
          .stat(resolvedDirPath)
          .then((stat) => stat.isDirectory())
          .catch(() => false);
        if (!dirExists) {
          return res.status(404).send("Directory does not exist.");
        }

        // Check if the resource exists in the directory
        const resourcePath = path.join(resolvedDirPath, sanitizedResource);
        const resolvedResourcePath = path.resolve(resourcePath);
        if (!resolvedResourcePath.startsWith(resolvedDirPath)) {
          return res.status(400).send("Invalid resource path.");
        }
        const resourceExists = await fs
          .stat(resolvedResourcePath)
          .then((stat) => stat.isFile())
          .catch(() => false);
        if (!resourceExists) {
          return res.status(404).send("Resource not found.");
        }

        // Send the file
        res.sendFile(resolvedResourcePath);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
);

router.get(
  "/:GradeLevel/:Semester/:ClassName/:SubFolder/:SubSubFolder/:SubSubSubFolder/:Resource",
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
        const sanitizedResource = sanitizeInput(req.params.Resource);

        //construct the path securely
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

        // Check if the directory exists
        const dirExists = await fs
          .stat(resolvedDirPath)
          .then((stat) => stat.isDirectory())
          .catch(() => false);
        if (!dirExists) {
          return res.status(404).send("Directory does not exist.");
        }

        // Check if the resource exists in the directory
        const resourcePath = path.join(resolvedDirPath, sanitizedResource);
        const resolvedResourcePath = path.resolve(resourcePath);
        if (!resolvedResourcePath.startsWith(resolvedDirPath)) {
          return res.status(400).send("Invalid resource path.");
        }
        const resourceExists = await fs
          .stat(resolvedResourcePath)
          .then((stat) => stat.isFile())
          .catch(() => false);
        if (!resourceExists) {
          return res.status(404).send("Resource not found.");
        }

        // Send the file
        res.sendFile(resolvedResourcePath);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
);

router.get(
  "/:GradeLevel/:Semester/:ClassName/:SubFolder/:SubSubFolder/:SubSubSubFolder/:SubSubSubSubFolder/:Resource",
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
        const sanitizedResource = sanitizeInput(req.params.Resource);

        //construct the path securely
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

        // Check if the directory exists
        const dirExists = await fs
          .stat(resolvedDirPath)
          .then((stat) => stat.isDirectory())
          .catch(() => false);
        if (!dirExists) {
          return res.status(404).send("Directory does not exist.");
        }

        // Check if the resource exists in the directory
        const resourcePath = path.join(resolvedDirPath, sanitizedResource);
        const resolvedResourcePath = path.resolve(resourcePath);
        if (!resolvedResourcePath.startsWith(resolvedDirPath)) {
          return res.status(400).send("Invalid resource path.");
        }
        const resourceExists = await fs
          .stat(resolvedResourcePath)
          .then((stat) => stat.isFile())
          .catch(() => false);
        if (!resourceExists) {
          return res.status(404).send("Resource not found.");
        }

        // Send the file
        res.sendFile(resolvedResourcePath);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
);

router.get(
  "/:GradeLevel/:Semester/:ClassName/:SubFolder/:SubSubFolder/:SubSubSubFolder/:SubSubSubSubFolder/:SubSubSubSubSubFolder/:Resource",
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
        const sanitizedResource = sanitizeInput(req.params.Resource);

        //construct the path securely
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

        // Check if the directory exists
        const dirExists = await fs
          .stat(resolvedDirPath)
          .then((stat) => stat.isDirectory())
          .catch(() => false);
        if (!dirExists) {
          return res.status(404).send("Directory does not exist.");
        }

        // Check if the resource exists in the directory
        const resourcePath = path.join(resolvedDirPath, sanitizedResource);
        const resolvedResourcePath = path.resolve(resourcePath);
        if (!resolvedResourcePath.startsWith(resolvedDirPath)) {
          return res.status(400).send("Invalid resource path.");
        }
        const resourceExists = await fs
          .stat(resolvedResourcePath)
          .then((stat) => stat.isFile())
          .catch(() => false);
        if (!resourceExists) {
          return res.status(404).send("Resource not found.");
        }

        // Send the file
        res.sendFile(resolvedResourcePath);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
);

router.get(
  "/:GradeLevel/:Semester/:ClassName/:SubFolder/:SubSubFolder/:SubSubSubFolder/:SubSubSubSubFolder/:SubSubSubSubSubFolder/:SubSubSubSubSubSubFolder/:Resource",
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
        const sanitizedResource = sanitizeInput(req.params.Resource);

        //construct the path securely
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

        // Check if the directory exists
        const dirExists = await fs
          .stat(resolvedDirPath)
          .then((stat) => stat.isDirectory())
          .catch(() => false);
        if (!dirExists) {
          return res.status(404).send("Directory does not exist.");
        }

        // Check if the resource exists in the directory
        const resourcePath = path.join(resolvedDirPath, sanitizedResource);
        const resolvedResourcePath = path.resolve(resourcePath);
        if (!resolvedResourcePath.startsWith(resolvedDirPath)) {
          return res.status(400).send("Invalid resource path.");
        }
        const resourceExists = await fs
          .stat(resolvedResourcePath)
          .then((stat) => stat.isFile())
          .catch(() => false);
        if (!resourceExists) {
          return res.status(404).send("Resource not found.");
        }

        // Send the file
        res.sendFile(resolvedResourcePath);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
);

router.get(
  "/:GradeLevel/:Semester/:ClassName/:SubFolder/:SubSubFolder/:SubSubSubFolder/:SubSubSubSubFolder/:SubSubSubSubSubFolder/:SubSubSubSubSubSubFolder/:SubSubSubSubSubSubSubFolder/:Resource",
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
        const sanitizedResource = sanitizeInput(req.params.Resource);

        //construct the path securely
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

        // Check if the directory exists
        const dirExists = await fs
          .stat(resolvedDirPath)
          .then((stat) => stat.isDirectory())
          .catch(() => false);
        if (!dirExists) {
          return res.status(404).send("Directory does not exist.");
        }

        // Check if the resource exists in the directory
        const resourcePath = path.join(resolvedDirPath, sanitizedResource);
        const resolvedResourcePath = path.resolve(resourcePath);
        if (!resolvedResourcePath.startsWith(resolvedDirPath)) {
          return res.status(400).send("Invalid resource path.");
        }
        const resourceExists = await fs
          .stat(resolvedResourcePath)
          .then((stat) => stat.isFile())
          .catch(() => false);
        if (!resourceExists) {
          return res.status(404).send("Resource not found.");
        }

        // Send the file
        res.sendFile(resolvedResourcePath);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;
