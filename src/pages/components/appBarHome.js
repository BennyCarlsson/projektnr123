/*jshint esnext: true */
import HomeIcon from 'material-ui/lib/svg-icons/action/home';
var React = require('react'),
    ReactDOM = require('react-dom'),
    AppBar = require('material-ui').AppBar,
    IconButton = require('material-ui').IconButton,
    Link = require('react-router').Link,
    styles = require("../../styles");

var AppBarHome = React.createClass({
    getInitialState: function() {
        return {open: true};
    },
    handleHomeClick: function(){
        window.location.assign("/#/");
    },
    handleToggle : function(){
      this.setState({open: !this.state.open});
    },
    render: function(){
        return(
            <div id="appBarThingie">
                <AppBar
                style={styles.appbar}
                title={"Studentens Bekännelser"}
                iconElementLeft={<IconButton onClick={this.handleHomeClick}>
                                    <HomeIcon/>
                                </IconButton>}
                onLeftIconButtonTouchTap={this.handleToggle}
                />
            </div>
        );
    }
});

module.exports = AppBarHome;
