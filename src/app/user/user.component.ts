import { Component, OnInit } from '@angular/core';
import {HttpClient } from '@angular/common/http'
import { MatAccordion } from '@angular/material/expansion';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private http : HttpClient , public dialog : MatDialog) { }
  list_of_users : any = [];

  ngOnInit(): void {
      this.http.get('https://jsonplaceholder.typicode.com/users').subscribe((val) =>
      {
        let json: any;
        console.log(val);
           if (val) {
               json = val;   
           } else {
               return;
           }
      
            for (const obj of json) {
                if (obj) {
                    this.list_of_users.push(obj);
                }
           }
  });
  }
   
  openDialog(val? : any) {
    this.dialog.open(DialogComponent, {
       width : '40%',
       data : val
    });
  }

  
}
