import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Contact } from './contact';
import 'rxjs';

@Injectable()
export class ContactService {

  constructor(private http: Http) { }

  //Retriving contacts
  getContacts() {
    return this.http.get('http://localhost:3000/api/contacts').map(res => res.json());
  }

  //Add Contact
  addContact(newContact) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/contact', newContact, { headers: headers }).map(res => res.json());
  }

  //Delete Contact
  deleteContact(id) {
    return this.http.delete('http://localhost:3000/api/contact/' + id).map(res => res.json());
  }

  //Update Contact
  updateContact(updateContact) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/api/contact/'+updateContact._id, updateContact, { headers: headers }).map(res => res.json());
  }

}
