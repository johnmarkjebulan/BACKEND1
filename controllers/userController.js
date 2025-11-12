export const register = async (req, res)=> {
    const {email, password} = req.body;

    try{
    const user = await UserModel.createUser(email, password);
    res.status(201).json({succes: true, message: user});

    
}catch(Error){
    console.log(Error);
    res.status(400).json({success: false, message: ERROR})
    }

}