const utilities = require('../web/Utilities');

/* global app.js cfClient:true appLocale:true next:true appServer:true*/
/* global global_variables.js gObjhomePage:true*/

exports.getcontactus = (req, res, next) => {
    var reqentry = '';
if (req.params.parentFooter !== undefined) {
    reqentry = req.params.parentFooter;
}
console.log('reqentry: ' + reqentry);
cfClient.getEntries({
    content_type: 'contactUs',
    'sys.id': reqentry
}).then(function (entry) {
    //const entry = entries.items[0];
    console.log('entry: ' + entry);
    const content = new utilities.ContactUs();
    content.title = entry.items[0].fields.title;
    content.contactDetails = entry.items[0].fields.contactDetails;

    global.gObjcontactusPage = content;
    //console.log(content);

    res.render('contact-us', {
        contactusPage: gObjcontactusPage,
    });
});
};
