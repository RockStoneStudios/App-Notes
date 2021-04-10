const router = require('express').Router();

const {renderNoteForm,
    createNewNote,
    renderNotes,
    notesEditForm,
    createEditForm,
    deleteNotes
    } = require('../controllers/notes.controller');

// New Notes
router.get('/notes/add',renderNoteForm);
router.post('/notes/add',createNewNote);


//Get All Note

router.get('/notes',renderNotes )

//Edit Notes
router.get('/notes/edit/:id',notesEditForm);
router.put('/notes/edit/:id',createEditForm);

router.delete('/notes/delete/:id',deleteNotes);

module.exports = router;