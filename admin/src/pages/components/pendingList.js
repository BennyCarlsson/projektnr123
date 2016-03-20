var React = require('react'),
	ReactDOM = require('react-dom'),
	C = require('../../constants'),
	Firebase = require("firebase"),
	FireRef = new Firebase(C.FIREBASE);

var PendingList = React.createClass({
	render : function(){
		return(
			<div id="loggedInDiv">
				<Confessions/>
			</div>
		);
	}
});

var Confessions = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function(){
        var ref = new Firebase(C.FIREBASE+"/"+C.FIREBASE_PENDING);
        ref.limitToLast(100).on("value", function(snap){
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
                <ConfessionsList confessions = {this.state.data}/>
            </div>
        );
    }
});

var ConfessionsList = React.createClass({
    render : function(){
        var confessions = this.props.confessions.map(function(obj,index){
            return <div key={index} className="confessionDiv">
                        <p>{obj.text}</p>
						<p>{obj.university}</p>
                        {obj.alias === "" ? "":<p>-{obj.alias}</p>}
						<button className="declineButton" onClick={decline.bind(this,obj)}>Neka</button>
						<button className="acceptButton" onClick={accept.bind(this,obj)}>Acceptera</button>
                    </div>;
        });
        return(
            <div>
                {confessions}
            </div>
        );
    }
});

function accept(obj){
		var ref = new Firebase(C.FIREBASE+"/"+C.FIREBASE_ACCEPTED);
		ref.push({
			sentTimeStamp: obj.sentTimeStamp,
			processedTimeStamp: Firebase.ServerValue.TIMESTAMP,
			text: obj.text,
			alias: obj.alias,
			status: C.ACCEPTED,
			upvotes: 0,
			downvotes: 0,
			university: obj.university
		});
		removeFromPending(obj.key);
}

function decline(obj){
	var ref = new Firebase(C.FIREBASE+"/"+C.FIREBASE_DENIED);
	ref.push({
		sentTimeStamp: obj.sentTimeStamp,
		processedTimeStamp: Firebase.ServerValue.TIMESTAMP,
		text: obj.text,
		alias: obj.alias,
		status: C.DENIED,
		upvotes: 0,
		downvotes: 0,
		university: obj.university
	});
	removeFromPending(obj.key);
}
function removeFromPending(key){
	var ref = new Firebase(C.FIREBASE+"/"+C.FIREBASE_PENDING+"/"+key);
	ref.remove();
}

module.exports = PendingList;
