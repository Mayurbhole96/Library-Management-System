import { Component, OnInit,ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal, { SweetAlertOptions } from "sweetalert2";
import { Router } from '@angular/router';
import {SharedService} from 'src/app/shared.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  register!: FormGroup;
  submitted = false;
  BTN_VAL = 'Submit';
  reconcilationMstName = [];
  filteredSourceNames = [];
  preprocess_id_while = null;
  loading:boolean = false;


  constructor(private sharedservice: SharedService, private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.register = this.formBuilder.group({
      email: ['', Validators.required],
      password1: ['', Validators.required],
      password2: ['', Validators.required]
    });

  }//ngOnInit

  showSwalMassage(massage: any,icon: any): void {
    Swal.fire({
      title: massage,
      icon: icon,
      timer: 2000,
      showConfirmButton: false
    });
  }

  onSubmit() {
    if (this.register.invalid) {
      return;
  }
  else{
       this.sharedservice.gotoSignup(this.register.value).subscribe((data:any)=>{
        
            this.showSwalMassage('Your record has been added successfully!','success')
       
          this.router.navigate(['/login']).then(() => {
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
