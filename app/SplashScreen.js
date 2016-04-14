'use strict';
var React = require('react-native');
var {
    StyleSheet,
    Dimensions,
    View,
    Text,
    Image,
    Animated,
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
            bounceValue:new Animated.Value(1),
        };
    }

    componentDidMount(){
        //设置动画
        this.state.bounceValue.setValue(1);
        Animated.timing(
          this.state.bounceValue,
          {
            toValue: 1.2,
            duration: 5000,
          }
        ).start();

        //从存储中读取开机画面的json信息并触发重新渲染
        store.get(KEY_COVER)
        .then((cover)=>{
            console.log(cover);
            //重新触发渲染
            this.setState({responseData: cover});
        }).catch((error)=>{
            console.error(error);
        });

        //从网络获取更新开机画面json信息
        fetch(API_COVER_URL)
        .then((response) => response.json())
        .then((responseData) => {
            console.log("SplashScreen componentDidMount:");
            console.log(responseData);
            store.save(KEY_COVER, responseData).catch((error)=>{
                console.log(error);
            });
        }).catch((error)=>{
            console.error(error);
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
        if (this.state.responseData == null) {
            return (
                <View style={styles.container}>
                    <Animated.Image
                        source={require('image!splash')}
                        style={{
                            flex:1,
                            width:Dimensions.get('window').width,
                            transform:[
                                {scale:this.state.bounceValue,}
                            ],
                        }}
                    />
                </View>
            );
        }
        else {
            return (
                <View style={styles.container}>
                    <Animated.Image
                        source={{uri: this.state.responseData.img}}
                        style={{
                            flex:1,
                            width:Dimensions.get('window').width,
                            transform:[
                                {scale:this.state.bounceValue,}
                            ],
                        }}
                    />
                    <Text style={styles.text}>
                        {this.state.responseData.text}
                    </Text>
                </View>
            );
        }
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
