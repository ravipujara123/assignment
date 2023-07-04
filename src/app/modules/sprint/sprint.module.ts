import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SprintRoutingModule } from './sprint-routing.module';
import { AddIssueComponent } from './add-issue/add-issue.component';
import { AddSprintComponent } from './add-sprint/add-sprint.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddIssueComponent,
    AddSprintComponent,
  ],
  imports: [
    CommonModule,
    SprintRoutingModule,
    ReactiveFormsModule
  ],
  exports:[
    AddIssueComponent,
    AddSprintComponent]
})
export class SprintModule { }
