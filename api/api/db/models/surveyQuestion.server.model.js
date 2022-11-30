

const mongoose=require('mongoose');

const surveyQuestionSchema = new mongoose.Schema({

    _surveyID:{
        type:mongoose.Types.ObjectId,
        required:true
    },



    question:{
        type: String,
        required:true,
        minlength:1,
        trim:true
    }
})

const surveyQuestion=mongoose.model('surveyQuestion',surveyQuestionSchema);

module.exports={surveyQuestion}







