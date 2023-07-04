import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-add-issue',
  templateUrl: './add-issue.component.html',
  styleUrls: ['./add-issue.component.scss']
})
export class AddIssueComponent implements OnInit {
  sprintTitle!: any;
  issueForm!: FormGroup;
  sprintDetails: any = [];
  selectedSprint: any;

  constructor(private commonService: CommonService, private readonly bsModalRef: BsModalRef) { }

  ngOnInit() {
    this._issueForm();
    this.sprintData();
    this.commonService.sprintTitle.subscribe(res => {
      this.issueForm.controls['sprintName'].setValue(res);
      this.issueForm.controls['sprintName'].disable();
      this.selectedSprint = res
    })
  }

  _issueForm() {
    this.issueForm = new FormGroup({
      issueTitle: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      sprintName: new FormControl(''),
      isFuture: new FormControl(false),
      isActive: new FormControl(false),
      isBackLog: new FormControl(false),
    });
    this.issueForm.controls['sprintName'].setValue(this.selectedSprint);
  }

  submitForm(data: any) {
    if(this.selectedSprint) {
      this.issueForm.value.sprintName = this.selectedSprint;
    }
    data['issueId'] = 50000 + Math.round(Math.random() * 100);
    this.commonService.postIssueData(data).subscribe((res) => { 
      this.commonService.sprintTitle.next(null);
      this.selectedSprint = ''
    });
    this.onClose();
  }

  sprintData() {
    this.commonService.getSprintData().subscribe((res) => {
      this.sprintDetails = res;
    })
  }

  onClose() {
    this.bsModalRef.hide();
  }
}
