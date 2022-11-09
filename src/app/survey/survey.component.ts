import { Component, OnInit,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';



import { Survey } from 'Survey';
import { SURVEYS } from 'Survey';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {


  surveys: Survey[]=SURVEYS;
  editMode: boolean=false;
  currentId:string='';
  @ViewChild('surveyForm',{read:NgForm})form :any ;


  constructor(private router: Router,private http: HttpClient,) { }

  ngOnInit(): void {
    this.getData();
  }

//ready to add function to jump to response page

  getData(){

    try {
      this.http.get<Survey[]>('/Survey').subscribe(data=>{
        this.surveys=data;
      });
    } catch (error) {
      console.log(error);

    }


  }

  add(surveys:{sName:string,author:string}) {
    const survey:Survey={
      _id :this.currentId,
      name:surveys.sName,
      author:surveys.author,
      question1:'',
      question2:''
    }


    if(!this.editMode)
    {
      const survey:Survey={
        _id :'',
        name:surveys.sName,
        author:surveys.author,
        question1:'',
        question2:''
      }
      this.http.post<Survey>('/Survey',survey).subscribe(data=>{
        this.surveys.push(data);
      });
      this.form.setValue({
        sName:'',
        author:''
      })
    }
    else

    this.updateTask(this.currentId,survey);
  }

  updateTask(_id:string,value:Survey){
    this.http.put<Survey>('/Survey/'+_id,value).subscribe(data=>{
      this.currentId=data._id;
    });

    this.editMode=false;
    this.getData();
    this.form.setValue({
      sName:'',
      author:''
    })
    console.log(this.currentId);

  }


  onEditClicked(_id:string)
  {
    this.currentId=_id;
    let currentSurvey = this.surveys.find((p)=>{return p._id===_id});
    console.log(this.form,this.currentId);

      this.form.setValue({
        sName:currentSurvey?.name,
        author:currentSurvey?.author
      })

      this.editMode=true;

  }

  onDeleteClicked(_id:string){
    this.http.delete<Survey>('/Survey/'+_id).subscribe(data=>{
      this.currentId=data._id;
    });
    this.getData();
  }

  response(_id:string): void {

    this.router.navigate(['response'],{queryParams:{_id:_id} });


  }




}
