import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  button = new Subject();
  searchedData =new Subject();
  sprintTitle =new Subject();
  
  constructor(private http:HttpClient) { }

  postIssueData(data:any){
    return this.http.post("http://localhost:3000/issueData",data);
  }

  postSprintData(data?:any){
    return this.http.post("http://localhost:3000/sprintData",data);
  }
  getSprintData(data?:any){
    data = !!data ? data : '';
    return this.http.get(`http://localhost:3000/sprintData?q=${data}`);
  }
  getIssueData(data?:any){
    data = !!data ? data : '';
    return this.http.get(`http://localhost:3000/issueData?q=${data}`);
  }

  updateSprintData(data?:any){
    return this.http.put(`http://localhost:3000/sprintData/${data.id}`, data);
  }

  updateIssueData(data?:any){
    return this.http.put(`http://localhost:3000/issueData/${data.id}`, data);
  }
}
