import { Component, OnInit, Input } from '@angular/core';
import { Users } from '../models/users';
import { UsersService } from '../services/users.service';
import { MessagesService } from '../services/messages.service';
import { FormControl, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-dashboard-users',
  templateUrl: './dashboard-users.component.html',
  styleUrls: ['./dashboard-users.component.css']
})
export class DashboardUsersComponent implements OnInit {
	
	 _users: Users[] = [];

   	checkOutForm = this.formBuilder.group({
		  _id: '',
		  _email: '',
		  _userName: ''
	  });
  

	constructor(private _userService: UsersService, 
			private _messageService: MessagesService
	) { }

	ngOnInit(): void {
		this.getUsers();
	}

	getUsers(): void {
		this._userService.getAllUsers().subscribe(user => user = this._users.slice(1,7));
	}

	//ADD Email
	add(_email: string): void {
		_email = _email.trim();
		if(!_email) { return; }
		this._userService.addUser({ _email } as unknown as Users)
			.subscribe(user => {this._users.push(user);});
	}

	//Add UserName
	addUserName(_userName: string): void {
		_userName = _userName.trim();
		if(!_userName) { return; }
		this._userService.addUser({ _userName } as Users)
			.subscribe(userName => {this._users.push(userName);});
	}
	
	//Delete
	delete(user: Users): void {
		this._users = this._users.filter(u => u !== user);
		this._userService.deleteUser(user._id).subscribe();
	}

	cadastrarUser(usr: string,name: string){
		if(!usr.trim() || !name.trim()){ return this._messageService.add(`Preencha o campo E-mail and UserName`);}
		const str = this._users.map(u => u._id);
		const userId = this._users.filter(v => v._id);
		this._messageService.add(`MessagesService: E-mail=${usr}: Id=${userId}`);
		return usr;
	}
	addT(usr: Users): void {
		this._userService.addUser({ usr } as unknown as Users)
			.subscribe(user => {this._users.push(user);});
	}
}
