var db;
var version = 1.0;
var dbName = "tizendb";
var dbDisplayName = "tizen_test_db";
var dbSize = 2 * 1024 * 1024;

function createDb(contacts) {
    if (window.openDatabase) {
        // openDatabase(name, version, displayname, estimatedsize, callback);
        db = openDatabase(dbName, version, dbDisplayName, dbSize);

        // Recreate contacts table
        dropContactsTable(db);
        createContactsTable(db);

        // Populate contacts table
        for (var i = 0; i < contacts.length; i++) {
            insertContact(db, contacts[i]);
        }

        displayContacts(db);

    } else {
        alert("Web SQL Database not supported in this browser");
    }
}

function dropContactsTable(db) {
    db.transaction(function (t) {
        t.executeSql("DROP TABLE contacts");
    });
}

function createContactsTable(db) {
    db.transaction(function (t) {
        t.executeSql("CREATE TABLE contacts (id INTEGER PRIMARY KEY, fname TEXT, lname TEXT, phone TEXT)", []);
    });
}

function insertContact(db, contact) {
    db.transaction(function (t) {
        t.executeSql("INSERT INTO contacts(fname, lname, phone) VALUES (?, ?, ?)",
        		[contact.fname, contact.lname, contact.phone], onSuccess, onError);
    });
}

function onSuccess(e) {}
function onError(e) {}

function displayContacts(db) {
    db.transaction(function (t) {
        t.executeSql("SELECT * FROM contacts", [],
        	function (tran, r) {
	            for (var i = 0; i < r.rows.length; i++) {
	            	var id = r.rows.item(i).id;
	            	var fname = r.rows.item(i).fname;
	                var lname = r.rows.item(i).lname;
	                var phone = r.rows.item(i).phone;
	                
	                // <li> for the listview
	                let li = document.createElement('li');
	                li.className = 'ui-li-anchor';
	
	                // <a href=contact-page> for the <li>
	                let a = document.createElement('a');
	                a.className = 'contacts';
	                a.id = id;
	                // go to contact details page if clicked
	                a.href = '#contact-page';
	                // fire event to update page details for the new contact
	                a.addEventListener('click', updateContactPage);
	
	                // thumbnail (fname-lname first letters)
	                // TODO change to profile pic
	                let pic = document.createElement('span');
	                pic.className = 'thumbnail';
	                let fnameLetter = fname.substr(0,1);
	                let lnameLetter = lname.substr(0,1);
	                pic.textContent = fnameLetter + lnameLetter;
	
	                // displayed name
	                let span = document.createElement('span');
	                span.className = 'contact-text';
	                span.textContent = fname + ' ' + lname;
	
	                a.append(pic);
	                a.append(span);
	                li.append(a);
	                listview.append(li);
	            }
	        },
	    	function (t, e) { alert("Error:" + e.message); }
        );
    });
}

function updateContactPage() {
	var contactId = $(this).attr('id');
	db.transaction(function (t) {
        t.executeSql("SELECT * FROM contacts WHERE id = ?", [contactId],
		    function (tran, r) {
		        for (var i = 0; i < r.rows.length; i++) {
		        	var id = r.rows.item(i).id;
	            	var fname = r.rows.item(i).fname;
	                var lname = r.rows.item(i).lname;
	                var phone = r.rows.item(i).phone;
		
	                contactFName.textContent = fname;
	                contactLName.textContent = lname;
	                contactPhone.textContent = phone;
		        }
		    },
		    function (t, e) { alert("Error:" + e.message); }
		 );
    });
}