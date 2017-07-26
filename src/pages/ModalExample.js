'use strict';

import React , {Component} from 'react';

import {
  Platform,
  Switch,
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  BackAndroid,
  Dimensions,
  Modal,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  ListView
} from'react-native';
import IcoButton from 'funshare/src/components/icobutton';
import Swiper from 'react-native-swiper';
import Routes from 'funshare/Routes';
import ImageViewer from 'react-native-image-zoom-viewer';
import firebase from 'firebase';
import FCM from 'react-native-fcm';
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;
var modalheight = Dimensions.get('window').height/2 ;
var images=[];
var image=[] ;
const imagesViewer = [];
const styles = StyleSheet.create({
  isSellected:{ 
    flex:1,position:'absolute', right:0
  },
  wrapper: {

  },

  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  Mcontainer: {flex:1 ,  justifyContent: 'flex-end', }, 
  MinnerContainer: {flex:1,justifyContent:'flex-end' },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  item: {

    width:deviceWidth/4,
    height: 80,
    borderColor: '#efefef',
    borderWidth: 1,
    margin:8,
    borderRadius:10,
  },
  image: {
    flex:1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius:10,
    width:deviceWidth/4-2,
    height: 78 ,
  },
  textinput: {
    padding: 10,
    fontWeight:'bold',
    backgroundColor: 'white',
    color: 'black',
    fontSize: 13,
    flex:1
  },
  description: {
    padding: 10,
    textAlignVertical:'top',
    backgroundColor: 'white',
    alignItems:'flex-start',
    marginTop:0,
    color: 'black',
    fontSize: 13,
    flex: 1,
  },
});

export default class ModalExample extends Component { 
  renderRow() {

    var images= [null];
    return new Promise((next, error) => {

      var self = this; 
      var i = 0;
      var num=0;
      var uid = currentUserGlobal.uid;
      firebase.database()
      .ref('items')
      .child(uid)
      .once('value')
      .then(function(snapshot) {
        num =snapshot.numChildren();

snapshot.forEach(function(childSnapshot) {

  firebase.database()
  .ref('items')
  .child(uid).child(childSnapshot.key).once('value').then(function(snapshot) {
    var piclink = snapshot.val().itemPic;
    var desc = snapshot.val().description;
    var title = snapshot.val().title;
    var keyOfOfferedItem = snapshot.key;
    var uidOfOfferingUser = snapshot.val().uid ;

    images.push(
      <View style = {{flex:1}} >
      <TouchableOpacity
      activeOpacity={ 0.9 }
      style={ styles.item }
      onPress={self.addtooffereditems.bind( this,uidOfOfferingUser,keyOfOfferedItem,self )}
      >

      <View style = {{flex:1}}>



      <Image
      resizeMode={Image.resizeMode.cover}
      style={ styles.image }
      source={{uri: piclink}}
      >

      </Image> 
      <View
      style = {self.state.keyOfOfferedItem == keyOfOfferedItem ? {flex:1,position:'absolute', right:0} : {height:0}} >
      <IcoButton
      source={require('funshare/src/img/like.png')}             
      icostyle={{width:15, height:15}}
      />
      </View>

      </View>    

      </TouchableOpacity>
      </View> );

   i++;
    if (i==num){
      self.setState({
        dataSource: self.state.dataSource.cloneWithRows(images)
      });

      next(images);
    }

  });

})
});
    }); 
  }


 
componentDidMount() {
 
  var self=this;
  BackAndroid.addEventListener('hardwareBackPress', () => {

    self.goBack();
    return true;

  });
    self.renderRow();
  FCM.getFCMToken().then(token => {

//console.log(token);
// store fcm token in your server
});
  this.notificationUnsubscribe = FCM.on('notification', (notif) => {
// there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
});
  this.refreshUnsubscribe = FCM.on('refreshToken', (token) => {
    //console.log(token)
// fcm token may not be available on first load, catch it here
});

  FCM.subscribeToTopic('/topics/foo-bar');
  FCM.unsubscribeFromTopic('/topics/foo-bar');
}
componentWillUnmount() {
  this.refreshUnsubscribe();
  this.notificationUnsubscribe();
}
constructor(props) {
  super(props);

  this.state = {
    dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    visible: false,
    title:this.props.info.title,
    desc:this.props.info.description,
    piclink:this.props.info.image,
    goback:this.props.info.goback,
    username:this.props.info.username,
    uidOfLikedItem:this.props.info.uidOfLikedItem,
    keyOfWantedItem:this.props.info.keyOfWantedItem,
    //category:this.props.info.category,
    //search:this.props.info.search,
    offerData:null,
    modalVisible:false
}
}

addtooffereditems(uidOfOfferingUser,keyOfOfferedItem,self){
 if(self.state.keyOfOfferedItem==keyOfOfferedItem)
     {
      self.setState({keyOfOfferedItem: null});
       self.renderRow();
    }
  else
  {
  self.setState({keyOfOfferedItem: keyOfOfferedItem});
  var offerData = {
    uidOfLikedItem: self.state.uidOfLikedItem,
    keyOfWantedItem: self.state.keyOfWantedItem,
    uidOfOfferingUser: uidOfOfferingUser,
    keyOfOfferedItem: keyOfOfferedItem,
    offerAccepted:0,
    offerConfirmedByOfferingUser:0,
    offerStatus:"pending approval",
    created:firebase.database.ServerValue.TIMESTAMP
  };

  self.setState({offerData: offerData , uidOfOfferingUser:uidOfOfferingUser});
   self.renderRow();
  }
 


}
uploadstart(){
  this.props.setModalVisible(false);
  var offerData= this.state.offerData;
  var uidOfOfferingUser= this.state.uidOfOfferingUser;
  var keyOfOfferedItem= this.state.keyOfOfferedItem;
  if(offerData && keyOfOfferedItem && uidOfOfferingUser  )

  { 
    var uploadTask1 = firebase.database()
    .ref('Offers')
    .child(uidOfOfferingUser);
    var offerKey = uploadTask1.push(offerData).key ;
//console.log("offer key :",offerKey); 
var notificationData = {
  uidOfLikedItem: this.state.uidOfLikedItem,
  keyOfWantedItem: this.state.keyOfWantedItem,
  uidOfOfferingUser: uidOfOfferingUser,
  keyOfOfferedItem: keyOfOfferedItem,
  offerAccepted:0,
  offerConfirmedByOfferingUser:0,
  offerStatus:"pending approval",
  offerKey:offerKey,
  created:firebase.database.ServerValue.TIMESTAMP,
  seen:0
}; 
var uploadTask2 = firebase.database()
.ref('Notifications')
.child(this.state.uidOfLikedItem)
.child('Unseen'); 
var notificationKey = uploadTask2.push(notificationData).key;
this.setState({modalVisible: false});
}
else
  alert("Es wird kein Artikel angeboten")

}
setImage(){
  imagesViewer= []
  var link = {url: this.state.piclink}
  imagesViewer.push(link)
  var visible = !this.state.visible
  this.setState({visible: visible});
}
_setModalVisible(visible)
{ 
  this.setState({modalVisible: visible});
}
renderImages(){
  var images = 

  
(

    <TouchableOpacity
    Key={this.state.piclink}
    onPress = {() => this.setImage()}
    style = {{flex:1}}
    >
    <Image
    Key={this.state.piclink+"8"}
    style={{flex:1,width:null, height:null}}
    source={{uri: this.state.piclink}}>
    <View Key={this.state.piclink+"7"} style = {{flex:0.8}}>
    <View Key={this.state.piclink+"6"} style= {{

      position:'absolute',
      justifyContent:'center',

      width:50,
      height:50,

    }}>

    <TouchableHighlight
    Key={this.state.piclink+"1"}
    underlayColor = {'rgba(0, 0, 0, 0.2)'}
    style= {{flex:1 }}
    onPress={this.goBack.bind(this)}
    >  
    <Image
    Key={this.state.piclink+"5"}
    source={require('funshare/src/img/arrow.png')}
    style={{width:25, height:25, margin:10}}
    />
    </TouchableHighlight>
    </View>

    </View>
    <View  Key={this.state.piclink+"2"} style = {{flex:0.2,alignItems:'flex-start' , backgroundColor:'rgba(0, 0, 0, 0.5)' }}>
    <View  Key={this.state.piclink+"3"} style = {{flexDirection:'row' ,flex:1 , margin:5}}>


    <Text  Key={this.state.piclink+"4"} style = {{fontSize:16, fontWeight:'bold' , color:'white'}} >{this.state.username}</Text>

    </View>
    </View>
    </Image> 

    </TouchableOpacity>

    )
    return images;
  }
  goBack(){

    if(this.state.goback=="wishlist")
      this.props.replaceRoute(Routes.wishlist());
   else
      { 
        var search=this.state.search;
        var category=this.state.category;
        this.props.replaceRoute(Routes.Home(category,search));
      }
  }

