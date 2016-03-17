var React = require('react'),
    ReactDOM = require('react-dom'),
    C = require('../constants'),
    Universities = require("../universities"),
    Firebase = require("firebase"),
    Link = require('react-router').Link,
    SideMenu = require('./SideMenu');

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
