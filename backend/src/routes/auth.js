const { Router } = require("express");
const { getUsers, register, login, protected, logout } = require("../controllers/auth");
const { registerValidation, loginValidation } = require("../validators/auth");
const { validationMiddleware } = require("../middlewares/validations-middleware");
const { userAuth } = require("../middlewares/passport-middleware");
const router = Router();

const collegeDirAccess = require('./college-router/dir-access-router');
const collegeFileAccess = require('./college-router/file-download-router');

router.post("/register", registerValidation, validationMiddleware, register);
router.post("/login", loginValidation, validationMiddleware, login);
router.post("/logout", logout);

router.use("/dirAccess/college", userAuth, collegeDirAccess);
router.use("/fileAccess/college", userAuth, collegeFileAccess);

module.exports = router;
