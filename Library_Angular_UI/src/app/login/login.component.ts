import { Component, OnInit,ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal, { SweetAlertOptions } from "sweetalert2";
import { Router } from '@angular/router';
import {SharedService} from 'src/app/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginprocess!: FormGroup;
  submitted = false;
  BTN_VAL = 'Submit';
  reconcilationMstName = [];
  filteredSourceNames = [];
  preprocess_id_while = null;
  loading:boolean = false;


  constructor(private sharedservice: SharedService, private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.loginprocess = this.formBuilder.group({
      email: ['', Validators.required],
      password1: ['', Validators.required],
    });

  }//ngOnInit

  // showSwalMassage(massage: any,icon: any): void {
  //   Swal.fire({
  //     title: massage,
  //     icon: icon,
  //     timer: 2000,
  //     showConfirmButton: false
  //   });
  // }

  onSubmit() {

  if (this.loginprocess.invalid) {
    return;
  }
  else{
       this.sharedservice.gotoLogin(this.loginprocess.value).subscribe((data:any)=>{
        Swal.fire({
          title: 'Your Login successfully!',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });

          this.router.navigate(['/book']).then(() => {
            setTimeout(function() {window.location.reload();} , 2000);
          });
        },
         (        error: SweetAlertOptions<any, any>)=>{
          Swal.fire({
            title: 'Something went wrong!',
            icon: 'warning',
            timer: 2000,
            showConfirmButton: false
          });
        });
  }
  }//onSubmit

}//OnInit