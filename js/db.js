var db;
var version = 1.0;
var dbName = "tizendb";
var dbDisplayName = "tizen_test_db";
var dbSize = 2 * 1024 * 1024;

function createDb(contacts) {
    if (window.openDatabase) {
    	// Open or create new database
    	// openDatabase(name, version, displayname, estimatedsize, callback);
        db = openDatabase(dbName, version, dbDisplayName, dbSize);
        
        // dropContactsTable(db);
        
        // Create and populate contacts table if it does not exist
        checkNotExists(db, 'contacts', function(notExists) {
        	loadingStart();			// loading icon
        	
        	createContactsTable(db);
            for (var i = 0; i < contacts.length; i++) {
                insertContact(db, contacts[i]);
            }
            
            displayContacts(db);	// populate listview with contacts
        });
    } else {
        alert("Web SQL Database not supported in this browser");
    }
}

function checkNotExists(db, table, callback) {
	db.readTransaction(function (t) {
        t.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name = ?", [table],
        	function(tran, r) {
        		console.log('1');
        		if (r.rows.length === 0) callback();
        		else displayContacts(db);
        	},
        	function (t, e) { alert("Error:" + e.message); }
        );
    });
}

function dropContactsTable(db) {
    db.transaction(function (t) {
        t.executeSql("DROP TABLE IF EXISTS contacts");
    });
}

function createContactsTable(db) {
    db.transaction(function (t) {
        t.executeSql("CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY, fname TEXT, lname TEXT, phone TEXT)", []);
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
        t.executeSql("SELECT * FROM contacts ORDER BY fname", [],
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
	                pic.className = 'listview-thumbnail';
	                let fnameLetter = fname.substr(0,1);
	                let lnameLetter = lname.substr(0,1);
	                pic.textContent = fnameLetter + lnameLetter;
	
	                // displayed name
	                let span = document.createElement('span');
	                span.className = 'listview-text';
	                span.textContent = fname + ' ' + lname;
	
	                a.append(pic);
	                a.append(span);
	                li.append(a);
	                listview.append(li);
	            }
	        },
	    	function (t, e) { alert("Error:" + e.message); }
        );
        loadingFinish();
    });
}

function loadingStart() {
	$('#loading').show();
}

function loadingFinish() {
	$('#loading').hide();
	$('#listview').fadeIn();
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
	                
	                var fnameLetter = fname.substr(0,1);
	                var lnameLetter = lname.substr(0,1);
	                var pic = fnameLetter + lnameLetter;
		
	                contactPic.text(pic);
	                contactName.text(fname + ' ' + lname);
	                contactPhone.text(phone);
		        }
		    },
		    function (t, e) { alert("Error:" + e.message); }
		 );
    });
}