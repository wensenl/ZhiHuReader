'use strict';
var React = require('react-native');
var {
    StyleSheet,
    View,
    WebView,
    Text,
} = React;
var NavigationBar = require('react-native-navbar');
var Loading = require('./Loading');


class AppThemeContent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            storycontent:null,
        };
    }

    componentDidMount(){
        var API_THEME_URL = 'http://news-at.zhihu.com/api/4/news/' + this.props.route.storyid;

        console.log(API_THEME_URL);

        //从网络获取新闻内容
        fetch(API_THEME_URL).then((response) => response.json()).then((responseData) => {
            console.log(responseData);
            //重新触发渲染
            this.setState({
                storycontent: responseData,
            });
        }).catch((error)=>{
            //捕获异常
            console.log(error);
        });
    }

    render(){
        var titleConfig = {
            title: '知乎阅读',
            tintColor:'white',
        };

        console.log("AppThemeContent story id: " + this.props.route.storyid);

        if (this.state.storycontent == null) {
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

        /*
        if(this.state.storycontent.body != null) {
            console.log("this.state.storycontent.body != null");
            return (
                <View style={styles.container}>
                    <NavigationBar
                        style={styles.navigationbar}
                        title={titleConfig}>
                    </NavigationBar>
                    <WebView
                        source={{html:this.state.storycontent.body}}
                        startInLoadingState={true}
                        domStorageEnabled={true}
                        javaScriptEnabled={true}
                        scalesPageToFit={true}
                        >
                    </WebView>
                </View>
            );
        }
        console.log("this.state.storycontent.share_url");
        */
        return (
            <View style={styles.container}>
                <NavigationBar
                    style={styles.navigationbar}
                    title={titleConfig}>
                </NavigationBar>
                <WebView
                    source={{uri:this.state.storycontent.share_url}}
                    startInLoadingState={true}
                    domStorageEnabled={true}
                    javaScriptEnabled={true}
                    scalesPageToFit={true}
                    >
                </WebView>
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
    webview_style:{
        backgroundColor:'#00ff00',
    }
});

module.exports = AppThemeContent;
