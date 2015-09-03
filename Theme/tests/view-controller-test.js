/**
 * Created by user on 3.9.2015 ã..
 */
var expect = chai.expect;

describe("View-controller", function() {

    describe("#updateUI", function() {
        it("expect the function to exist", function() {
            expect(viewer.updateUI).to.be.an('function');
        });
        it("expect the function to return promise", function() {
            var result = viewer.updateUI();
            expect(result).to.be.an('Promise');
        });
    });

    describe("#parseTemplate", function() {
        it("expect the function to exist", function() {
            expect(viewer.parseTemplate).to.be.an('function');
        });
        it("expect the function to return promise", function() {
            var result = viewer.parseTemplate();
            expect(result).to.be.an('Promise');
        });
    });

});