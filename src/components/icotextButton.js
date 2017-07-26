
'use strict';

import React, { Component } from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    Image,
    StyleSheet
} from 'react-native';



export default class InputButton extends Component {

    render() {
    var container = (
      <View style = {{flex:1}}>
      <View style={this.props.ccontainerStyle || styles.ccontainer}>
        <Image
          resizeMode={Image.resizeMode.contain}
          style={this.props.icostyle || styles.icostyle}
          source={this.props.source}/>
        <View style={styles.labelContainer}>
        <Text style={ this.props.inputButtonText || styles.inputButtonText }>{this.props.value}</Text>
        </View>
      <View
      style = {{flex:1, justifyContent:'center',alignItems:'center',position:'absolute', right:0}} >
      <Image
      source={require('funshare/src/img/like.png')}             
      style={this.props.container == null || this.props.withoutlike==true ?{height:0 ,width:0}:{ justifyContent:'center',width:28, height:28} }
      />
      </View>
      </View>
      </View>
    );
        return (
        <TouchableOpacity style={this.props.container || styles.container}
                            
                            onPress={this.props.onPress}>
               {container}
            </TouchableOpacity>
        )
    }

}
var styles = StyleSheet.create({

    container: {
        flex: 0.5 ,
        flexDirection: "row",
        backgroundColor: '#efefef',
        borderRadius:3,
        margin:7 ,
        
    },

   ccontainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  
  },
  icostyle: {
    width:28,
    height: 28,
    marginLeft:3

  },
  labelContainer: {
    marginLeft:10
 
  },
  

    inputButtonText: {
        fontSize: 17,  
        color: 'black'
    },

  
});
