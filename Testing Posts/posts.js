(function(){
	Parse.initialize("NZg3wdOMMX1onBUchl3e5phIvaTrXjCDOsRTOB81", "v1l6sY1RPazz61VUxMPJLVgHlaEoQMk41D2OpYQX");
	var Post = Parse.Object.extend("Post");
    
	function getPosts() {
		var query = new Parse.Query(Post);
		
		query.find({
			success: function(data) {
				var result = '';
				for(var i in data) {
					var title = data[i].get('title');
					var content = data[i].get('content');
					result += '<li>';
					result += '<strong>' + title +'</strong>';
					result += '<p>' + content +'</p>';
					result += '<hr>';
					result += '</li>';
				}
			
				$('#post-list').html(result);			
			}, error: function(err) {
			
			}
		})
	}
	
	getPosts();
	
	$('#post-form').submit(function(ev){
		ev.preventDefault();
		var title = $('#post-title').val();
		var content = $('#post-content').val();
				
		var newPost = new Post();
		newPost.set('title', title);
		newPost.set('content', content);
		
		var $postResult = $('#post-result');
		$postResult.html('').css('display', '');
		
		newPost.save({
			success: function() {								
				$postResult.html('Post submitted').fadeOut(4000);
				$('#post-title').val('');
				$('#post-content').val('');	
				getPosts();
			}, error: function(err) {
				cosole.log('Error');
			}
		});		
	})
}())