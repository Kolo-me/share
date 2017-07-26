'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  AsyncStorage,
  Modal,
  Dimensions,
  BackAndroid,
  TouchableHighlight,
  ListView,
  Vibration,
  TouchableOpacity
} from 'react-native';

import IcoButton from 'funshare/src/components/icobutton';
import firebaseClient from  "funshare/src/pages/FirebaseClient";
import Modalpops from  "funshare/src/pages/Modalpops";
import Login from './login';
import firebase from 'firebase';
import Routes from 'funshare/Routes';
import DataStore from 'funshare/DataStore';
import Actions from 'funshare/Actions';
import SharedStyles from 'funshare/SharedStyles';
import StyleVars from 'funshare/StyleVars';
import Tinder from 'funshare/Tinder';
import FCM from 'react-native-fcm';
var deviceWidth = Dimensions.get('window').width -6;
var deviceheight = Dimensions.get('window').height -(deviceWidth/2) ;
var modalheight = Dimensions.get('window').height/2 ;
var piclinks=[];
var image=[] ;
global.indexArray=0;
global.currentUserGlobal=null;
global.unseenNotifNumberGlobal=null;
global.PendingNotifNumberGlobal=null;
global.AcceptedNotifNumberGlobal=null;
global.currentLikedItem=null;
const styles = StyleSheet.create({
  Mcontainer: {flex:1 ,  justifyContent: 'flex-end', }, 
  MinnerContainer: {flex:1,justifyContent:'flex-end' },
  buttonContainer: {
    paddingTop: 96,
    alignItems: "center"
  },
  reloadText: {
    textAlign: "center",
    marginVertical: 20
  },
  item: {
    flex:1,
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
  imageContainer:{

    marginBottom:80
  },
  profilePictureContainer: {

    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center"
  },
  Picture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    margin: 15,

  },

  button: { width: 256 }
});
export default class Home extends Component {

  renderRow() {
  if (currentUserGlobal !== null){
    var images= [];
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
    var id = snapshot.key;
    var piclink = snapshot.val().itemPic;
    var desc = snapshot.val().description;
    var title = snapshot.val().title;
    var uidOfOfferingUser = snapshot.val().uid;
    piclinks.push(piclink);
    images.push(
      <View style = {{flex:1}} Key={piclink}>
      <TouchableHighlight
      Key={piclink}
      activeOpacity={ 0.75 }
      style={ styles.item }
      onPress={self.handleOffereditems.bind(this,desc,piclink,title,uidOfOfferingUser)}
      >

      <View style= {{flex:1}} >
      <Image
      resizeMode={Image.resizeMode.cover}
      style={ styles.image }
      source={{uri: piclink}}
      /> 
      </View>    

      </TouchableHighlight>
      </View> );

    i++; 
    if (i==num&&self._mounted){
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
  }


  constructor(props) {
    super(props);

    var save = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        currentUserGlobal=user;
        var save1=save;
        var NotifRef = firebase.database().ref('Notifications/' + currentUserGlobal.uid+'/Unseen/');
        var PendingRef = firebase.database().ref('Notifications/' + currentUserGlobal.uid+'/Pending/');
        var AcceptedRef = firebase.database().ref('Notifications/' + currentUserGlobal.uid+'/Accepted/');
        NotifRef.once("value")
        .then(function(snapshot) {

          var unseenNotifNumber = snapshot.numChildren(); 
          var unseenNotifNumberGlobal = snapshot.numChildren(); 
          //console.log("unseenNotifNumber",unseenNotifNumber,unseenNotifNumberGlobal);
          if(save._mounted){
          save1.setState({ unseenNotifNumberGlobal:unseenNotifNumber });
        }
        });
        NotifRef.on('child_added', function(data) {

         // console.log(data.val());
          NotifRef.once("value")
          .then(function(snapshot) {
            var unseenNotifNumber = snapshot.numChildren(); 
             if(global.unseenNotifNumberGlobal < unseenNotifNumber)
             {
              global.unseenNotifNumberGlobal= unseenNotifNumber;
             }
                 
           // console.log("unseenNotifNumber",unseenNotifNumber,unseenNotifNumberGlobal);
           if(save._mounted){
            save1.setState({ unseenNotifNumberGlobal:unseenNotifNumber });
          }
            var body1="You have "+unseenNotifNumber+ " new offers ";
            firebaseClient.sendNotification(save1.state.token,"Funshare",body1);


            save1.refreshUnsubscribe = FCM.on("refreshToken", token => {
              //console.log("TOKEN (refreshUnsubscribe)", token);
              save1.props.onChangeToken(token);
            });
          }); 
        });
     PendingRef.once("value")
      .then(function(snapshot) {

        var PendingNotifNumber = snapshot.numChildren(); 
        var PendingNotifNumberGlobal = snapshot.numChildren(); 
        //console.log("unseenNotifNumber",unseenNotifNumber,unseenNotifNumberGlobal);
        if(save._mounted){
        save1.setState({ PendingNotifNumberGlobal:PendingNotifNumber });
      }
      });
      PendingRef.on('child_added', function(data) {
        PendingRef.once("value")
        .then(function(snapshot) {
          var PendingNotifNumber = snapshot.numChildren(); 
           if(global.PendingNotifNumberGlobal < PendingNotifNumber)
           {
            Vibration.vibrate();
            global.PendingNotifNumberGlobal= PendingNotifNumber;
           }
           if(save._mounted){
          save1.setState({ PendingNotifNumberGlobal:PendingNotifNumber });
        }
          var body1="You have "+PendingNotifNumber+ " new offers ";
          firebaseClient.sendNotification(save1.state.token,"Funshare",body1);
          save1.refreshUnsubscribe = FCM.on("refreshToken", token => {
            //console.log("TOKEN (refreshUnsubscribe)", token);
            save1.props.onChangeToken(token);

          });
        });
      });





      AcceptedRef.once("value")
      .then(function(snapshot) {

        var AcceptedNotifNumber = snapshot.numChildren(); 
        var AcceptedNotifNumberGlobal = snapshot.numChildren(); 
        //console.log("unseenNotifNumber",unseenNotifNumber,unseenNotifNumberGlobal);
        if(save._mounted){
        save1.setState({ AcceptedNotifNumberGlobal:AcceptedNotifNumber });
      }
      });
      AcceptedRef.on('child_added', function(data) {
        AcceptedRef.once("value")
        .then(function(snapshot) {
          var AcceptedNotifNumber = snapshot.numChildren(); 
           if(global.AcceptedNotifNumberGlobal < AcceptedNotifNumber)
           {
              if(save._mounted){
              Vibration.vibrate();
              save1.setState({popVisible:true});
              }
            global.AcceptedNotifNumberGlobal= AcceptedNotifNumber;
           }
           if(save._mounted){
          save1.setState({ AcceptedNotifNumberGlobal:AcceptedNotifNumber });
        }
          var body1="You have "+AcceptedNotifNumber+ " new offers ";
          firebaseClient.sendNotification(save1.state.token,"Funshare",body1);
          save1.refreshUnsubscribe = FCM.on("refreshToken", token => {
            //console.log("TOKEN (refreshUnsubscribe)", token);
            save1.props.onChangeToken(token);

          });
        });
      });


}
else {
  save.logout();
}
});


