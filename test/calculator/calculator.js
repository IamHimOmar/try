var mocha = require('mocha');
var expect  = require('chai').expect;
// var superagent = require('superagent');
var assert = require('assert');
var request = require('request');
var calculator = require('../src/api/calculator.js')


describe('calculator tests', function() {
  describe('Add all numbers in array', function() {
    it('#AddNumberInArray()', function(){
      var Arr = [1,2,3,4,5,6,7,8,9,10]
      expect(calculator.AddNumberInArray(Arr)).to.equal(55);
    });
    it('#SquareRoot()', function(){
      expect(calculator.SquareRoot(9)).to.equal(3);
    });
  });
});

describe('manual calculations test', function() {
  describe('adding', function() {
    it('adding number success', function() {
      expect(1+20).to.equal(21);
    });
    it('adding number error', function() {
        expect(1+20).to.not.equal(20);
    });
  });
  describe('substraction', function() {
    it('subtracting number success', function() {
      expect(21-1).to.equal(20);
    });
    it('subtracting number error', function() {
        expect(1-20).to.not.equal(0);
    });
  });
  describe('multiplication', function() {
    it('multiply number success', function() {
      expect(21*2).to.equal(42);
    });
    it('multiply number error', function() {
        expect(1*0).to.not.equal(1);
    });
  });
  describe('division', function() {
    it('devide number success', function() {
      expect(22/2).to.equal(11);
    });
    it('multiply number error', function() {
        expect(1/1).to.not.equal(100);
    });
  });
});
