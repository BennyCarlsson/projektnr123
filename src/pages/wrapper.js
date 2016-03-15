var React = require('react'),
	ReactDOM = require('react-dom'),
	Link = require('react-router').Link;

var Wrapper = React.createClass({
    render: function(){
        return(
                <div className="container">
					<h1>Hello World!</h1>
					{this.props.children}
				</div>
        );
    }
});

module.exports = Wrapper;
