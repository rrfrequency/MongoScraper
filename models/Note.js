const mongoose=require('mongoose');

let Schema=mongoose.Schema;

let NoteSchema=new Schema({
    articleId: {
        type: Schema.Types.ObjectId
    },
    body: {
        type: String
    }
});

let Note=mongoose.model('note', NoteSchema);

module.exports=Note;