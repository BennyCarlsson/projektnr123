var React = require('react'),
    ReactDOM = require('react-dom'),
    List = require('material-ui').List,
    ListItem = require('material-ui').ListItem,
    Universities = require("../../universities"),
    styles = require('../../styles');


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
module.exports = UniversityList;
