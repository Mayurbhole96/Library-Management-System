import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import {SharedService} from 'src/app/shared.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  displayColumns = [
    'actions',
    'book_name',
    'book_auther'
  ];

  bookForm!: FormGroup;
  submitted = false;
  BTN_VAL='Submit';
  Updated_Date_Time: Date;
  bookdata!: any[];
  sidebarData: any;

  list_form:boolean=true;
  list_title:boolean=true;
  btn_new_entry:boolean=true;
  btn_list:boolean=true;
  new_entry_form:boolean=true;
  new_entry_title:boolean=true;
  submit:boolean=true;

  constructor(private router: Router, private formBuilder: FormBuilder,
              private sharedservice: SharedService) {
                this.Updated_Date_Time = new Date();
               }
  ngOnInit() {
    this.showList()
    this.bookForm = this.formBuilder.group({
      book_name: ['',[Validators.required, Validators.maxLength(20), Validators.pattern("^[a-zA-Z0-9_ ]*$")]],
      book_auther: [''],
      is_active: true,
      is_deleted: false,
      updated_date_time:this.Updated_Date_Time
   });

    this.new_entry_form=false;
    this.new_entry_title=false;
    this.btn_list=false;

    this.sharedservice.getBookData().subscribe((data)=>{
      this.bookdata = data;
    });
  }

  editBookData(book:any){
    this.bookForm.patchValue({
      book_name: book.book_name,
      book_auther: book.book_auther,
      id: book.id,
      updated_date_time:this.Updated_Date_Time
    });
    this.BTN_VAL='Update';
    const id = book.id;
		if(id!='')
		{
      this.new_entry_form=true;
      this.new_entry_title=true;
      this.btn_list=false;
      this.btn_new_entry=false;
      this.list_form=false;
      this.list_title=false;
		}
  }

  viewAllMasterData(book:any){
    this.bookForm.patchValue({
      book_name: book.book_name,
      book_auther: book.book_auther,
      id: book.id,
    });

    const id = book.id;
		if(id!='')
		{
      this.new_entry_form=true;
      this.new_entry_title=true;
      this.btn_list=false;
      this.btn_new_entry=false;
      this.list_form=false;
      this.list_title=false;
      this.submit=false;
		}
  }

  showSwalMassage(massage: any,icon: any): void {
    Swal.fire({
      title: massage,
      icon: icon,
      timer: 2000,
      showConfirmButton: false
    });
  }

  deleteBookData(id:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
    }).then((result) => {
  			if (result.value){
  				this.sharedservice.deleteBookData(id).subscribe((data:any)=>{
            this.showSwalMassage('Your record has been deleted successfully!','success')
        		})
          this.router.navigate(['/book']).then(() => {
            setTimeout(function() {window.location.reload();} , 2000);
          });
  			}
			else if (result.dismiss === Swal.DismissReason.cancel){
    			Swal.fire({icon: 'error', title: 'Canceled!', text: 'Your data is safe :)', showConfirmButton: false, timer: 3000})
  			}
		})
  }

  showNewEntry()
  {
    this.list_form=false;
    this.list_title=false;
    this.btn_new_entry=false
    this.btn_list=true;
    this.new_entry_form=true;
    this.new_entry_title=true;
  }

	showList()
  {
    this.list_form=true;
    this.list_title=true;
    this.btn_new_entry=true;
    this.btn_list=false;
    this.new_entry_form=false;
    this.new_entry_title=false;
  }

  // tbl_FilterDatatable(value:string) {
  //   this.bookdata.filter = value.trim().toLocaleLowerCase();
  // }

  onSubmit() {
    this.submitted = true;
    // if(this.bookdata){
    //   for(let res in this.bookdata.filteredData){
    //     if(this.BTN_VAL=='Update' && this.bookdata.filteredData[res].id != this.bookForm.value.id && this.bookdata.filteredData[res].book_name==this.bookForm.value.book_name){

    //       Swal.fire({
    //         title: 'Record Already Exist!',
    //         text: 'Book Name should be unique',
    //         icon: 'warning',
    //         showConfirmButton: false
    //       });
    //       return;
    //     }
    //     if(this.BTN_VAL=='Submit' && this.bookdata.filteredData[res].book_name==this.bookForm.value.book_name){
    //       Swal.fire({
    //         title: 'Record Already Exist!',
    //         text: 'Book Name should be unique',
    //         icon: 'warning',
    //         showConfirmButton: false
    //       });
    //       return;
    //     }
    //   }
    // }
    if (this.bookForm.invalid) {
        return;
    }
    else{
         this.sharedservice.saveBookData(this.bookForm.value).subscribe((data:any)=>{
            if (data['status'] == 1) {
              this.showList();
              this.showSwalMassage('Your record has been updated successfully!','success')
            }
            else if(data['status'] == 2) {
              this.showList();
              this.showSwalMassage('Your record has been added successfully!','success')
            }
            this.router.navigate(['/book']).then(() => {
              setTimeout(function() {window.location.reload();} , 2000);
            });
          },
          error=>{
            Swal.fire({
              title: 'Something went wrong!',
              icon: 'warning',
              timer: 2000,
              showConfirmButton: false
            });
          });
    }
  }
}
export interface bookMasterElement {
  id:any;
  book_name:string;
  book_auther:string
}