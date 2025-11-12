import pool from './db.js';

export const getBooks = async () => {
  const [rows] = await pool.query("SELECT * FROM tbl_book");
  return rows;
};

export const insertBook = async (name, genre, status) => {
  const [result] = await pool.query(
    'INSERT INTO tblbook (name, genre, status) VALUES (?, ?, ?)',
    [name, genre, status]
  );
  return result.insertId;
};

export const updateBook = async (name, genre, status) => {
    const [result] = await pool.query(
        "UPDATE tblbook SET name= ?, genre= ?, status= ? WHERE id= ?",
        [title, genre, status, bookId]
    );
    return result.affectedRows;
}

export const deleteBook = async (id) => {
    const [result] = await pool.query(
        'DELETE FROM tblbook WHERE id = ?',
        [id]
    );
    return result.affectedRows;
};