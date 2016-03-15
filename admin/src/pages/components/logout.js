var React = require('react'),
	ReactDOM = require('react-dom'),
	C = require('../../constants'),
	Firebase = require("firebase"),
	FireRef = new Firebase(C.FIREBASE);

var LogoutForm = React.createClass({
	render : function(){
		return(
			<a href="#" onClick={Logout}>Logga ut</a>
		);
	}
});
function Logout(e){
	e.preventDefault();
	FireRef.unauth();
}

module.exports = LogoutForm;
