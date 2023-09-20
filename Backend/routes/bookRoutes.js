import express from "express";
import { Book } from "../models/bookModel.js";
const router = express.Router(); 

// route for save books
router.post('/', (req, res) => {
    try {
        if(
            !req.body.title ||
            !req.body.author || 
            !req.body.publishYear
        ){
            return res.status(400).send({
                message: 'Send all required fields : title, author, publishYear'
            });
        }else{
            const newBook = {
                title: req.body.title,
                author: req.body.author,
                publishYear: req.body.publishYear
            };
            Book(newBook).save().then(result => {
                res.status(201).send(result)
            })

        }
        
    } catch (error) {
        res.status(500).send({message: error.message})
    }
})

// route for geting all books
router.get('/', (req, res) => {
    try{
        Book.find().then(result => {
            res.status(200).json({
                count: result.length,
                data: result
            });
        })
    }
    catch (error) {
        res.status(500).send({message : error.message});
    }
})

// route for geting one book by id
router.get('/:id', (req, res) => {
    try{
        const { id } = req.params;
        Book.findById(id).then(result => {
            res.status(200).json(result);
        })
    }
    catch (error) {
        res.status(500).send({message : error.message});
    }
})

// route for updating a book
router.put('/:id', (req, res) => {
    try {
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            res.status(400).send({
                message: 'Send all required fields : title, author, publishYear'
            })
        }else{
            const { id } = req.params;
            Book.findByIdAndUpdate(id, req.body).then(result => {
                    res.status(200).send({message : "book updated successfully"})
            }).catch( err => {
                res.status(404).send({message : "book not found !"})
            })
        }
    } catch (error) { 
        res.status(500).send({message : error.message})
    } 
})

// route for delete a book
router.delete('/:id', (req, res) => {
    try {
        const { id } = req.params;
        Book.findByIdAndDelete(id).then(result => {
            res.status(200).json('book deleted successfully')
        }).catch (err => {
            res.status(404).json({message : "Book not found"})
        })
    } catch (error) {
        res.status(500).send({message : error.message});
    }
})


export default router;