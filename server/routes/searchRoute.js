let express = require("express");
let router = express.Router();
// get the search controller
let search_controller = require("../controllers/searchController");
// set the route
router.get("/", search_controller.run);

module.exports = router;
