import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, tap, retry  } from 'rxjs/operators';

import { Users } from '../models/users';
import { USERs } from '../models/mock-users';
import { MessagesService } from './messages.service';
import { InMemoryDataService } from '../services/in-memory-data.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

	private uri = 'api/users';

 	//Headers
	httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

	constructor(private httpClient: HttpClient, private _messageService: MessagesService) { }
	/*
	_getAllUsers(): Observable<Users[]> {
		//const USER = of(USERs);
		this._messageService.add(`MessagesService: fetched USERs`);
		return this.httpClient.get<Users[]>(this.uri);
	 }
	_getUsersById(id: number): Observable<Users> {
		const user =  USERs.find(use => use._id === id)!;
		this._messageService.add(`MessagesService: fetched user id=${id}`);
		return of(user);
	}*/

	getAllUsers(): Observable<Users[]> {
		return this.httpClient.get<Users[]>(this.uri)
			.pipe(
				tap(_ => this.log('fetched Users')),
				catchError(this.handleError<Users[]>('getAllUsers', []))
	      		);
	}
  getUsersNo404<Data>(id: number): Observable<Users> {
	const urlGet = `${this.uri}/?id=${id}`;
    	return this.httpClient.get<Users[]>(urlGet)
      		.pipe(
        		map(user => user[0]), // returns a {0|1} element array
       			tap(h => {
         			const outcome = h ? 'fetched' : 'did not find';
         			this.log(`${outcome} user id=${id}`);
       			 }),
        		catchError(this.handleError<Users>(`getuser_404 id=${id}`))
      		);
  	}

  getUsersById(id: number): Observable<Users> {
	const urlId = `${this.uri}/${id}`;
	    return this.httpClient.get<Users>(urlId).pipe(
	      tap(_ => this.log(`fetched user id=${id}`)),
	      catchError(this.handleError<Users>(`getUsersById id=${id}`))
    );
  }	

  /* GET  whose name contains search term */
  searchUser(term: string): Observable<Users[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.httpClient.get<Users[]>(`${this.uri}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found user matching "${term}"`) :
         this.log(`no user matching "${term}"`)),
      catchError(this.handleError<Users[]>('searchUser', []))
    );
  }
  /*
  search(userName: string): Observable<Users[]> {
	if(!userName.trim()) {
		return of([]);
	}
  }
  */
  //////// Save methods //////////

  /** POST: add a new User to the server */
  addUser(user: Users): Observable<Users> {
    return this.httpClient.post<Users>(this.uri, user, this.httpOptions).pipe(
      tap((newUser: Users) => this.log(`added User w/ id=${ newUser._id}`)),
      catchError(this.handleError<Users>('addUser'))
    );
  }

  /** PUT: update the User on the server */
  updateUser(user: Users): Observable<any> {
    return this.httpClient.put(this.uri, user, this.httpOptions).pipe(
      tap(_ => this.log(`updated user id=${user._id}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }

  /** DELETE: delete the User from the server */
  deleteUser(id: number): Observable<Users> {
    const urlDelete = `${this.uri}/${id}`;
    return this.httpClient.delete<Users>(urlDelete, this.httpOptions).pipe(
      tap(_ => this.log(`deleted user id=${id}`)),
      catchError(this.handleError<Users>('deleteUser'))
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

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(msg: string) {
    this._messageService.add(`MessagesService log: ${msg}`);
  }


}






