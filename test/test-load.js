/*global describe, it*/
'use strict';

var assert = require('assert');

describe('website generator', function () {

    it('can be imported without blowing up', function () {

        assert(require('../app') !== undefined);
    });
});
