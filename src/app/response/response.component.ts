
import { Component, OnInit,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Survey } from 'Survey';
import { SURVEYS } from 'Survey';
import { RESPONSES } from 'Response';
import { Response } from 'Response';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { STRING_TYPE } from '@angular/compiler';



@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss']
})
export class ResponseComponent implements OnInit {

  id:string|null;

  question1: string | undefined;
  question2: string | undefined;
  surveyName: string | undefined;


  surveys: Survey[]=SURVEYS;
  responses:Response[]=RESPONSES;
  editMode: boolean=false;
  currentId:string='';

  @ViewChild('responseForm',{read:NgForm})form :any ;



  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.id=this.route.snapshot.queryParamMap.get('_id');
  }

  ngOnInit(): void {
    this.getData();

  }
  getData(){

    try {
      this.http.get<Survey[]>('/Survey').subscribe(data=>{
        this.surveys=data;
        const currentSurvey = this.surveys.find((p)=>{return p._id==this.id});
        console.log(currentSurvey,this.id);

          this.question1=currentSurvey?.question1;
          this.question2=currentSurvey?.question2;
          this.surveyName=currentSurvey?.name;
      });
    } catch (error) {
      console.log(error);
    }
  }

  submit(responses:{question1:string,question2:string}) {
      const response:Response={
        _id :'',
        refid:this.id,
        question1:responses.question1,
        question2:responses.question2
      }
      this.http.post<Response>('/Response',response).subscribe(data=>{
        this.responses.push(data);
      });
      this.form.setValue({
        question1:'',
        question2:''
      })
    }

  }





