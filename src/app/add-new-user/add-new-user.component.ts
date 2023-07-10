import { Component, OnInit } from '@angular/core';
import { Users } from '../models/users';
import { UsersService } from '../services/users.service';
import { MessagesService } from '../services/messages.service';

@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.css']
})
export class AddNewUserComponent implements OnInit {
	_userAdd: Users[] = [];

	constructor(private _userService: UsersService,private _msgService: MessagesService) {}

	ngOnInit(): void {
		this.getAllUsers();
	}

	getAllUsers(): void {
		this._userService.getAllUsers().subscribe(user => user = this._userAdd);
	}

	
	//ADD Email
	add(_email: string): void {
		_email = _email.trim();
		if(!_email) { return; }
		this._userService.addUser({ _email } as unknown as Users)
			.subscribe(user => {this._userAdd.push(user);});
	}

	//Add UserName
	addUserName(_userName: string): void {
		_userName = _userName.trim();
		if(!_userName) { return; }
		this._userService.addUser({ _userName } as unknown as Users)
			.subscribe(userName => {this._userAdd.push(userName);});
	}
	
	//Delete
	delete(user: Users): void {
		this._userAdd = this._userAdd.filter(u => u !== user);
		this._userService.deleteUser(user._id).subscribe();
	}

	cadastrarUser(usr: string,name: string){
		if(!usr.trim() || !name.trim()){ return this._msgService.add(`Preencha o campo E-mail and UserName`);}
		const str = this._userAdd.map(u => u._id);
		const userId = this._userAdd.filter(v => v._id);
		this._msgService.add(`MessagesService: E-mail=${usr}: Id=${userId}`);
		return usr;
	}

}
