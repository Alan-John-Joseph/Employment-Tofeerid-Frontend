import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmployeeDetails } from '../emp-details.interface';

@Component({
  selector: 'app-home',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private httpSvc: HttpClient) { }

  employees$ = this.httpSvc.get<IEmployeeDetails[]>('http://15.207.222.215:8080/api/employees');

  ngOnInit(): void {
  }

}
