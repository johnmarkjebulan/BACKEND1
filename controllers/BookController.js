import * as BookModel from "../models/BookModel.js";

export const fetchBooks = async (req, res) =>{
    try{
        const books = await BookModel.getBooks();
        res.status(200).json(books);
    }catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}
export const createBook = async (req, res) => {
  const { name, genre, status } = req.body;
  try {
    const id = await insertBook(name, genre, status);
    res.json({ id });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to create book' });
  }
};

export const editBook = async (req, res) => {
    const { title, genre, status } = req.body;
    const { id } = req.params;

    try {
        const updatedId = await BookModel.updateBook(id, title, genre, status);
        res.status(200).json({ success: true, message:updatedId });
    } catch (e) {
        console.log(e);
        res.status(500).json({success: false, message: 'Internal Server Error'});

    }
};


export const deleteBook = async (req, res) => {
  const { d } = req.params;

    try {
        const deletedId = await BookModel.deleteeBook(id);
        res.status(200).json({ success: true, deletedId });
    } catch (e) {
        console.log(e);
        res.status(500).json({success: false, message: 'Internal Server Error'});
    }   
};
