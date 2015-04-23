/*global describe, beforeEach, it*/
'use strict';

var path = require('path'),
    helpers = require('yeoman-generator').test,
    assert = require('yeoman-generator').assert;


describe('website generator', function () {

    beforeEach(function (done) {

        helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {

            if (err) { return done(err); }

            this.app = helpers.createGenerator('website:app', ['../../app']);

            done();
        }.bind(this));
    });

    it('creates expected files', function (done) {

        var expected = [

            // add files you expect to exist here.
            '.jshintrc',
            '.editorconfig'
        ];

        helpers.mockPrompt(this.app, {

            'someOption': 'Y'
        });

        this.app.run(function () {

            assert.file(expected);
            done();
        });
    });
});
