const Book = require('../models/book');

exports.getBooks = async (req,res,next) =>{
    try{
        const books = await Book.findAll();
        res.status(200).json({allBooks: books});
    }
    catch(err){
        res.status(500).json({
            error: err
        })
    }
};

exports.postAddBook = async (req,res,next) =>{
    try{
        const name = req.body.name;
        const takenOn = req.body.takenOn;
        const returnOn = req.body.returnOn;
        const data = await Book.create({
            name: name,
            takenOn: takenOn,
            returnOn: returnOn
        });
        res.status(201).json({newBookDetail: data});
    }
    catch(err){
        res.status(500).json({
            error: err
        })
    }
};

exports.deleteBook = async (req,res,next) => {
    try{
        const bId = req.params.id;
        await Book.destroy({where: {id: bId}});
        res.sendStatus(200);
    }
    catch(err){
        res.status(500).json({
            error: err
        })
    }
};