'use strict';
var React = require('react-native');
var {
    StyleSheet,
    Dimensions,
    View,
    Text,
    Image,
} = React;

var store = require('react-native-simple-store');
var AppMain = require('./AppMain');

var API_COVER_URL = "http://news-at.zhihu.com/api/4/start-image/480*728";
var KEY_COVER = 'cover';
var WINDOW_WIDTH = Dimensions.get('window').width;
var WINDOW_HEIGHT = Dimensions.get('window').height;

class SplashScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            responseData:null,
            //bounceValue:new Animated.Value(1),
        };
    }

    componentDidMount(){
        //从存储中读取开机画面的json信息并触发重新渲染
        store.get(KEY_COVER)
        .then((cover)=>{
            console.log(cover);
            //重新触发渲染
            this.setState({responseData: cover});
        }).done();

        //从网络获取开机画面json信息
        fetch(API_COVER_URL)
        .then((response) => response.json())
        .then((responseData) => {
            console.log("SplashScreen componentDidMount:");
            console.log(responseData);
            store.save(KEY_COVER, responseData);
        });

        //定时结束切换到主页面
        setTimeout(()=>{
            this.props.navigator.resetTo({
                component: AppMain,
                name:'AppMain',
            });
        }, 3000);
    }

    render(){
        var img, text;
        console.log("render: start");
        if(this.state.responseData) {
            img = {uri: this.state.responseData.img};
            text = this.state.responseData.text;
            console.log("render: img " + this.state.responseData.img);
        }
        else {
            //img = require('image!splash');
            img = {uri: 'https://pic3.zhimg.com/2d16f25c61e0323babf2f8ff5eb94d9f.jpg'}
            text = '';
        }
        console.log("render: text " + text);

        return (
            <View style={styles.container}>
                <Image
                  style={{flex: 1, width: WINDOW_WIDTH, height: WINDOW_HEIGHT}}
                  source={{uri: 'https://pic3.zhimg.com/2d16f25c61e0323babf2f8ff5eb94d9f.jpg'}}
                />
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container:{
        flex:1,
    },
    text:{
        flex:1,
        fontSize:16,
        color:'white',
        backgroundColor:'transparent',
        textAlign:'center',
        position:'absolute',
        left: 0,
        right: 0,
        bottom: 10,
    },
});

module.exports = SplashScreen;
