import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AddIssueComponent } from 'src/app/modules/sprint/add-issue/add-issue.component';
import { AddSprintComponent } from 'src/app/modules/sprint/add-sprint/add-sprint.component';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isHeaderShown!: boolean;
  issueRef!: BsModalRef;
  sprintRef!: BsModalRef;
  getUser: any;
  button: any;
  ismodalLoading: boolean = false;
  @ViewChild('sprint', { static: true }) sprint!: TemplateRef<any>;
  @ViewChild('issue', { static: true }) issue!: TemplateRef<any>;

  constructor(private router: Router, private service: CommonService,
    private _bsModalService: BsModalService,
    private commonService: CommonService
  ) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.isHeaderShown = event.url === '/auth/login' || event.url === '/auth' || event.url === '/login' ? false : true;
      }
    })
  }

  ngOnInit(): void {
    this.getUser = JSON.parse(localStorage.getItem('Login') as any);
    this.service.button.subscribe((res) => {
      this.button = res;
    })
  }


  SearchDetail(event: any) {
    this.commonService.searchedData.next(event.target.value);
  }


  addSprint(template: TemplateRef<any>) {
    this.sprintRef = this._bsModalService.show(
      AddSprintComponent,
      Object.assign(
        {},
        {
          modalClass: 'modal-dialog',
          class: 'modal-lg modal-full'
        }
      )
    )
  }

  addIssue(template: TemplateRef<any>) {
    this.issueRef = this._bsModalService.show(
      AddIssueComponent,
      Object.assign(
        {},
        {
          modalClass: 'modal-dialog',
          class: 'modal-lg modal-full'
        }
      )
    )
  }

  logOut() {
    this.getUser = null;
    localStorage.clear();
    this.router.navigate(['auth']);
    this.button = false;
  }
}
