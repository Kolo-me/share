
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
  
        return (
        <TouchableOpacity style={this.props.container || styles.container}
                        
                            onPress={this.props.onPress}>
          <Image
           
          style={this.props.icostyle || styles.icostyle}
          source={this.props.source}/>

            </TouchableOpacity>
        )
    }

}
var styles = StyleSheet.create({

    container: {
        flex:1,
    },

   ccontainer: {
    flexDirection: 'row',
    
    margin:0
  },
  icostyle: {
    width: 25,
    height: 25
  },
 
  

 

  
});
