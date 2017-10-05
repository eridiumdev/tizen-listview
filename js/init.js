function Contact(fname, lname, phone) {
    this.fname = fname;
    this.lname = lname;
    this.phone = phone;
}

var n = 10;
var contacts = [];

for (var i = 0; i < n; i++) {
    // contacts[i] = new Contact(i + 'Name', i + 'Surname', '123-456-78' + i);
}

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

init();

function init() {
    for (var i = 0; i < contacts.length; i++) {
        // ul element
        let li = document.createElement('li');
        li.className = 'ui-li-anchor';

        let a = document.createElement('a');
        a.className = 'contacts';
        a.id = i;
        a.href = '#contact-page';

        let pic = document.createElement('span');
        pic.className = 'thumbnail';
        let fnameLetter = contacts[i].fname.substr(0,1);
        let lnameLetter = contacts[i].lname.substr(0,1);
        pic.textContent = fnameLetter + lnameLetter;

        let span = document.createElement('span');
        span.className = 'contact-text';
        span.textContent = contacts[i].fname + ' ' + contacts[i].lname;

        a.append(pic);
        a.append(span);
        li.append(a);
        listview.append(li);
    }
}

$("a.contacts").each(function () {
    $(this).on('click', function() {
        // var href = $(this).attr('href');
        var id = $(this).attr('id');
        contactFName.textContent = contacts[id].fname;
        contactLName.textContent = contacts[id].lname;
        contactPhone.textContent = contacts[id].phone;
    });
});
