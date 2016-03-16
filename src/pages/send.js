var React = require('react'),
	ReactDOM = require('react-dom'),
	C = require('../constants'),
	Link = require('react-router').Link,
	Button = require('react-bootstrap').Button,
	Input = require('react-bootstrap').Input;

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
		return{value: "Hello",alias: "anonym",university: ""};
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
		var university = this.state.university.trim();
		if(!value){
			return;
		}
		if(!university){
			return;
		}
		confessionToDatabase(value, alias,university);
		this.setState({value: ""});
	},
	render: function(){
		return(
			<form id="sendInForm" onSubmit={this.handleSubmit}>
				<Input type="select" placeholder="Välj universitet.." name="university" value={this.state.university}  onChange={this.handleChange}>
					<option value="" active>Välj universitet..</option>
					<option value="Chalmers tekniska högskola">Chalmers tekniska högskola</option>
					<option value="Göteborgs universitet">Göteborgs universitet</option>
					<option value="Karlstads universitet">Karlstads universitet</option>
					<option value="Karolinska institutet">Karolinska institutet</option>
					<option value="Kungliga Tekniska högskolan">Kungliga Tekniska högskolan</option>
					<option value="Linköpings universitet">Linköpings universitet</option>
					<option value="Linnéuniversitetet">Linnéuniversitetet</option>
					<option value="Luleå tekniska universitet">Luleå tekniska universitet</option>
					<option value="Lunds universitet">Lunds universitet</option>
					<option value="Mittuniversitetet">Mittuniversitetet</option>
					<option value="Stockholms universitet">Stockholms universitet</option>
					<option value="Sveriges lantbruksuniversitet">Sveriges lantbruksuniversitet</option>
					<option value="Umeå universitet">Umeå universitet</option>
					<option value="Uppsala universitet">Uppsala universitet</option>
					<option value="Örebro universitet">Örebro universitet</option>
			    </Input>
				<Input type="textarea" label="" placeholder="" name="value" value={this.state.value} onChange={this.handleChange}/>
				<Input type="text" label="Alias" placeholder="alias" id="alias" name="alias" value={this.state.alias} onChange={this.handleChange}/>
				<Button type="submit" className="btn btn-success">Skicka</Button>
			</form>
		);
	}
});

function confessionToDatabase(text, alias,university){
	var ref = new Firebase(C.FIREBASE+"/"+C.FIREBASE_PENDING);
	ref.push({
		sentTimeStamp: Firebase.ServerValue.TIMESTAMP,
		text: text,
		alias: alias,
		university: university
	});
}

module.exports = Send;
