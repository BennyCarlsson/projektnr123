/*jshint esnext: true */
import DocumentMeta from 'react-document-meta';
var React = require('react'),
	ReactDOM = require('react-dom');

var MetaTag = React.createClass({
	render:function(){
		const meta = {
		      meta: {
		        property: {
		          'og:url': this.props.url,
				  'og:type': 'article',
				  'og:title': this.props.title,
				  'og:description': this.props.description,
		        }
		      }
		    };
		return(
		<div>

      	</div>
		);
	}
});
//<DocumentMeta {...meta}/>
module.exports = MetaTag;
