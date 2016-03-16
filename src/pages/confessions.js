var React = require('react'),
    ReactDOM = require('react-dom'),
    C = require('../constants'),
    Firebase = require("firebase"),
    Link = require('react-router').Link,
    Link = require('react-router').Link,
    ListGroup = require('react-bootstrap').ListGroup,
    ListGroupItem = require('react-bootstrap').ListGroupItem;

var Confessions = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function(){
        this.getAll();
    },
    getAll: function(){
        var ref = new Firebase(C.FIREBASE+"/"+C.FIREBASE_ACCEPTED);
        ref.once("value", function(snap){
            var confessions = [];
            snap.forEach(function(childSnap){
                var confession = childSnap.val();
                confession.key = childSnap.key();
                confessions.push(confession);
            });
            this.setState({data: confessions});
        }.bind(this));
    },
    changeUniversity: function(university){
        if(university == "all"){
            this.getAll();
            return;
        }
        var ref = new Firebase(C.FIREBASE+"/"+C.FIREBASE_ACCEPTED);
        ref.orderByChild("university").equalTo(university).once("value", function(snap){
            var confessions = [];
            snap.forEach(function(childSnap){
                var confession = childSnap.val();
                confession.key = childSnap.key();
                confessions.push(confession);
            });
            this.setState({data: confessions});
        }.bind(this));
    },
    render : function(){
        return(
            <div className="confessions">
                <Link to="send" target="_blank">Skicka in bidrag</Link>
                <SideMenu changeUniversity={this.changeUniversity}/>
                <ConfessionsList confessions = {this.state.data}/>
            </div>
        );
    }
});
var SideMenu = React.createClass({
    getInitialState: function() {
        return { activeTabClassName: "all" };
    },
    changeUniversity: function(e){
            this.props.changeUniversity(e);
            this.setState({activeTabClassName:e});
    },
    render : function(){
        return(
            <ListGroup>
                <ListGroupItem href="#" onClick={this.changeUniversity.bind(this,"all")} active={this.state.activeTabClassName === "all"?"active":""} >Alla</ListGroupItem>
                <ListGroupItem href="#"  onClick={this.changeUniversity.bind(this,"Linnéuniversitetet")} active={this.state.activeTabClassName === "Linnéuniversitetet"?"active":""} >Linnéuniversitetet</ListGroupItem>
                <ListGroupItem href="#" onClick={this.changeUniversity.bind(this,"Uppsala universitet")} active={this.state.activeTabClassName === "Uppsala universitet"?"active":""} >Uppsala universitet</ListGroupItem>
            </ListGroup>
        );
    }
});
var ConfessionsList = React.createClass({
    render : function(){
        var confessions = this.props.confessions.map(function(obj,index){
            return <div key={index} className="confessionDiv">
                        <p><Link to={"post?key="+obj.key} target="_blank">sharelink</Link></p>
                        <p> {obj.text}</p>
                        <p> {obj.university}</p>
                        {obj.alias === "" ? "":<p>-{obj.alias}</p>}
                    </div>;
        });
        return(
            <div>
                {confessions}
            </div>
        );
    }

});
module.exports = Confessions;
