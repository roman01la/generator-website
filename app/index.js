'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var WebsiteGenerator = module.exports = function WebsiteGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(WebsiteGenerator, yeoman.generators.NamedBase);

WebsiteGenerator.prototype.gruntfile = function gruntfile() {
  this.template('Gruntfile.js');
};

WebsiteGenerator.prototype.h5bp = function h5bp() {
  this.copy('favicon.ico', 'favicon.ico');
  this.copy('404.html', '404.html');
  this.copy('robots.txt', 'robots.txt');
  this.copy('htaccess', '.htaccess');
};

WebsiteGenerator.prototype.projectFiles = function projectFiles() {
  this.copy('_package.json', 'package.json');
  this.copy('bowerrc', '.bowerrc');
  this.copy('_bower.json', 'bower.json');
  this.copy('jshintrc', '.jshintrc');
  this.copy('editorconfig', '.editorconfig');
};

WebsiteGenerator.prototype.writeIndex = function writeIndex() {
  var contentText = [
    '                             ',
    '        <h1>Hello World!</h1>',
    '                             '
  ];

  this.indexFile = this.appendScripts(this.indexFile, 'js/main.js', [
    'components/jquery/jquery.min.js',
    'js/script.js'
  ]);

  this.indexFile = this.indexFile.replace('<body>', '<body>\n' + contentText.join('\n'));
};

WebsiteGenerator.prototype.app = function app() {
  this.mkdir('styles');
  this.mkdir('js');
  this.mkdir('img');
  this.write('index.html', this.indexFile);
  this.write('js/script.js', '(function () {\n\n})();');
  this.write('styles/main.scss', '@import "normalize-scss/normalize";');
};
