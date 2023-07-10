import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
	createDb() {
		const users = [
			{_id: 11, _email: 'abc@gmail.com', _userName: 'Silas Vasconcelos'},
			{_id: 12, _email: 'abcd@gmail.com', _userName: 'Fulano'},
			{_id: 13, _email: 'abce@gmail.com', _userName: 'beltrano'},
			{_id: 14, _email: 'abcf@gmail.com', _userName: 'ciclano'},
			{_id: 15, _email: 'abcg@gmail.com', _userName: 'xalalu'}
		];

		return {users};
	}
 
	genId(users: Users[]): number {
		return users.length > 0 ? Math.max(...users.map(user => user._id)) + 1 : 11;
	}
}
