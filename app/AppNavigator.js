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
    BackAndroid,
} = React;
var SplashScreen = require('./SplashScreen');
var _navigator = null;
var gEnterWebView = false;

class AppNavigator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            component:SplashScreen,
            name:'SplashScreen',
            storyid:null,
        };

        //
        this.goBack = this.goBack.bind(this);
        BackAndroid.addEventListener('hardwareBackPress', this.goBack);
    }

    //返回键处理
    goBack(){
        if (_navigator && (gEnterWebView == true)) {
            console.log("_navigator.pop");

            gEnterWebView = false;
            _navigator.pop();
            return true;
        }
        return false;
    }

    //
    configureScene(route, routeStack) {
      return Navigator.SceneConfigs.PushFromRight;
    }

    //
    renderScene(route, navigator) {
      var Component = route.component;

      _navigator = navigator;

      if (route.name == 'AppThemeContent') {
          gEnterWebView = true;
      }

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
