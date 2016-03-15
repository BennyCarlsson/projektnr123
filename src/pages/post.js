var React = require('react'),
	ReactDOM = require('react-dom'),
	C = require('../constants'),
	Link = require('react-router').Link;

var Post = React.createClass({
	getInitialState: function() {
        return {data: {}};
    },
	componentDidMount: function(){
		var url = window.location.href;
		var key = url.split('key=')[1].split('&')[0];
		console.log(key);
        var ref = new Firebase(C.FIREBASE+"/"+C.FIREBASE_ACCEPTED+"/"+key);
        ref.once("value", function(snap){
			this.setState({data: snap.val()});
        }.bind(this));
    },
    render: function(){
        return(
                <div className="container">
					<Link to="/">Home</Link>
					<h1>Post</h1>
					<p>{this.state.data.text}</p>
					{this.state.data.alias === "" ? "":<p>-{this.state.data.alias}</p>}
				</div>
        );
    }
});

module.exports = Post;
