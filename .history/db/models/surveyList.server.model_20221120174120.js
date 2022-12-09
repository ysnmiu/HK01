
const mongoose=require('mongoose');

const surveyListSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        minlength:1,
        trim:true
    },
    author:{
        
        minlength:1,
        trim:true
    }
    

    ,questions:[]


})

const surveyList=mongoose.model('surveyList',surveyListSchema);

module.exports={ surveyList }







