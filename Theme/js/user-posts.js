export default userPosts => {
    var userPosts = {
        getAllPosts: function() {
            var Post = Parse.Object.extend("Post");
            var User = Parse.Object.extend("User");
            var query = new Parse.Query(Post);
            query.include(User);
            query.find({
                success: function(posts) {
                    for (var i = 0; i < posts.length; i++) {
                        var post = posts[i];
                        $('#post-list').append('<li>'+ post.get('content') +'</li>');
                    }
                },
                error: function(error) {
                    alert("Error: " + error.code + " " + error.message);
                }
            });
        },
        makePost: function() {
            var Post = Parse.Object.extend("Post");

            var content = $('#post-content').val();
            var user = Parse.User.current();

            var newPost = new Post();
            newPost.set('content', content);
            newPost.set('user', user);

            var $postResult = $('#post-result');
            $postResult.html('').css('display', '');

            newPost.save({
                success: function () {
                    $postResult.html('Post submitted').fadeOut(4000);
                    $('#post-content').val('');
                    $('#post-list').append('<li>'+ newPost.get('content') +'</li>');
                }
                , error: function (err) {
                    alert("Error: " + error.code + " " + error.message);
                }
            });
        }
    };

    return userPosts;
}