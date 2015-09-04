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

    describe("#validateDate", function() {
        it("expect the function to exist", function() {
            expect(validator.validateDate).to.be.an('function');
        });
    });

    describe("#validateDateSequence", function() {
        it("expect the function to exist", function() {
            expect(validator.validateDateSequence).to.be.an('function');
        });
    });

    describe("#validateTitle", function() {
        it("expect the function to exist", function() {
            expect(validator.validateTitle).to.be.an('function');
        });
    });

    describe("#validateCompetition", function() {
        it("expect the function to exist", function() {
            expect(validator.validateCompetition).to.be.an('function');
        });
    });

    describe("#validateRegistrationInfo", function() {
        it("expect the function to exist", function() {
            expect(validator.validateRegistrationInfo).to.be.an('function');
        });
    });

    describe("#userIsLoggedIn", function() {
        it("expect the function to exist", function() {
            expect(validator.userIsLoggedIn).to.be.an('function');
        });
    });
});