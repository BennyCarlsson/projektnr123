/*jshint esnext: true */
import FontIcon from 'material-ui/lib/font-icon';
import IconButton from 'material-ui/lib/icon-button';
import PostIcon from 'material-ui/lib/svg-icons/maps/local-post-office';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';

var React = require('react'),
    ReactDOM = require('react-dom'),
    C = require('../constants'),
    Firebase = require("firebase"),
    Link = require('react-router').Link,
    SideMenu = require('./components/SideMenu'),
    style = require('../styles'),
    timeConverter = require("./components/timeConverter"),
    ConfessionsList = require("./components/confessionsList"),
    MetaOgTags = require("./components/metaOgTags");

var Confessions = React.createClass({
    getInitialState: function() {
        window.addEventListener("scroll", this.handleScroll);
        return {data: [],amountPosts: 50,loadingFlag:false,university:"all"};
    },
    handleScroll:function(e){
        //this function will be triggered if user scrolls
        var windowHeight = $("#confessionListGridDiv").height();
        var inHeight = window.innerHeight;
        var scrollT = $(window).scrollTop();
        var totalScrolled = scrollT+inHeight;
        if(totalScrolled+100>windowHeight){ //user reached at bottom
            if(!this.state.loadingFlag){ //to avoid multiple request
                this.setState({loadingFlag:true, amountPosts:this.state.amountPosts+50});
                this.changeUniversity(this.state.university);
            }
        }
    },
    componentDidMount: function(){
        this.getAll();
    },
    getAll: function(){
        var ref = new Firebase(C.FIREBASE+"/"+C.FIREBASE_ACCEPTED);
        ref.orderByChild("processedTimeStamp").limitToLast(this.state.amountPosts).once("value", function(snap){
            var confessions = [];
            snap.forEach(function(childSnap){
                var confession = childSnap.val();
                confession.key = childSnap.key();
                confessions.push(confession);
            });
            this.setState({data: confessions.reverse()});
            this.setState({loadingFlag:false});
        }.bind(this));
    },
    changeUniversity: function(university){
        this.setState({university:university});
        if(university == "all"){
            this.getAll();
            return;
        }
        var ref = new Firebase(C.FIREBASE+"/"+C.FIREBASE_ACCEPTED);
        ref.orderByChild("university").equalTo(university).limitToLast(this.state.amountPosts).once("value", function(snap){
            var confessions = [];
            snap.forEach(function(childSnap){
                var confession = childSnap.val();
                confession.key = childSnap.key();
                confessions.push(confession);
            });
            this.setState({data: confessions.reverse()});
            this.setState({loadingFlag:false});
        }.bind(this));
    },
    render : function(){
        return(
            <div className="confessions">
                <MetaOgTags url={"http://studentensbekännelser.se"} description={"Läs studenters bekännelser från alla universitet"} title={"Studentens Bekännelser"}/>
                <div id="sideMenuDesktopDiv">
                    <SideMenu changeUniversity={this.changeUniversity}/>
                </div>
                <div id="confessionListGridDiv">
                    <ConfessionsList confessions = {this.state.data}/>
                </div>
                <div id="sendInLink">
                    <SendInLink/>
                </div>
                <FacebookLike/>
            </div>
        );
    }
});
var SendInLink = React.createClass({
    render: function(){
        return(
            <Link to="/send" target="_blank">
                <FlatButton label="Skriv en bekännelse"
                    labelStyle={style.sendIn}
                    icon={<PostIcon id="sendInIcon"/>}
                    labelPosition={"before"}
                 />
            </Link>
        );
    }
});

var FacebookLike = React.createClass({
    render: function(){
        return(
            <div id="facebookLikeButtonDiv" className="onlyDesktop">
                <div className="fb-page" data-href="https://www.facebook.com/hellokitty/"
                    data-tabs="" data-small-header="true"
                    data-adapt-container-width="false" data-hide-cover="true"
                    data-show-facepile="true" data-width="400">
                    <div className="fb-xfbml-parse-ignore">
                        <blockquote cite="https://www.facebook.com/hellokitty/">
                            <a href="https://www.facebook.com/hellokitty/">Hello Kitty</a>
                        </blockquote></div></div>
            </div>
        );
    }
});


module.exports = Confessions;
