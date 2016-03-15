var React = require('react'),
	ReactDOM = require('react-dom'),
	C = require('../constants'),
	Firebase = require("firebase"),
	FireRef = new Firebase(C.FIREBASE),
    LoginForm = require("./components/loginForm"),
	Logout = require("./components/logout"),
	PendingList = require("./components/pendinglist");

var Wrapper = React.createClass({
	getInitialState: function(){
		return{userId:"", isLoggedIn: false};
	},
	componentWillMount: function(){
		FireRef.onAuth(function(authData){
			if(authData){
				this.setState({userId: authData.uid, isLoggedIn: true});
			}else{
				this.setState({userId: "", isLoggedIn: false});
			}
		}.bind(this));
	},
    render: function(){
        return(
                <div className="container">
					<h1>Hello Admin!</h1>
					{
						this.state.isLoggedIn ?
						<div>
							<Logout />
							<PendingList/>
						</div>
						:
						<LoginForm />

					}
				</div>
        );
    }
});

module.exports = Wrapper;
