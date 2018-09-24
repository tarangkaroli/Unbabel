'use strict';

var _ = require('lodash');

function ResourcePage(resource) {
    this.resource = resource;
}

ResourcePage.prototype = {
    signIn: element(by.xpath("//a[@href='/login/']")),
    logout: element(by.xpath("//a[@href='/logout/']")),
    accountAccess: element(by.xpath('//button[@type="button" and @class="btn-round button-navbar"]')),
    error_arrowDropDown: element(by.xpath("//i[@class='c-MarkError__errorType__icon icon ion-ios-arrow-down']")),

    idolModal: {
        modalWindow: element(by.xpath("//div[@class='c-Modal  is-active']")),
        headerText: element(by.xpath("//h1[@class='c-Modal__title']")),
        messageText: element(by.css(".c-Modal__text")),
        continueButton: element(by.xpath("//button[text()='Continue']"))
    },

    /*
    * This is a custom function that double select a text to
    * annotate by clicking on the provided webElement locator.
    * */
    selectTextToAnnotateWebElement: function (webElement) {
        browser.actions().doubleClick(webElement).perform();
    },

    /*
     * This function double select a text to annotate
     * by clicking on the provided the offset location.
     * */
    selectTextToAnnotateLocation: function (xEle, yEle) {
        browser.actions().mouseMove({x: xEle, y: yEle}).click().click().perform();
    },

    /*
    * This is a custom function that waits for an element to load
    * the parameters provided are webElement to wait, whether the element is visible
    * and time to wait for the element to load.
    * */

    waitForElementsVisibilityStatus: function(webElement, isVisible, timeoutInMilliSeconds) {
        var timeout = timeoutInMilliSeconds || 10000;
        var expectedConditions = protractor.ExpectedConditions;
        var conditionToCheck = expectedConditions.visibilityOf(webElement, timeout);
        var deferred = protractor.promise.defer();

        if (isVisible == false) {
            conditionToCheck = expectedConditions.invisibilityOf(webElement);
        }

        browser.wait(conditionToCheck).then(function () {
            deferred.fulfill(true);
        },function (rejectionValue) {
            deferred.reject(rejectionValue);
        });
        return deferred;
    },

    /*
    * This is a custom function that selects
    * the error tye of the annotation to be
    * selected based on the three arguments;
    * Main error type, sub type and if further
    * to elected then sub menu type.
    * */

    selectErrorSubMType: function (mainErrorType, menuName, subMenuName) {
        var AnnotationPage = require('../pages/annotation.po.js');
        var annotationPage = new AnnotationPage();
        var submenuname = subMenuName || 0;
        // console.log(submenuname);

        browser.isElementPresent(this.error_arrowDropDown).then(function (present) {
            if(present) {
                this.error_arrowDropDown.click();
            }
        }.bind(this));

        if (submenuname === 0) {
            this.elementErrorType(mainErrorType).click();
            browser.sleep(2500);
            this.elementErrorType(menuName).click();
        }
        else {
            this.elementErrorType(mainErrorType).click();
            browser.sleep(2500);
            this.elementErrorType(menuName).click();
            browser.sleep(2500);
            this.elementErrorType(subMenuName).click();
        }
    },

    /*
    * This custom function returns the element
    * locator of the error type to select.
    * */

    elementErrorType: function (elementError) {
        var elementPath = "//span[@class='c-MarkError__errorType__name' and text()='"+elementError+"']";
        return element(by.xpath(elementPath));
    },

    /*
    * This custom function performs the click
    * actions of mouse on the given element.
    * */

    elementClick: function (webElement) {
        this.waitForElementsVisibilityStatus(webElement, true, 30000);
        browser.sleep(2000);
        browser.actions().mouseMove(webElement).click().perform();
    },

    /*
    * This is a custom function that
    * returns a random star rating for
    * the annotation task performed.
    * */

    randomStarRating: function () {
        var AnnotationPage = require('../pages/annotation.po.js');
        var annotationPage = new AnnotationPage();
        var rating = Math.floor(Math.random() * Math.floor(5));

        //clicking on the star based on the generated random number
        //in range of 0 to 4 [for 5 stars staring index at 0]
        annotationPage.elementClick(annotationPage.starRating.get(rating));
    }
};

module.exports = ResourcePage;