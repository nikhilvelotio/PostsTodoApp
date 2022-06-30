import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-postdialog',
  templateUrl: './postdialog.component.html',
  styleUrls: ['./postdialog.component.css']
})
export class PostdialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any , private http : HttpClient) { }

  ngOnInit(): void {
  }
  

  sub_post(f : NgForm)
  {
      const obj_val = 
      {
        "postid": this.data.id,
        "comment" : f.value['comm']
      }
      this.http.post<any>("http://localhost:3000/comments",obj_val).subscribe( {
        next: (res) => {
           console.log("comment added successfully");
        },
        error :() =>{
          console.log("error occurred!!");
        }
      })
  }
}
