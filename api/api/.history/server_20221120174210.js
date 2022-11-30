const bodyParser = require('body-parser');
const express =require('express');
var app = express();

const {mongoose} =require('./db/mongoose')

//load models
const {surveyList}=require('./db/models/surveyList.server.model');
const {surveyQuestion}=require('./db/models/surveyQuestion.server.model');
const {signUp}=require('./db/models/signUp.server.model');

//middleware
app.use(bodyParser.json());

//https://enable-cors.org/server_expressjs.html
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
/*
const cors = require('cors');
const frontEndUrl = 'http://localhost:4200/';

app.use(cors({ origin:frontEndUrl}));
*/
//route

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
    let name =req.body.name;
    let author =req.body.author;
    let questions =req.body.q;
   

    let newsurveyList = new surveyList({
        name,
        author
    });

    newsurveyList.save().then((listDoc)=>{
        //return the full list of survey
        res.send(listDoc);
    });

});



//update
app.patch('/survey/:id',(req,res)=>{
    //update
    let _id=req.params.id;
    surveyList.findByIdAndUpdate({_id},{
        $set:req.body
    }).then(()=>{
        res.sendStatus(200);
    })

})



//del
app.delete('/survey/:id',(req,res)=>{
    //delete
    let _id=req.params.id;
    surveyList.findByIdAndDelete({_id}).then((removedListDoc)=>{
        res.send(removedListDoc);
    });

});



///////////////get Q

//get list of q
app.get('/survey/:_surveyID/surveyQuestion',(req,res)=>{
    //return all q in the survey
    let _surveyID=req.params._surveyID
    surveyQuestion.find({_surveyID}).then((surQ)=>{
        res.send(surQ);
    });

});


//create

app.post('/survey/:_surveyID/surveyQuestion',(req,res)=>{
    //return all q in the survey
    let _surveyID=req.params._surveyID
    let question =req.body.question;
    
   
   let newQuestion = new surveyQuestion({
    _surveyID,
    question
   });

   newQuestion.save().then((newQDoc)=>{
    res.send(newQDoc);
   });

});


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


//del

app.delete('/survey/:_surveyID/surveyQuestion/:QuestionID',(req,res)=>{
    //update

    let _surveyID=req.params._surveyID;//survey id (from url)
    let _id=req.params.QuestionID; //question id (from url)

    surveyQuestion.findByIdAndRemove({
        _surveyID,
        _id
    }).then((removedQuestionDoc)=>{
        res.send(removedQuestionDoc)
    })

});



app.get('/survey/:_surveyID/surveyQuestion/:QuestionID',(req,res)=>{
    //find one question

    let _surveyID=req.params._surveyID;//survey id (from url)
    let _id=req.params.QuestionID; //question id (from url)

    surveyQuestion.findById({
        _surveyID,_id
    }).then((theQuestion)=>{
        res.send(theQuestion)
    });

});


//login
app.post('/login',(req,res)=>{
    var userName = req.body.UserName;
    var password = req.body.Password;

    
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
                "Data": "dvcioljwefiosdfjweiofslkdgfjoiejfweiofjiojfsiodvjoiwefohisf",
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
    /*
    if(userName == "admin" ){
        if(password == "admin"){
            res.send({
                //Data is the token to access restricted page 
                "Data": "dvcioljwefiosdfjweiofslkdgfjoiejfweiofjiojfsiodvjoiwefohisf",
                "Status": 200,
                "Message": "Login successful"
              })
        }else{
            res.send({
                "Data": "NO",
                "Status": 0,
                "Message": "Password incorrect"
              })
        }
    }else{
        res.send({
            "Data": "NO",
            "Status": 0,
            "Message": "Username incorrect"
          })
    }*/
    


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

