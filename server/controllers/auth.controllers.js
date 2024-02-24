const { db } = require('../models/db.model')
const  { format } = require("date-fns");
const bcrypt = require('bcryptjs');
const jwt = require  ('jsonwebtoken');
require('dotenv').config();


const register = (req, res) => {
  const { first_name,username,last_name,email,role_id,sex,employement_date,password,isUserActive,createdAt,changepassword_date} = req.body
  //CHECK EXISTING USER
  const q = "SELECT * FROM users WHERE username = ? OR email = ?";

  db.query(q, [username, email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");

    //hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedpassword = bcrypt.hashSync(password, salt);
    // console.log(hashedpassword)
    let datetime = format(new Date(), "yyyy-MM-dd:HH:mm:ss");
    const q = "INSERT INTO users(`first_name`,`username`,`last_name`,`email`,`role_id`,`sex`,`employement_date`,`password`,`isUserActive`,`createdAt`,`changepassword_date`) VALUES (?)";
    const values = [first_name, username, last_name, email, role_id, sex, employement_date,  hashedpassword , isUserActive, datetime, changepassword_date];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json('user created');
    });
  });
};




const sigin = async(req, res) => {
  const {username, password} = req.body
  const q = "SELECT * FROM users WHERE username = ? OR password = ?";
   db.query(q,[username, password], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");;
     
    const comparison = bcrypt.compareSync(password, data[0].password)
    if (!comparison)
    return res.status(400).json("Wrong username or password!");
    db.query(q, [username, comparison], (err, data) => {
      if (err){
        return res.status(500).json("wrong username or password");
      } else {
        const token = jwt.sign({id: data[0].users_id}, process.env.JWT_SECRET);
        const expiryDate = new Date(Date.now() + 3600000); // 1 hour
        res
          .cookie('access_token', token, {
            httpOnly: true,
            expires: expiryDate,
          })
          .status(200)
          .json("user login successfully");
      }
    })
   })
}

 const signout = (req, res) => {
      res.clearCookie('access_token').status(200).json('Signout success!');
    }
module.exports= { register, sigin, signout } 