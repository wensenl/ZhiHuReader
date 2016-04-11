'use strict';
var React = require('react-native');
var {
    Platform,
    StyleSheet,
    View,
    ProgressBarAndroid,
    Text,
} = React;

class Loading extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <View style={ styles.loading }>
                <ProgressBarAndroid styleAttr='LargeInverse' color='#3e9ce9' />
                <Text style={ styles.loadingText }>{this.props.text}</Text>
            </View>
        );
    }
}

var styles = StyleSheet.create({
	loading: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	loadingText: {
		marginTop: 10,
		textAlign: 'center'
	}
});

module.exports = Loading;
