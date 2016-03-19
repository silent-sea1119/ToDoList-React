var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');


var global_data = [];

var Todowork = function (name, completed){
			this.name=name;
			if(completed){
				this.isCompleted=completed;
			}else{
				this.isCompleted=false;
			}
		}

var SearchBox = React.createClass({
	getInitialState:function(){
		return {text:""};
	},
	test:function(e){
		if(e.keyCode===13 && this.state.text!==""){
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
	deleteTodoitem:function(element,e){
		this.props.deleteTodoitem(element);
	},
	toggle:function(element,e){
		this.props.toggleItem(element);
	},
	render:function(){
		var nodes = [];
		var self=this;
		this.props.items.forEach(function(element, index, array){
			var isCompleted = element.isCompleted?"completed":"";
			nodes.push(
				<li className={isCompleted}>
					<div className="view">
						<input className="toggle" type="checkbox" checked={element.isCompleted} onClick={self.toggle.bind(null,element)}></input>
						<label>{element.name}</label>
						<button  onClick={self.deleteTodoitem.bind(self,element)} className="destroy"></button>
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
	updateFilter:function(e){
		this.props.updateFilter(e.target.text);
	},
	render:function(){
		var self=this;
		var keyArray = ["All","Active","Completed"];
		var selectButton = this.props.filterWord;
		var nodes = keyArray.map(function(element){
			var selected = element===selectButton?"selected":"";
			return (<li>
						<a className={selected} onClick={self.updateFilter}>{element}</a>
				   </li>)
		});
		return (
				<footer className="footer">
					<span className="todo-count">To be Done:{this.props.todocount}</span>
					<ul className='filters'>
							{nodes}
							<li>
								<a className="save" onClick={this.props.upload}>Save</a>
							</li>
					</ul>
				</footer>
			)
	}
})

var CommonContainer = React.createClass({
	getInitialState:function(){
		return {data:[],filterdata:[],todocount:0,filterWord:"All"};
	},
	updateFilter:function(text){
		var oldKey = this.state.filterWord;
		var filterdata = this.state.filterdata;
		if(oldKey!==text){
			filterdata=this.updateData(this.state.data,text);
		}
		this.setState({filterWord:text,filterdata:filterdata});
		
	},
	updateGlobal:function(data){
		global_data = (data);
	}
	loadCommentsFromServer: function() {
	    $.ajax({
		    url: this.props.url,
		    dataType: 'json',
		    success: function(data) {
		    	this.updateGlobal(data);
		    	var filterdata=this.updateData(data);
		        this.setState({data: data,filterdata:filterdata});
		    }.bind(this),
		    error: function(xhr, status, err) {
		        console.error(this.props.url, status, err.toString());
		    }.bind(this)
	    });
	},
	componentDidMount: function() {
    	this.loadCommentsFromServer();
    	console.log("didmount",global_data)
  	},
	updateData:function(data,text=this.state.filterWord){
		var data = data;
		if(text==="Active"){
			data=data.filter(function(item){
				return !item.isCompleted;
			});
		}else if(text==="Completed"){
				data=data.filter(function(item){
				return item.isCompleted;
			})
		}
		global_data = this.state.data;
		return data;
	},
	addTodoitem:function(obj){
		var item = obj;
		var data = this.state.data;
		data.unshift(item);
		var count = this.state.todocount+1;
		var filterdata=this.updateData(data);
		this.setState({data:data,todocount:count,filterdata:filterdata});
	},
	deleteTodoitem:function(element){
		var data = this.state.data;
		data.splice(data.indexOf(element), 1)
		var count=this.updateTodo(data);
		var filterdata=this.updateData(data);
		this.setState({data:data,todocount:count,filterdata:filterdata});
	},
	toggleItem:function(element){
		var data = this.state.data;
		this.toggle(element);
		var count=this.updateTodo(data);
		var filterdata=this.updateData(data);
		this.setState({data:data,todocount:count,filterdata:filterdata});
	},
	toggle:function(item){
		item.isCompleted=!item.isCompleted;
	},
	toggleAll:function(){
		var self = this;
		var data = this.state.data;
		data.map(function(item){
			self.toggle(item);
		});
		var count=this.updateTodo(data);
		var filterdata=this.updateData(data);
		this.setState({data:data,todocount:count,filterdata:filterdata});

	},
	updateTodo:function(data){
		var count = 0;
		data.forEach(function(element){
			if(element.isCompleted===false){
				count++;
			}
		});
		return count;
	},
	upload:function(){
		console.log("ajax low",global_data);
		$.ajax({
		      url: this.props.url,
		      dataType: 'json',
		      type: 'POST',
		      data: JSON.stringify({"newdata":global_data}),
		      success: function(data) {
		      		console.log("it works")
		      }.bind(this),		      
		      error: function(xhr, status, err) {
		       		 console.error(this.props.url, status, err.toString());
		      }.bind(this),
	    });
	},
	render:function(){
		return (
			<div className="todoapp">
				<SearchBox addTodoitem={this.addTodoitem} toggleAll={this.toggleAll} addTodoitem={this.addTodoitem}/>
				<OutcomeList items={this.state.filterdata} toggleItem={this.toggleItem} deleteTodoitem={this.deleteTodoitem}/>
				<Footer todocount={this.state.todocount} upload={this.upload} filterWord={this.state.filterWord} updateFilter={this.updateFilter}/>
			</div>
		)
	}
})

ReactDOM.render(
	<CommonContainer url="http://localhost:3000/api/todo"/>,
	document.getElementById('content')
);

$(document).ready(function() {
    $(window).bind("beforeunload", function() { 
    });
});