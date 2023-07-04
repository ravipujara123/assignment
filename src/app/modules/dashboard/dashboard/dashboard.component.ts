import { Component, OnInit, TemplateRef } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import {
  CdkDragDrop,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CommonService } from 'src/app/service/common.service';
import { BsModalService } from 'ngx-bootstrap';
import { AddIssueComponent } from '../../sprint/add-issue/add-issue.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  newAddedData!: string;
  textAreaVisible: boolean = true;
  selectedSprint: any = {}
  isAddNewModalShown!: string;
  iconBoxList: any = [];
  pendingList: any = [];
  futureSprintList: any = [];
  description = '';
  activeSprintList: any = [];
  blockSprintList: any = [];
  ngUnsubscribe = new Subject();
  isCollapse: any;
  issueRef: any;
  isLoding: boolean = false;
  activeSprint: any;

  constructor(public commonService: CommonService, private _bsModalService: BsModalService) { }

  ngOnInit(): void {
    this.isLoding = true;
    this.getSprintList();
    this.commonService.sprintTitle.subscribe((res) => {
      this.isLoding = true;
      this.getSprintList();
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    this.isLoding = true;
    this.selectedSprint = {}
    if (
      event.container.id == 'active_sprint' &&
      event.previousContainer.id == 'blockSprint'
    ) {
      setTimeout(() => { this.commonMoveIssueDetail(event, true, false, false, this.activeSprint.sprintTitle) }, 1000)
    } else if (
      event.container.id == 'active_sprint' &&
      event.previousContainer.id == 'futureSprint'
    ) {
      setTimeout(() => { this.commonMoveIssueDetail(event, true, false, false, this.activeSprint.sprintTitle); }, 1000)
    }

    if (
      event.previousContainer.id == 'active_sprint' &&
      event.container.id == 'blockSprint'
    ) {
      setTimeout(() => { this.commonMoveIssueDetail(event, false, true, false) }, 1000)
    } else if (event.previousContainer.id == event.container.id || (event.container.id == 'futureSprint' &&
      (event.previousContainer.id == 'active_sprint' || event.previousContainer.id == 'blockSprint'))) {
      this.isLoding = false;
    }
  }

  getSprintList() {
    this.activeSprintList = [];
    this.futureSprintList = [];
    this.blockSprintList = [];
    setTimeout(() => {
      this.commonService.getSprintData().pipe(takeUntil(this.ngUnsubscribe)).subscribe((resData: any) => {
        this.activeSprint = resData.find((res: any) => res.status == 'Active')
        this.getIssueData();
      });
      this.isLoding = false;
    }, 500);
  }
  getIssueData() {
    this.commonService.getIssueData().pipe(takeUntil(this.ngUnsubscribe)).subscribe((resData: any) => {
      resData.forEach((res: any) => {
        if (res['isActive'] || this.activeSprint.sprintTitle == res.sprintName) {
          res['isActive'] = true;
          this.activeSprintList.push(res);
        } else if (res['isFutureSprint'] || (!res?.sprintName && !res['isBackLog'])) {
          res['isFutureSprint'] = true;
          this.futureSprintList.push(res);
        } else if (res['isBackLog']) {
          this.blockSprintList.push(res);
        }
      })
    })
  }

  insertCard(value: string) {
    this.isAddNewModalShown = '';
    if (value === 'active_sprint') {
      const data = { name: this.newAddedData };
      this.activeSprintList.push(data);
    }
  }

  cancelData() {
    this.newAddedData = '';
    this.isAddNewModalShown = '';
  }

  toggleTextArea() {
    this.description = ''
    this.textAreaVisible = !this.textAreaVisible;
  }

  adddescription(index: number) {
    this.textAreaVisible = true;
    this.activeSprintList[index].description = this.description;
    this.commonService.updateIssueData(this.activeSprintList[index]).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => { })
  }

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

  commonMoveIssueDetail(event: any, isActive: boolean, isBackLog: boolean, isFutureSprint: boolean, sprintName?: string) {

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
    setTimeout(() => {
      this.selectedSprint = event.container.data[event.currentIndex];
      this.selectedSprint['isActive'] = isActive;
      this.selectedSprint['isBackLog'] = isBackLog;
      this.selectedSprint['isFutureSprint'] = isFutureSprint;
      this.selectedSprint['sprintName'] = sprintName || '';
      this.commonService.updateIssueData(this.selectedSprint).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => { })
      this.isLoding = false;
    }, 1000);

  }
}