    save.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      Notif:1,
      image: [null],
      hi: "hi",
      loaded1: false,
      loaded: false,
      failed: false,
      animationType: 'fade',
      modalVisible: false,
      popVisible:false,
      transparent: true,
      unseenNotifNumberGlobal:null,
      PendingNotifNumberGlobal:null,
      token: "",
      icategory:this.props.category ? this.props.category : "swiper-all" ,
      search:this.props.search ? this.props.search : null ,
      Startsearch:this.props.Startsearch ? this.props.Startsearch: null,

    };

//this.fuck = this.fuck.bind(this);
  this.renderRow = this.renderRow.bind(this)
}

componentWillMount() {
  var save=this;

//Actions.auth();

}
componentWillUnmount() {
// prevent leaking
this._mounted = false;
this.refreshUnsubscribe();
this.notificationUnsubscribe();
}

componentDidMount() {
  this._mounted = true;
  this.renderRow();
  var self=this;
  BackAndroid.addEventListener('hardwareBackPress', () => {
// console.log("did",currentUserGlobal);
self.props.replaceRoute(Routes.Home1(currentUserGlobal));
return true;

});
  Actions.loadUser.completed.listen(this._onLoadUserCompleted.bind(this));
  Actions.logout.listen(this._onLogout.bind(this));
FCM.requestPermissions(); // for iOS
FCM.getFCMToken().then(token => {
  //console.log("TOKEN (getFCMToken)", token);
  if(self._mounted){
  this.setState({token: token || ""});
}
//  firebaseClient.sendNotification(token);
//firebaseClient.sendData(token);
//firebaseClient.sendNotificationWithData(token);
});

this.notificationUnsubscribe = FCM.on("notification", notif => {
 // console.log("Notification", notif);
  if (notif && notif.local) {
    return;
  }
  this.sendRemote(notif);
});

this.refreshUnsubscribe = FCM.on("refreshToken", token => {
 // console.log("TOKEN (refreshUnsubscribe)", token);
  this.props.onChangeToken(token);
});
}

sendRemote(notif) {
  FCM.presentLocalNotification({
    title: notif.title,
    body: notif.body,
    priority: "high",
    click_action: notif.click_action,
    show_in_foreground: true,
    local: true,
  });

}




_setModalVisible = (visible) => {
  if(this._mounted){
  this.setState({modalVisible: visible});
}
};
logout(){
  firebase.auth().signOut().then(function() {
}, function(error) {
});
  this.props.replaceRoute(Routes.login());

}
connfirm(){

}

handleOffereditems (desc,piclink,title,uidOfOfferingUser) {

}

