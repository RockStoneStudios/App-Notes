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
    newNote.user = req.user.id;
   const notanueva = await newNote.save();

   req.flash('Success_msg','Note Added Successfully');
   res.redirect('/notes');

}

notesCtrl.renderNotes = async (req,res)=>{
 const notes = await Note.find({user:req.user.id}).lean();
 res.render('notes/all-notes',{nota : notes});
}
notesCtrl.notesEditForm = async (req,res)=>{
   const note = await Note.findById(req.params.id).lean();
    res.render('notes/edit-note',{nota : note});
    
}
notesCtrl.createEditForm = async (req,res)=>{
  const{title,description} = req.body;
  await Note.findByIdAndUpdate(req.params.id,{title,description});
   req.flash('Success_msg','Note Updated Successfully');
  res.redirect('/notes');
}
notesCtrl.deleteNotes = async (req,res)=>{
   await  Note.findByIdAndDelete(req.params.id);
   req.flash('Success_msg','Note Deleted Successfully');
   res.redirect('/notes');
}

module.exports = notesCtrl;