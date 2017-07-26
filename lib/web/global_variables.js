const util = require('util');
const utilities = require('../web/Utilities');

function setHeader() {
  cfClient.getEntries({
    content_type: 'header',
    locale: appLocale,
  }).then((entries) => {
    const entry = entries.items[0];
    console.log(entry.fields);

    console.log('Setting Header` data....');
    const headerContent = new utilities.masterPageHeader();
    headerContent.siteLogo = entry.fields.sitelogo.fields.file.url;
    headerContent.searchbox = entry.fields.searchbox.fields.file.url;



    const columns = entry.fields.headerNavigation;
   for (var i = 0; i < columns.length; i++) {
     const oLink = new utilities.nav1();
     oLink.name = columns[i].fields.headerLinksTitle;
     headerContent.nav.push(oLink);
   }

  //  headerContent.sitetitle1 = entry.fields.menu
  console.log('header logo'+headerContent.searchbox);
   appServer.locals.headerContent = headerContent;
 });
  console.log('Header data setup successfully.');
}

function setFooter() {
  cfClient.getEntries({
    content_type: 'footer',
    locale: appLocale,
  }).then((entries) => {
    const entry = entries.items[0];

    console.log('Setting Footer` data....');
    const footercontent = new utilities.masterPageFooter();
//    footercontent.footertext = entry.fields.footerDetails;

    const columns1 = entry.fields.notification;
    const columns2 = entry.fields.publication;
    const columns3 = entry.fields.applicationForm;
    const columns4 = entry.fields.gallery;
    const columns5 = entry.fields.privacyPolicy;
    const columns6 = entry.fields.drugAlert;
    const columns7 = entry.fields.ourAlerts;

    //next session starts here
    for (var i = 0; i < columns1.length; i++) {
      const oLink1 = new utilities.subassociation();
      console.log("lenght:" + columns1.length);
    oLink1.titlename = columns1[i].fields.headerLinksTitle;
    //  console.log(oLink1.backgroundImage);
   console.log("lenght:" + oLink1.titlename);
    footercontent.Association.push(oLink1);
     }

     for (var i = 0; i < columns2.length; i++) {
       const oLink2 = new utilities.subpublication();
       console.log("lenght:" + columns2.length);
     oLink2.titlename = columns2[i].fields.headerLinksTitle;
  //     console.log(oLink1.backgroundImage);
    console.log("lenght:" + oLink2.titlename);
     footercontent.publication.push(oLink2);
      }

      for (var i = 0; i < columns3.length; i++) {
        const oLink3 = new utilities.subappform();
        console.log("lenght:" + columns3.length);
      oLink3.titlename = columns3[i].fields.headerLinksTitle;
   //     console.log(oLink1.backgroundImage);
     console.log("lenght:" + oLink3.titlename);
      footercontent.applicationform.push(oLink3);
       }

       for (var i = 0; i < columns4.length; i++) {
         const oLink4 = new utilities.subgallery();
         console.log("lenght:" + columns4.length);
       oLink4.titlename = columns4[i].fields.headerLinksTitle;
    //     console.log(oLink1.backgroundImage);
      console.log("lenght:" + oLink4.titlename);
       footercontent.gallery.push(oLink4);
        }

        for (var i = 0; i < columns5.length; i++) {
          const oLink5 = new utilities.subprivacyPolicy();
          console.log("lenght:" + columns5.length);
        oLink5.titlename = columns5[i].fields.headerLinksTitle;
     //     console.log(oLink1.backgroundImage);
       console.log("lenght:" + oLink5.titlename);
        footercontent.privacypolicy.push(oLink5);
         }

         for (var i = 0; i < columns6.length; i++) {
           const oLink8 = new utilities.subdrug();
           console.log("lenght:" + columns6.length);
         oLink8.titlename = columns6[i].fields.headerLinksTitle;
      //     console.log(oLink1.backgroundImage);
        console.log("lenght:" + oLink8.titlename);
         footercontent.drugalert.push(oLink8);
       }

        for (var i = 0; i < columns7.length; i++) {
            const oLink7 = new utilities.subourEmployee();
            console.log("lenght:" + columns7.length);
          oLink7.titlename = columns7[i].fields.headerLinksTitle;
       //     console.log(oLink1.backgroundImage);
         console.log("lenght:" + oLink7.titlename);
          footercontent.ourEmployee.push(oLink7);
        }

    appServer.locals.footerContent = footercontent;
  });
  console.log('Footer data setup successfully.');
}


function resetGlobals() {
    // this function reset all global variables which are holding the entries data from contentful

  global.gObjindexPage = {};
//  global.gObjcontactusPage = {};
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
