var React = require('react'),
	ReactDOM = require('react-dom'),
	C = require('../constants'),
	Link = require('react-router').Link;

var Send = React.createClass({
    render: function(){
        return(
                <div className="container">
					<Link to="/">Bekännelser</Link>
					<h1>Send</h1>
					<SendInForm/>
				</div>
        );
    }
});

var SendInForm = React.createClass({
	getInitialState: function(){
		return{value: "Hello",alias: "anonym"};
	},
	handleChange: function(e){
		var nextState = {};
		nextState[e.target.name] = e.target.value;
		this.setState(nextState);
	},
	handleSubmit: function(e){
		e.preventDefault();
		var value = this.state.value.trim();
		var alias = this.state.alias.trim();
		if(!value){
			return;
		}
		confessionToDatabase(value, alias);
		this.setState({value: ""});
	},
	render: function(){
		return(
			<form id="sendInForm" onSubmit={this.handleSubmit}>
				<textarea type="text" name="value" value={this.state.value} onChange={this.handleChange}/>
				<input type="text" id="alias" name="alias" value={this.state.alias} onChange={this.handleChange}/>
				<button type="submit">Skicka</button>
			</form>
		);
	}
});

function confessionToDatabase(text, alias){
	var ref = new Firebase(C.FIREBASE+"/"+C.FIREBASE_PENDING);
	ref.push({
		sentTimeStamp: Firebase.ServerValue.TIMESTAMP,
		text: text,
		alias: alias,
	});
}

module.exports = Send;
