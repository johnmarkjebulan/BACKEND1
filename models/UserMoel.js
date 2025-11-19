import pool from './db.js';
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// CREATE USER
export const createUser = async (email, password) => {

    if (!email || !validator.isEmail(email)) {
        throw new Error('Invalid Email');
    }

    if (!password) {
        throw new Error('Invalid Password');
    }

    if (!validator.isStrongPassword(password)) {
        throw new Error('Password too weak');
    }

    // Check if email already exists
    const [user] = await pool.query(
        'SELECT * FROM tbluser WHERE email = ?',
        [email]
    );

    if (user.length === 1) {
        throw new Error('An account is already created with that email');
    }

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Insert new user
    const [newUser] = await pool.query(
        'INSERT INTO tbluser (email, password) VALUES (?, ?)',
        [email, hashedPassword]
    );

    return newUser.insertId;
};



// GET USER BY ID
export const getUser = async (id) => {

    if (isNaN(parseInt(id))) {
        throw new Error('Invalid User ID');
    }

    // Correct query: select by ID (you used email before)
    const [user] = await pool.query(
        'SELECT * FROM tbluser WHERE id = ?',
        [id]
    );

    return user;
};



// LOGIN
export const login = async (email, password) => {

    if (!email || !password) {
        throw new Error('Email and password are required');
    }

    const [user] = await pool.query(
        'SELECT * FROM tbluser WHERE email = ?',
        [email]
    );

    if (user.length === 0) {
        throw new Error(`An account with email: ${email} does not exist`);
    }

    // Check password
    const validPass = bcrypt.compareSync(password, user[0].password);
    if (!validPass) {
        throw new Error('Incorrect password');
    }

    // Generate token
    const token = jwt.sign(
        { id: user[0].id },
        process.env.SECRET,
        { expiresIn: '1d' }
    );

    return { token, userId: user[0].id };
};