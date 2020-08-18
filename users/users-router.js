const router = require("express").Router();
const restriction = require("../auth/restricted-middleware");
const db = require("./users-model");

router.get("/", restriction, checkDepartment([ "Dev", "Sales"]), (req, res) => {
  db.findByDepartment({department: req.decodedToken.department})
    .then((users) => {
      res.status(200).json({ data: users });
    })
    .catch((err) => {
      res.status(500).end();
    });
});


function checkDepartment(departments) {
  return function (req, res, next) {
    console.log(req.decodedToken.department)
    if (departments.includes(req.decodedToken.department)) {
      next();
    } else {
      res.status(403).json({ you: "can't touch this!" });
    }
  };
}
module.exports = router;
