const router = require("express").Router();
const { verify } = require("../middleware/tokenChecker");
const { checkAccessControl } = require("../middleware/accessControlChecker");

const {
  deleteFavorite,
  getFavoriteByUserId,
  postFavorite,
  getMostFavedPoolevents
} = require("../controller/favoritesController");

router
  .route("/:userId")
  .get(verify, checkAccessControl("readOwn", "favorite"), getFavoriteByUserId); //private

router
  .route("/:id")
  .delete(verify, checkAccessControl("deleteOwn", "favorite"), deleteFavorite); //private

router.route("/").post(verify, postFavorite); //private

router.route("/most/me").get(getMostFavedPoolevents); //private

module.exports = router;
