'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cirrusAuthModule = require('cirrus-auth-module');

var _cirrusAuthModule2 = _interopRequireDefault(_cirrusAuthModule);

var _test = require('../server-controllers/test');

var _test2 = _interopRequireDefault(_test);

const index = require('../web/index');
const contentpage = require('../web/contentpage');
const productpagecontent = require('../web/productpagecontent');
const contactus = require('../web/contact-us');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Importing authentication flow
var router = _express2.default.Router();

// authenticate our router


// Importing the server side modules.
// Routes in this module require authentication
_cirrusAuthModule2.default.authenticate(router);

router.get('/', (req, res, next) => {
  index.gethome(req, res, next);
});

router.get(
    ['/css/*','/js/*','/img/*'],
    function ( request, response, next ) {
         console.log("static");
         next();
    }
);

router.get('/index', (req, res, next) => {
  index.gethome(req, res, next);
});

router.get('/contact-us', (req, res, next) => {
  contactus.getcontent(req, res, next);
});

router.get('/products-services', (req, res, next) => {
  contentpage.getcontent(req, res, next);
});

router.get('/:parentFooter', (req, res, next) => {
  contactus.getcontactus(req, res, next);
});


router.get('/:parent/:child?/:products?/:subchild?', (req, res, next) => {
  productpagecontent.getcontent(req, res, next);
});

// index route
router.get('/about', function (req, res) {
  _test2.default.test().then(function (data) {
    return res.render('about', {
      title: data
    });
  }).catch(function (e) {
    res.status(500, {
      error: e
    });
  });
});

module.exports = router;
