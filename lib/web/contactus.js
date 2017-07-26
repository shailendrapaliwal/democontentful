const utilities = require('../web/Utilities');

/* global app.js cfClient:true appLocale:true next:true appServer:true*/
/* global global_variables.js gObjhomePage:true*/

exports.getcontent = (req, res, next) => {
  cfClient.getEntries({
    content_type: 'contactUs',
    locale: appLocale,
  }).then((entries) => {

    const entry = entries.items[0];
    const content = new utilities.contactUSPage();
    content.title = entry.fields.contactUsdetails;
    content.backgroundImage = entry.fields.contactUsImage.fields.file.url;
//    content.bottomcontent = entry.fields.bottomsection;

console.log('contact us title'+content.title);
console.log('contact us image'+content.backgroundImage);

    global.gObjcontactusPage = content;

    res.render('contactus', {
      contactusPage: gObjcontactusPage
    });
  });
};
