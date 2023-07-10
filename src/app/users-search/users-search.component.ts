import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Users} from '../models/users';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users-search',
  templateUrl: './users-search.component.html',
  styleUrls: ['./users-search.component.css']
})
export class UsersSearchComponent implements OnInit {

	_userOes$!: Observable<Users[]>;
	
	private searchTerm =  new Subject<string>();

	constructor(private userService: UsersService){}

	//Push
	search(sch: string): void {
		this.searchTerm.next(sch);
	}
  	ngOnInit(): void {
    		this._userOes$ = this.searchTerm.pipe(
     		 // wait 300ms after each keystroke before considering the term
      		debounceTime(300),

      		// ignore new term if same as previous term
      		distinctUntilChanged(),

     		 // switch to new search observable each time the term changes
      		switchMap((sch: string) => this.userService.searchUser(sch)),
    	 );
       }
}
