import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSprintComponent } from './add-sprint/add-sprint.component';
import { AddIssueComponent } from './add-issue/add-issue.component';

const routes: Routes = [
  {
    path: 'add-sprint',
    component: AddSprintComponent
  },
  {
    path: 'add-issue',
    component: AddIssueComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SprintRoutingModule { }
