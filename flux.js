var Dispatcher = require('flux').Dispatcher;
var AppDispatcher = new Dispatcher();
var React = require('react');
var ReactDOM = require('react-dom');
var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var ListStore = assign({}, EventEmitter.prototype, {
  items: [],

  getAll: function() {
    return this.items;
  },

  addNewItemHandler: function (text) {
    this.items.push(text);
  },

  emitChange: function () {
    this.emit('change');
  },
  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }

});

//你可以看到MyButton是一个纯组件（即不含有任何状态），从而方便了测试和复用。这就是"controll view"模式的最大优点。
var MyButton = function(props){
    var list = props.items.map(function(item,i){
        return <li key={i}>item</li>
    })
    return (    <div>
                    <ul>
                        {list}
                    </ul>
                    <button onClick={props.onClick}>new item</button>
                </div>
            );
};

// Dispatcher 的作用是将 Action 派发到 Store、。你可以把它看作一个路由器
var ButtonActions = {
  addNewItem: function (text) {
    AppDispatcher.dispatch({
      actionType: 'ADD_NEW_ITEM',
      text: text
    });
  },
};


var MyButtonController = React.createClass({
    getInitialState: function () {
        return {
          items: ListStore.getAll()
        };
    },
    createNewItem:function (event){
        ButtonActions.addNewItem('new item');
    },
    render:function(){
        return (
                <MyButton items={this.state.items} onClick={this.createNewItem}/> 
            ) ;
    },
    componentDidMount: function() {
        ListStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        ListStore.removeChangeListener(this._onChange);
    },

    _onChange: function () {
    this.setState({
      items: ListStore.getAll()
    });
  },
});


ReactDOM.render(
    <MyButtonController/>,
    document.getElementById('container')
);


AppDispatcher.register(function (action) {
  switch(action.actionType) {
    case 'ADD_NEW_ITEM':
          ListStore.addNewItemHandler(action.text);
          ListStore.emitChange();
          break;
    default:
  }
})
