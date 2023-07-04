import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-add-sprint',
  templateUrl: './add-sprint.component.html',
  styleUrls: ['./add-sprint.component.scss']
})
export class AddSprintComponent implements OnInit {
  sprintForm!: FormGroup;
  isStatusDisabled = true;
  activeSprintData: any;

  constructor(private commonService: CommonService, private readonly bsModalRef: BsModalRef) {}

  ngOnInit() {
    this.getSprintData();
    this._sprintForm();
  }

  _sprintForm() {
    this.sprintForm = new FormGroup({
      sprintTitle: new FormControl('', Validators.required),
      startTime: new FormControl('', Validators.required),
      endTime: new FormControl('', Validators.required),
      sprintId: new FormControl(Math.floor(Math.random() * 100)),
      isFutureSprint: new FormControl(false),
      isActive: new FormControl(false),
      status: new FormControl(''),
      description: new FormControl('')
    });
  }

  onClose() {
    this.bsModalRef.hide();
  }

  submitForm(data: any) {
    data['isCollapse'] = false
    this.commonService.postSprintData(data).subscribe((res) => {
      this.commonService.sprintTitle.next(null);
    })
    this.onClose();
  }

  getSprintData() {
    this.commonService.getSprintData().subscribe((res: any) =>{
      this.activeSprintData = res.find((res: any) => res.status == 'Active');
    })
  }
}
