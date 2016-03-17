var Dispatcher = require('flux').Dispatcher;

var MyButton = function(props){
    return (<div>
                <button Onlick={props.Onlick}>new item</button>
            </div>)
};

var MyButtonController = React.createClass({
    createNewItem:function (event){
        MyButton.addNewItem('new item');
    },
    render:function(){
        return (
            <MyButton Onlick={this.createNewItem}/>
            ) ;
    }
});

ReactDOM.render(
    <MyButtonController/>,
    document.getElementById('container')
);