//This is the screen where it contains the chats with everybody
'use strict';
import React from 'react'; 
import{
  AppRegistry,
  AsyncStorage,
  Dimensions,
  Image,
  NativeModules,
  PropTypes,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ListView,
  Platform,
  Modal,
  Text
} from 'react-native';
//import Loading from 'funshare/src/components/Loading';
import IcoButton from 'funshare/src/components/icobutton';
import IconBadge from 'react-native-icon-badge';
import StyleVars from 'funshare/StyleVars';
import Login from './login';
import firebase from 'firebase';
import Routes from 'funshare/Routes';
import DataStore from 'funshare/DataStore';
import Actions from 'funshare/Actions';
import SharedStyles from 'funshare/SharedStyles';
import IconButton from 'funshare/src/components/icotextButton';


var deviceheight = Dimensions.get('window').height ;
const styles = StyleSheet.create({
  li: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  liText: {
    color: '#333',
    fontSize: 16,
  },
  separator: {
    alignSelf: 'flex-end',
    width: Dimensions.get("window").width-100,

  },
  item: {
    flex:1,
    marginBottom:5,
  },
  container: {
  },
  inputContainer: {
    margin:20, 
    marginTop:10,
    marginBottom:0   
  },
  input: {
    textAlign: 'center',
    fontSize: 18,
    color: '#FF4470',
    fontWeight: 'bold',
  },
  username: {
    textAlign: 'center',
    fontSize: 23,
    fontWeight: 'bold',
  },
  profilePictureContainer: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center"
  },
  btnContainer:{
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'row',
    marginBottom: 5
  },
  profilePicture: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 5,
  },
  footer: {
    bottom: 0,
    left: 0,
    right: 0,
    height: 48,
    alignItems: "center",
    marginTop:37,
    paddingVertical: 15,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.5)"
  },
  footerText: {
    color: "white",
    fontSize: 14
  },
  IContainer:{
    alignItems:'flex-start',
    padding:3,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  image:{
    height:60,
    width:60,
    borderRadius:30
  }
});
class AcceptedOffers extends React.Component {
componentDidMount() {
    this._mounted = true;  
    var self=this;
    self.renderRow(); 
    var ref = firebase.database()
          .ref('Notifications')
          .child(currentUserGlobal.uid)
          .child('Accepted');
    ref.on('child_added', function(childSnapshot, prevChildKey) {
      self.renderRow(); 
    });
    ref.on('child_removed', function(childSnapshot, prevChildKey) {
      self.renderRow(); 
    });
  }
  componentWillUnmount(){
    this._mounted = false;
      var ref = firebase.database()
          .ref('Notifications')
          .child(currentUserGlobal.uid)
          .child('Accepted');
      ref.off('child_removed');
      ref.off('child_added');
  }
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      loading:false,
      animationType: 'fade',
      modalVisible: false,
      transparent: true,
      picOfWantedItem:null,
      picOfOfferedItem:null,
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
    };
  }
