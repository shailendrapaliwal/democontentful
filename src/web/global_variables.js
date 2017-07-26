const util = require('util');
const utilities = require('../web/Utilities');

function setHeader() {
  cfClient.getEntries({
    content_type: 'headerContent',
    locale: appLocale,
  }).then((entries) => {
    const entry = entries.items[0];
    //console.log(entry.fields);

    console.log('Setting Header` data....');
    const headerContent = new utilities.masterPageHeader();
    const headerMenu = entry.fields.menu;

    for (let k = 0; k < headerMenu.length; k++) {
      const oLink = new utilities.masterPageMenu();

      oLink.menuText = headerMenu[k].fields.menuText;
      oLink.menuUrl = headerMenu[k].fields.menuUrl;

      if(headerMenu[k].fields.menuTooltip !== undefined)
      {
          oLink.menuTooltip = headerMenu[k].fields.menuTooltip;
          oLink.isMenuTooltip = true;
      }
      headerContent.masterHeaderMenu.push(oLink);
    }    
    appServer.locals.headerContent = headerContent;
  });
  console.log('Header data setup successfully.');
}

function setFooter() {
  cfClient.getEntries({
    content_type: 'footerContent',
    locale: appLocale,
  }).then((entries) => {
    const entry = entries.items[0];

    console.log('Setting Footer` data....');
    const footercontent = new utilities.masterPageFooter();
    footercontent.title = entry.fields.title;
    const legalFooterMenu = entry.fields.legalFooterMenu;
    for (var j = 0; j < legalFooterMenu.length; j++) {
      const oLink = new utilities.legalFooterLinks();
      oLink.legalMenuText = legalFooterMenu[j].fields.legalMenuText;
      oLink.legalMenuUrl = legalFooterMenu[j].fields.legalMenuUrl;
      oLink.legalMenuTooltip = legalFooterMenu[j].fields.legalMenuTooltip;
      footercontent.legalFooterLinks.push(oLink);
    }

    const utilityFooterMenu = entry.fields.utilityFooterMenu;
    for (var k = 0; k < utilityFooterMenu.length; k++) {
      const oLink = new utilities.utilityFooterLinks();
      oLink.utilityMenuText = utilityFooterMenu[k].fields.utilityMenuText;
      oLink.utilityMenuUrl = utilityFooterMenu[k].fields.utilityMenuUrl;
      oLink.utilityMenuTooltip = utilityFooterMenu[k].fields.utilityMenuTooltip;
      footercontent.utilityFooterLinks.push(oLink);
    }
    footercontent.copyrightText = entry.fields.copyrightText;
    footercontent.zincNumber = entry.fields.zincNumber;
    footercontent.zincText = entry.fields.zincText;
    footercontent.elancoLogo = entry.fields.elancoLogo.fields.file.url;
    footercontent.elancoLogoLink = entry.fields.elancoLogoLink;
    appServer.locals.footerContent = footercontent;
  });
  console.log('Footer data setup successfully.');
}


function resetGlobals() {
    // this function reset all global variables which are holding the entries data from contentful

  global.gObjindexPage = {};
  global.gObjcontentPage = {};
  global.gObjcontactusPage = {};
  global.gObjproductpageContent = {};
  console.log('Global variables reset successfully.');
}

exports.GetGlobalEntriesAppData = function () {
  console.log('Trying to fetch Entries data...');
  cfClient.getEntries({
    locale: appLocale,
  }).then((entries) => {
    console.log('Entries data fetched successfully.');
       setHeader();
       setFooter();
			 resetGlobals();
  });
};
