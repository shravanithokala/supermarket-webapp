import { Customer } from './../model/customer';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.host}/customers/all`);
  }

  public registerCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.host}/customers/save`, customer);
  }

  public updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.host}/customers/update`, customer);
  }

  public deleteCustomer(id: number): Observable<string> {
    return this.http.delete<string>(`${this.host}/customers/delete/${id}`);
  }
}
