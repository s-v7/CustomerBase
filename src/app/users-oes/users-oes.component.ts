import { Component, OnInit } from '@angular/core';
import { Users } from '../models/users';
import { UsersService } from '../services/users.service';
import { MessagesService } from '../services/messages.service';

@Component({
  selector: 'app-users-oes',
  templateUrl: './users-oes.component.html',
  styleUrls: ['./users-oes.component.css']
})
export class UsersOesComponent implements OnInit {

	_userOes: Users[] = [];

	constructor(private _userService: UsersService, private _messageService: MessagesService) { }

	ngOnInit(): void {
		this.getAllUsers();
	}

	getAllUsers(): void {
		this._userService.getAllUsers().subscribe(user => user = this._userOes);
	}
	

	//ADD Email
	add(_email: string): void {
		_email = _email.trim();
		if(!_email) { return; }
		this._userService.addUser({ _email } as unknown as Users)
			.subscribe(user => {this._userOes.push(user);});
	}

	//Add UserName
	addUserName(_userName: string): void {
		_userName = _userName.trim();
		if(!_userName) { return; }
		this._userService.addUser({ _userName } as unknown as Users)
			.subscribe(userName => {this._userOes.push(userName);});
	}
	
	//Delete
	delete(user: Users): void {
		this._userOes = this._userOes.filter(u => u !== user);
		this._userService.deleteUser(user._id).subscribe();
	}

	cadastrarUser(usr: string,name: string){
		if(!usr.trim() || !name.trim()){ return this._messageService.add(`Preencha o campo E-mail and UserName`);}
		const str = this._userOes.map(u => u._id);
		const userId = this._userOes.filter(v => v._id);
		this._messageService.add(`MessagesService: E-mail=${usr}: Id=${userId}`);
		return usr;
	}


}
