const mongoose=require('mongoose');

let Schema=mongoose.Schema;

let SaveSchema=new Schema({
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String
    },
    url: {
        tye: String,
        required: true
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: 'Note'
    }
});

let Save=mongoose.model('Save', SaveSchema);

module.exports=Save;