/*
 *
 *
 */

'use strict';
var React = require('react-native');
var {
    StyleSheet,
    View,
    Text,
    ScrollView,
    ListView,
    Image,
    RefreshControl,
} = React;
var Store = require('react-native-simple-store');

class AppTheme extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isRefreshing:false,
            theme:null,//每个主题内容
            dataSource:new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
        };
    }

    componentDidMount(){
        var API_THEME_URL = 'http://news-at.zhihu.com/api/4/theme/' + this.props.themeid;
        var KEY_THEME = 'theme:' + this.props.themeid;

        console.log(API_THEME_URL);
        //从存储中读取themes的json信息并触发重新渲染
        Store.get(KEY_THEME).then((data)=>{
            if (data != null){
                console.log("AppTheme componentDidMount: get theme success");
                console.log(data);
                //重新触发渲染
                this.setState({theme: data});
            }
        });
    }

    onRefresh() {
        var API_THEME_URL = 'http://news-at.zhihu.com/api/4/theme/' + this.props.themeid;
        var KEY_THEME = 'theme:' + this.props.themeid;

        console.log("==== enter onRefresh1");
        //触发render，处于刷新中
        this.setState({isRefreshing: true});

        console.log("==== enter onRefresh2");
        //从网络获取themes信息
        fetch(API_THEME_URL).then((response) => response.json()).then((responseData) => {
            console.log("==== enter onRefres3");
            console.log(responseData);
            Store.save(KEY_THEME, responseData);
            //重新触发渲染,关闭刷新
            this.setState({theme: responseData,
                isRefreshing: false,
            });
        });
    }

    renderItem(story){
        return (
            <View style={styles.containerItem}>
                <Image
                  style={{width: 88, height: 66, marginRight: 10}}
                />
                <View style={{flex: 1, flexDirection: 'column'}} >
                  <Text style={styles.title}>
                    {story.title}
                  </Text>
                  <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}} >
                    <Text style={{fontSize: 14, color: '#aaaaaa', marginTop: 5}}>
                      来自微信公众号：
                    </Text>
                    <Text style={{flex: 1, fontSize: 14, color: '#87CEFA', marginTop: 5, marginRight: 5}}>

                    </Text>
                  </View>
                </View>
            </View>
        );
    }
    render(){
        console.log("AppTheme render");
        if (this.state.theme == null) {
            return (
                <ScrollView
                    automaticallyAdjustContentInsets={false}
                    horizontal={false}
                    contentContainerStyle={styles.no_data}
                    style={{flex: 1}}
                    refreshControl={
                      <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this.onRefresh.bind(this)}
                        title="Loading..."
                        colors={['#ffaa66cc', '#ff00ddff', '#ffffbb33', '#ffff4444']}
                      />
                    }
                    >
                    <View style={{alignItems: 'center'}}>
                      <Text style={{fontSize: 16}}>
                        目前没有数据，请刷新重试……
                      </Text>
                    </View>
                </ScrollView>
            );
        }

        return (
            <ListView
              dataSource={this.state.dataSource.cloneWithRows(this.state.theme.stories)}
              renderRow={this.renderItem}
            >
            </ListView>
        );
    }
}

var styles = StyleSheet.create({
    no_data: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 100
    },
    containerItem: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fcfcfc',
      padding: 10,
      borderBottomColor: '#ddd',
      borderBottomWidth: 1
    },
});

module.exports = AppTheme;
