/**
 * Created by user on 3.9.2015 ã..
 */

var expect = chai.expect;

describe("Validator", function() {

    describe("#validateUsername", function() {
        it("expect the function to exist", function() {
            expect(validator.validateUsername).to.be.an('function');
        });
    });

    describe("#validatePassword", function() {
        it("expect the function to exist", function() {
            expect(validator.validatePassword).to.be.an('function');
        });
    });

    describe("#validateMatchingPasswords", function() {
        it("expect the function to exist", function() {
            expect(validator.validateMatchingPasswords).to.be.an('function');
        });
    });

    describe("#validateEmail", function() {
        it("expect the function to exist", function() {
            expect(validator.validateEmail).to.be.an('function');
        });
    });
});