
var SearchBox = React.createClass({
	render:function(){
		return (
				<header className='header'>
					<h1>To Do List</h1>
					<input className="new-todo" type="text" placeholder="what will I do"></input>
					<input className="toggle-all" type="checkbox"></input>
				</header>
			)
	}
})

var OutcomeList = React.createClass({
	render:function(){
		return (
				<section className='main'>
					<ul className="todo-list">
					</ul>
				</section>
			)
	}
})

var Footer = React.createClass({
	render:function(){
		return (
				<footer className="footer">
				</footer>
			)
	}
})

var CommonContainer = React.createClass({
	render:function(){
		return (
			<div className="todoapp">
				<SearchBox />
				<OutcomeList />
				<Footer />
			</div>
		)
	}
})


ReactDOM.render(
	<CommonContainer />,
	document.getElementById('content')
);