'use strict';

var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator'),
    writing = require('html-wiring'),
    mkdirp = require('mkdirp');


var WebsiteGenerator = module.exports = function WebsiteGenerator (args, options) {

    yeoman.generators.Base.apply(this, arguments);

    this.__ = require('lodash');

    this.indexFile = writing.readFileAsString(path.join(this.sourceRoot(), 'index.html'));

    this.on('end', function() {

        this.installDependencies({ skipInstall: options['skip-install'] });
    });

    this.pkg = JSON.parse(writing.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(WebsiteGenerator, yeoman.generators.NamedBase);

WebsiteGenerator.prototype.gruntfile = function() {

    this.template('Gruntfile.js');
};

WebsiteGenerator.prototype.h5bp = function() {

    this.copy('favicon.ico', 'favicon.ico');
    this.copy('404.html', '404.html');
    this.copy('robots.txt', 'robots.txt');
    this.copy('htaccess', '.htaccess');
};

WebsiteGenerator.prototype.projectFiles = function() {

    this.copy('_package.json', 'package.json');
    this.copy('bowerrc', '.bowerrc');
    this.copy('_bower.json', 'bower.json');
    this.copy('jshintrc', '.jshintrc');
    this.copy('editorconfig', '.editorconfig');
};

WebsiteGenerator.prototype.writeIndex = function() {

    var contentText = [
        '                             ',
        '        <h1>Hello World!</h1>',
        '        <img src="/img/logo.png">'
    ];

    this.indexFile = writing.appendScripts(this.indexFile, 'js/main.js', [

        'bower_components/jquery/dist/jquery.js',
        'js/script.js'
    ]);

    this.indexFile = this.indexFile.replace('<body>', '<body>\n' + contentText.join('\n'));
};

WebsiteGenerator.prototype.app = function() {

    mkdirp('styles');
    mkdirp('js');
    mkdirp('img');
    this.copy('logo.png', 'img/logo.png');
    this.write('index.html', this.indexFile);
    this.write('js/script.js', '(function () {\n\n})();');
    this.write('styles/main.scss', [

        '@import "modularized-normalize-scss/normalize";',
        '\n\n',
        'body {',
        '  text-align: center;',
        '}'
    ].join('\n'));
};
