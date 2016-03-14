var data = ['Home', 'Services', 'About', 'Contact us']; // can be get from server

var Label = React.createClass({
	render:function(){
		return ( 	
				<p>
					seletecd: {this.props.item}
				</p>
			);
	}
})
var NavBar = React.createClass({
	handleclick:function(index){
		this.props.clickCallback(index);
	},
	render:function(){
		var self = this;
		var navs = this.props.items.map(function(item,index){
			var style = "";
			if(index===self.props.focused){
				style='focused';
			}
			return <li className={style} onClick={self.handleclick.bind(self,index)}> {item} </li>;
		});
		return (
				<ul>
					{navs}
				</ul>
			);
	}
});
var MenuExample = React.createClass({
	getInitialState:function(){
		return { focused:0 };
	},
	handleclick:function(index){
		this.setState({focused:index});
	},
	render:function(){
		// var that = this;
		// var navs = this.props.items.map(function(item,index){
		// 	var style='';
		// 	if(that.state.focused==index){
		// 		style='focused';
		// 	}
		// 	return <li className={style} onClick={that.handleclick.bind(that,index)}> {item} </li>;
		// });
		return (
				<div className="Navbar">
					<NavBar clickCallback={this.handleclick} items={this.props.items} focused={this.state.focused}/>
					<Label item={this.props.items[this.state.focused]}/>
				</div>
			);
		// return (<h1> hello </h1>);
	}
});

ReactDOM.render(
    <MenuExample items={data} />,
    document.getElementById('container')
);
