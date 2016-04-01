/*jshint esnext: true */
import FlatButton from 'material-ui/lib/flat-button';
var React = require('react'),
	ReactDOM = require('react-dom'),
	C = require('../constants'),
	Link = require('react-router').Link,
	style = require('../styles'),
	timeConverter = require("./components/timeConverter"),
	Paper = require('material-ui').Paper,
    ShareButtons = require('./components/shareButtons'),
    CardFooter = require('./components/cardFooter'),
	AppBarHome = require("./components/appBarHome"),
	MetaOgTags = require("./components/metaOgTags");

var Post = React.createClass({
	getInitialState: function() {
        return {obj: {}, notLoaded:true};
    },
	componentDidMount: function(){
		var url = window.location.href;
		var key = url.split('key=')[1].split('&')[0];
        var ref = new Firebase(C.FIREBASE+"/"+C.FIREBASE_ACCEPTED+"/"+key);
        ref.once("value", function(snap){
			var confession = snap.val();
			if(confession !== null){
				confession.key = snap.key();
			}
			console.log(confession);
			this.setState({obj: confession, notLoaded:false});
        }.bind(this));
    },
    render: function(){

		var html = function(){
			if(this.state.notLoaded){
			return	<LoadingArticle/>;
			}
			if(this.state.obj === null){
				return <NoArticleFound/>;
			}
			var time = timeConverter(new Date(),new Date(this.state.obj.processedTimeStamp));
			console.log(this.state.obj);
			var facebookShareUrl= "http://www.facebook.com/sharer.php?u=http://studentensbekännelser.se/post/?key="+this.state.obj.key;
			var twitterShareUrl= "https://twitter.com/share?url=http://studentensbekännelser.se/post/?key="+this.state.obj.key+"&amp;hashtags=studentensbekännelse";
			return		<div>
							<article>
								<div className="postClass">
									<Paper zDepth={1} style={style.sendInPapaper}>
										<span className="timePost">{time}</span>
										<p className="openNewTab"></p>
										<p className="posttextp">{this.state.obj.text}</p>
										<ShareButtons facebookShareUrl={facebookShareUrl} twitterShareUrl={twitterShareUrl}/>
										<CardFooter university={this.state.obj.university}alias={this.state.obj.alias}/>
									</Paper>
								</div>
							</article>
						</div>;
			}.bind(this);
			//<MetaOgTags url={window.location.href} description={this.state.obj.text} title={"Studentens Bekännelser"}/>
		return(
			<div className="container">

				<AppBarHome/>
				<div id="onePostWrapper">
					{html()}
				</div>
			</div>
        );
    }
});
var LoadingArticle = React.createClass({
	render: function(){
		return(
			<div>
				<article>
					<div className="postClass">
						<Paper zDepth={1} style={style.sendInPapaper}>
							<span className="timePost">Laddar</span>
							<p className="posttextp">Laddar</p>
							<LoadingShareButtons/>
							<CardFooter university={"universitet"}alias={"alias"}/>
						</Paper>
					</div>
				</article>
			</div>
		);
	}
});
var LoadingShareButtons = React.createClass({
	render: function(){
		return(
			<div className="sharebuttonsDiv">
				<a>
					<span className="facebookShareButton onlyDesktop">
						<FlatButton
						  label=" "
						  hoverColor="#3B5998"
						  style={style.facebookShareButtonDesktop}
						  secondary={true}
						  icon={<i className="fa fa-facebook whiteIcons facebookIcon"></i>}
						/>
					</span>
					<span className="facebookShareButton onlyMobile">
						<FlatButton
						  label=" "
						  style={style.facebookShareButtonMobile}
						  secondary={true}
						  icon={<i className="fa fa-facebook whiteIcons facebookIcon"></i>}
						/>
					</span>
				</a>
				<a>
					<span className="twitterShareButton onlyDesktop twitterIcon">
						<FlatButton
						  label=" "
						  hoverColor="#00ACED"
						  style={style.twitterShareButtonDesktop}
						  secondary={true}
						  icon={<i className="fa fa-twitter whiteIcons twitterIcon"></i>}
						/>
					</span>
					<span className="twitterShareButton onlyMobile">
						<FlatButton
						  label=" "
						  style={style.twitterShareButtonMobile}
						  secondary={true}
						  icon={<i className="fa fa-twitter whiteIcons"></i>}
						/>
					</span>
				</a>
			</div>
		);
	}
});

var NoArticleFound = React.createClass({
	render: function(){
		return(
			<div>
				<article>
					<div className="postClass">
						<Paper zDepth={1} style={style.sendInPapaper}>
							<span className="timePost">00:00:00</span>
							<p className="posttextp posttextpNotFound">Nu gick något snett :/</p>
							<LoadingShareButtons/>
							<CardFooter university={"Skola för häxkonster och trolldom"}alias={"Harry"}/>
						</Paper>
					</div>
				</article>
			</div>
		);
	}
});
var LoadingShareButtons = React.createClass({
	render: function(){
		return(
			<div className="sharebuttonsDiv">
				<a>
					<span className="facebookShareButton onlyDesktop">
						<FlatButton
						  label=" "
						  hoverColor="#3B5998"
						  style={style.facebookShareButtonDesktop}
						  secondary={true}
						  icon={<i className="fa fa-facebook whiteIcons facebookIcon"></i>}
						/>
					</span>
					<span className="facebookShareButton onlyMobile">
						<FlatButton
						  label=" "
						  style={style.facebookShareButtonMobile}
						  secondary={true}
						  icon={<i className="fa fa-facebook whiteIcons facebookIcon"></i>}
						/>
					</span>
				</a>
				<a>
					<span className="twitterShareButton onlyDesktop twitterIcon">
						<FlatButton
						  label=" "
						  hoverColor="#00ACED"
						  style={style.twitterShareButtonDesktop}
						  secondary={true}
						  icon={<i className="fa fa-twitter whiteIcons twitterIcon"></i>}
						/>
					</span>
					<span className="twitterShareButton onlyMobile">
						<FlatButton
						  label=" "
						  style={style.twitterShareButtonMobile}
						  secondary={true}
						  icon={<i className="fa fa-twitter whiteIcons"></i>}
						/>
					</span>
				</a>
			</div>
		);
	}
});
module.exports = Post;
