
'use strict';
var React = require('react-native');
var {
  AppRegistry,
} = React;
var AppNavigator = require('./app/AppNavigator');

class ZhiHuReader extends React.Component {
    render() {
        return (
            <AppNavigator />
        );
    }
}

AppRegistry.registerComponent('ZhiHuReader', () => ZhiHuReader);
