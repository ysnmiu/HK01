

const mongoose=require('mongoose');

const surveyResponseSchema = new mongoose.Schema({

    // _id:{
    //     type:String,
    //     // required:true
    // },
    refId:{
        type:mongoose.Types.ObjectId,
        required:true
      
    },
    responseDate:{
        type:Date,
        required:true
    },


    responses:{
        type: Object,
        required:true
        // required:true,
        // minlength:1,
        // trim:true
    }

//////////////////////////////////
    // result:[{
    //     _refId:String,
        
    //     responses:String
            
    // }]
///////////////////////////////////////////
    // _refId:{
    //             type:String,
    //             required:true
    //         },

  
    // responses:{
    //     type: Array,
    //     required:true,
    //     minlength:1,
    //     trim:true
    // }
})

const surveyResponse=mongoose.model('surveyResponse',surveyResponseSchema);

module.exports={surveyResponse}







