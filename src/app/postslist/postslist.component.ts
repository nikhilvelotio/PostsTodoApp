import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PostdialogComponent } from './postdialog/postdialog.component';

@Component({
  selector: 'app-postslist',
  templateUrl: './postslist.component.html',
  styleUrls: ['./postslist.component.css']
})
export class PostslistComponent implements OnInit {
  id: number = -1;
  list_posts : any = [];
  name_of_user : any;
  
  constructor(private router : Router , private route: ActivatedRoute , private http : HttpClient, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params) => {
        if(params['id'])
        {
          this.id = +params['id'];
        }
      });
    
    this.get_list_posts(this.id).subscribe((val) => {
      let json: any;
      if (val) {
               json = val;   
           } else {
               return;
           }
           
           for (const obj of json) {
            if (obj) {
              const uid = obj['userId'];
              this.http.get(`https://jsonplaceholder.typicode.com/users/${uid}`).subscribe((val) => {
                        let x1: any;
                        if (val) {
                            x1 = val;   
                        }
                       obj['name'] = x1['name'];
              })
                this.list_posts.push(obj);
            }
       }
    });

  }
  
  get_list_posts(id:any)
  {
      if(id===-1)
      {
          return this.http.get<any>("https://jsonplaceholder.typicode.com/posts");
      }
      else{
        // const params1 = new HttpParams();
        // params1.append('userId', id);
        return this.http.get<any>(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
      }
  }


  opendialog(val : any)
  {
     let pid = val['id'];
     let comm : any =[];
     val['comments'] = [] ; 
     this.http.get<any>(`https://jsonplaceholder.typicode.com/comments?postId=${pid}`).subscribe((val) => {
      let json: any;
      if (val) {
               json = val;   
           } else {
               return;
           }
           for (const obj of json) {
            if (obj) {
              comm.push(obj);
            }
          }
        
     })
     val['comments']= comm;
     this.dialog.open(PostdialogComponent, {
      width : '60%',
      data : val,
      maxHeight: '90vh'
   });
  }
}
