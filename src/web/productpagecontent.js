const utilities = require('../web/Utilities');

/* global app.js cfClient:true appLocale:true next:true appServer:true*/
/* global global_variables.js gObjhomePage:true*/
exports.getcontent = (req, res, next) => {
  var reqentry = '', parentUrl = '', childUrl = '', subChildUrl = '';

    if (req.params.subchild !== undefined) {
      reqentry = req.params.subchild;
    }
    else if (req.params.child !== undefined) {
      reqentry = req.params.child;
    }
    else {
      reqentry = req.params.parent;
    }

    console.log('reqentry: ' + reqentry);

  cfClient.getEntries({
    content_type: 'productPageContent',
    'sys.id': reqentry
  }).then(function (entries) {

    const entry = entries.items[0];
    const content = new utilities.ProductPageContent();
    content.title = entry.fields.productTitle.fields.title;
    content.productUrl = entry.fields.productTitle.fields.buttonUrl;
    content.isSubProduct = entry.fields.isSubProduct;
    if(entry.fields.banner !== undefined)
    {
      content.banner = entry.fields.banner.fields.file.url;
    }

    content.heading = entry.fields.heading;
    content.isLabelAsset = false;
    content.isSdsAsset = false;
    content.isHaznoteAsset = false;
    if(entry.fields.labelAssets !== undefined)
    {
      content.isLabelAsset = true;
      const labelAssets = entry.fields.labelAssets;
      console.log('labelAsset' + labelAssets.length);
      for (var i = 0; i < labelAssets.length; i++) {
        const oLink = new utilities.Asset();
        oLink.assetUrl = labelAssets[i].fields.file.url;
        oLink.assetTitle = labelAssets[i].fields.title;
        content.labelAsset.push(oLink);
      }
    }

    // if(entry.fields.referenceAssets !== undefined)
    // {
    //   const informationAssets = entry.fields.referenceAssets;
    //   console.log('informationAsset' + informationAssets.length);
    //   for (var j = 0; j < informationAssets.length; j++) {
    //     const oLink = new utilities.Asset();
    //     oLink.assetUrl = informationAssets[j].fields.file.url;
    //     oLink.assetTitle = informationAssets[j].fields.title;
    //     content.informationAsset.push(oLink);
    //   }
    // }
    if(entry.fields.sdsAssets !== undefined)
    {
      content.isSdsAsset = true;
      const sdsAssets = entry.fields.sdsAssets;
      console.log('sdsAssets' + sdsAssets.length);
      for (var j = 0; j < sdsAssets.length; j++) {
        const oLink = new utilities.Asset();
        oLink.assetUrl = sdsAssets[j].fields.file.url;
        oLink.assetTitle = sdsAssets[j].fields.title;
        content.sdsAsset.push(oLink);
      }
    }

    if(entry.fields.haznoteAssets !== undefined)
    {
      content.isHaznoteAsset = true;
      const haznoteAssets = entry.fields.haznoteAssets;
      console.log('haznoteAssets' + haznoteAssets.length);
      for (var m = 0; m < haznoteAssets.length; m++) {
        const oLink = new utilities.Asset();
        oLink.assetUrl = haznoteAssets[m].fields.file.url;
        oLink.assetTitle = haznoteAssets[m].fields.title;
        content.haznoteAsset.push(oLink);
      }
    }
    content.content = entry.fields.content;
    content.productListTitle = entry.fields.productListTitle;

    const productList = entry.fields.productList;
    for (var k = 0; k < productList.length; k++) {
      const oLink = new utilities.ProductList();
      oLink.title = productList[k].fields.title;
      oLink.isUrl = false;
      if(productList[k].fields.productLogo.fields !== undefined)
      {
        oLink.productLogo = productList[k].fields.productLogo.fields.file.url;
      }
      if(productList[k].fields.productUrl !== undefined)
      {
        oLink.productUrl = productList[k].fields.productUrl;
        oLink.isUrl = true;
      }
      oLink.productTooltip = productList[k].fields.tooltip;
      content.productList.push(oLink);
    }

    global.gObjproductpageContent = content;

    res.render('productpagecontent', {
      productpagecontent: gObjproductpageContent
    });
  })
};
