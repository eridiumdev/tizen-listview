var listview = $('#listview');
var loading = $('#loading');
var contactPic = $('#contact-pic');
var contactName = $('#contact-name .contact-text');
var contactPhone = $('#contact-phone .contact-text');
var contactEmail = $('#contact-email .contact-text');

loading.hide();
listview.hide();

// Get contacts from a csv file and init database
var csv = "../contacts.csv";
var contacts = getContacts(csv, createDb);

$('#back-button').click(function() {
	window.history.back();
});
