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
        return this.http.get<any>(`https://jsonplaceholder.typicode.com/posts/${id}`);
      }
  }
}
