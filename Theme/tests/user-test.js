/**
 * Created by user on 3.9.2015 ã..
 */
var expect = chai.expect;

describe("User", function() {

    describe("#login", function() {
        it("expect the function to exist", function() {
            expect(user.login).to.be.an('function');
        });
    });

    describe("#register", function() {
        it("expect the function to exist", function() {
            expect(user.register).to.be.an('function');
        });
    });

});