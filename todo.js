var CommonContainer = React.createClass({
	render:function(){
		return (
			<div className="todoapp">
				<h1>To Do List</h1>
				<input className="new-todo" type="text"></input>
			</div>
		)
	}
})


ReactDOM.render(
	<CommonContainer />,
	document.getElementById('content')
);