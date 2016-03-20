/*jshint esnext: true */
import IconButton from 'material-ui/lib/icon-button';
import FlatButton from 'material-ui/lib/flat-button';
var React = require('react'),
    ReactDOM = require('react-dom'),
    Link = require('react-router').Link,
    style = require('../../styles'),
    timeConverter = require("./timeConverter"),
    Paper = require('material-ui').Paper;

var ConfessionsList = React.createClass({
    render : function(){
        var confessions = this.props.confessions.map(function(obj,index){
            var time = timeConverter(new Date(),new Date(obj.processedTimeStamp));
            var facebookShareUrl= "http://www.facebook.com/sharer.php?u=https://studentensbekännelse.com/#/post?key="+obj.key;
            var twitterShareUrl= "https://twitter.com/share?url=https://studentensbekännelse.com/%23/"+obj.key+"&amp;hashtags=studentensbekännelse";
            return <div key={index} className="confessionDiv">
                    <article>
                        <div className="postClass">
                            <Paper zDepth={1} style={style.sendInPapaper}>
                            <span className="timePost">{time}</span>
                            <OpenNewTabIconButton key={obj.key}/>
                            <p className="openNewTab"></p>
                            <p className="posttextp">{obj.text}</p>
                            <ShareButtons facebookShareUrl={facebookShareUrl} twitterShareUrl={twitterShareUrl}/>
                            <CardFooter university={obj.university}alias={obj.alias}/>
                            </Paper>
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
var OpenNewTabIconButton = React.createClass({
    render: function(){
        return(
            <div className="openNewTab onlyDesktop">
                <Link to={"post?key="+this.props.key} target="_blank">
                <IconButton
                    iconStyle={style.iconNewTab}
                  iconClassName="material-icons"
                >
                 open_in_new
                </IconButton>
                </Link>
            </div>
        );
    }
});
var ShareButtons = React.createClass({
        render: function(){
            return(
                <div className="sharebuttonsDiv">
                    <a href={this.props.facebookShareUrl} target="_blank">
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
                    <a href={this.props.twitterShareUrl} target="_blank">
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
var CardFooter = React.createClass({
    render: function(){
        return(
            <div className="cardFooter">
                <p className="cardFooterP">
                    <span className="universitySpan">{this.props.university}</span>
                    <span className="aliasSpan">{"-"+this.props.alias}</span>
                </p>
            </div>
        );
    }
});
module.exports = ConfessionsList;
