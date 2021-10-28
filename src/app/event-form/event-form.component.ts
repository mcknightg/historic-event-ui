import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from "@angular/forms";
import { ActivatedRoute, Router} from "@angular/router";
import {EventService} from "../services/event.service";
import {Event} from "../services/app-model";

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {
  item:Event;
  form:FormGroup;

  constructor(private fb: FormBuilder,private service:EventService,private router: Router,private route: ActivatedRoute) {
    this.item = this.emptyItem();
    this.form = this.createForm();
  }

  ngOnInit(): void {
     let id = this.route.snapshot.paramMap.get('id');
     if(id){
         this.service.getById(id).subscribe(i=>{
             this.item = i;
             this.form = this.createForm();
         });
     }
  }

  public save() {
    this.service.save(Object.assign({}, this.item,this.form.getRawValue())).subscribe(()=>{
        this.back();
    });
  }

  public back(){
     this.router.navigate(['/events']).then();
  }

  public emptyItem():Event{
    return {
			id:null,
			date:'',
			description:'',
			lang:'',
			category1:'',
			category2:'',
			granularity:'',
		};
  }

  public createForm():FormGroup{
     return this.fb.group({
        "date": [this.item.date],
        "description": [this.item.description],
        "lang": [this.item.lang],
     });
  }
}
