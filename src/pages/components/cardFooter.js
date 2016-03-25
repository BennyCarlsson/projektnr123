/*jshint esnext: true */
var React = require('react'),
    ReactDOM = require('react-dom'),
    Link = require('react-router').Link;

var CardFooter = React.createClass({
    render: function(){
        return(
            <div className="cardFooter">
                <p className="cardFooterP">
                    <span className="universitySpan">{this.props.university}</span>
                    <span className="aliasSpan">{"-"+this.props.alias}</span>
                </p>
            </div>
        );
    }
});
module.exports = CardFooter;
