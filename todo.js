


var Todowork = function (name, completed){
			this.name=name;
			if(completed){
				this.isCompleted=completed;
			}else{
				this.isCompleted=false;
			}
		}
Todowork.prototype.toggle=function(){
			this.isCompleted=!this.isCompleted;
		}

var SearchBox = React.createClass({
	getInitialState:function(){
		return {text:""};
	},
	test:function(e){
		if(e.keyCode===13){
			this.props.addTodoitem(new Todowork(this.state.text));
			this.setState({text:""});
		}
	},
	handlechange:function(e){
		var text = e.target.value;
		this.setState({text:text});
	},
	render:function(){
		return (
				<header className='header'>
					<h1>To Do List</h1>
					<input className="new-todo" type="text" placeholder="what will I do" value={this.state.text} onChange={this.handlechange} onKeyDown={this.test}></input>
					<input className="toggle-all" type="checkbox" onClick={this.props.toggleAll}></input>
				</header>
			)
	}
})

var OutcomeList = React.createClass({
	deleteTodoitem:function(index,e){
		this.props.deleteTodoitem(index);
	},

	render:function(){
		var nodes = [];
		var self=this;
		this.props.items.forEach(function(element, index, array){
			var isCompleted = element.isCompleted?"completed":"";
			nodes.push(
				<li className={isCompleted}>
					<div className="view">
						<input className="toggle" type="checkbox" checked={element.isCompleted} onClick={self.props.toggleItem.bind(self,index)}></input>
						<label>{element.name}</label>
						<button  onClick={self.deleteTodoitem.bind(self,index)} className="destroy"></button>
					</div>
				</li>
			);
		});
		return (
				<section className='main'>
					<ul className="todo-list">
						{nodes}
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
	getInitialState:function(){
		return {data:[]};
	},
	addTodoitem:function(obj){
		var item = obj;
		var data = this.state.data;
		data.unshift(item);
		this.setState({data:data});
	},
	deleteTodoitem:function(number){
		var data = this.state.data;
		delete data[number];
		this.setState({data:data});
	},
	toggleItem:function(index){
		var data = this.state.data;
		data[index].toggle();
		this.setState({data:data});
	},
	toggleAll:function(){
		var data = this.state.data;
		data.map(function(item){
			item.toggle();
		})
		this.setState({data:data});
	},
	render:function(){
		return (
			<div className="todoapp">
				<SearchBox addTodoitem={this.addTodoitem} toggleAll={this.toggleAll} addTodoitem={this.addTodoitem}/>
				<OutcomeList items={this.state.data} toggleItem={this.toggleItem} deleteTodoitem={this.deleteTodoitem}/>
				<Footer />
			</div>
		)
	}
})


ReactDOM.render(
	<CommonContainer />,
	document.getElementById('content')
);