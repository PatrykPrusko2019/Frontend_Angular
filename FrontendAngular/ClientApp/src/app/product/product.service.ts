import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from '../message/message.service';
import { ProductDto } from '../models/product/productDto';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productUrl = 'https://localhost:7067/api/product';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
    

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private toastr: ToastrService) { }


  /** GET products from the server */
  getAll(): Observable<ProductDto[]> {
    return this.http.get<ProductDto[]>(this.productUrl)
      .pipe(
        
        catchError(this.handleError<ProductDto[]>('getAll', []))
      );
  }

  /** POST: add a new product to the server */
  createProduct(productDto: ProductDto): Observable<ProductDto> {
    return this.http.post<ProductDto>(this.productUrl, productDto, this.httpOptions).pipe(
      tap((newProduct: ProductDto) => this.log(`ADDED new product`)),
      catchError(this.handleError<ProductDto>('createProduct'))
    );

  }

  /** GET product by id. Will 404 if id not found */
  getById(id: number): Observable<ProductDto> {
    const url = `${this.productUrl}/${id}`;
    return this.http.get<ProductDto>(url).pipe(
      tap(_ => this.log(`fetched product id=${id}`)),
      catchError(this.handleError<ProductDto>(`getById id=${id}`))
    );
  }


  /**
  * Handle Http operation that failed.
  * Let the app continue.
  *
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {


      this.toastr.error(error.status + " -> no found documentId, or Price, Unit Pieces must be number", 'ERROR:')
      


      // TODO: send the error to remote logging infrastructure
      this.log(error.status + " -> no found documentId, or Price, Unit Pieces must be number"); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }



  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ProductService: ${message}`);
  }
}
