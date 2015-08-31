export default userPosts => {
    var userPosts = {
        getAllPosts: function() {
            var Post = Parse.Object.extend("Post");
            var User = Parse.Object.extend("User");
            var query = new Parse.Query(Post);
            query.include('user');
            query.find({
                success: function(posts) {
                    for (var i = 0; i < posts.length; i++) {
                        var post = posts[i];
                        var user = posts[i].get('user');
                        var userName = user.get('username');
                        $('#post-list').append('<li>'+ userName + ': ' + post.get('content') +'</li>');
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
            var userName = user.get('username');

            var newPost = new Post();
            newPost.set('content', content);
            newPost.set('user', user);

            var $postResult = $('#post-result');
            $postResult.html('').css('display', '');

            newPost.save({
                success: function () {
                    $postResult.html('Post submitted').fadeOut(4000);
                    $('#post-content').val('');
                    $('#post-list').append('<li>'+ userName + ': ' + newPost.get('content') +'</li>');
                }
                , error: function (err) {
                    alert("Error: " + error.code + " " + error.message);
                }
            });
        }
    };

    return userPosts;
}