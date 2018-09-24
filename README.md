# Unbabel

This is a protractor project for Unbabel Annotation application, where the protractor automates the automation of different annotation to be performed based on different error types, severity and then finish the on process annotation.

The requirements to run this project, in the order specified:

1. nodejs v6
2. npm
3. protractor

To install protractor execute command:

    npm install -g protractor
    
This will install two command line tools, protractor and webdriver-manager. Try running "protractor --version" to make sure it's working.

The webdriver-manager is a helper tool to easily get an instance of a Selenium Server running. Use it to download the necessary binaries with:

    webdriver-manager update
    
For more information on protarctor please visit: www.protractortest.org/#/

The project is structured in the following way:

1. test: This folder contains the pages and specs folder.
2. pages: This folder contains the scripts in which the elements are listed of different pages.
3. specs: This folder contains the scripts in which the test cases(or specs) to be executed are written.
4. SeleniumServerRunner: This folder contains a batch file "run.bat" which initiates the Selenium server. 

The "test" folder contains a package.json file in which the packages to be installed/ dev dependencies are listed. To install those packages/dev depedencies navigate to "test" folder, and execute command:

      npm install
      
The folder also contains the protractor.conf.js file which contains the configuartion to run and it is the file to execute to start the automation scripts.
      
Once all the packages are installed navigate to "SeleniumServerRunner" folder and execute in cmd:

     run.bat 

Open another command line window and navigate to "test" folder and to execute the protractor file execute the command:

      protractor protractor.conf.js
      
The test cases are executed and the result is displayed.

[NOTE: The project is executed on a Windows 7 64 bit environment, for any another environment please make the required changes to execute. Also make sure the changes are made to "protractor.conf.js" file, if any are required.]
