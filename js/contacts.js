function Contact(fname, lname, phone, email) {
    this.fname = fname;
    this.lname = lname;
    this.phone = phone;
    this.email = email;
}

function getContacts(csv, createDb) {
	var contacts = [];
	d3.csv('contacts.csv', function(data){
		$.each(data, function(i, d) {
			// first 20 contacts
			if (i >= 20) return;
			var contact = new Contact(d.first_name, d.last_name, d.phone1, d.email);
			contacts[contacts.length] = contact;
		});
		console.log(contacts);
		createDb(contacts);
	});
}

/*var contacts = [];

contacts[0] = new Contact('James', 'Darakjy', '123-456-789');
contacts[1] = new Contact('Art', 'Venere', '123-456-789');
contacts[2] = new Contact('Josephine', 'Paprocki', '123-456-789');
contacts[3] = new Contact('Donette', 'Foller', '123-456-789');
contacts[4] = new Contact('Simona', 'Morasca', '123-456-789');
contacts[5] = new Contact('Mitsue', 'Tollner', '123-456-789');
contacts[6] = new Contact('Leota', 'Dilliard', '123-456-789');
contacts[7] = new Contact('Sage', 'Wieser', '123-456-789');
contacts[8] = new Contact('Kris', 'Marrier', '123-456-789');
contacts[9] = new Contact('Minna', 'Amigon', '123-456-789');*/
