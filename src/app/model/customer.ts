import { CustomerType } from "../enum/customer-type";

export class Customer{
    public customerId: number;
    public firstName: string;
    public lastName: string;
    public dob: Date;
    public phone: string;
    public address: string;
    public customerType: CustomerType;
}