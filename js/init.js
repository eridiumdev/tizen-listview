function Contact(fname, lname, phone) {
    this.fname = fname;
    this.lname = lname;
    this.phone = phone;
}

var contacts = [];

contacts[0] = new Contact('James', 'Darakjy', '123-456-789');
contacts[1] = new Contact('Art', 'Venere', '123-456-789');
contacts[2] = new Contact('Josephine', 'Paprocki', '123-456-789');
contacts[3] = new Contact('Donette', 'Foller', '123-456-789');
contacts[4] = new Contact('Simona', 'Morasca', '123-456-789');
contacts[5] = new Contact('Mitsue', 'Tollner', '123-456-789');
contacts[6] = new Contact('Leota', 'Dilliard', '123-456-789');
contacts[7] = new Contact('Sage', 'Wieser', '123-456-789');
contacts[8] = new Contact('Kris', 'Marrier', '123-456-789');
contacts[9] = new Contact('Minna', 'Amigon', '123-456-789');

var listview = document.getElementById('listview');
var contactPage = document.getElementById('contact-page');
var contactFName = document.getElementById('fname');
var contactLName = document.getElementById('lname');
var contactPhone = document.getElementById('phone');

createDb(contacts);