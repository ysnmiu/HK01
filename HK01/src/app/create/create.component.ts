import { Component, OnInit,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormArray, FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Survey } from 'Survey';
import { SURVEYS } from 'Survey';
import { HttpClient } from '@angular/common/http';
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponent implements OnInit {
  count:number=1;
  arrayCount:number=0;
  surveys: Survey[]=SURVEYS;
  editMode: boolean=false;
  currentId:string='';
  display = true;
  typeArray:boolean[]=[];

  @ViewChild('surveyForm',{read:NgForm})form :any ;

  constructor(private fb:FormBuilder,private http: HttpClient) { }

  surveyForm=this.fb.group({
    _id:[''],
    name:[''],
    author:[''],
    questions:this.fb.array([])


  })

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    try {
      this.http.get<Survey[]>('/Survey').subscribe(data=>{
        this.surveys=data;
      });
    } catch (error) {
      console.log(error);
    }

  }

  get questions():FormArray{
    return<FormArray>this.surveyForm.get('questions');
  }



  add(){

    if(!this.editMode)
    {
      var uuid=uuidv4();
      this.surveyForm.patchValue({
        _id: uuid

      });
       var survey=this.surveyForm.value

      this.http.post<Survey>('/Survey',survey).subscribe(data=>{
           this.surveys.push(data);
      });
      this.surveyForm.patchValue({
        _id:'',
        name: '',
        author: ''

      });

      this.clearFormArray(this.questions);
    }
    else

    this.updateTask(this.currentId);
    this.cancel();

  }




  updateTask(_id:string){
    var survey=this.surveyForm.value

  this.http.put<Survey>('/Survey/'+_id,survey).subscribe(data=>{
    this.currentId=data._id;
  });
  this.getData();
}

  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }


  addItem():void{
    this.questions.push(this.createRow());
    this.typeArray[this.arrayCount]=false;
    console.log(this.typeArray);
    this.count++;
    this.arrayCount++;
    console.log(this.count);
    console.log(this.arrayCount);
  }

  createRow():FormGroup{
    return this.fb.group({
      question_id:this.count,
      question:[''],
      option1:['N/A'],
      option2:['N/A'],
      option3:['N/A'],
      option4:['N/A'],
      type:['SQ']

    })
  }

  onDeleteItem(id:number):void{
    this.questions.removeAt(id);
    this.typeArray.splice(id,1);
    console.log(this.typeArray)
    this.arrayCount--;

  }

  onEditClicked(_id:string)
  {

    this.currentId=_id;
    let currentSurvey = this.surveys.find((p)=>{return p._id===_id});

    this.surveyForm.patchValue({
      name:currentSurvey?.name,
      author:currentSurvey?.author,

    })

    var arrayLength = Object.keys(currentSurvey?.questions!).length
    var eachQuestion=Object.values(currentSurvey?.questions!)

    this.clearFormArray(this.questions);

    for (let i=0;i<arrayLength;i++){

      this.questions.push(this.createRow());
      console.log(this.count);
      this.count++;

      if (eachQuestion[i].type=="MC")
      {
      this.typeArray[i]=true
      }

      this.questions.controls[i].patchValue({



        question:eachQuestion[i].question,
        option1:eachQuestion[i].option1,
        option2:eachQuestion[i].option2,
        option3:eachQuestion[i].option3,
        option4:eachQuestion[i].option4,
        type:eachQuestion[i].type

      });





    }
     this.editMode=true;


  }

  cancel(){

    var survey=this.surveyForm.value
      this.surveyForm.patchValue({
        _id: null,
        name: '',
        author: ''

      });

      this.clearFormArray(this.questions);
      this.editMode=false;
  }

  onDeleteClicked(_id:string){
    this.http.delete<Survey>('/Survey/'+_id).subscribe(data=>{
      this.currentId=data._id;
    });
    this.getData();
    this.cancel();
  }

  MC(id:number){
    this.questions.controls[id].patchValue({
      type:"MC",
      option1:"",
      option2:"",
      option3:"",
      option4:""

  })


  this.typeArray[id]=true
  console.log(this.typeArray)
}

SQ(id:number){
  this.questions.controls[id].patchValue({
    type:"SQ",
    option1:"N/A",
    option2:"N/A",
    option3:"N/A",
    option4:"N/A"

})


this.typeArray[id]=false
console.log(this.typeArray)
}



}