handleNope () {
  Tinder._goToNextCard() 
}
goToDetails(info){
  if(info.keyOfWantedItem)
  this.props.replaceRoute(Routes.details(info));

}
goToOffer(info){
  if(info.keyOfWantedItem)
  this.props.replaceRoute(Routes.ModalExample(info));

}
hidePopvisible(){
  if(this._mounted){
    this.setState({popVisible:false});
  }
}
PopUnvisible(){
  if(this._mounted){
    this.setState({popVisible:false});
  }
}
render(){
  var modalBackgroundStyle = {
    backgroundColor:   'rgba(0, 0, 0, 0.5)' ,
  };
  var innerContainerTransparentStyle =  
  { backgroundColor:   'rgba(0, 0, 0, 0.5)'}

  var noti ={ 

    flex:1, width:10,height:10,borderRadius:5, backgroundColor:'#00D77F',position: 'absolute',alignItems:'center',justifyContent:'center', top:0 , right:0

  }  
  var none = {height:0}

  var Notification = () => 
  (

    <View style = {(this.state.unseenNotifNumberGlobal || this.state.PendingNotifNumberGlobal>0)? noti : none } >
    </View>
    )
  return (

    <View style={{  backgroundColor:'white', flex:1 , width: null,height: null }}>
    <Modalpops popVisible={this.state.popVisible}  PopUnvisible= {() => {this.PopUnvisible()}} goTochatscreen ={() => {this.goToChat(2)}} />


    <View>
    
    <Modal
    animationType={this.state.animationType}
    transparent={this.state.transparent}
    visible={this.state.modalVisible}
    onRequestClose={() => {this._setModalVisible(false)}}
    >

    <View style={ {flex:1 ,justifyContent:'flex-end' } }>

    <View style= {{height:modalheight , backgroundColor:   'rgba(0, 0, 0, 0.7)'}} >
    <Text style={{color:'white', fontSize:16 , marginLeft:8}}>Etwas bieten ?</Text>

    <View>
    <ScrollView
    horizontal={true}
    style= {{flex:1, height: 400}} >

    <View
    onPress={() => {this.handleOffereditems()}}
    style = {{ flex: 1,
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
<View style={{position:'absolute', bottom:3 ,flex:1,marginLeft:20,marginRight:20,flexDirection:'row',alignItems:'center', justifyContent:'center'}}>


<View style={{flex:0.25,alignItems:'center'}}>
</View>

<View style={{flex:0.25,alignItems:'center'}}>
<IcoButton
onPress={this._setModalVisible.bind(this, false)}
source={require('funshare/src/img/dislike.png')}
icostyle={{width:60, height:60}}
/>
</View>


<View style={{flex:0.25,alignItems:'center'}}>
<IcoButton
source={require('funshare/src/img/like.png')}
onPress={() => {this.goToDetails(currentLikedItem.description ,currentLikedItem.image,   currentLikedItem.title, currentLikedItem.uidOfLikedItem ,currentLikedItem.keyOfWantedItem )}}
icostyle={{width:60, height:60}}
/>
</View>

<View style={{flex:0.25,alignItems:'center'}}>
</View>

</View>

</View>
</View>
</Modal>

</View>

<View style={{flex:1}}>
<View style={{marginTop:12 ,alignItems:'center'}}>

<View style={{flexDirection:'row' ,alignItems:'center' , justifyContent:'center'  }}>
<View style={{flex:0.1 ,alignItems:'center'}}>

<TouchableOpacity
onPress={this.goToProfile.bind(this)}
>
<Image
source={require('funshare/src/img/profil.png')}
style={{width:40, height:40}}
/>
</TouchableOpacity>

</View>

<Image
source={require('../img/ifunshare.png')}
style={{height:50, width:150 , }}

/>
<View style={{flex:0.1,alignItems:'center'}}>
 
<TouchableOpacity
onPress={this.goToChat.bind(this,0)}
>
<Image
source={require('funshare/src/img/ichat.png')}
style={{width:40, height:40}}
>
<Notification/>
</Image>
</TouchableOpacity>

 
</View>
</View>
</View>
<View style={{flex:1,alignItems:'center' , justifyContent:'flex-start'}}>
<Tinder Startsearch={this.state.Startsearch} search={this.state.search} category= {this.state.icategory}  _setModalVisible={this._setModalVisible.bind(this, true)} goToDetails={this.goToDetails.bind(this)} goToOffer={this.goToOffer.bind(this)} />

</View>
</View>

</View>
);
}


_onLoadUserCompleted(user) {
  if (currentUserGlobal.onboarded) {
    this.setState({ loaded: true });
  } else {
    this.props.replaceRoute(Routes.Home1(currentUserGlobal));
  }
}

_onLogout() {
  this.props.replaceRoute(Routes.login());
}

mystuff(){
  this.props.replaceRoute(Routes.addstuff());

}

goToChat(a){
  this.props.replaceRoute(Routes.chatscreen(a));
}
goToProfile(){

  this.props.replaceRoute(Routes.Home1(currentUserGlobal));

}




}
