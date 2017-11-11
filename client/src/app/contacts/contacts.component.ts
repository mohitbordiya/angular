import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from '../contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: [ContactService]
})
export class ContactsComponent implements OnInit {
  contacts: Contact[];
  contact: Contact;
  first_name: string = '';
  last_name: string = '';
  phone: string = '';
  email: string = '';
  _id: string = '';
  update = false;
  add = true;
  constructor(private contactService: ContactService) { }


  addContact() {
    const newContact = {
      first_name: this.first_name,
      last_name: this.last_name,
      phone: this.phone,
      email: this.email
    }
    this.contactService.addContact(newContact).subscribe(contact => {
      this.contacts.push(contact);
      this.contactService.getContacts().subscribe(contacts => this.contacts = contacts);
      this.first_name = '';
      this.last_name = '';
      this.phone = '';
      this.email = '';
    });
  }


  deleteContact(id: any) {
    var contacts = this.contacts;
    this.contactService.deleteContact(id).subscribe(data => {
      if (data.n == 1) {
        for (var i = 0; i < contacts.length; i++) {
          if (contacts[i]._id == id) {
            contacts.splice(i, 1);
          }
        }
      }
    })
  }


  updateContactForm(id: any) {

    this.update = true;
    this.add = false;
    var contacts = this.contacts;
    for (var i = 0; i < contacts.length; i++) {
      if (contacts[i]._id == id) {
        this.first_name = contacts[i].first_name;
        this.last_name = contacts[i].last_name;
        this.phone = contacts[i].phone;
        this.email = contacts[i].email;
        this._id = contacts[i]._id;
      }
    }
  }

  updateContact() {
    const updateContact = {
      first_name: this.first_name,
      last_name: this.last_name,
      phone: this.phone,
      _id: this._id
    }
    this.contactService.updateContact(updateContact).subscribe(contact => {
      this.contactService.getContacts().subscribe(contacts => this.contacts = contacts);
      this.first_name = '';
      this.last_name = '';
      this.phone = '';
      this.email = '';
    });
    this.add = true;
    this.update = false;
  }


  ngOnInit() {
    this.contactService.getContacts().subscribe(contacts => this.contacts = contacts);
  }

}
