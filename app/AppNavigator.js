/**
 * App路由管理主入口
 *
 */
'use strict';
var React = require('react-native');
var {
    StyleSheet,
    View,
    Text,
    StatusBar,
    Navigator,
} = React;
var SplashScreen = require('./SplashScreen');

class AppNavigator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            component:SplashScreen,
            name:'SplashScreen',
        };
    }

    //
    configureScene(route, routeStack) {
      return Navigator.SceneConfigs.PushFromRight;
    }

    //
    renderScene(route, navigator) {
      var Component = route.component;

      return (
        <Component navigator={navigator} route={route} />
      );
    }

    render(){
        return (
            <View style={styles.contain}>
                <StatusBar
                    backgroundColor="#3e9ce9"
                    barStyle="default"
                />

                <Navigator
                  ref='navigator'
                  style={styles.navigator}
                  configureScene={this.configureScene}
                  renderScene={this.renderScene}
                  initialRoute={{
                    component: SplashScreen,
                    name: 'SplashScreen',
                  }}
                />
            </View>
        );
    }
}

var styles = StyleSheet.create({
    contain: {
        flex:1,
    },
    navigator: {
        flex: 1,
    },
});

module.exports = AppNavigator;
