import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl : String = 'http://localhost:8080/api';
  // fullname = sessionStorage.getItem('name')+' '+sessionStorage.getItem('surname')



  constructor(private http :HttpClient) { }

 

}
