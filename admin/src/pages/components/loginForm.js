var React = require('react'),
	ReactDOM = require('react-dom'),
	C = require('../../constants'),
	Firebase = require("firebase"),
	FireRef = new Firebase(C.FIREBASE);

var LoginForm = React.createClass({
	getInitialState: function(){
		return{email:"",password:""};
	},
	handleChange: function(e){
		var nextState = {};
		nextState[e.target.name] = e.target.value;
		this.setState(nextState);
	},
	handleSubmit: function(e){
		e.preventDefault();
		var email = this.state.email;
		var password = this.state.password;
		if(!email ||!password){
			return;
		}
		Login(email, password);
	},
	render : function(){
		return(
			<div id="loginFormDiv">
				<form id="loginForm" onSubmit={this.handleSubmit}>
					Email:<input type="text" id="email" name="email"
						value={this.state.email} onChange={this.handleChange}/>
					Lösenord:<input type="password" id="password" name="password"
						value={this.state.password} onChange={this.handleChange}/>
					<button type="submit">Logga In</button>
			</form>
			</div>
		);
	}
});

//no function is using this atm
//only used it once to register carlsson.benny93@gmail.com qwerty
function Register(){
	FireRef.createUser({
	  email    : "carlsson.benny93@gmail.com",
	  password : "qwerty"
	}, function(error, userData) {
	  if (error) {
	    console.log("Error creating user:", error);
	  } else {
	    console.log("Successfully created user account with uid:", userData.uid);
	  }
	});
}

function Login(email, password){
	FireRef.authWithPassword({
	  email    : email,
	  password : password
	}, function(error, authData) {
	  if (error) {
	    console.log("Login Failed!", error);
	  } else {
	    console.log("Authenticated successfully with payload:", authData);
	  }
	});
}
module.exports = LoginForm;
