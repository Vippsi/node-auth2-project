const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const { isValid } = require("../users/users-helpers");
const db = require("../users/users-model");
const constants = require("../config/constants");


router.post("/register", (req, res) => {
  const creds = req.body;

  if (isValid(creds)) {
    const rounds = process.env.BCRYPT_ROUNDS || 8;

    //hashing the password
    const hash = bcryptjs.hashSync(creds.password, rounds);
    creds.password = hash;

    db.add(creds)
      .then((user) => {
        res.status(201).json({ data: user });
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  } else {
    res.status(400).json({
      message: "please provide username and password",
    });
  }
});

router.post("/login", (req, res) => {
    const {username, password} = req.body

    if(isValid(req.body)) {
        db.findBy({username: username})
        .then(([user]) => {
          console.log(user)
            if(user && bcryptjs.compareSync(password, user.password)) {
                const token = signToken(user)
                res.status(200).json({message: `Welcome ${user.username}, Here is your token:`, token, user})
            } else {
                res.status(401).json({message: "Invalid credentials "})
            }
        }) .catch(err => {
            res.status(500).json({message: err.message})
        })
    }else {
        res.status(400).json({
          message:
            "please provide username and password",
        });
      }
})




// creates a token
function signToken(user) {
    const payload = {
      subject: user.id,
      username: user.username,
      department: user.department,
    };
    const secret = constants.jwtSecret;
     
    const options = {
      expiresIn: "1d",
    };
  
    return jwt.sign(payload, secret, options);
  }

  module.exports = router