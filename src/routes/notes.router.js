const router = require('express').Router();

const {renderNoteForm,
    createNewNote,
    renderNotes,
    notesEditForm,
    createEditForm,
    deleteNotes
    } = require('../controllers/notes.controller');

    const {isAuthenticated} = require('../helpers/auth');
// New Notes
router.get('/notes/add',isAuthenticated,renderNoteForm);
router.post('/notes/add',isAuthenticated,createNewNote);


//Get All Note

router.get('/notes',isAuthenticated,renderNotes )

//Edit Notes
router.get('/notes/edit/:id',isAuthenticated,notesEditForm);
router.put('/notes/edit/:id',isAuthenticated,createEditForm);

router.delete('/notes/delete/:id',isAuthenticated,deleteNotes);

module.exports = router;