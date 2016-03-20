/*jshint esnext: true */
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';
var React = require('react'),
	ReactDOM = require('react-dom'),
	C = require('../constants'),
	Universities = require("../universities"),
	Link = require('react-router').Link,
	Confession = require('./confessions'),
	TextField = require('material-ui').TextField,
	RaisedButton  = require('material-ui').RaisedButton;

var Send = React.createClass({
    render: function(){
        return(
                <div className="container">
					<Link to="/" component={Confession}>Bekännelser</Link>
					<h1>Skicka in</h1>
					<SendInForm/>
				</div>
        );
    }
});

var SendInForm = React.createClass({
	getInitialState: function(){
		return{value: "",alias: "",university: ""};
	},
	handleChange: function(e){
		var nextState = {};
		nextState[e.target.name] = e.target.value;
		this.setState(nextState);

	},
	handleSubmit: function(e){
		e.preventDefault();
		var value = this.state.value;
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
	handleDropDown: function(e,index,value){
		this.setState({university: value});
	},
	render: function(){
		var universities = Universities.universities.map(function(university,index){
			return <MenuItem key={index} value={university}  primaryText={university}/>;
		});
		return(
			<div>
			<form id="sendInForm" onSubmit={this.handleSubmit}>
				<TextField
			      hintText="Bekännelse.."
			      multiLine={true}
			      rows={5}
			      rowsMax={20}
				  fullWidth={true}
				  type="textarea" label="" placeholder="" name="value" value={this.state.value} onChange={this.handleChange}
			    /><br/>
			<DropDownMenu name="university" value={this.state.university} onChange={this.handleDropDown}>
				<MenuItem value={""}  primaryText={"välj universitet"}/>
					{universities}
				</DropDownMenu>
				<TextField
					hintText="Anonym"
      				floatingLabelText="Alias"
					id="alias" name="alias" value={this.state.alias} onChange={this.handleChange}
					/>
				<RaisedButton type="submit" label="Skicka" primary={true} />
			</form>
			</div>
		);
	}
});
function confessionToDatabase(text, alias,university){
	console.log(text);
	var ref = new Firebase(C.FIREBASE+"/"+C.FIREBASE_PENDING);
	ref.push({
		sentTimeStamp: Firebase.ServerValue.TIMESTAMP,
		text: text,
		alias: alias,
		university: university
	});
}

module.exports = Send;
