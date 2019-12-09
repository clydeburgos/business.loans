import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

    @Injectable({
        providedIn: "root"
    })
    export class CustomerService {
    constructor(private httpClient: HttpClient){
    }

    saveCustomer<T>(payload: any): Observable<T>{
    return this.httpClient.post<T>(`customer/save`, payload);
    }

    deleteCustomer<T>(id: number,payload: any): Observable<T>{
    return this.httpClient.post<T>(`customer/delete/${id}`, payload);
    }

    getCustomer<T>(id: number) : Observable<T>{
    return this.httpClient.get<T>(`customer/get/${id}`);
    }

    getCustomers<T>() : Observable<T>{
    return this.httpClient.get<T>(`customer/getall`);
    }

    searchCustomer<T>(keyword: string):Observable<T>{
    return this.httpClient.get<T>(`ustomer/search/${keyword}`);
    }
}
