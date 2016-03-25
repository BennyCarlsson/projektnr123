/*jshint esnext: true */
import FlatButton from 'material-ui/lib/flat-button';
var React = require('react'),
    ReactDOM = require('react-dom'),
    style = require('../../styles');

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

module.exports = ShareButtons;
