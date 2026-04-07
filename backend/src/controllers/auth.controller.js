  import User from "../models/user.models.js";
  import generateToken from "../utils/generateToken.js";

  export const registerUser = async( req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({email});
         
        if(userExists){
            return res.status(400).json({
                message:"User already exists",
                success:false
            })
        }

        const user = await User.create({
            name,
            email,
            password
        });

        res.status(201).json({
            message:"User registered successfully",
            success:true,
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            }
        });
    } catch (error) {
        res.status(500).json({
            message:error.message,
            success:false
        })
    }
  }

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body ;

        const user = await User.findOne({email});

        if(user && (await user.comparePassword(password))){
            res.status(200).json({
                success:true,
                message: "User Logged in Successfully!",
                user:{
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    token: generateToken(user._id),
                }
            })
        }else{
            res.status(401).json({
                message:"Invalid Email or Password",
                success:false
            })
        }
        
    } catch (error) {
        res.status(500).json({
            message:error.message,
            success:false
        })
        
    }
}
