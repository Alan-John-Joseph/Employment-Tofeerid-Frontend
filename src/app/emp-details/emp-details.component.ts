import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IEmployeeDetails } from '../emp-details.interface';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view',
  templateUrl: './emp-details.component.html',
  styleUrls: ['./emp-details.component.css']
})
export class ViewComponent implements OnInit {
  empdetails$!: Observable<IEmployeeDetails>;

  constructor(
    private route: ActivatedRoute,
    private httpSvc: HttpClient
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      this.empdetails$ = this.httpSvc.get<IEmployeeDetails>(`http://15.207.222.215:8080/api/employees/${id}`)
    })
  }

}
