import validator from "validator";
import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const createToken = (id) => {

    return jwt.sign({ id }, process.env.JWTSECRET)
}
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "user doesnt exists" })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = createToken(user._id);
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "invalid credentials" })
        }

    } catch (err) {
        console.log(err)
        return res.json({ success: false, message: "error in login login api" })

    }

}


const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(req.body)
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "user already exists" })
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "please enter valid email address" })
        }
        if (password.length < 5) {
            return res.json({ success: false, message: "please enter strong passsword" })

        }
        const salt = await bcrypt.genSalt(10);
        const hashedpasword = await bcrypt.hash(password, salt)
        const newUser = new userModel({
            name, email, password: hashedpasword
        })
        console.log(newUser)
        const user = await newUser.save();
        const token = createToken(user._id)
        res.json({ success: true, token })

    } catch (err) {
        console.log(err)
        return res.json({ success: false, message: 'error in register api' })

    }

}
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (email === process.env.ADMINEMAIL && password === process.env.ADMINPASSWORD) {
            const token = jwt.sign(email + password, process.env.JWTSECRET);
            res.json({ success: true, token })
            console.log(token)
        } else {
            res.json({ success: false, message: 'invalid credentials' })
        }

    } catch (err) {
        console.log(err)
        return res.json({ success: false, message: 'error in Admin login api' })


    }
}


export { loginUser, registerUser, adminLogin }