import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostslistComponent } from './postslist/postslist.component';
import { TodolistComponent } from './todolist/todolist.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path : 'users' ,component: UserComponent },
  {path : 'users/:id/posts' , component: PostslistComponent} , 
  {path : 'users/:id/todos' , component: TodolistComponent},
  {path : 'posts' , component: PostslistComponent} , 
    {path : 'todos' , component: TodolistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
