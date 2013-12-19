# CleverStack Angular Seed

This Angular Seed provides you with a cutting edge AngularJS development workflow.

It features the following:

* Development Server
    ** Live Reload, jsHint, COMPASS compilation
* Unit Testing Server
    ** Single run and fully automated using Karma & Mocha and generate code Coverage reports.
* e2e Testing Server
    ** Single run and fully automated using Selenuim WebDriver & AngularJS Protractor Framework
* API Documentation Server
    ** AngularJS API Documentation using Docular.
* Production Preview Server
    ** Quick viewing of your latest production build.


It uses the following web technologies:

* Grunt - for task automation.
* Bower - for JS dependency management.
* Node/NPM - for JS package management.

It includes out of the box:

* Bootstrap 3, COMPASS

It also supports:

* CoffeeScript, SASS/LESS, Source Maps


# Commands

'grunt server' - start dev server, docs server, prod preview server & auto unit testing server. Use this when doing everyday developing while auto testing alongside

'grunt server:dev' - start only the dev server
'grunt server:test' - start only the auto unit test server
'grunt server:dist' - start only the prod preview server
'grunt server:docs' - start only the docs server

'grunt test' - start the auto unit test server, alias for 'grunt autotest:unit'
'grunt test:unit' - single run on unit tests
'grunt test:coverage' - Run a unit test coverage report
'grunt test:e2e' - single run of e2e tests
'grunt autotest:e2e' - start the auto e2e unit test server

'grunt build' - build a production ready app

'grunt docs' - build the docs and start the docs server
'grunt docs:build' - build the api documentation


# Servers

## Development Server
Runs on default port: 9000
This provides you with a nicely automated workflow with AngularJS. On save it provides live page reload, jshint code syntax checking, source maps support, SASS file compilation & autoprefixing of css styles for legacy browsers.

## API Documentation Server
Runs on default port: 9999
This provides API documentation for your AngularJS app.

## Unit Testing Server
Runs on default port: 9090
This provides automated unit testing for AngularJS using Karma test runner. You can also

## Unit Testing Code Coverage Server
Runs on default port: 5555
This provides code coverage reports for unit tests which are served off port 5555.

## End-to-end Testing Server
Runs on default port: 9000
This uses Selenuim WebDriver & AngularJS Protractor Framework to automate actual browser e2e testing.

## Production Preview Server
Runs on default port: 9009
This provides a quick way to view your latest production build.


# Builds

## Production Build
You can build a production ready version of your app in seconds by running the 'grunt build' command. This will process any abstractions your using such as coffeescript, minify all your assets, provide image compression and place everything into the dist directory. This can then instantly view the app using the production preview server on port 9009.

## API Documentation Build
You can build the API documentation for your app by running the 'grunt docs:build' command. You can then instantly view the docs using the API Documentation Server on port 9999.

## Unit Testing Code Coverage Build
You can build unit test coverage reports for the browsers specified in your config/spec-unit.conf.js by running the 'grunt test:coverage' command. This will generate the reports in the /test/coverage directory. You can then instantly view the reports using the Code Coverage Server on port 5555.

# Development Tips

* Change your core application Bootstrap 3 styles & scripts here:

app/bower_components/sass-bootstrap/js/*.js
app/bower_components/sass-bootstrap/lib/*.scss

* Add additional styles here:

app/styles/*.scss

* Write unit tests for every piece of code you write and have the unit test server running in the background to automatically test your code. As a developer it is your responsiblity to test the code you write. And this way you can prove it works!

* Only write e2e tests for things that truely need it. If you are unsure what to e2e for then read up on some AngularJS testing techniques.


# Configuration

This is a list of the files which are configurable:

config/application.conf.json - settings for setting application
config/environment.conf.json - settings for setting up your environment
config/spec-unit.conf.json - settings for your unit tests
config/spec-e2e.conf.json - settings for your e2e tests
Gruntfile.js - core grunt task runner be sure you know what your doing when changing this!
bower.json - add JavaScript dependencies
package.json - add NPM package dependencies
