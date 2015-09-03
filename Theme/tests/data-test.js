/**
 * Created by user on 3.9.2015 ã..
 */

var expect = chai.expect;

describe("Data", function() {

    describe("#getAllCompetitions", function() {
        it("expect the function to exist", function() {
            expect(dataPersister.getAllCompetitions).to.be.an('function');
        });
    });

    describe("#joinCompetition", function() {
        it("expect the function to exist", function() {
            expect(dataPersister.joinCompetition).to.be.an('function');
        });
    });

    describe("#getCompetitionObjectByCompetitionId", function() {
        it("expect the function to exist", function() {
            expect(dataPersister.getCompetitionObjectByCompetitionId).to.be.an('function');
        });
    });

    describe("#getCompetition", function() {
        it("expect the function to exist", function() {
            expect(dataPersister.getCompetition).to.be.an('function');
        });
    });

    describe("#addNewCompetition", function() {
        it("expect the function to exist", function() {
            expect(dataPersister.addNewCompetition).to.be.an('function');
        });
        it("expect the function to return promise", function() {
            var result = dataPersister.addNewCompetition();
            expect(result).to.be.an('Promise');
        });
    });

    describe("#getUserByName", function() {
        it("expect the function to exist", function() {
            expect(dataPersister.getUserByName).to.be.an('function');
        });
        it("expect the function to return promise", function() {
            var result = dataPersister.getUserByName();
            expect(result).to.be.an('Promise');
        });
    });
});