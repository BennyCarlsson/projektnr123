var React = require('react'),
	ReactDOM = require('react-dom'),
    Wrapper = require('./pages/wrapper'),
	Confession = require('./pages/confessions'),
	Send = require('./pages/send'),
	Post = require('./pages/post'),
	Router = require('react-router').Router,
	Route = require('react-router').Route,
 	IndexRoute = require('react-router').IndexRoute,
	browserHistory = require('react-router').browserHistory,
	tapEventPlugin = require("react-tap-event-plugin")();

ReactDOM.render(
		<Router history={browserHistory}>
			<Route path="/" component={Wrapper}>
				<IndexRoute component={Confession}></IndexRoute>
				<Route path="send" component={Send}></Route>
				<Route path="post" component={Post}></Route>
			</Route>
		</Router>,
  document.getElementById('content')
);
