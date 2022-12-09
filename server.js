const bodyParser = require('body-parser');
const express =require('express');
var app = express();

const {mongoose} =require('./db/mongoose')
let cors                = require('cors')
//load models
const {surveyList}=require('./db/models/surveyList.server.model');

const {surveyResponse}=require('./db/models/surveyResponse.server.model');
const {signUp}=require('./db/models/signUp.server.model');

//middleware
app.use(bodyParser.json());

//https://enable-cors.org/server_expressjs.html
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    // res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
/*
const cors = require('cors');
const frontEndUrl = 'http://localhost:4200/';

app.use(cors({ origin:frontEndUrl}));
*/
//route
app.use(cors({ origin: '*'})) 
//GET survey list
app.get('/survey',(req,res)=>{
    //return an array of the survey
    surveyList.find({}).then((surveyList)=>{
        res.send(surveyList);
    });
    

})

//POST survey list
app.post('/survey',(req,res)=>{
    //create
    // let _id =req.body._id;
    // surveyList.init()
    let name =req.body.name;
    let author =req.body.author;
    let startDate=req.body.startDate;
    let endDate=req.body.endDate;
    let questions =req.body.questions;
   

    let newsurveyList = new surveyList({
       
        name,
        author,
        startDate,
        endDate,
        questions,
        

    });

    newsurveyList.save().then((listDoc)=>{
        //return the full list of survey
        res.send(listDoc);

    });

});





// update
// app.patch('/survey:id',(req,res)=>{
//     //update
//     let _id=req.params.id;
//     surveyList.findByIdAndUpdate({_id},{
//         $set:req.body
//     }).then(()=>{
//         res.sendStatus(200);
//     })

// })

// update
app.put('/survey/:id',(req,res)=>{
    let _id=req.params.id;
    console.log(_id)
    // let _id=req.params.id;
    // let name =req.body.name;
    // let author =req.body.author;
    // let startDate=req.body.startDate;
    // let endDate=req.body.endDate;
    // let questions =req.body.questions;
    // console.log(req.body)
    
    surveyList.findByIdAndUpdate(_id,{
        name:req.body.name,
        author:req.body.author,
        startDate:req.body.startDate,
        endDate:req.body.endDate,
        questions :req.body.questions,

//         author =req.body.author,
//   startDate=req.body.startDate;
//    endDate=req.body.endDate;
//    questions =req.body.questions;
    
    
    } ,function (err, docs) {
        if (err){
            console.log(err);
        }
        else{
            // res.sendStatus(200);
        }})
        
    // let newsurveyList =  surveyList({
    //     _id,
    //     name,
    //     author,
    //     startDate,
    //     endDate,
    //     questions,
        

    // });
    // console.log(id)
    // quotesCollection.findOneAndUpdate(/* ... */)
    // .then(result => {
    //   console.log(result)
    //  })
    // .catch(error => console.error(error))
});


//del
app.delete('/survey/:id',(req,res)=>{
    //delete
    let _id=req.params.id;
    console.log(_id)
    surveyList.findByIdAndDelete({_id}).then((removedListDoc)=>{
        res.send(removedListDoc);
    });

});





/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

///////////////get response

//get list of q
app.get('/response',(req,res)=>{
    //return all q in the survey
    // let _id=req.params._id
    // surveyList.findById({_id}).then((surQ)=>{
    //     res.send(surQ);
    // });
    surveyResponse.find({}).then((surveyResponse)=>{
        res.send(surveyResponse);
    });

    
});

///////////////////////why try catch still crash??///////////////
//recieve response

                // app.post('/Response/:_id/:question_id',(req,res)=>{
                //     //add a ans to the response array
                //     let _id=req.params._id
                //     let _refId=req.params.question_id
                //     let responses =req.body.value;
                
                //     let newResponse = new surveyResponse({
                //         _id,_refId,
                //         responses
                //     });
                //     surveyResponse.findByIdAndUpdate({_id,_refId},
                //                 {
                //                 $push:{responses}
                //             }).then(()=>{
                //                 res.sendStatus(200);
                //             })

                //     try{
                //      newResponse.save().then(()=>{
                //         res.sendStatus(200);
                //     })
                //     }catch (err){
                //         console.log(err);
                //         res.sendStatus(200);
                //     }
                
                // });
///////////////////////////////////////////////////////////////////////////////////////////
app.post('/response',(req,res)=>{
    //add a ans to the response array
    // let _id="asdasdasdasdasdasdasdsd";
    //let _refId=req.body//.question_id
    // let refId='';
    surveyResponse.init()

    // let //.value;
 
    let newResponse = new surveyResponse({
        
        // refId,
        // date,
        // result:[{_refId,responses}]
        refId:req.body.refId,
        responseDate:req.body.responseDate,
        // result:[{_refId,responses}]
        responses: req.body.responses
    });

  

    newResponse.save().then((listDoc2)=>{
        //return the full list of response
        console.log('save data: ',listDoc2)
        // res.send(listDoc2);
    });
});
    //using update to passs responses to the array

    // surveyResponse.findByIdAndUpdate({_id},
    //             {
    //             $push:{
                    
    //                 responses

    //                 // result:[{
    //                 //     _refId,        
    //                 //     responses
    //                 // }]
                    
    //             }
    //         }).then(()=>{
    //             res.sendStatus(200);
    //         })

    //create the responses object if no
    //if responses obj already exits,
    // make it ignore err by forcing it to return status 200
   
    //  newResponse.save(function(err) {
      
        //   if (err.name === 'MongoError' && err.code === 11000) {
        //     // Duplicate username
        //     return res.status(200)
        //   }
            // Some other error
    //         return res.status(200)
             
    //       }
            
          
    //  )
   
   







