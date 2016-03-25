/*jshint esnext: true */
import IconButton from 'material-ui/lib/icon-button';
import FlatButton from 'material-ui/lib/flat-button';
var React = require('react'),
    ReactDOM = require('react-dom'),
    Link = require('react-router').Link,
    style = require('../../styles'),
    timeConverter = require("./timeConverter"),
    Paper = require('material-ui').Paper,
    ShareButtons = require('./shareButtons'),
    CardFooter = require('./cardFooter');

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
                                <OpenNewTabIconButton cannotBeNamedKey={obj.key}/>
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
                <Link to={"post?key="+this.props.cannotBeNamedKey} target="_blank">
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
module.exports = ConfessionsList;
