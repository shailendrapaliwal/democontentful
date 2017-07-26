const utilities = require('../web/Utilities');

/* global app.js cfClient:true appLocale:true next:true appServer:true*/
/* global global_variables.js gObjhomePage:true*/

exports.gethome = (req, res, next) => {
  cfClient.getEntries({
    content_type: 'bodySection',
    locale: appLocale,
  }).then((entries) => {

    const entry = entries.items[0];
    const content = new utilities.IndexPage();
//    headerContent.siteLogo = entry.fields.sitelogo.fields.file.url;
//    headerContent.searchbox = entry.fields.searchbox.fields.file.url;
/*      content.NewsTitle = entry.fields.welcomeHead; */
      content.welcomeHead1 = entry.fields.welcomeHead;
      content.welcomemsg = entry.fields.welcomeMessage;
      content.closeBackgroundImage = entry.fields.newsAccordianImage.fields.file.url;
      content.newsDesc = entry.fields.newsDescription;
      content.research = entry.fields.newsResearch.fields.file.url;
      content.infoheading = entry.fields.infoHeader1section;
      content.InfoDesc1=entry.fields.infodesc;
      content.InfoImg =  entry.fields.infoHeaderImage.fields.file.url;
  //    content.forloop = [1,2,3];
      console.log("title:" + content.newsDesc);
//      console.log("contentheaderimg"+content.InfoImg);


   const columns = entry.fields.sliderImages;
   for (var i = 0; i < columns.length; i++) {
     const oLink = new utilities.images();
     console.log("lenght:" + columns.length);
     oLink.backgroundImage = columns[i].fields.sliderImages.fields.file.url;
     console.log(oLink.backgroundImage);
     content.sliderarray.push(oLink);
   }

   const columns1 = entry.fields.threeRef;
   for (var i = 0; i < columns1.length; i++) {
     const oLink1 = new utilities.threeArrayitems();
     console.log("lenght:" + columns1.length);
     oLink1.titlename = columns1[i].fields.headerLinksTitle;
     console.log(oLink1.backgroundImage);
     content.threeArray.push(oLink1);
   }



  /*  content.backgroundImage = entry.fields.bodyImage.fields.file.url;
    content.bottomcontent = entry.fields.bottomsection; */

    global.gObjindexPage = content;

    res.render('index', {
      indexPage: gObjindexPage
    });
  });
};
