import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import { generateToken } from '../middleware.js';

const userRouter = express.Router();

userRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const user = await User.find({});
    res.send(users);
  })
);

userRouter.post('/register', expressAsyncHandler(async (req, res) => {
    const user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      emailaddress: req.body.emailaddress,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    const createdUser = await user.save();
    res.send({
      _id: createdUser._id,
      firstname: createdUser.firstname,
      lastname: createdUser.lastname,
      username: createdUser.username,
      emailaddress: createdUser.emailaddress,
      token: generateToken(createdUser),
    });
  })
);

userRouter.post('/login', expressAsyncHandler(async (req, res) => {
      const user = await User.findOne({ emailaddress: req.body.emailaddress });
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          res.send({
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            emailaddress: user.emailaddress,
            token: generateToken(user),
          });
          return;
        }
      }
      res.status(401).send({ message: 'Invalid email or password' });
    })
)

export default userRouter;
