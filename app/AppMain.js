
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
var store = require('react-native-simple-store');
var ScrollableTabBar = require('./ScrollableTabBar');
var Loading = require('./Loading');
var AppTheme = require('./AppTheme');

class AppMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            themes:null,//所有主题信息
        };
    }

    //
    componentDidMount(){
        var API_THEMES_URL = 'http://news-at.zhihu.com/api/4/themes';
        var KEY_THEMES = 'themes:';

        //从存储中读取themes的json信息并触发重新渲染
        store.get(KEY_THEMES).then((data)=>{
            if (data != null){
                console.log("componentDidMount: get themes success");
                console.log(data);
                //重新触发渲染
                this.setState({themes: data});
            }
            else {
                console.log("componentDidMount: can not get themes success");
                throw new Error('No themes')
            }
        }).catch((error) => {
            console.error(error);
            //从网络获取themes信息
            fetch(API_THEMES_URL).then((response) => response.json()).then((responseData) => {
                console.log("AppMain fetch THEMES");
                console.log(responseData);
                store.save(KEY_THEMES, responseData);

                //重新触发渲染
                this.setState({themes: responseData});
            });
        });
    }

    //页面渲染
    render(){
        var titleConfig = {
            title: '知乎阅读',
            tintColor:'white',
        };
        var i = 0;
        var themesContent = [];

        //没有数据显示数据加载中
        if (this.state.themes == null) {
            return (
                <View style={styles.container}>
                    <NavigationBar
                        style={styles.navigationbar}
                        title={titleConfig}>
                    </NavigationBar>
                    <Loading text='数据加载中...'/>
                </View>
            );
        }

        //加载数据
        for (i = 0; i < this.state.themes.others.length; i++) {
            themesContent.push(
                <View
                    key={this.state.themes.others[i].id}
                    tabLabel={this.state.themes.others[i].name}
                    style={{flex: 1}}>
                    <AppTheme themeid={this.state.themes.others[i].id}>
                    </AppTheme>
                </View>
            );
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
                    {themesContent}
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