renderItem(iteminfo){
    return(
 <View style = {{flex:1}}>

  <TouchableOpacity  
  style={{flex:1}}
  activeOpacity={ 0.75 }
  onPress= {() => {this.props.goChat(iteminfo);
} }
>
<View style = {{flex:1,paddingTop:8, paddingBottom:12, paddingLeft:20, flexDirection:'row' ,backgroundColor:'white'}} >
<View style = {{flex:0.3 , justifyContent:'center' , alignItems:'center'}}>
<Image
style={ styles.image }
source={{uri:iteminfo.picOfWantedItem}}
/>  
</View>
<View style = {{flex:1 , flexDirection:'row'}}>
<View style= {{flex:0.9,justifyContent:'center' , marginLeft:10}} >
<Text  numberOfLines={1} style ={{fontSize:15 , fontWeight:'bold'}}>{iteminfo.username}</Text> 

<Text  numberOfLines={1}  style={{fontSize:13}}>{iteminfo.lastMessage}</Text>                       
</View>
<View style = {{flex:0.2, top:25 ,alignItems:'center', justifyContent:'center'}}>

</View>
</View>
</View>
</TouchableOpacity>

</View>

      )
  }
  goToHome()
  {
    this.props.replaceRoute(Routes.Home());
  }
  finishDeal(){
  }
  renderRow() {
    //this.setState({loading:true});
    var piclinks=[];
      var self = this; 
      var i = 0;
      var num=0;
      var checker1=0;
      var checker2=0;
      var uid = firebase.auth().currentUser.uid;
      firebase.database()
      .ref('Notifications')
      .child(uid)
      .child('Accepted')
      .on('value', function(snapshot){
        num =snapshot.numChildren();
        if(num == 0)
        {
          /*self.setState({
            loading:false
          });*/
        }
        snapshot.forEach(function(childSnapshot) {
          var picOfWantedItem= "http://orig01.deviantart.net/ace1/f/2010/227/4/6/png_test_by_destron23.png";
          var picOfOfferedItem="http://orig01.deviantart.net/ace1/f/2010/227/4/6/png_test_by_destron23.png";
          var childKey = childSnapshot.key;
          var ChatUsername=null;
          var lastMessage=null;
          var userNameOffering= null;
          var userNameWanted=null;
          var oldRef=firebase.database()
          .ref('Notifications')
          .child(uid)
          .child('Unseen').child(childSnapshot.key);
          var newRef=firebase.database()
          .ref('Notifications')
          .child(uid)
          .child('Seen').child(childSnapshot.key);
          var snapVal=null;
          firebase.database()
          .ref('Notifications')
          .child(uid)
          .child('Accepted').child(childSnapshot.key).once('value').then(function(snapshot) {
            snapVal=snapshot.val();
            firebase.database().ref('items').child(snapshot.val().uidOfOfferingUser)
            .child(snapshot.val().keyOfOfferedItem).once('value').then(function(snapshot1){
           if (snapshot1.val()){
              picOfOfferedItem= snapshot1.val().itemPic;
              checker1=1;
            }
           else{
                checker1=0;
                firebase.database()
                .ref('Offers').child(snapshot.val().uidOfOfferingUser).child(snapshot.val().offerKey).remove().then(function(){});
                firebase.database()
                .ref('Notifications')
                .child(uid)
                .child('Accepted').child(childKey).remove().then(function(){}); 
                firebase.database()
                .ref('Notifications')
                .child(uid)
                .child('Popup').child(childKey).remove().then(function(){});
              }


            }).then(function(){
              firebase.database().ref('items').child(snapshot.val().uidOfLikedItem)
              .child(snapshot.val().keyOfWantedItem).once('value').then(function(snapshot2){
                if(snapshot2.val()){
                  picOfWantedItem= snapshot2.val().itemPic;
                  checker2=1;
                }
                else{
                checker2=0;
                firebase.database()
                .ref('Offers').child(snapshot.val().uidOfOfferingUser).child(snapshot.val().offerKey).remove().then(function(){});
                firebase.database()
                .ref('Notifications')
                .child(uid)
                .child('Accepted').child(childKey).remove().then(function(){}); 
                firebase.database()
                .ref('Notifications')
                .child(uid)
                .child('Popup').child(childKey).remove().then(function(){});
              }
            
            }).then(function(){
              if (checker2&&checker1){  
                  firebase.database()
                  .ref('items').child(snapshot.val().uidOfOfferingUser).child(snapshot.val().keyOfOfferedItem).once('value').then(function(snapshot4){
                    userNameOffering=snapshot4.val().username;
                  });
                    firebase.database()
                  .ref('items').child(snapshot.val().uidOfLikedItem).child(snapshot.val().keyOfWantedItem).once('value').then(function(snapshot5){
                    userNameWanted=snapshot5.val().username;
                    if (currentUserGlobal.displayName == userNameWanted)ChatUsername=userNameOffering;
                    else ChatUsername=userNameWanted;
                  });
               }
              }).then(function(){
                if (checker2&&checker1){ 
                firebase.database()
                .ref('Offers')
                .child(snapshot.val().uidOfOfferingUser)
                .child(snapshot.val().offerKey)
                .child('OfferMessages').child('0').once('value').then(function(snapshot3) {

                  if(snapshot3.val()===null)lastMessage="Start talking Now !!";
                  else
                    lastMessage=snapshot3.val().text;

                }).then(function(){
                  var iteminfo = {
                    created: snapshot.val().created ,
                    keyOfOfferedItem: snapshot.val().keyOfOfferedItem ,
                    keyOfWantedItem: snapshot.val().keyOfWantedItem ,  
                    itemkey: snapshot.key ,
                    offerKey: snapshot.val().offerKey,
                    uidOfLikedItem: snapshot.val().uidOfLikedItem,
                    uidOfOfferingUser: snapshot.val().uidOfOfferingUser,
                    picOfOfferedItem:picOfOfferedItem,
                    picOfWantedItem:picOfWantedItem,
                    lastMessage:lastMessage,
                    username:ChatUsername,
                  }
              piclinks.push(iteminfo);

                var ds = self.state.dataSource.cloneWithRows(piclinks);
                            i++;
                            if(i==num && self._mounted)
                            self.setState({dataSource: ds
                           //   loading:false
                            });
              });
              }
              else {
                var ds = self.state.dataSource.cloneWithRows(piclinks);
                            i++;
                            if(i==num && self._mounted)
                            self.setState({dataSource: ds
                            });
                   }
              });
          });
})
});
 return piclinks;
}); 
}
_setModalVisible = (visible,picOfOfferedItem,picOfWantedItem,newRef,snapVal,oldRef) => {
  if (newRef){
    newRef.set( snapVal, function(error) {
      if( !error ) {  oldRef.remove(); }
      else if( typeof(console) !== 'undefined' && console.error ) {  console.error(error); }
    });
  }
  if (this._mounted){
    this.setState({modalVisible: visible ,picOfOfferedItem:picOfOfferedItem , picOfWantedItem:picOfWantedItem });
  }
}
render() {
  return (
    <View style = {styles.container}>  
     <ListView
        enableEmptySections={true}
        dataSource={this.state.dataSource}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator}/>}
        renderRow={this.renderItem.bind(this)}
        contentContainerStyle={{flex:1,paddingTop:20 ,backgroundColor:'white',}}/>
  
</View>

);
}
}
export default AcceptedOffers;