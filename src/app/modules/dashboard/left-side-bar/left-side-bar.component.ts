import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { toArray } from 'rxjs';
import { CommonService } from 'src/app/service/common.service';
import { AddIssueComponent } from '../../sprint/add-issue/add-issue.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-left-side-bar',
  templateUrl: './left-side-bar.component.html',
  styleUrls: ['./left-side-bar.component.scss']
})
export class LeftSideBarComponent implements OnInit {
  sprintData: any = [];
  issueData: any = [];
  collapseIndex = 0;
  sprintList: boolean = false;
  issueRef!: BsModalRef;
  sprintDataShown: any = []
  @ViewChild('issue', { static: true }) issue!: TemplateRef<any>;

  constructor(private commonService: CommonService, private _bsModalService: BsModalService) { }


  ngOnInit(): void {
    this.getSprintData();
    this.getIssueData();
    this.commonService.searchedData.subscribe((res) => {
      this.getIssue(res);
    })
    this.commonService.sprintTitle.subscribe((res) => {
      this.getSprintData();
      this.getIssue();
    })
  }

  getIssue(data?: any) {
    this.sprintDataShown = [];
    this.commonService.getIssueData(data).subscribe((res: any) => {
      this.issueData = res;
      res.forEach((res: any) => {
        this.sprintDataShown.push(res?.sprintName);
      });
    })
  }

  getSprintData(data?: any) {
    this.sprintDataShown = [];
    this.commonService.getSprintData(data).subscribe((res: any) => {
      this.sprintData = res;
      res.forEach((res: any) => { 
        this.sprintDataShown.push(res?.sprintTitle) 
      });
    })
  }

  SearchDetail(event: any) {
    this.getSprintData(event.target.value);
  }

  getIssueData(data?: any) {
    this.commonService.getIssueData(data).subscribe((res) => {
      this.issueData = res;
    })
  }

  getIssueDetail(index: number) {
    this.sprintData[this.collapseIndex].isCollapse = false
    this.sprintData[index].isCollapse = !this.sprintData[index].isCollapse;
    this.collapseIndex = index;
    if (this.sprintData[index].isCollapse) {
      this.getIssueData(this.sprintData[index].sprintTitle)
    }
  }

  sprintTitleData(event: any) {
    if (event.target.value !== 'Sprint-list') {
      this.commonService.getIssueData(event.target.value).subscribe((res) => {
        this.issueData = res;
      })
    }
  }

  openSprintList() {
    this.sprintList = !this.sprintList;
  };

  addIssue(template: TemplateRef<any>) {
    const sprintTitle = template;

    this.issueRef = this._bsModalService.show(
      AddIssueComponent,
      Object.assign(
        {},
        {
          sprintTitle,
          modalClass: 'modal-dialog',
          class: 'modal-lg modal-full'
        }
      )
    );
    this.commonService.sprintTitle.next(sprintTitle);
  }
}
