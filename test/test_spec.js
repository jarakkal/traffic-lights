var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var lights = require(__dirname + '/../lights.js');

describe('change lights', function() {
  it('getSubtotal() should return 0 if no items are passed in', function() {
    var light = new lights();
    
    expect(light.setRed(1,5000)).to.equal({id:1,addCol:'green',remCol:'red,yellow'});
  });
});