  render() {
    return (
    <View style={{flex:1, backgroundColor: 'rgba(0, 0, 0, 0.7)',}}>
    <View style={ {flex:1 ,justifyContent:'flex-end' } }>
    <View style= {{height:modalheight , backgroundColor:   'rgba(0, 0, 0, 0.7)'}} >
    <Text style={{color:'white', fontSize:16 , marginLeft:8}}>Meine Objekte</Text>
    <View>
    <ScrollView
    horizontal={true}
    style= {{ height: 400}} >
    <View style = {{ flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: "center" }}>
      <ListView
      dataSource={this.state.dataSource}
      renderRow={(rowData) => <View style = {{flex:1}} >{rowData}</View>}
      // renderSeparator={() => <View style={styles.separator} />}
      renderSeparator={(sectionId, rowId) => <View key={rowId}  />}
      contentContainerStyle={{flex:1 ,  flexDirection: 'row',}}/>
      </View>
      </ScrollView>
      </View>
     <View style={{position:'absolute', bottom:10,width:deviceWidth  ,flex:1,flexDirection:'row',alignItems:'center', justifyContent:'center'}}>

      <View style={{flex:0.25,alignItems:'center'}}>
      </View>
      <View style={{flex:0.25,alignItems:'center'}}>
      <IcoButton
      onPress={()=>this.props.setModalVisible(false)}
      source={require('funshare/src/img/dislike.png')}
      icostyle={{width:60, height:60}}
      />
      </View>
     

      <View style={{flex:0.25,alignItems:'center'}}>
      <IcoButton
      source={require('funshare/src/img/like.png')}
      onPress={this.uploadstart.bind(this, true)}
      icostyle={{width:60, height:60}}
      />
      </View>
      <View style={{flex:0.25,alignItems:'center'}}>
      </View>
      </View>
      </View>
      </View>
      </View>

        );
      }
    }