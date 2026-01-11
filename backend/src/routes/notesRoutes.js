import express from "express";
import {createNote, deleteNote, getAllNotes, getNoteById, updateNote} from "../controllers/notesController.js";

const router = express.Router();

// we use "/" as an endpoint because in server.js the /api/notes is already decalred
// the methods are declared in notesController.js
router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);


export default router;