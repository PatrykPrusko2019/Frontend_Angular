import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ProviderDto } from '../models/provider/providerDto';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  private providerUrl = 'https://localhost:7067/api/provider';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(
    private http: HttpClient, private toastr: ToastrService) { }

    
  /** GET providers from the server */
  getAll(): Observable<ProviderDto[]> {
    return this.http.get<ProviderDto[]>(this.providerUrl)
      .pipe(
        tap(_ => this.log('fetched providers')),
        catchError(this.handleError<ProviderDto[]>('getAll', []))
      );
  }

  /** GET provider by id. Will 404 if id not found */
  getById(id: number): Observable<ProviderDto> {
    const url = `${this.providerUrl}/${id}`;
    return this.http.get<ProviderDto>(url).pipe(
      tap(_ => this.log(`fetched provider id=${id}`)),
      catchError(this.handleError<ProviderDto>(`getById id=${id}`))
    );
  }

  //////// Save methods //////////

  /** POST: add a new provider to the server */
  createProvider(providerDto: ProviderDto): Observable<ProviderDto> { 
    return this.http.post<ProviderDto>(this.providerUrl, providerDto, this.httpOptions).pipe(
      tap((newProvider: ProviderDto) => this.log(`added provider w/ id=${newProvider.id}`)),
      catchError(this.handleError<ProviderDto>('createProvider'))
    );

  }

  /** DELETE: delete the provider from the server */
  delete(id: number): Observable<ProviderDto> {
    const url = `${this.providerUrl}/${id}`;

    return this.http.delete<ProviderDto>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted provider id=${id}`)),
      catchError(this.handleError<ProviderDto>('deleteHero'))
    );
  }

  /** PUT: update the provider on the server */
  update(provider: ProviderDto): Observable<ProviderDto> {
    return this.http.put<ProviderDto>(`${this.providerUrl}/${provider.id}`, provider, this.httpOptions).pipe(
      tap(_ => this.log(`updated provider id=${provider.id}`)),
      catchError(this.handleError<any>('update'))
    );
  }



  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      this.toastr.error(error.message, ' ');
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a ProviderService message with the MessageService */
  private log(message: string) {
   //this.messageService.add(`ProviderService: ${message}`);
  }
}
