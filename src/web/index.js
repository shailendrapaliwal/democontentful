const utilities = require('../web/Utilities');

/* global app.js cfClient:true appLocale:true next:true appServer:true*/
/* global global_variables.js gObjhomePage:true*/

exports.gethome = (req, res, next) => {
  cfClient.getEntries({
    content_type: 'indexPage',
    locale: appLocale,
  }).then((entries) => {

    const entry = entries.items[0];
    const content = new utilities.IndexPage();
    content.title = entry.fields.title;

    content.backgroundImage = entry.fields.backgroundImage.fields.file.url;    
    content.companyLogo = entry.fields.companyLogo.fields.file.url;
    content.imageText = entry.fields.imageText;

    const columns = entry.fields.columns;
    for (var i = 0; i < columns.length; i++) {
      const oLink = new utilities.Columns();
      oLink.columnText = columns[i].fields.columnText;
      oLink.columnUrl = columns[i].fields.columnUrl;
      content.columns.push(oLink);
    }
    content.pageText = entry.fields.pageText;
    content.elancoText = entry.fields.elancoText;
    content.elancoUrl = entry.fields.elancoUrl;

    const menuItems = entry.fields.menuItems;
    for (var j = 0; j < menuItems.length; j++) {
      const oLink = new utilities.MenuItems();
      oLink.menuText = menuItems[j].fields.menuText;
      oLink.menuUrl = menuItems[j].fields.menuUrl;
      oLink.menuTooltip = menuItems[j].fields.menuTooltip;
      content.menuItems.push(oLink);
    }

    content.pageDesc = entry.fields.pageDesc;
    const productItems = entry.fields.productItems;
    for (var k = 0; k < productItems.length; k++) {
      const oLink = new utilities.ProductItems();
      oLink.productImage = productItems[k].fields.productImage.fields.file.url;
      oLink.productTitle = productItems[k].fields.productImage.fields.title;
      oLink.productDescription = productItems[k].fields.productImage.fields.description;
      oLink.linkText = productItems[k].fields.linkText;
      oLink.productUrl = productItems[k].fields.productUrl;
      content.productItems.push(oLink);
    }

    global.gObjindexPage = content;

    res.render('index', {
      indexPage: gObjindexPage,
    });
  });
};
