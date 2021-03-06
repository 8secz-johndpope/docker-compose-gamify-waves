const router = require("express").Router();
const { verify } = require("../middleware/tokenChecker");
const { checkAccessControl } = require("../middleware/accessControlChecker");
const { check } = require("express-validator");

const {
  getAllPeType,
  postPeType,
  putPeType
} = require("../controller/pooleventTypeController");

router
  .route("/")
  .get(getAllPeType)
  .post(
    verify,
    checkAccessControl("createAny", "event_type"),
    check("name")
      .not()
      .isEmpty()
      .isString(),
    postPeType
  );

router
  .route("/:id")
  .put(verify, checkAccessControl("updateAny", "event_type"), putPeType);

module.exports = router;