////get ALL result from the whole survey

// app.get('/Response/:_id/allQuestionsResults',(req,res)=>{
//     //return all ans in a responses
//     let _id=req.params._id
//     //let _refId=req.params.question_id
//     let responses=req.body.responses

//     //find one response in one question in one survey

//     surveyResponse.findById({
//         //_refId,
//         _id
//     }).then((theQuestion)=>{
//         res.send(theQuestion)
//     });

// });

///get all result of that one question
///////////////// is it needed??
////
// If our result are generated as per survey instead of per Q
// will not require
////
// app.get('/Response/:_id/oneQuestionResult/:question_id',(req,res)=>{
//     //find one question

//     let _id=req.params._id;
//     let _refId=req.params.question_id; 

//     surveyResponse.findOne({
//         _refId,_id
//     }).then((theQuestion)=>{
//         res.send(theQuestion)
//     });

// });





/*
//update

app.patch('/survey/:_surveyID/surveyQuestion/:QuestionID',(req,res)=>{
    //update

    let _surveyID=req.params._surveyID;//survey id (from url)
    let _id=req.params.QuestionID; //question id (from url)

    surveyQuestion.findByIdAndUpdate({
        _surveyID,
        _id
    },{
        $set: req.body
    }).then(()=>{
        res.sendStatus(200)
    })

});
*/

//del

// app.delete('/Response/:_id/:question_id',(req,res)=>{
//     //delete a response obj in a quesition in a survey
//     //it will remove all responses in that 1 questions
//     //no need to remove only one response as it is not fair if we allow ppl to "modified" the result

//     let _id=req.params._id;//survey id (from url)
//     let question_id=req.params.question_id; //question id (from url)

//     surveyResponse.findByIdAndRemove({
//         _id,
//         question_id
//     }).then((removedQuestionDoc)=>{
//         res.send(removedQuestionDoc)
//     })

// });



// app.get('/survey/:_surveyID/surveyQuestion/:QuestionID',(req,res)=>{
//     //find one question

//     let _surveyID=req.params._surveyID;//survey id (from url)
//     let _id=req.params.QuestionID; //question id (from url)

//     surveyQuestion.findById({
//         _surveyID,_id
//     }).then((theQuestion)=>{
//         res.send(theQuestion)
//     });

// });



/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

app.get('/sign',(req,res)=>{
    //return all q in the survey
    // let _id=req.params._id
    // surveyList.findById({_id}).then((surQ)=>{
    //     res.send(surQ);
    // });
    signUp.find({}).then((signUp)=>{
        res.send(signUp);
    });

    
});

//login
app.post('/login',(req,res)=>{
    var userName = req.body.formGroup.UserName;
    var password = req.body.formGroup.Password;

    
    signUp.findOne({username:userName}, function(err,user){
        if(err){
            res.send({
                "Data": "NO",
                "Status": 0,
                "Message": "User not found"
              })
              
        }
        if (user && user.password === password){
           
            res.send({
                //Data is the token to access restricted page 
                "token": "dvcioljwefiosdfjweiofslkdgfjoiejfweiofjiojfsiodvjoiwefohisf",
                "Status": 200,
                "Message": "Login successful"
              })
            
          } else {
                res.send({
                "Data": "NO",
                "Status": 0,
                "Message": "Username or Password incorrect"
                
              })
              
          }      
    }) 
   
    


});
//Sign UP
app.post('/signup',async (req,res)=>{
    //create
    var username =req.body.UserName;
    var password =req.body.Password;
    var cfmpsw = req.body.CfmPassword;
    var email = req.body.Email
   
    

    if(password === cfmpsw){
        
        var newAcct = new signUp({
        username,
        password,
        email
        })
        try{
            const newaA = await signUp.create(newAcct);
            res.send({
                "Status": 200,
                "Message": "Account is created"
              })
        }
        catch(error){
            if(error.code === 11000){
                res.send({
                    "Status": 0,
                    "Message": "Duplicated"
                })
            }
        }

        
    }else{
        res.send({
            "Status": 0,
            "Message": "Password is not match"
          })
    }

    
});





/*
app.get('/',(req,res)=>{
   

res.send("Big explosion")

})
*/

const HOST='localhost'
const PORT=process.env.PORT|| 3000

app.listen(PORT)

console.log(`Server is running at http://${HOST}:${PORT}`)

