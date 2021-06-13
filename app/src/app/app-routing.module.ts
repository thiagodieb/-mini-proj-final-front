import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListJobComponent } from './pages/opportunity/list-job/list-job.component';
import { DetailJobComponent } from './pages/opportunity/detail-job/detail-job.component';


const routes: Routes = [
  {
    path: '',
    component: ListJobComponent
  },
  {
    path: 'opportunity/:title/:id',
    component: DetailJobComponent
  },
  { 
    path: '**',
    redirectTo: "/",
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
