
/*jshint esnext: true */
import NavigationMenu from 'material-ui/lib/svg-icons/navigation/menu';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import AddCircleIcon from 'material-ui/lib/svg-icons/content/add-circle';
var React = require('react'),
    ReactDOM = require('react-dom'),
    Universities = require("../../universities"),
    List = require('material-ui').List,
    ListItem = require('material-ui').ListItem,
    RaisedButton = require('material-ui').RaisedButton,
    LeftNav = require('material-ui').LeftNav,
    MenuItem = require('material-ui').MenuItem,
    AppBar = require('material-ui').AppBar,
    IconButton = require('material-ui').IconButton,
    FlatButton = require('material-ui').FlatButton,
    Link = require('react-router').Link,
    UniversityList = require("./universityList"),
    styles = require("../../styles");

var SideMenu = React.createClass({
    changeUniversity: function(university){
        this.props.changeUniversity(university);
    },
    render: function(){
        return(
                <div>
                    <SideMenuMobile changeUniversity={this.changeUniversity}/>
                    <SideMenuDesktop changeUniversity={this.changeUniversity}/>
                </div>
        );
    }
});
var SideMenuDesktop = React.createClass({
    getInitialState: function() {
        return {open: true, universitySelected: "Alla universitet"};
    },
    handleToggle : function(){
      this.setState({open: !this.state.open});
    },
    handleListClick: function(university){
      this.props.changeUniversity(university);
      if(university == "all"){
          this.setState({universitySelected:"Alla universitet"});
      }else{
          this.setState({universitySelected:university});
      }

  },
    render: function(){
        return(
            <div className="onlyDesktop">
                <AppBarDesktop
                    universitySelected={this.state.universitySelected}
                    open={this.state.open}
                    handleToggle={this.handleToggle}/>
                <LeftNav
                    style={styles.zindexLow}
                    open={this.state.open}>
                    <div id="universityListDesktop">
                        <UniversityList handleListClick={this.handleListClick}/>
                    </div>
                </LeftNav>
            </div>
        );
    }
});
var AppBarDesktop = React.createClass({
    render: function(){
        return(
            <div id="appBarThingie">
                <AppBar
                style={styles.appbar}
                title={this.props.universitySelected}
                iconElementLeft={this.props.open ? <IconButton onClick={this.props.handleToggle}><NavigationClose /></IconButton> :
                                                    <IconButton onClick={this.props.handleToggle} ><NavigationMenu/></IconButton>}
                onLeftIconButtonTouchTap={this.props.handleToggle}
                />
            </div>
        );
    }
});

var SideMenuMobile = React.createClass({
    getInitialState: function() {
        return {open: false, universitySelected: "Alla universitet"};
    },
    handleToggle : function(){
      this.setState({open: !this.state.open});
    },
    handleClose : function() {
      this.setState({open: false});
    },
    handleListClick: function(university){
      this.props.changeUniversity(university);
      this.handleClose();
      if(university == "all"){
          this.setState({universitySelected:"Alla universitet"});
      }else{
          this.setState({universitySelected:university});
      }
    },
    handleSendInClick: function(){
        window.location.assign("/#/send");
    },
    render : function(){
        return(
            <div className="onlyMobile">
                <AppBarMobile
                    universitySelected={this.state.universitySelected}
                    handleToggle={this.handleToggle}
                    handleSendInClick={this.handleSendInClick}/>
                <LeftNav
                docked={false}
                open={this.state.open}
                onRequestChange={open => this.setState({open})}>
                  <UniversityList handleListClick={this.handleListClick}/>
                </LeftNav>
          </div>
        );
    }
});
var AppBarMobile = React.createClass({
    render: function(){
        return(
            <div id="appBarThingie">
                <AppBar
                style={styles.appbar}
                title={this.props.universitySelected}
                iconElementLeft={<IconButton onClick={this.props.handleToggle} ><NavigationMenu/></IconButton>}
                onLeftIconButtonTouchTap={this.props.handleToggle}
                iconElementRight={<IconButton onClick={this.props.handleSendInClick}>
                                    <AddCircleIcon id="postIconAppbar"/>
                                </IconButton>}
                />
            </div>
        );
    }
});
module.exports = SideMenu;
