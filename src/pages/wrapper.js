var React = require('react'),
	ReactDOM = require('react-dom'),
	Link = require('react-router').Link;

var Wrapper = React.createClass({
    render: function(){
        return(
                <div className="container">
					<div id="betaDiv"><p id="betaP">Beta</p></div>
					{this.props.children}
				</div>
        );
    }
});

module.exports = Wrapper;
