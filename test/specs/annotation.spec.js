'use strict';

var _ = require('lodash');
var path = require('path');
var common = require('../common.def.js');

var LoginPage = require('../pages/login.po.js'),
    loginPage = new LoginPage(),
    ListPage = require('../pages/listPage.po.js'),
    listPage = new ListPage(),
    AnnotationPage = require('../pages/annotation.po.js'),
    annotationPage = new AnnotationPage();

describe('Annotation operation automation', function () {
    beforeEach(function () {
        browser.isElementPresent(annotationPage.idolModal.modalWindow).then(function (present) {
            if (present) {
                annotationPage.idolModal.continueButton.click();
            }
        });
    });

    afterAll(function () {
        browser.controlFlow().execute(function () {
            annotationPage.elementClick(annotationPage.navigationCircle.get(0));
            browser.sleep(5000);

            annotationPage.sideTabs.get(1).click();
            annotationPage.waitForElementsVisibilityStatus(annotationPage.noAnnotationListMessage, false);
            annotationPage.annotationList.count().then(function (text) {

                while (text) {
                    browser.actions().mouseMove(annotationPage.annotationList.get(0)).perform();
                    annotationPage.waitForElementsVisibilityStatus(annotationPage.removeAnnotationIcon.get(0), true, 15000);
                    annotationPage.elementClick(annotationPage.removeAnnotationIcon.get(0));
                    browser.sleep(7000);

                    expect(annotationPage.annotationList.count()).toEqual(text-1);
                    text -= 1;
                }
            });
        });
    });

    it('show that clicking on sign in button navigate to Sign In window', function () {
        annotationPage.signIn.click();
    });

    it('show that the user can sign in using the given username and password', function () {
        loginPage.userNameTextBox.sendKeys(common.USERNAME);
        loginPage.passswordTextBox.sendKeys(common.PASSWORD);
        loginPage.signInButton.click();
        listPage.waitForElementsVisibilityStatus(listPage.listToAnnotate);
    });

    it('show that a list to annotate is present', function () {
        listPage.listToAnnotate.click();
        annotationPage.waitForElementsVisibilityStatus(annotationPage.activeSideTab.get(0), true);

        //current left active side tab is Information
        expect(annotationPage.activeSideTab.get(0).getText()).toContain("Information");
    });

    it('show that when nothing is selected the Add button in Annotation tab is disabled', function () {
        expect(annotationPage.errorType_addButton.getAttribute('class')).toContain('is-disabled');
    });

    it('show that the title of the languages to annotate is displayed', function () {
        annotationPage.waitForElementsVisibilityStatus(annotationPage.backButton, true, 20000);
        browser.sleep(5000);
        expect(annotationPage.languageTitle.get(0).getText()).toBe("Spanish");
        expect(annotationPage.languageTitle.get(1).getText()).toBe("English");
    });

    it('show that the use is able to add annotations', function () {
        annotationPage.selectTextToAnnotateWebElement(annotationPage.paragraphText.get(3));

        //check the labels of the active tab
        expect(annotationPage.activeSideTab.get(0).getText()).toContain("Annotations");
        expect(annotationPage.activeSideTab.get(1).getText()).toContain("Annotate");
        browser.sleep(2000);

        annotationPage.selectErrorSubMType(common.ERROR_TYPES[1], common.SUB_MENU_FLUENCY[5]);
        browser.sleep(2000);

        annotationPage.waitForElementsVisibilityStatus(annotationPage.textBox_searchErrorType, true);
        expect(annotationPage.textBox_searchErrorType.getAttribute('value')).toBe(common.SUB_MENU_FLUENCY[5]);

        annotationPage.radioBox_MajorSeverity.click();
        expect(annotationPage.errorType_addButton.isEnabled()).toBe(true);
        annotationPage.waitForElementsVisibilityStatus(annotationPage.noAnnotationListMessage, true, 5000);

        annotationPage.errorType_addButton.click();
        annotationPage.waitForElementsVisibilityStatus(annotationPage.radioBox_sortByType, true, 30000);
        expect(annotationPage.annotationList.count()).toEqual(1);
        expect(annotationPage.annotationList__Header.get(0).getText()).toContain(common.SUB_MENU_FLUENCY[5]);
    });
    
    it('show that user can add other annotations', function () {
        annotationPage.selectTextToAnnotateWebElement(annotationPage.paragraphText.get(5));
        expect(annotationPage.activeSideTab.get(0).getText()).toContain("Annotations");
        browser.sleep(2000);

        annotationPage.selectErrorSubMType(common.ERROR_TYPES[2], common.SUB_MENU_STYLE[1]);
        browser.sleep(2000);

        annotationPage.waitForElementsVisibilityStatus(annotationPage.textBox_searchErrorType, true);
        expect(annotationPage.textBox_searchErrorType.getAttribute('value')).toBe(common.SUB_MENU_STYLE[1]);

        annotationPage.radioBox_CriticalSeverity.click();
        expect(annotationPage.errorType_addButton.isEnabled()).toBe(true);
        expect(annotationPage.annotationList.count()).not.toBeLessThan(0);

        annotationPage.errorType_addButton.click();
        browser.sleep(2000);
        expect(annotationPage.annotationList.count()).toEqual(2);
        expect(annotationPage.annotationList__Header.get(1).getText()).toContain(common.SUB_MENU_STYLE[1]);
    });

    it('show that the user is adding a last annotation', function () {
        annotationPage.selectTextToAnnotateWebElement(annotationPage.paragraphText.get(11));
        expect(annotationPage.activeSideTab.get(0).getText()).toContain("Annotations");
        browser.sleep(2000);

        annotationPage.selectErrorSubMType(common.ERROR_TYPES[0], common.SUB_MENU_ACCURACY[1], common.SUB_MENU_ACCURACY_OMISSION[0]);
        browser.sleep(2000);

        annotationPage.waitForElementsVisibilityStatus(annotationPage.textBox_searchErrorType, true);
        expect(annotationPage.textBox_searchErrorType.getAttribute('value')).toBe(common.SUB_MENU_ACCURACY_OMISSION[0]);

        annotationPage.radioBox_MinorSeverity.click();
        expect(annotationPage.errorType_addButton.isEnabled()).toBe(true);
        expect(annotationPage.annotationList.count()).not.toBeLessThan(0);

        annotationPage.errorType_addButton.click();
        browser.sleep(2000);
        expect(annotationPage.annotationList.count()).toEqual(3);
        expect(annotationPage.annotationList__Header.get(2).getText()).toContain(common.SUB_MENU_ACCURACY_OMISSION[0]);
    });

    it('show that the user can sort the annotations on basis of severity', function () {
        expect(annotationPage.annotationList__Header.get(0).getText()).toContain(common.SUB_MENU_FLUENCY[5]);
        annotationPage.radioBox_sortBySeverity.click();
        browser.sleep(3000);
        expect(annotationPage.annotationList__Header.get(0).getText()).toContain(common.SUB_MENU_STYLE[1]);
    });

    it('show that after the user is done the user can finish the report', function () {
        expect(annotationPage.sideTabs.get(5).getText()).toContain("Finish or Report");
        annotationPage.sideTabs.get(5).click();
        expect(annotationPage.activeSideTab.get(1).getText()).toContain("Finish or Report");
        annotationPage.waitForElementsVisibilityStatus(annotationPage.radioBox__Finish, true, 5000);

        //rating it five stars
        annotationPage.randomStarRating();
        browser.sleep(2000);

        //task comments
        annotationPage.textBox_taskComment_Finish.clear();
        annotationPage.textBox_taskComment_Finish.sendKeys("You are Rockstar Tarang!!!");
        annotationPage.finishButton.click();

        //discrad the finish process
        annotationPage.waitForElementsVisibilityStatus(annotationPage.jobFinish.completeFinish, true, 30000);
        // browser.sleep(3000);
        annotationPage.jobFinish.discardFinish.click();
        annotationPage.waitForElementsVisibilityStatus(annotationPage.backButton, true);
        browser.sleep(3000);

        //complete the finish process
        annotationPage.finishButton.click();
        annotationPage.waitForElementsVisibilityStatus(annotationPage.jobFinish.completeFinish, true, 30000);
        // browser.sleep(3000);
        annotationPage.jobFinish.completeFinish.click();

        annotationPage.waitForElementsVisibilityStatus(annotationPage.noAnnotationListMessage, true, 20000);
        browser.sleep(3000);
    });
});