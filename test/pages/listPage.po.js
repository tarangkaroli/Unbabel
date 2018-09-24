'use strict';

var _ = require('lodash');
var ResourcePgae = require('../pages/resource.po.js');

function ListPage() {
    ResourcePgae.call(this, '');
}

ListPage.prototype = Object.create(ResourcePgae.prototype);
ListPage.prototype.constructor = ListPage;

var listPageElements = {
   listToAnnotate: element(by.xpath("//td[@class='text-left language-pair']//a")),
   progressAnnotate: element(by.css(".progress")),
};

_.assign(ListPage.prototype, listPageElements);
module.exports = ListPage;