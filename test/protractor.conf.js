'use strict';

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    allScriptsTimeout: 70000,
    getPageTimeout: 60000,

    specs: [
        './specs/annotation.spec.js'
    ],

    capabilities: {
        'browserName': 'chrome',
        'chromeOptions': {
            // The '--test-type' option is required so that Chrome won't show security warnings about disabling SSL / Certificate
            // checks. The '--dns-prefetch-disable' option is to try and avoid the 'Timeout receving message from the renderer' in chrome.
            args: ['--test-type', '--dns-prefetch-disable', '--disable-infobars']
        }
    },

    onPrepare: function () {
        browser.ignoreSynchronization = true;
        browser.get("https://staging.annotation.tools.unbabel.com/");

        // Set the type of browser this test run is being executed on.
        browser.getCapabilities().then(function (cap) {
            browser.params.browserName = cap.get('browserName');
        }.bind(this));

        browser.driver.manage().window().maximize();

        var SpecReporter = require('jasmine-spec-reporter');
        jasmine.getEnv().addReporter(new SpecReporter({
            // spec: {
            //     displayFailuresSummary: false,  // display summary of all failures after execution
            //     displayPendingSummary: false,   // display summary of all pending specs after execution
            //     displayPendingSpec: true,        // display each pending spec
            //     displayStackTrace: true
            // }
            displayFailuresSummary: false,  // display summary of all failures after execution
            displayPendingSummary: false,   // display summary of all pending specs after execution
            displayPendingSpec: true,
            displayStackTrace: true
        }));

        jasmine.getEnv().defaultTimeoutInterval = 120000;
    },

    onComplete: function() {
        browser.close();
    },

    jasmineNodeOpts: {
        isVerbose: true,
        showColors: true,
        defaultTimeoutInterval: 120000
    }
};