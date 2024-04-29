const ReturnedBook = require('../models/returnedBook');

exports.getReturnedBooks = async (req,res,next) => {
    try{
        const returnedBooks = await ReturnedBook.findAll();
        res.status(200).json({
            allReturnedBooks: returnedBooks
        });
    }
    catch(err){
        res.status(500).json({
            error: err
        })
    }
}

exports.postAddReturnedBook = async(req,res,next) => {
    try{
        const name = req.body.name;
        const submitedOn = req.body.submitedOn;
        const fine = req.body.fine;
        const data = await ReturnedBook.create({
            name: name,
            submitedOn: submitedOn,
            fine: fine
        });
        res.status(201).json({newReturnedBookDetail: data});
    }
    catch(err){
        console.log(err);
    }
};