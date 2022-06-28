import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-postslist',
  templateUrl: './postslist.component.html',
  styleUrls: ['./postslist.component.css']
})
export class PostslistComponent implements OnInit {
  id: number = -1;
  list_posts : any = [];
  name_of_user : any;
  constructor(private router : Router , private route: ActivatedRoute , private http : HttpClient) { }

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
           const uid = json[0]['userId'];
           this.http.get(`https://jsonplaceholder.typicode.com/users/${uid}`).subscribe((val) => {
                     let x1: any;
                     if (val) {
                         x1 = val;   
                     }
                    this.name_of_user = x1['name'];
           })
           for (const obj of json) {
            if (obj) {
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
}
