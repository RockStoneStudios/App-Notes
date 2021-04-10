const Note = require('../models/Note');

const notesCtrl ={};


notesCtrl.renderNoteForm = (req,res)=>{
  
   res.render('notes/newNote');
}

notesCtrl.createNewNote = async (req,res)=>{
    const {title,description} = req.body;
    
  const newNote = new Note({
        title,
        description
    });
   const notanueva = await newNote.save();


    res.send('New Note');

}

notesCtrl.renderNotes = async (req,res)=>{
 const notes = await Note.find().lean();
 res.render('notes/all-notes',{nota : notes});
}
notesCtrl.notesEditForm = (req,res)=>{
    res.send('Edit Form');
}
notesCtrl.createEditForm = (req,res)=>{
    res.send('Edit post Form');
}
notesCtrl.deleteNotes = (req,res)=>{
    res.send('Delete Notes');
}

module.exports = notesCtrl;