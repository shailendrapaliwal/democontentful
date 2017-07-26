const utilities = require('../web/Utilities');

/* global app.js cfClient:true appLocale:true next:true appServer:true*/
/* global global_variables.js gObjhomePage:true*/
exports.getcontent = (req, res, next) => {

  cfClient.getEntries({
    content_type: 'pageContent',
    locale: appLocale
  }).then(function (entries) {

    const entry = entries.items[0];
    //console.log(entry);
    const content = new utilities.ContentPage();
    content.subProductImages = entry.fields.subProductImages;
    content.imageBanner = entry.fields.imageBanner.fields.file.url;
    content.mainProductTitle = entry.fields.mainProductTitle;
    content.mainProductTitleDesc = entry.fields.mainProductTitleDesc;
    const products = entry.fields.products;

    for (var i = 0; i < products.length; i++) {
      const oLink = new utilities.Products();
      if(products[i].fields.image.fields !== undefined)
      {
          oLink.image = products[i].fields.image.fields.file.url;
          oLink.productTitle = products[i].fields.image.fields.title;
          oLink.productDescription = products[i].fields.image.fields.description;
      }
      oLink.buttonText = products[i].fields.buttonText;
      oLink.buttonUrl = products[i].fields.buttonUrl;
      content.products.push(oLink);
    }
    content.mainProductDesc = entry.fields.mainProductDesc;
    global.gObjcontentPage = content;

    res.render('contentpage', {
      contentPage: gObjcontentPage,
    });
  })
};
