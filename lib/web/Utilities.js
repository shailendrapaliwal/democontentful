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
  this.sliderarray=[];
  this.NewsTitle = '';
  this.welcomeHead1 = '';
  this.welcomemsg = '';
  this.closeBackgroundImage = '';
  this.infoheading = '';
  this.InfoDesc1='';
  this.InfoImg = '';
  this.newsDesc = '';
  this.research = '';
  this.threeArray = [];
/*  this.backgroundImage = '';
  this.bottomcontent = ''; */
};


exports.masterPageHeader = function () {
 this.siteLogo = '';
 this.searchbox = '';
 this.nav=[];
};

exports.nav1= function () {
 this.name = '';
}


exports.masterPageFooter = function () {
  this.Association=[];
  this.publication=[];
  this.applicationform=[];
  this.gallery=[];
  this.privacypolicy=[];
  this.drugalert=[];
  this.ourEmployee=[];
  this.footerImage='';
  this.footerdetails='';
};

exports.subassociation= function () {
 this.titlename = '';
}

exports.subpublication= function () {
 this.titlename = '';
}

exports.subappform= function () {
 this.titlename = '';
}

exports.subgallery= function () {
 this.titlename = '';
}

exports.subprivacyPolicy= function () {
 this.titlename = '';
}

exports.subdrug= function () {
 this.titlename = '';
}

exports.subourEmployee= function () {
 this.titlename = '';
}

exports.contactUSPage = function () {
  this.title = '';
  this.backgroundImage = '';
};




exports.images= function () {
 this.backgroundImage = '';
}

exports.threeArrayitems= function () {
 this.titlename = '';
}
