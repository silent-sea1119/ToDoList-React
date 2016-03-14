var data = [
  {id: 1, author: "Pete Hunt", text: "This is one comment"},
  {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
];

var CommentBox = React.createClass({
	getInitialState:function(){
		return {data:[]};
	},
	loadCommentsFromServer: function() {
	    $.ajax({
	      url: this.props.url,
	      dataType: 'json',
	      success: function(data) {
	        this.setState({data: data});
	      }.bind(this),
	      error: function(xhr, status, err) {
	        console.error(this.props.url, status, err.toString());
	      }.bind(this)
	    });
	 },
	componentDidMount: function() {
    	this.loadCommentsFromServer();
    	// setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  	},
  	handleSubmit:function(comment){
  		// this.loadCommentsFromServer();
  		console.log(comment);
	  	$.ajax({
		      url: this.props.url,
		      dataType: 'json',
		      type: 'POST',
		      data: comment,
		      success: function(data) {
		        this.setState({data: data});
		      }.bind(this),
		      error: function(xhr, status, err) {
		        console.error(this.props.url, status, err.toString());
		      }.bind(this)
	    });
	},
	render:function(){
		return (
			<div className="commentBox">
				<h1>Hello Steven!</h1>
				<CommentList data={this.state.data}/>
				<CommentForm onCommentSubmit={this.handleSubmit}/>
			</div>
		)
	}
})


var Comment = React.createClass({
	render: function(){
		return (
			<div className="comment">
				<h2>
				{this.props.author}
				</h2>
				{this.props.children}
			</div>
		);
	}
})

var CommentList = React.createClass({
	render:function(){
		var nodes = this.props.data.map(function(comment){
			return (
				<Comment author={comment.author} key={comment.id}>
					{comment.text}
				</Comment>
			);
		})
		return (
			<div className="commentList">
				{nodes}
			</div>
		)
	}
})

var CommentForm = React.createClass({
	getInitialState:function(){
		return {author:'',text:''};
	},
	handlenameChange:function(e){
		this.setState({author:e.target.value});
	},
	handlentextChange:function(e){
		this.setState({text:e.target.value});
	},
	handleSubmit:function(e){
		e.preventDefault();
		// var author = this.state.author.trim();
  //  		var text = this.state.text.trim();
		this.props.onCommentSubmit({author: this.refs.fakeauthor.value, text: this.refs.faketext.value});
    	// this.setState({author: '', text: ''});
    	this.refs.fakeauthor.value="";
    	this.refs.faketext.value="";
	},
	render:function(){
		return (
			 <form className="commentForm" onSubmit={this.handleSubmit}>
		        <input type="text" placeholder="Your name" ref="fakeauthor" />
		        <input type="text" placeholder="Say something..." ref="faketext"  />
		        <input type="submit" />
		     </form>
		)
	}
})

ReactDOM.render(
	<CommentBox url="http://localhost:3000/api/comments"/>,
	document.getElementById('content')
);