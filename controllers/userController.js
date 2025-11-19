import * as userModel from "../models/UserModel.js"



export const register = async (req, res) => {
    const{email, password} = req.body;

    try {
        const user = await userModel.createUser(email, password);
        res.status(201).json({success:true , message:user})
    }catch(err){
        console.log(err);
        res.status(400).json({success:false, message:err})
    }
}

export const login = async (req, res) => {
    const{email, password} = req.body;

    try {
        const token = await userModel.login(email, password);
        res.status(200).json({
            success:true,
            message:[
                {result: "Login successful"},
                token
            ]});

    }catch(err){
        console.log(err);
        res.status(400).json({success:false, message:err})
    }
}