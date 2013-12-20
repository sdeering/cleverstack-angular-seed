CleverStack Angular Seed
====================

![CleverStack Angular Seed"](app/images/cleverstack-angular.png "CleverStack Angular Seed")

This Angular Seed provides you with a cutting edge AngularJS development workflow. It's been designed to provide you with a super fast test driven front-end development lifecycle. Everything you need is just one command away, if it's not please open an issue or fork and submit a pull request.

## Features

These are the main features provided by this front-end development workflow:

* **Development Server** - Live Reload, jsHint, COMPASS compilation
* **Unit Testing Server**- Single run and fully automated using Karma & Mocha and generate code Coverage reports.
* **e2e Testing Server** - Single run and fully automated using Selenuim WebDriver & AngularJS Protractor Framework
* **API Documentation Server** - AngularJS API Documentation using Docular.
* **Production Preview Server** - Quick viewing of your latest production build.


It uses the following web technologies:

* [Grunt](http://gruntjs.com/) - for task automation.
* [Bower](http://bower.io/) - for JS dependency management.
* [Node/NPM](https://npmjs.org/) - for JS package management.

It also includes out of the box:

* [Bootstrap 3](http://getbootstrap.com/) - the most popular front-end framework.
* [COMPASS](http://compass-style.org/) - the most feature full CSS framework.

## Install

To install the angular app run the following commands:

1. `$ git clone https://github.com/clevertech/cleverstack-angular-seed.git my-angular-app`
2. `$ cd my-angular-app`
3. `$ grunt install`
4. `$ grunt server`

## Prerequisites

1. [NodeJS](http://nodejs.org) (v0.8+) & [NPM](http://npmjs.org/)

If you get stuck with your installation check out the trobleshooting section below.


## Commands

Run these commands from your favourite terminal:

`$ grunt server` - start dev server, docs server, prod preview server & auto unit testing server. Use this when doing everyday developing while auto testing alongside

`$ grunt server:dev` - start only the dev server

`$ grunt server:test` - start only the auto unit test server

`$ grunt server:dist` - start only the prod preview server

`$ grunt server:docs` - start only the docs server

`$ grunt test` - start the auto unit test server, alias for 'grunt autotest:unit'

`$ grunt test:unit` - single run on unit tests

`$ grunt test:coverage` - run a unit test coverage report

`$ grunt test:e2e` - single run of e2e tests

`$ grunt autotest:e2e` - start the auto e2e unit test server

`$ grunt build` - build a production ready app

`$ grunt docs` - build the docs and start the docs server

`$ grunt docs:build` - build the api documentation



## Configuration

This is a list of the files which are configurable:

`config/application.conf.json` - settings for setting application

`config/environment.conf.json` - settings for setting up your environment

`config/spec-unit.conf.json` - settings for your unit tests

`config/spec-e2e.conf.json` - settings for your e2e tests

`Gruntfile.js` - core grunt task runner be sure you know what your doing when changing this!

`bower.json` - add JavaScript dependencies

`package.json` - add NPM package dependencies



## Directory

This is the main directory structure.

<pre>
├── app/                // app folder contains your angular app development files
│
├── config/             // config folder contains all configs for your app
│
├── dist/               // dist folder contains the latest production build of your app
│
├── docs/               // docs folder contains the latest build of app's api docs
│
├── test/               // test folder contains all your app test specs
│
├── .bowerrc            // stores bower appPath
├── .gitignore          // files to be ignored by git
├──  .jshintrc          // settings for your jshint checks
├── .sass-cache         // (dir) temporary files (sass)
├── .tmp                // (dir) temporary files (generated styles etc...)
├── .travis.yml         // app CI build status
├── bower.json          // app javascript dependencies
├── Gruntfile.js        // master grunt configuration for running tasks
├── package.json        // app dependencies / npm packages
├── LICENSE             // app license
├── README.md           // app readme
</pre>



## Servers

### Development Server
Runs on default port: `9000`

This provides you with a nicely automated workflow with AngularJS. On save it provides live page reload, jshint code syntax checking, source maps support, SASS file compilation & autoprefixing of css styles for legacy browsers.

### API Documentation Server
Runs on default port: `9999`

This provides API documentation for your AngularJS app.

### Unit Testing Server
Runs on default port: `9090`

This provides automated unit testing for AngularJS using Karma test runner. You can also

### Unit Testing Code Coverage Server
Runs on default port: `5555`

This provides code coverage reports for unit tests which are served off port 5555.

### End-to-end Testing Server
Runs on default port: `9000`

This uses Selenuim WebDriver & AngularJS Protractor Framework to automate actual browser e2e testing.

### Production Preview Server
Runs on default port: `9009`

This provides a quick way to view your latest production build.



## API Documentation

### API Documentation Build
You can build the API documentation for your app by running the `grunt docs:build` command. You can then instantly view the `/docs` using the API Documentation Server on port `9999`. The documentation is built using [Docular](http://grunt-docular.com/).


## Code Coverage Reports

### Unit Testing Code Coverage Build
You can build unit test coverage reports for the browsers specified in your `config/spec-unit.conf.js` by running the 'grunt test:coverage' command. This will generate the reports in the `/test/coverage` directory. You can then instantly view the reports using the Code Coverage Server on port `5555`. The test coverage report is built using [Karma](http://karma-runner.github.io/) and [Istanbul](https://npmjs.org/package/istanbul).


## Deployment

### Production Build
You can build a production ready version of your app in seconds by running the `grunt build` command. This will process any abstractions your using such as coffeescript, minify all your assets, provide image compression and place everything into the `/dist` directory. This can then instantly view the app using the production preview server on port `9009`. You can take this dist folder and serve it anywhere as normal.


## Development Tips

* Change your core application Bootstrap 3 styles & scripts here:

   `app/bower_components/sass-bootstrap/js/*.js`

   `app/bower_components/sass-bootstrap/lib/*.scss`


* Add additional styles here:

   `app/styles/*.scss`
   

* Write unit tests for every piece of code you write and have the unit test server running in the background to automatically test your code. As a developer it is your responsiblity to test the code you write. And this way you can prove it works!

* Only write e2e tests for things that truely need it. If you are unsure what to e2e for then read up on some AngularJS testing techniques.


## Troubleshooting

### Installing NodeJS & NPM



### Installing Selenium, WebDriver & Protractor

The easiest way is to install Selenium Server using the [Protractor NPM package](https://github.com/angular/protractor):

`$ npm install -g protractor`

**Note:** You may need to update the Chrome Driver location in `config/spec-e2e.conf.json` depending on the OS your running.

<pre>
chromeDriver: './test/selenium/chromedriver-win32' // Windows
chromeDriver: './test/selenium/chromedriver-mac32' // Mac
chromeDriver: './test/selenium/chromedriver-linux32' // Linux
</pre>


It's faster if you have the Selenium Server running in a sepereate terminal (optional).

`$ webdriver-manager`
`$ webdriver-manager start`

Then you can run the following in your main terminal to get the automated e2e testing running.

`$ grunt autotest:e2e`


**OR**

You can manually download the [latest Selenium Server .jar](https://code.google.com/p/selenium/downloads/list) file and the [latest Chrome Driver](http://chromedriver.storage.googleapis.com/index.html) for 

Then update `config/spec-e2e.conf.json` with the following:

<pre>
seleniumServerJar: '<path to selenium server .jar>',   //it also can be the absolute path or relative to project.
chromeDriver: '<path to chrome driver .exe>'
<pre>


## FAQ Grunt

**Where do I add new grunt tasks?**

At the moment you will need to extend the Gruntfile.js. You can add options in the config/*.conf.js files to make life easier when developing.

**Does grunt support HTTPS?**

Yes but you will need to make some modifications to the server options in the Gruntfile.js file. See here for details: https://github.com/gruntjs/grunt-contrib-connect


## FAQ Unit & e2e Testing

**Does grunt support HTTPS?**

Yes but you will need to make some modifications to the server options in the Gruntfile.js file. See here for details: https://github.com/gruntjs/grunt-contrib-connect

**When running karma unit tests I'm getting an error from the browser, how can I debug it?**

Go to the captured browser and click the "DEBUG" button (or open http://localhost:9876/debug.html) and use the web inspector to see what's going on. (You may need to refresh the debug.html page for it to kick in once the web inspector is open.)

**Can karma run qunit, jasmine, mocha/chai out of the box or are additional grunt plugins required?**

Karma is test framework/syntax agnostic. We use jasmine as default but then are all supported.
links: http://karma-runner.github.io/0.10/intro/faq.html, https://github.com/karma-runner/karma/tree/master/test/e2e

**Why did you choose mocha as default unit testing framework?**

We could have chosen any of them as a matter of preference such as jamine or qunit. We chose Mocha because we want to keep it consistent with testing our front-end AngularJS and back-end NodeJS. Mocha is the "new kid on the block" and lots of new projects are starting to use it. Karma does support jasmine quite well. Join the debate https://github.com/yeoman/yeoman/issues/117 And if Paul Irish says it's good then I trust in my idols! :D "The reasons you give for dropping jasmine are sound.Let's do it". - Paul Irish

**Does it support normal CSS as well as SASS?**

Yes. And it uses autoprofixer so you don't need to worry about adding legacy browser prefixes. It does this all for you - browsers controlled in the config.

## License

CleverStack is copyright of [Clevertech](http://clevertech.biz) and is licensed under the MIT License.

-----
I'm documentation! Sometimes I fail. If you see this please fix me and submit a pull request =).
