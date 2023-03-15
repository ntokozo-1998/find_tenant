import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  helper: any;

  // private helper = new JwtHelperService();
  

  constructor() { }
  
  getData(token: string)
  { 
    return this.helper.decodeToken(token);
  }
}
