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
	RaisedButton  = require('material-ui').RaisedButton,
	Paper = require('material-ui').Paper,
	style = require('../styles'),
	AppBarHome = require("./components/appBarHome"),
	MetaOgTags = require("./components/metaOgTags");

var Send = React.createClass({
    render: function(){
        return(
                <div className="container">
					<AppBarHome/>
					<div id="sendInWrapper">
						<h1 id="h1SendIn">Skriv en Bekännelse</h1>
						<SendInForm/>
					</div>
				</div>
        );
    }
});

var SendInForm = React.createClass({
	getInitialState: function(){
		return{text: "",alias: "",university: ""};
	},
	handleChange: function(e){
		var nextState = {};
		nextState[e.target.name] = e.target.value;
		this.setState(nextState);
	},
	handleSubmit: function(e){
		e.preventDefault();
		var text = this.state.text;
		var alias = this.state.alias.trim();
		var university = this.state.university.trim();
		if(!text){
			return;
		}
		if(!university){
			return;
		}
		confessionToDatabase(text, alias,university);
		this.setState({text:""});
	},
	handleDropDown: function(e,index,value){
		this.setState({university: value});
	},
	render: function(){
		var universities = Universities.universities.map(function(university,index){
			return <MenuItem key={index} value={university}  primaryText={university}/>;
		});
		return(
			<div id="sendInFormDiv">
				<MetaOgTags url={"http://studentensbekännelser/#/send"} description={"Skriv och skicka in din egna bekännelse"} title={"Studentens Bekännelser"}/>
				<Paper zDepth={1} style={style.sendInPapaper}>
				<form id="sendInForm" onSubmit={this.handleSubmit}>
					<TextField
					  hintText="Bekännelse.."
					  hintStyle={style.sendInHint}
					  multiLine={true}
					  rows={5}
					  rowsMax={20}
					  fullWidth={true}
					  type="textarea" label="" placeholder="" name="text" value={this.state.text} onChange={this.handleChange}
					/>
				<div id="sendInFormButtonDiv">
					<RaisedButton id="sendInFormButton"
						backgroundColor="#42A5F5" type="submit"
						label="Skicka"
						primary={true}
						/>
				</div>
				<div id="bottomSendInForm">
					<UniversityDropDown university={this.state.university}
						handleDropDown={this.handleDropDown}
						universities={universities}/>
						<TextField
							id="aliasInputForm"
							hintText="Anonym"
							floatingLabelText="Alias"
							name="alias"
							value={this.state.alias}
							onChange={this.handleChange}
						/>
				</div>
				</form>
			</Paper>
			</div>
		);
	}
});

var UniversityDropDown = React.createClass({
	render: function(){
		return(
			<DropDownMenu name="university" value={this.props.university} onChange={this.props.handleDropDown}>
				<MenuItem value={""}  primaryText={"välj universitet"}/>
				{this.props.universities}
			</DropDownMenu>
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
