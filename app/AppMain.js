
'use strict';

var React = require('react-native');
var {
    StyleSheet,
    View,
    Text,
    ListView,
} = React;
var NavigationBar = require('react-native-navbar');
var ScrollableTabView = require('react-native-scrollable-tab-view');
var ScrollableTabBar = require('./ScrollableTabBar');

class AppMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource(
                {
                    rowHasChanged: (row1, row2) => row1 !== row2,
                }
            ),
        };
    }

    render(){
        var titleConfig = {
            title: '知乎阅读',
            tintColor:'white',
        };
        var defaultTabs = [
            {
                id:13,
                name:'日常心理学',
            },
            {
                id:12,
                name:'用户推荐日报',
            },
            {
                id:3,
                name:'电影日报',
            },
            {
                id:11,
                name:'不许无聊',
            },
        ];
        var lists = [];
        var i = 0;
        for(i = 0; i < 4; i++) {
        lists.push(
          <View
            key={defaultTabs[i].id}
            tabLabel={defaultTabs[i].name}
            style={{flex: 1}}
          >
          <Text>
              {defaultTabs[i].name}
          </Text>
        </View>);
        }
        return (
            <View style={styles.container}>
                <NavigationBar
                    style={styles.navigationbar}
                    title={titleConfig}>
                </NavigationBar>
                <ScrollableTabView
                    initialPage={0}
                    renderTabBar={() => <ScrollableTabBar />}
                    tabBarBackgroundColor="#fcfcfc"
                    tabBarUnderlineColor="#3e9ce9"
                    tabBarActiveTextColor="#3e9ce9"
                    tabBarInactiveTextColor="#aaaaaa">
                  {lists}
                </ScrollableTabView>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
    },
    navigationbar:{
        backgroundColor:'#3e9ce9',
    },
});

module.exports = AppMain;
