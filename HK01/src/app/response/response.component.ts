
import { Component, OnInit,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormArray, FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Survey } from 'Survey';
import { SURVEYS } from 'Survey';
import { RESPONSES } from 'Response';
import { Response } from 'Response';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { STRING_TYPE } from '@angular/compiler';
import {v4 as uuidv4} from 'uuid';
import { Router } from '@angular/router';



@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss']
})
export class ResponseComponent implements OnInit {
  count:number=1;
  id:string|null;
  surveyName: string | undefined;
  refId: string | undefined;
  username: string = '';
  questionArray:string[]=[];
  option1Array:string[]=[];
  option2Array:string[]=[];
  option3Array:string[]=[];
  option4Array:string[]=[];
  typeArray:boolean[]=[];
  typeRefArray:string[]=[];
  surveys: Survey[]=SURVEYS;
  responses:Response[]=RESPONSES;
  editMode: boolean=false;
  currentId:string='';

  @ViewChild('responseForm',{read:NgForm})form :any ;



  constructor(private http: HttpClient, private route: ActivatedRoute,private fb:FormBuilder,private router:Router) {
    this.id=this.route.snapshot.queryParamMap.get('_id');
  }



  responseForm=this.fb.group({
    _id:[''],
    refId:[''],
    responses:this.fb.array([])


  })

  ngOnInit(): void {
    this.getData();

  }
  getData(){

    try {
      this.http.get<Survey[]>('/Survey').subscribe(data=>{
        this.surveys=data;
        const currentSurvey = this.surveys.find((p)=>{return p._id==this.id});


        this.surveyName=currentSurvey?.name;
        this.refId=this.id!;

        var arrayLength = Object.keys(currentSurvey?.questions!).length
        var eachQuestion=Object.values(currentSurvey?.questions!)

        console.log(eachQuestion)
        console.log(eachQuestion[0].option1)

        this.clearFormArray(this.questions);


        for (let z=0;z<arrayLength;z++){

          this.questions.push(this.createRow());
          // console.log(this.count);
          this.count++;

          this.questionArray[z]=eachQuestion[z].question;
          this.option1Array[z]=eachQuestion[z].option1;
          this.option2Array[z]=eachQuestion[z].option2;
          this.option3Array[z]=eachQuestion[z].option3;
          this.option4Array[z]=eachQuestion[z].option4;
          this.typeRefArray[z]=eachQuestion[z].type;

          if(eachQuestion[z].type=="MC"){

            this.typeArray[z]=true;

          }else{
            this.typeArray[z]=false;
          }

          this.questions.controls[z].patchValue({

            type:eachQuestion[z].type});

        }
      //   this.questions.controls[z].patchValue({

      //     questionName:eachQuestion[z].question});

      // }

      console.log(this.option1Array)
      console.log(this.option2Array)
      console.log(this.option3Array)
      console.log(this.option4Array)
      console.log(this.typeArray)

      });
    } catch (error) {
      console.log(error);
    }
  }

  get questions():FormArray{
    return<FormArray>this.responseForm.get('responses');
  }

  createRow():FormGroup{
    return this.fb.group({
      response_id:this.count,
      response:[''],
      option:[''],
      type:['']

    })
  }
  submit(){

    var uuid=uuidv4();
    this.responseForm.patchValue({
      _id: uuid

    });

    var response=this.responseForm.value

      this.http.post<Response>('/Response',response).subscribe(data=>{
           this.responses.push(data);

           this.router.navigate(['survey'])
  });

  }

  cancel(){
    this.router.navigate(['survey'])
  }

  // onEditClicked(_id:string)
  // {

  //   this.currentId=_id;
  //   let currentSurvey = this.surveys.find((p)=>{return p._id===_id});

  //   this.surveyForm.patchValue({
  //     name:currentSurvey?.name,
  //     author:currentSurvey?.author,

  //   })

  //   var arrayLength = Object.keys(currentSurvey?.questions!).length
  //   var eachQuestion=Object.values(currentSurvey?.questions!)

  //   this.clearFormArray(this.questions);

  //   for (let ii=0;ii<arrayLength;ii++){

  //     this.questions.push(this.createRow());
  //     console.log(this.count);
  //     this.count++;

  //     this.questions.controls[ii].patchValue({

  //       question:eachQuestion[ii].question});

  //   }
  //    this.editMode=true;

  // }

  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }

  // submit(responses:{question1:string,question2:string}) {
  //     const response:Response={
  //       _id :'',
  //       refid:this.id,
  //       question1:responses.question1,
  //       question2:responses.question2
  //     }
  //     this.http.post<Response>('/Response',response).subscribe(data=>{
  //       this.responses.push(data);
  //     });
  //     this.form.setValue({
  //       question1:'',
  //       question2:''
  //     })
  //   }

  }





