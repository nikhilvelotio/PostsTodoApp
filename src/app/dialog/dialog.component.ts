import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  userForm!: FormGroup;
  constructor(private fb: FormBuilder, private api : ApiService , @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
       this.userForm = this.fb.group(
        {
            productName : ['',Validators.required] , 
            username : ['',Validators.required] ,
            phoneNo : ['',Validators.required] ,
            emailId : ['',Validators.required] ,
            address : ['',Validators.required],
            city : ['',Validators.required],
            zipcode : ['',Validators.required]
        })

        console.log(this.data);
  }
  
  adduser()
  {
      console.log(this.userForm.value);
      if(this.userForm.valid)
      {
          this.api.adduser(this.userForm.value).subscribe({
            next : (res) =>{
              alert("User added successfully!!!");
            }
            ,
            error: ()=>{
               alert("Error while adding user");
            } 
          });
      }
  }

}
