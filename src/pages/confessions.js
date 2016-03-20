/*jshint esnext: true */
import FontIcon from 'material-ui/lib/font-icon';
import IconButton from 'material-ui/lib/icon-button';
import PostIcon from 'material-ui/lib/svg-icons/maps/local-post-office';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';

var React = require('react'),
    ReactDOM = require('react-dom'),
    C = require('../constants'),
    Universities = require("../universities"),
    Firebase = require("firebase"),
    Link = require('react-router').Link,
    SideMenu = require('./SideMenu');
const style = {
    facebookShareButton:{
    minWidth: '36px',
    maxWidth: '52px'
    },
    twitterShareButton:{
    minWidth: '36px',
    maxWidth: '52px'
    },
    facebookShareButtonMobile:{
    minWidth: '36px',
    maxWidth: '52px'
    },
    twitterShareButtonMobile:{
    minWidth: '36px',
    maxWidth: '52px'
    },
    sendIn:{
        color:'#42A5F5',
        fontSize:'20px'
    }
};
var Confessions = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function(){
        this.getAll();
    },
    getAll: function(){
        var ref = new Firebase(C.FIREBASE+"/"+C.FIREBASE_ACCEPTED);
        ref.orderByChild("processedTimeStamp").limitToLast(100).once("value", function(snap){
            var confessions = [];
            snap.forEach(function(childSnap){
                var confession = childSnap.val();
                confession.key = childSnap.key();
                confessions.push(confession);
            });
            this.setState({data: confessions.reverse()});
        }.bind(this));
    },
    changeUniversity: function(university){
        if(university == "all"){
            this.getAll();
            return;
        }
        var ref = new Firebase(C.FIREBASE+"/"+C.FIREBASE_ACCEPTED);
        ref.orderByChild("university").equalTo(university).limitToLast(100).once("value", function(snap){
            var confessions = [];
            snap.forEach(function(childSnap){
                var confession = childSnap.val();
                confession.key = childSnap.key();
                confessions.push(confession);
            });
            this.setState({data: confessions.reverse()});
        }.bind(this));
    },
    render : function(){
        return(
            <div className="confessions">
                <div id="sideMenuDesktopDiv">
                    <SideMenu changeUniversity={this.changeUniversity}/>
                </div>
                <div id="confessionListGridDiv">
                    <ConfessionsList confessions = {this.state.data}/>
                </div>
                <div id="sendInLink">
                    <Link to="send" target="_blank">
                        <FlatButton label="Skicka in bekännelse"
                            labelStyle={style.sendIn}
                            icon={<PostIcon id="sendInIcon"/>}
                            labelPosition={"before"}
                         />
                    </Link>

                </div>
            </div>
        );
    }
});

var ConfessionsList = React.createClass({
    render : function(){
        var confessions = this.props.confessions.map(function(obj,index){
            var time = timeConverter(new Date(),new Date(obj.processedTimeStamp));
            var facebookShareUrl= "http://www.facebook.com/sharer.php?u=https://studentensbekännelse.com/#/post?key="+obj.key;
            var twitterShareUrl= "https://twitter.com/share?url=https://studentensbekännelse.com/%23/"+obj.key+"&amp;hashtags=studentensbekännelse";
            return <div key={index} className="confessionDiv">
                    <article>
                        <div className="postClass">
                            <span className="timePost">{time}</span>
                            <div className="openNewTab onlyDesktop">
                                <Link to={"post?key="+obj.key} target="_blank">
                                <IconButton
                                  iconClassName="material-icons"
                                >
                                 open_in_new
                                </IconButton>
                                </Link>
                            </div>
                            <p className="openNewTab"></p>
                            <p className="posttextp"> {obj.text}</p>
                                <div className="sharebuttonsDiv">
                                    <a href={facebookShareUrl} target="_blank">
                                    <span className="facebookShareButton onlyDesktop">
                                        <RaisedButton
                                          label="Facebook"
                                          backgroundColor= "#4c70ba"
                                          style={style.facebookShareButtonDesktop}
                                          secondary={true}
                                          icon={<i className="fa fa-facebook whiteIcons"></i>}
                                        />
                                    </span>
                                    <span className="facebookShareButton onlyMobile">
                                        <RaisedButton
                                          label=" "
                                          backgroundColor= "#4c70ba"
                                          style={style.facebookShareButtonMobile}
                                          secondary={true}
                                          icon={<i className="fa fa-facebook whiteIcons"></i>}
                                        />
                                    </span>
                                    </a>
                                    <a href={twitterShareUrl} target="_blank">
                                    <span className="twitterShareButton onlyDesktop">
                                        <RaisedButton
                                          label="Twitter"
                                          backgroundColor= "#21c2ff"
                                          style={style.twitterShareButtonDesktop}
                                          secondary={true}
                                          icon={<i className="fa fa-twitter whiteIcons"></i>}
                                        />
                                    </span>
                                    <span className="twitterShareButton onlyMobile">
                                        <RaisedButton
                                          label=" "
                                          backgroundColor= "#21c2ff"
                                          style={style.twitterShareButtonMobile}
                                          secondary={true}
                                          icon={<i className="fa fa-twitter whiteIcons"></i>}
                                        />
                                    </span>
                                    </a>
                                </div>
                            <div className="cardFooter">
                                <p className="cardFooterP">
                                    <span className="universitySpan">{obj.university}</span>
                                    <span className="aliasSpan">{"-"+obj.alias}</span>
                                </p>
                            </div>
                        </div>
                    </article>
                    </div>;
        });
        return(
            <div>
                {confessions}
            </div>
        );
    },
});

function timeConverter (current, previous){
    var msPerMinute = 60 * 1000;
      var msPerHour = msPerMinute * 60;
      var msPerDay = msPerHour * 24;
      var msPerMonth = msPerDay * 30;
      var msPerYear = msPerDay * 365;

      var elapsed = current - previous;

      if (elapsed < msPerMinute) {
           return Math.round(elapsed/1000) + ' sekunder sedan';
      }

      else if (elapsed < msPerHour) {
           return Math.round(elapsed/msPerMinute) + ' minuter sedan';
      }

      else if (elapsed < msPerDay ) {
           return Math.round(elapsed/msPerHour ) + ' timmar sedan';
      }

      else if (elapsed < msPerMonth) {
          return  Math.round(elapsed/msPerDay) + ' dagar sedan';
      }

      else if (elapsed < msPerYear) {
          return  Math.round(elapsed/msPerMonth) + ' månader sedan';
      }
}
module.exports = Confessions;
