import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Users } from '../models/users';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.css']
})
export class UsersDetailsComponent {
	
	user: Users | undefined;

	constructor(
		private route: ActivatedRoute,
		private userService: UsersService,
		private location: Location
	) {}

	ngOnInit(): void {
		this.getUser();
	}

	getUser(): void {
		const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
		this.userService.getUsersById(id).subscribe(user => this.user = user);
	}

	goBack(): void {
		this.location.back();
	}

	save(): void {
		if(this.user){
			this.userService.updateUser(this.user)
				.subscribe(() => this.goBack());
		}
	}
}
