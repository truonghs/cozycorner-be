const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).array("images");

module.exports = upload;
