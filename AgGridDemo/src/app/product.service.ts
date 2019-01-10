import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable()
export class ProductService {
  url = '';
  constructor(private http: HttpClient) {
    this.url = "http://services-dev.xylem.net/Poseidon/api/" + 'ProductConfigurations?gridmode=true';
  }
  getProducts(pageSize?: number, filterString = ''): Observable<any> {
    if (pageSize) {
      return this.http.get(this.url + '&pageSize=' + pageSize + filterString, { observe: 'response' }).pipe(map((res: HttpResponse<any>) => this.extractData(res)));
    }
    return this.http.get(this.url + filterString, { observe: 'response' }).pipe(map((res: HttpResponse<any>) => this.extractData(res)));;
  }
  private extractData(res: HttpResponse<any>) {
    let body = res.body
    let paginationInfo = JSON.parse(res.headers.get('X-Pagination'));
    let fieldInfo = JSON.parse(res.headers.get('X-FieldInfo'));
    let result = { data: body, paginationInfo: paginationInfo, fieldInfo: fieldInfo }
    return result || {};
  }
}
