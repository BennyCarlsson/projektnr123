
/*jshint esnext: true */
import NavigationMenu from 'material-ui/lib/svg-icons/navigation/menu';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
var React = require('react'),
    ReactDOM = require('react-dom'),
    Universities = require("../universities"),
    List = require('material-ui').List,
    ListItem = require('material-ui').ListItem,
    RaisedButton = require('material-ui').RaisedButton,
    LeftNav = require('material-ui').LeftNav,
    MenuItem = require('material-ui').MenuItem,
    AppBar = require('material-ui').AppBar,
    IconButton = require('material-ui').IconButton,
    FlatButton = require('material-ui').FlatButton,
    Link = require('react-router').Link;

const styles = {
  zindexLow: {
    zIndex: 0
  },
  appbar: {
      backgroundColor: '#42A5F5'
  }
};

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
                <div id="appBarThingie">
                    <AppBar
                    style={styles.appbar}
                    title={this.state.universitySelected}
                    iconElementLeft={this.state.open ? <IconButton onClick={this.handleToggle}><NavigationClose /></IconButton> :
                                                        <IconButton onClick={this.handleToggle} ><NavigationMenu/></IconButton>}
                    onLeftIconButtonTouchTap={this.handleToggle}
                    />
                </div>
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
                <div id="appBarThingie">
                    <AppBar
                    title={this.state.universitySelected}
                    iconElementLeft={<IconButton onClick={this.handleToggle} ><NavigationMenu/></IconButton>}
                    onLeftIconButtonTouchTap={this.handleToggle}
                    iconElementRight={<FlatButton label="Skicka in" onClick={this.handleSendInClick}/>}
                    />
                </div>
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
var UniversityList = React.createClass({
    getInitialState: function() {
        return { activeTabClassName: "all" };
    },
    handleListClick: function(university){
            this.props.handleListClick(university);
            this.setState({activeTabClassName:university});
    },
    render : function(){
        var universities = Universities.universities.map(function(university,index){
            return <ListItem key={index} href="#" onClick={this.handleListClick.bind(this,university)}
                active={this.state.activeTabClassName === university ? true:false} >{university}</ListItem>;
        },this);
        return(
            <div id="desktopSideList">
            <List style={styles.zindexLow}>
                <ListItem href="#" onClick={this.handleListClick.bind(this,"all")}
                    active={this.state.activeTabClassName === "all"?true:false} >Alla universitet</ListItem>
                {universities}
            </List>
            </div>
        );
    }
});

module.exports = SideMenu;
