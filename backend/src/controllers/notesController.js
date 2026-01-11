// Another way of writing the function

// export const getAllNotes = (req, res) => {
//     res.status(200).send("you fetched 20 notes");
// }

// export function getAllNotes (req, res) {
//     res.status(200).send("you fetched 20 notes");
// }
import Note from "../models/Note.js";
import mongoose from "mongoose";

// async because we will have some promises
export async function getAllNotes (req, res) {
    try{
        // createdAt -1 means first are the last created
        const notes = await Note.find().sort({createdAt: -1});
        res.status(200).json(notes);
    } catch (error){
        console.error("Error in getAllNotes controller", error);
        res.status(500).json({message:"Internal server error"});
    }
}

export async function getNoteById (req, res) {
    try{
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ message: "Note not found" });
        }
        // params.id because we declared /:id in the endpoint of the put in notesRoutes.js
        const foundNote = await Note.findById(req.params.id);
        if(!foundNote) return res.status(404).json({ message: "Note not found" });
        console.log("=========Found note=========", foundNote);
        
        res.status(200).json(foundNote)
    } catch (error){
        console.error("Error in getNoteById controller", error);
        res.status(500).json({message:"Internal server error"});
    }
}

export async function createNote (req, res) {
    try{
        const {title, content} = req.body;
        // we get use the title and content from the req.body
        // in order to access them we have to use app.use(express.json()); in server.js
        // const newNote = new Note({title:title, content:content});
        // since value and key are the same we can just use {title, content}
        const note = new Note({title, content});

        const savedNote = await note.save();
        
        res.status(201).json(savedNote);
    } catch (error){
        console.error("Error in createNote controller", error);
        res.status(500).json({message:"Internal server error"});
    }
}

export async function updateNote (req, res) {
    try{
        const {title, content} = req.body;

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ message: "Note not found" });
        }
        // params.id because we declared /:id in the endpoint of the put in notesRoutes.js
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id, 
            {title, content}, 
            {new:true}); // new:true returns the note after it was updated

        console.log("=========Updated note=========", updatedNote);
        
        res.status(200).json(updatedNote)
    } catch (error){
        console.error("Error in updateNote controller", error);
        res.status(500).json({message:"Internal server error"});
    }
}

export async function deleteNote (req, res) {
    try{
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ message: "Note not found" });
        }
        // params.id because we declared /:id in the endpoint of the put in notesRoutes.js
        const deletedNote = await Note.findByIdAndDelete(req.params.id);

        console.log("=========Deleted note=========", deletedNote);
        
        res.status(200).json(deletedNote)
    } catch (error){
        console.error("Error in deleteNote controller", error);
        res.status(500).json({message:"Internal server error"});
    }
}
