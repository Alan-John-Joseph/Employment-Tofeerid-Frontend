import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  empForm = new FormGroup({
    id: new FormControl('', Validators.required),
    empFirstName: new FormControl('', Validators.required),
    empLastName: new FormControl('', Validators.required),
    empGender: new FormControl('', Validators.required),
    empDateOfBirth: new FormControl('', Validators.required),
    empDateOfJoining: new FormControl('', Validators.required),
    empPhoneNumber: new FormControl('', Validators.required),
    empEmailId: new FormControl('', [Validators.required, Validators.email]),
    empHomeAddrLine1: new FormControl('', Validators.required),
    empHomeAddrLine2: new FormControl('', Validators.required),
    empHomeAddrStreet: new FormControl('', Validators.required),
    empHomeAddrDistrict: new FormControl('', Validators.required),
    empHomeAddrState: new FormControl('', Validators.required),
    empHomeAddrCountry: new FormControl('', Validators.required),
    empHomeAddrPinCode: new FormControl('', Validators.required),
  })

  isEdit = false;
  empId = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpSvc: HttpClient
  ) { }

  ngOnInit(): void {
    this.route.url.subscribe((url) => {
      const pathEnd = url.pop()?.path;
      this.isEdit = pathEnd === 'edit';
    })
    this.route.params.subscribe(({ id }) => {
      if (id) {
        this.getEmpDetails(id);
        this.empId = id;
      }
    });
  }

  private getEmpDetails(id: number) {
    this.httpSvc.get(`http://15.207.222.215:8080/api/employees/${id}`).subscribe(
      (details) => {
        this.empForm.setValue(details as any);
      }
    )
  }

  saveDetails() {
    let saver: Observable<any>;
    const payload = this.empForm.getRawValue();
    if (this.isEdit) {
      saver = this.httpSvc.put(`http://15.207.222.215:8080/api/employees/${this.empId}`, payload)
    } else {
      saver = this.httpSvc.post(`http://15.207.222.215:8080/api/employees`, payload)
    }
    saver.subscribe(({ id }) => {
      this.router.navigate(['/employee', id])
    });
  }

}
