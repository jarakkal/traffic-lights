var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var lights = require(__dirname + '/../lights.js');
var logger = require('../logger.js');

describe('Logger', function() {  
    var log = new logger();
    describe("add logs",function(){
        it("should add the given msg into database", function(done) {
            log.add("TestMsg", function(err, insertID){
                expect(insertID).to.be.a("number");
                log.delete(insertID, function(err,stat){
                });
                done();
            });
        });
    });
    describe("get logs",function(){
        it("should extract logs for a given timeframe", function(done) {
            log.get({start:'00:00:00',end:'00:00:00'}, function(err,rows){
                expect(rows).to.be.empty;
                done();
            });
        });
    });
});

describe('Lights', function() {  
    describe("set to green",function(){
        var light = new lights();
        it("should change the lights to green", function(done) {
            light.setGreen(1,500,function(params){
                expect(params).to.deep.equal({id:1,addCol:'green',remCol:'red,yellow'});
                done();
            })
        });
    });
    describe("set to red",function(){
        var light = new lights();
        it("should change the lights to red", function(done) {
            light.setRed(2,1000,function(params){
                expect(params).to.deep.equal({id:2,addCol:'red',remCol:'green,yellow'});
                done();
            })
        });
    });
});
