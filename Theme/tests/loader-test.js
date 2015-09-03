/**
 * Created by user on 3.9.2015 ã..
 */
var expect = chai.expect;

describe("Loader", function() {

    describe("#getScript", function() {
        it("expect the function to exist", function() {
            expect(loader.getScript).to.be.an('function');
        });
        it("expect the function to return promise", function() {
            var result = loader.getScript();
            expect(result).to.be.an('Promise');
        });
    });

    describe("#getPartial", function() {
        it("expect the function to exist", function() {
            expect(loader.getPartial).to.be.an('function');
        });
        it("expect the function to return promise", function() {
            var result = loader.getPartial();
            expect(result).to.be.an('Promise');
        });
    });

    describe("#getTemplate", function() {
        it("expect the function to exist", function() {
            expect(loader.getTemplate).to.be.an('function');
        });
        it("expect the function to return promise", function() {
            var result = loader.getTemplate();
            expect(result).to.be.an('Promise');
        });
    });

});