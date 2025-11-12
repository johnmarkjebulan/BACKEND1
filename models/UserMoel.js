import pool from '../config/db.js';
export const createUser = async (email, password) =>{
    if (email === ''){
        throw new Error('invalid email, paki ayos utoy ');
    }

 if(!validator.isEmail(email)){
    throw new Error('Andaming Problema Invalid Format');
    }

    const [user] = await pool.query(
        "SELECT * FROM tbl_user WHERE email = ?",
        [email]
    )

    if (user){
        throw new Error ('An account is already craeted with that email (gaya pa!)')
    }

    if(password === ''){
        throw new Error('Invalid password');

    }
    if(validator.isStrongPassword(password));
        throw new Error('Password too weak');
   }
    const salt = bcrypt.genSaltSync(10);
    const newPassword = bcrypt.hashSync(password, salt);

    conts [newUser] = await pool.query(
        "INSERT INTO tbl_user(email, password) VALUES (?,?)",
        [email, password]
    )

return  newUser.insertId;