
/*jshint esnext: true */

var React = require('react'),
    ReactDOM = require('react-dom'),
    Universities = require("../universities"),
    List = require('material-ui').List,
    ListItem = require('material-ui').ListItem,
    RaisedButton = require('material-ui').RaisedButton,
    LeftNav = require('material-ui').LeftNav,
    MenuItem = require('material-ui').MenuItem;

var SideMenu = React.createClass({
    render : function(){
        return(
            <SideMenuMobile changeUniversity={this.props.changeUniversity}/>
        );
    }
});

var SideMenuMobile = React.createClass({
    getInitialState: function() {
        return {open: false};
    },
  handleToggle : function(){
      this.setState({open: !this.state.open});
  },
  handleClose : function() {
      this.setState({open: false});
  },
  render : function(){
        return(
            <div>
            <RaisedButton
              label="Toggle LeftNav"
              onTouchTap={this.handleToggle}
              onClick={this.handleToggle}
            />
        <LeftNav docked={false}
          open={this.state.open}
          onRequestChange={open => this.setState({open})}>
              <UniversityList changeUniversity={this.props.changeUniversity}/>
            </LeftNav>
          </div>
        );
    }
});
var UniversityList = React.createClass({
    getInitialState: function() {
        return { activeTabClassName: "all" };
    },
    changeUniversity: function(e){
            this.props.changeUniversity(e);
            this.setState({activeTabClassName:e});
    },
    render : function(){
        var aTag = <a>asd</a>;
        var universities = Universities.universities.map(function(university,index){
            return <ListItem key={index} href="#" onClick={this.changeUniversity.bind(this,university)}
                active={this.state.activeTabClassName === university ? true:false} >{university}</ListItem>;
        },this);
        return(
            <div>
            <List>
                <ListItem href="#" onClick={this.changeUniversity.bind(this,"all")}
                    active={this.state.activeTabClassName === "all"?true:false} >Alla</ListItem>
                {universities}
            </List>
            </div>
        );
    }
});
module.exports = SideMenu;
