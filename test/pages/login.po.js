'use strict';

var _ = require('lodash');
var ResourcePgae = require('../pages/resource.po.js');

function LoginPage() {
    ResourcePgae.call(this, 'login');
}

LoginPage.prototype = Object.create(ResourcePgae.prototype);
LoginPage.prototype.constructor = LoginPage;

var loginPageElements = {
    userNameTextBox: element(by.id('username')),
    passswordTextBox: element(by.id('password')),
    signInButton: element(by.xpath('//button[@class= "unbabel-btn-round unbabel-blue btn-block"]')),
    errorMessage: element(by.css('.alert-warning')),
    dismissErrorMessage: element(by.xpath('//button[@class="close" and @type="button"]')),
};

_.assign(LoginPage.prototype, loginPageElements);
module.exports = LoginPage;