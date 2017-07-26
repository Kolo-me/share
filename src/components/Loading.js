'use strict';

import React, { Component } from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    Image,
    StyleSheet,
    ActivityIndicator,
    Modal
} from 'react-native';

 

export default class Loadin extends Component {
  constructor(props) {
  super(props);
  this.state = {
   
    visible:false,
  };
}

  _setModalVisible = (visible) => {
    this.setState({visible: visible});
  }

    render() {
  
        return (
     
      <Modal
      animationType={'fade'}
      transparent={true}
      visible={this.state.visible||this.props.loading }
      onRequestClose={() => {this.setState({visible:false})}}
      >
      <View style = {{flex:1 ,justifyContent: 'center', backgroundColor:   'rgba(0, 0, 0, 0.5)'}}>
      <View style = {{flexDirection:'row' , justifyContent:'center'}}>
      <ActivityIndicator
      size="large" 
      color="white"/>
      <Text style = {{color:'white' ,marginTop:5 ,fontSize:20}} > Loading </Text>
      </View>
      </View>
      </Modal>
  
  
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
