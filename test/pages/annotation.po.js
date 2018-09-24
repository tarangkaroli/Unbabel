'use strict';

var _ = require('lodash');
var ResourcePgae = require('../pages/resource.po.js');

function AnnotationPage() {
    ResourcePgae.call(this, 'interface');
}

AnnotationPage.prototype = Object.create(ResourcePgae.prototype);
AnnotationPage.prototype.constructor = AnnotationPage;

var annotationPageElements = {
    sideTabs: element.all(by.xpath("//div[@class='c-Sidebar__tab']")),
    activeSideTab: element.all(by.xpath("//div[@class='c-Sidebar__item is-active']")),
    languageTitle: element.all(by.xpath("//p[@class='c-TranslationViewer__title']")),
    paragraphText: element.all(by.xpath("//div[@class='c-TextBlock__main']//p")),
    selectedText: element(by.xpath("//p[@class='c-MarkError__text']")),

    navigationCircle: element.all(by.css(".c-TopBar__navItem .c-TopBar__circle")),
    navigationCircleCompleted: element.all(by.xpath("//span[@class='c-TopBar__circle is-completed']")),

    noAnnotationListMessage: element(by.xpath("//p[@class='c-AnnotationList__feedback']")),

    accuracyErrorType: element(by.xpath("//span[text()='Accuracy']")),
    fluencyErrorType: element(by.xpath("//span[text()='Fluency']")),
    styleErrorType: element(by.xpath("//span[text()='Style']")),

    radioBox_MinorSeverity: element(by.id("minorSeverity")),
    radioBox_MajorSeverity: element(by.id("majorSeverity")),
    radioBox_CriticalSeverity: element(by.id("criticalSeverity")),

    textBox_searchErrorType: element(by.id('searchErrorTypes')),

    radioBox__Finish: element(by.id("finishOption")),

    errorType_clearButton: element(by.xpath("//div[@class='c-MarkError__buttons'] //button[text()='Clear']")),
    errorType_addButton: element(by.xpath("//div[@class='c-MarkError__buttons'] //button[text()='Add']")),

    backButton: element.all(by.xpath("//button[@class='c-Button c-Button--secondary']")).get(0),
    starRating: element.all(by.id("Main-Copy-11")),
    finishButton: element(by.buttonText("Finish")),

    textBox_taskComment_Finish: element(by.xpath("//textarea[@class='c-TaskFeedback__comment' and @name='comment']")),

    //after adding annotations check for added elements
    annotationList: element.all(by.xpath("//ol//li[@class='c-AnnotationList__annotation']")),
    annotationList__Header: element.all(by.xpath("//ol//li[@class='c-AnnotationList__annotation']//p[@class='c-AnnotationList__annotation__title']")),
    radioBox_sortByPosition: element(by.id('positionSortBy')),
    radioBox_sortByType: element(by.id('typeSortBy')),
    radioBox_sortBySeverity: element(by.id('severitySortBy')),

    jobFinish: {
        discardFinish: element(by.xpath("//div[@id='js-modal-footer']//button[text()='No']")),
        completeFinish: element(by.xpath("//div[@id='js-modal-footer']//button[text()='Yes']"))
    },

    removeAnnotationIcon: element.all(by.xpath("//i[@class='icon ion-ios-close']"))
};

_.assign(AnnotationPage.prototype, annotationPageElements);
module.exports = AnnotationPage;