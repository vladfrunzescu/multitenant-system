import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EMarket } from '../model/e-market.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  private getAuthHeader(username: string, password: string): HttpHeaders {
    const credentials = btoa(`${username}:${password}`);
    return new HttpHeaders({
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/json',
      'X-TenantID': 'e-market'
    });
  }

  sendRequestToServer(): Observable<any> {
    const url = 'http://localhost:8082/api/send';
    const headers = this.getAuthHeader("user", "password");
    const options = {
      headers: headers
    };
    console.log('Sending request to server:', url, options);
    return this.http.get(url, options);
  }

  getAllDataFromServer(): Observable<any> {
    const url = 'http://localhost:8082/api/data';
    const headers = this.getAuthHeader("user", "password");
    const options = {
      headers: headers
    };
    console.log('Getting all data from server:', url, options);
    return this.http.get(url, options);
  }

  getItems(): Observable<EMarket[]> {
    const url = 'http://localhost:8082/api/items';
    const headers = this.getAuthHeader("user", "password");
    const options = {
      headers: headers
    };

    return this.http.get<EMarket[]>(url, options);
  }
}
