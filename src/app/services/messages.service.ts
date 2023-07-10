import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
	_messages: string[] = [];

	add(msg: string) {
		this._messages.push(msg);
	}

	clean() {
		this._messages = [];
	}
}
