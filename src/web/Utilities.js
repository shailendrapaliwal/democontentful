exports.createProxyAgent = function () {
  let proxyAgent;
  if (process.env.NODE_ENV === 'development') {
    const HttpsProxyAgent = require('https-proxy-agent');
// HTTP/HTTPS proxy to connect to
    const proxy = process.env.PROXY;
    console.log('Using proxy server: %s', proxy);
	// create an instance of the `HttpsProxyAgent` class with the proxy server information
    proxyAgent = new HttpsProxyAgent(proxy);
  }
  return proxyAgent;
};

exports.IndexPage = function () {
  this.title = '';
  this.backgroundImage = '';
  this.companyLogo = '';
  this.imageText = '';
  this.columns = [];
  this.pageText = '';
  this.elancoText = '';
  this.elancoUrl = '';
  this.menuItems = [];
  this.pageDesc = '';
  this.productItems = [];
};

exports.Columns = function () {
  this.columnText = '';
  this.columnUrl = '';
};

exports.MenuItems = function () {
  this.menuText = '';
  this.menuUrl = '';
  this.menuTooltip = '';
};

exports.ProductItems = function () {
  this.productImage = '';
  this.linkText = '';
  this.productUrl = '';
  this.productTitle = '';
  this.productDescription = '';
};

exports.ContentPage = function () {
  this.subProductImages = '';
  this.imageBanner = '';
  this.mainProductTitle = '';
  this.mainProductTitleDesc = '';
  this.products = [];
  this.mainProductDesc = '';
};

exports.Products = function () {
  this.image = '';
  this.productTitle = '';
  this.productDescription = '';
  this.buttonText = '';
  this.buttonUrl = '';
};

exports.masterPageHeader = function () {
  // this.headerText = '';
  // this.pageTitle = '';
  // this.headerLogoAltText = '';
  //this.headerLogo = '';
  //this.headerLogoUrl = '';
  this.masterHeaderMenu = [];
  // this.countryText = '';
  // this.countryImage = '';
  // this.mapText = '';
  // this.mapImage = '';
  // this.mapUrl = '';
};

exports.masterPageMenu = function () {
  this.menuText = '';
  this.menuUrl = '';
  this.menuTooltip = '';
  this.isMenuTooltip = '';
};

exports.masterPageFooter = function () {
  this.title = '';
  this.legalFooterLinks = [];
  this.utilityFooterLinks = [];
  this.copyrightText = '';
  this.zincNumber = '';
  this.zincText = '';
  this.elancoLogo = '';
  this.elancoLogoLink = '';
};

exports.legalFooterLinks = function () {
  this.legalMenuText = '';
  this.legalMenuUrl = '';
  this.legalMenuTooltip = '';
};

exports.utilityFooterLinks = function () {
  this.utilityMenuText = '';
  this.utilityMenuUrl = '';
  this.utilityMenuTooltip = '';
};

exports.ContactUs = function () {
  this.title = '';
  this.contactDetails = '';
};

exports.ProductPageContent = function () {
  this.productTitle = [];
  this.banner = '';
  this.heading = '';
  this.labelAsset = [];
  //this.informationAsset = [];
  this.sdsAsset = [];
  this.haznoteAsset = [];
  this.content = '';
  this.productListTitle = '';
  this.productList = [];
  this.isSubProduct = '';
};

exports.Asset = function () {
  this.assetUrl = '';
  this.assetTitle = '';
};

exports.ProductList = function () {
  this.title = '';
  this.productLogo = '';
  this.productUrl = '';
  this.isUrl = '';
  this.productTooltip = '';
};
