import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-postdialog',
  templateUrl: './postdialog.component.html',
  styleUrls: ['./postdialog.component.css']
})
export class PostdialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
     console.log(this.data);
  }
  

  sub_post(f : any)
  {
      console.log(f.value);
  }
}
