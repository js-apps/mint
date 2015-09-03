/**
 * Created by user on 3.9.2015 ã..
 */

var expect = chai.expect;

describe("User-posts", function() {

    describe("#getAllPosts", function() {
        it("expect the function to exist", function() {
            expect(userPosts.getAllPosts).to.be.an('function');
        });
        it("expect the function to return promise", function() {
            var result = userPosts.getAllPosts();
            expect(result).to.be.an('Promise');
        });
    });

    describe("#makePosts", function() {
        it("expect the function to exist", function() {
            expect(userPosts.makePost).to.be.an('function');
        });
    });

});