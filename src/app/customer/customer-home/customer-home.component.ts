import { CustomerType } from './../../enum/customer-type';
import { Customer } from './../../model/customer';
import { CustomerService } from './../customer.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.css']
})
export class CustomerHomeComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  customers: Customer[] = [];
  totalCustomerCount: number = 0;
  customerSelected = false;
  selectedCustomer: Customer;
  selectedEditCustomer: Customer;
  customerType: number;
  customerAdd = false;
  addSelected = false;
  editSelected = false;


  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getAllCustomers()
  }

  getAllCustomers(){
      this.subscriptions.push(
        this.customerService.getAllCustomers().subscribe(
          (response: Customer[]) => {
          this.customers = response;
          this.totalCustomerCount = response.length;
          this.customerSelected = true;
          this.selectedCustomer = response[0];
          this.checkCustomerType(response);
          },
          (errorResponse: HttpErrorResponse) => {
           this.alertMessage(errorResponse);
          }
        )
      );
  }

 

  checkCustomerType(customers: Customer[]){
    customers.forEach(customer => {
      if(customer.customerType == 'REGULAR'){
        this.customerType = 1;
        console.log(customer.firstName, this.customerType);
      }
      if(customer.customerType == 'BUSINESS'){
        this.customerType = 2;
        console.log(customer.firstName, this.customerType);
      }
      if(customer.customerType == 'LOYALITY_MEMBER'){
        this.customerType = 3;
        console.log(customer.firstName, this.customerType);
      }
    })
      
  }
  
  editCustomer(editCustomer: Customer){
    this.customerSelected = false;
    this.addSelected = false;
    this.editSelected = true;
    this.selectedEditCustomer = editCustomer;
  }


  onSelectCustomer(customer: Customer){
    this.addSelected = false;
    this.editSelected = false;
    this.customerSelected = true;
    this.selectedCustomer = customer;
  }

  onAddCustomer(){
    this.customerSelected = false;
    this.addSelected = true;
  }

  onSubmitEditCustomer(){
    console.log(this.selectedEditCustomer);
    this.subscriptions.push(
      this.customerService.updateCustomer(this.selectedEditCustomer).subscribe(
        (response: Customer) => {
          this.ngOnInit();
          // alert(`${response.firstName} updated successfully`);
        },
        (errorResponse: HttpErrorResponse) => {
          this.alertMessage(errorResponse);
        }
      )
    );
  }
  
  onSubmitAddCustomer(customer: Customer){
    this.subscriptions.push(
      this.customerService.registerCustomer(customer).subscribe(
        (response: Customer) => {
          this.ngOnInit();
          this.addSelected = false;
          // alert(`${response.firstName} added successfully`);
        },
        (errorResponse: HttpErrorResponse) => {
          this.alertMessage(errorResponse);
        }
      )
    );
  }

  deleteCustomer(customerId: number){
    if(window.confirm(`Are sure you want to delete ${this.selectedCustomer.firstName} ?`)){
      this.subscriptions.push(
        this.customerService.deleteCustomer(customerId)
        .subscribe(
          (response: string) => {
            console.log(response);
            this.ngOnInit();
            alert(`Customer Deleted Successfully`);
          }
        )
      );
     }
  }

  private clickButton(buttonId: string): void {
    document.getElementById(buttonId).click();
  }

  private alertMessage(errorResponse: HttpErrorResponse){
    if(errorResponse.error.message){
      alert(errorResponse.error.message);
    }else{
      alert("Something went wrong...");
    }
  }


}
