
const mongoose=require('mongoose');

const surveyListSchema = new mongoose.Schema({
 
    name:{
        type: String,
        required:true,
        minlength:1,
        trim:true
    },
    author:{
        type: String,
        required:true,
        minlength:1,
        trim:true
    },
    startDate:{
        type: Date,
        required:true,
        minlength:1,
        trim:true
    }
    ,endDate:{
        type: Date,
        required:true,
        minlength:1,
        trim:true
    }
    

    ,questions:{
        type: Object,
        required:true,
        minlength:1,
        trim:true
    }


})

const surveyList=mongoose.model('surveyList',surveyListSchema);

module.exports={ surveyList }







