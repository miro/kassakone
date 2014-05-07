Kassakone
=========

###Development environment
- Node.js (nodejs.org)
- Bower (bower.io)

###npm scripts
- `npm run watch` - Runs `grunt react`, `grunt sass` and starts watching for JSX and SCSS changes
- `npm start` - Starts the mock server

###Grunt tasks
- `grunt watch` - Watch task for building JSX & CSS files
- `grunt sass` - Builds CSS files and places them into app/css/
- `grunt react` - Builds JSX files and places them into app/js/

###Coding conventions
- Indentation: 4 spaces, no tabs
- Develop branch has the latest working development copy
- Master branch has the latest release tagged with a version number
- Features always in feature branches

###Feature branches
Feature branches must be named using the following convention: `feature/my-feature-name`.

Feature branches are merged to develop using pull requests. When your feature branch has been tested and does not contain bugs, it can be merged to develop.

###Using React and JSX
All .jsx files MUST begin with `/** @jsx React.DOM */`. Nothing should be before that.
