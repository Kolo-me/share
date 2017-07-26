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
  Text,
  BackAndroid,
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
import AcceptedOffers from 'funshare/src/pages/AcceptedOffers';

var piclinks=[];

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
    flex:1,
    alignSelf: 'flex-end',
    width: Dimensions.get("window").width-100,

  },


  item: {


    flex:1,
    marginBottom:5,

  },

  container: {
    flex:1,
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
    flex:1,
    height:60,
    width:60,
    borderRadius:30
  }
});

class PendingOffers extends React.Component {
  componentDidMount() {
    this._mounted = true;
    var self=this;
    self.renderRow(); 
    var ref = firebase.database()
          .ref('Notifications')
          .child(currentUserGlobal.uid)
          .child('Pending');
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
          .child('Unseen');
      ref.off('child_removed');
      ref.off('child_added');
  }
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      animationType: 'fade',
      modalVisible: false,
      transparent: true,
      picOfWantedItem:null,
      picOfOfferedItem:null,
      uidOfOfferingUser:null,
      uidOfLikedItem:null,
      newRef:null,
      childKey:null,
      keyOfOfferedItem:null,
      keyOfWantedItem:null,
      snapVal:null,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }) 
    };
  }


  finishDeal(childKey,uidOfOfferingUser,snapVal,oldRef,uidOfLikedItem,keyOfWantedItem,keyOfOfferedItem){
    var self=this;
    //send a notification that lets the other user know that his offer was accepted and activate chat 
    var newRefForOfferingUser=firebase.database()
    .ref('Notifications')
    .child(uidOfOfferingUser)
    .child('Accepted').child(childKey);
    var newRefForLikedItem=firebase.database()
    .ref('Notifications')
    .child(uidOfLikedItem)
    .child('Accepted').child(childKey);
    var PopupRefForOfferingUser=firebase.database()
    .ref('Notifications')
    .child(uidOfOfferingUser)
    .child('Popup').child(childKey);
    var PopupRefForLikedItem=firebase.database()
    .ref('Notifications')
    .child(uidOfLikedItem)
    .child('Popup').child(childKey);
    var oldRefForOfferingUser=firebase.database()
    .ref('Notifications')
    .child(uidOfOfferingUser)
    .child('Pending').child(childKey);
    newRefForOfferingUser.set( snapVal, function(error) {
      if( !error ) {   }
        else if( typeof(console) !== 'undefined' && console.error ) {  console.error(error); }
    }).then(function(){
      newRefForLikedItem.set( snapVal, function(error) {
        if( !error ) {oldRefForOfferingUser.remove();   }
        else if( typeof(console) !== 'undefined' && console.error ) {  console.error(error); }
      }).then(function(){
      PopupRefForOfferingUser.set( snapVal, function(error) {
        if( !error ) {   }
        else if( typeof(console) !== 'undefined' && console.error ) {  console.error(error); }
      }).then(function(){
      PopupRefForLikedItem.set( snapVal, function(error) {
        if ( !error ) {
         /* firebase.database()
          .ref('items').child(uidOfLikedItem).child(keyOfWantedItem).remove().then(function(){
          });
          firebase.database()
          .ref('items').child(uidOfOfferingUser).child(keyOfOfferedItem).remove().then(function(){
          });
          firebase.database()
          .ref('categories').child(self.state.icategory).child(keyOfWantedItem).remove().then(function(){           
          });
          firebase.database()
          .ref('categories').child(self.state.icategory).child(keyOfOfferedItem).remove().then(function(){
          });
          */
          firebase.database()
          .ref('categories').child('swiper-all').child(keyOfWantedItem).remove().then(function(){
          });
          firebase.database()
          .ref('categories').child('swiper-all').child(keyOfOfferedItem).remove().then(function(){
          });
        }
        else if( typeof(console) !== 'undefined' && console.error ) {  console.error(error); }
      }).then(function(){
        alert("Now You can chat");
        self.back();
        });
      });
    });
  });
}

renderRow() {
  if (this._mounted){    
    /*this.setState({
      loading: true
    });
    */
  var images= [];
  return new Promise((next, error) => {

    var self = this; 
    var i = 0;
    var num=0;
    var checker1=0;
    var checker2=0;
    var uid = firebase.auth().currentUser.uid;
    firebase.database()
    .ref('Notifications')
    .child(uid)
    .child('Pending')
    .once('value')
    .then(function(snapshot) {
      num =snapshot.numChildren();
          if(num == 0)
        {
           /*self.setState({
     
              loading:false
            });
            */
            
        }
      snapshot.forEach(function(childSnapshot) {
        var picOfWantedItem= "h";
        var picOfOfferedItem="h";
        var childKey = childSnapshot.key;
        var oldRef=firebase.database()
        .ref('Notifications')
        .child(uid)
        .child('Pending').child(childSnapshot.key);
        var newRef=firebase.database()
        .ref('Notifications')
        .child(uid)
        .child('Seen').child(childSnapshot.key);

        var snapVal=null;
        firebase.database()
        .ref('Notifications')
        .child(uid)
        .child('Pending').child(childSnapshot.key).once('value').then(function(snapshot) {
          snapVal=snapshot.val();
          firebase.database().ref('items').child(snapshot.val().uidOfOfferingUser)
          .child(snapshot.val().keyOfOfferedItem).once('value').then(function(snapshot1){

          if (snapshot1.val())
          {
            picOfOfferedItem= snapshot1.val().itemPic;
            checker1=1;
          }
            else{
                  checker1=0;
                  firebase.database()
                  .ref('Offers').child(snapshot.val().uidOfOfferingUser).child(snapshot.val().offerKey).remove().then(function(){
                  
                  });
                     firebase.database()
                    .ref('Notifications')
                    .child(uid)
                    .child('Pending').child(childKey).remove().then(function(){});
                  
                }
            //console.log(snapshot1);
          }).then(function(){
             if (checker1)
                {
                  firebase.database().ref('items').child(snapshot.val().uidOfLikedItem)
                  .child(snapshot.val().keyOfWantedItem).once('value').then(function(snapshot2){
                    if (snapshot2.val()){
                      picOfWantedItem= snapshot2.val().itemPic;
                      checker2=1;
                    }
                    else {

                      checker2=0;
                      firebase.database()
                      .ref('Offers').child(snapshot.val().uidOfOfferingUser).child(snapshot.val().offerKey).remove().then(function(){
                       
                      });
                    firebase.database()
                    .ref('Notifications')
                    .child(uid)
                    .child('Pending').child(childKey).remove().then(function(){});

                    }
                    //console.log(snapshot2);
                    
                  }).then(function(){
                    
                    if (checker2)
                    {
                      var iteminfo = {
                      created: snapshot.val().created ,
                      keyOfOfferedItem: snapshot.val().keyOfOfferedItem ,
                      keyOfWantedItem: snapshot.val().keyOfWantedItem ,  
                      itemkey: snapshot.key ,
                      offerKey: snapshot.val().offerKey,
                      uidOfLikedItem: snapshot.val().uidOfLikedItem,
                      uidOfOfferingUser: snapshot.val().uidOfOfferingUser,
                      picOfOfferedItem:picOfOfferedItem,
                      picOfWantedItem:picOfWantedItem
                    }

                    //console.log(iteminfo);
  
      piclinks.push(iteminfo);
      images.push(

        <View key= {iteminfo} style={{flex:1}}>

        <View style = {{paddingTop:8, paddingBottom:12, paddingLeft:20, flexDirection:'row' ,backgroundColor:'white'}} >

        <View style = {{flex:0.6 , flexDirection:'row', justifyContent:'flex-start' , alignItems:'center'}}>
       <View style = {{height:60,
    width: 60,
    borderRadius: 30}}>
        <Image
        style={{
          height:60,
          width:60,
          borderRadius:30}}
        source={{uri:picOfWantedItem}}
        /> 
        </View>
        <Image
        style={{height:30 , width : 30 , margin:10}}
        source={require('funshare/src/img/sam.png')}
        /> 
          <View style = {{height:60,
    width: 60,
    borderRadius: 30}}>
        <Image
        style={{
          height:60,
          width:60,
          borderRadius:30}}
        source={{uri:picOfOfferedItem}}
        /> 
        </View>
        </View>

        <View style = {{flex:0.4 , flexDirection:'row', justifyContent:'center'}}>
        <TouchableOpacity
        style = {{flex:0.5 , justifyContent:'center' , alignItems:'center'}}
        onPress={self.remove.bind(self,childKey)}
      >
      <View style= {{flex:1  , alignItems:'center',justifyContent:'center'}}>
      <Image
      style={{height:40 , width:40}}
      source={require('funshare/src/img/dislike.png')}
      /> 
      </View>
      </TouchableOpacity>
      <TouchableOpacity
      style = {{flex:0.5 , justifyContent:'center' , alignItems:'center'}}
      onPress={self._setModalVisible.bind(self, true,picOfOfferedItem,picOfWantedItem,newRef,snapVal,oldRef,snapshot.val().uidOfOfferingUser,
        childKey,snapshot.val().uidOfLikedItem,snapshot.val().keyOfWantedItem,snapshot.val().keyOfOfferedItem)}
      >
      <View style = {{flex:1 , alignItems:'center',justifyContent:'center'}} >
      <Image
      style={{height:40 , width:40}}
      source={require('funshare/src/img/like.png')}
      /> 
      </View>
      </TouchableOpacity>
      </View>
      </View>
      </View>

      );
      }
       i++;
      if (i==num ){
        self.setState({
          dataSource: self.state.dataSource.cloneWithRows(images)
          //loading:false
        });
        next(images);
      }
      });

                }
    else {

       i++;

      if (i==num){
        self.setState({
          dataSource: self.state.dataSource.cloneWithRows(images)
         // loading:false
        }); 
        next(images);
      }       
    }
});
});

})


});

}); 
 }
}
goChat(iteminfo){
  this.props.replaceRoute(Routes.OfferChat(iteminfo));
}
_setModalVisible = (visible,picOfOfferedItem,picOfWantedItem,newRef,snapVal,oldRef,uidOfOfferingUser,childKey,uidOfLikedItem,keyOfWantedItem,keyOfOfferedItem ) => {
  var save=this;
  if (save._mounted){   
  save.setState({modalVisible: visible ,picOfOfferedItem:picOfOfferedItem , picOfWantedItem:picOfWantedItem,
  uidOfOfferingUser:uidOfOfferingUser,newRef:newRef,snapVal:snapVal , childKey:childKey,uidOfLikedItem:uidOfLikedItem
  ,keyOfWantedItem:keyOfWantedItem,keyOfOfferedItem:keyOfOfferedItem});
   }
  }

  back ()
    {
      var save=this;
      save.setState({modalVisible:false});
      save.props.goTochattab();
      
    }
  remove(iteminfo){
    var save=this;
    var uid=currentUserGlobal.uid;
    firebase.database()
    .ref('Notifications')
        .child(uid)
        .child('Pending').child(iteminfo).remove().then(function(){
      alert("removed")
    });
}

  render() {
    const TopNavigation = () => (
    <View style={{ padding: 10, flexDirection: 'row', backgroundColor: '#FF5C7E' }}>
    <View style={{ flex:0.4 , justifyContent:'center' , margin:5  }}>  
      <IcoButton

    source={require('funshare/src/img/swop.png')}
    onPress={this.goToHome.bind(this)}
    icostyle={{width:35, height:35}}
    />
    </View>

    <View style={{ flex:0.2 , alignItems:'center', justifyContent:'center'   }}>
    <Image
    resizeMode={Image.resizeMode.contain}
    source={require('funshare/src/img/ichat.png')}
    style={{width:45, height:45}}
    />
    </View>

    <View style={{ flex:0.4 , alignItems:'flex-end', justifyContent:'center' , margin:5  }}>
  

    </View>

    </View>
    );
    return (
    <View style = {{flex:1, backgroundColor:'white',}}> 
    <ScrollView style= {{flex:1}}>
    <Modal
    animationType={this.state.animationType}
    transparent={this.state.transparent}
    visible={this.state.modalVisible}
    onRequestClose={() => {this.setState({modalVisible: false})}}
    >

    <View style={ {flex:1} }>

    <View style= {{ height:deviceheight, backgroundColor:   'rgba(0, 0, 0, 0.9)'}} >
    <View style= {{alignItems:'center'}} >
    <Text style={{color:'white', fontSize:40,fontWeight:'bold',marginTop:25}}>Glückwunsch</Text>
    <Text style={{color:'white', fontSize:30,fontWeight:'bold',marginTop:25}}>it's a Match!</Text>
    </View>

    <View style = {{alignItems:'center' , marginTop:25}}>
    <Image 
    resizeMode={Image.resizeMode.contain}
    source={require('../img/Logo.png')}
    style={{height:40, width:40}}                                
    />

    </View>


    <View style = {{flexDirection:'row',marginTop:30,justifyContent:'center' }}>
    <View style = {{  flex:0.5 ,alignItems:'center' }}>
     <View style = {{  flex:0.5 ,alignItems:'center' }}>
    <View  style={{height:100 , width:100 , borderRadius:50 ,borderWidth:1,borderColor:'white'}} >
   
   <Image  
    source={{uri:this.state.picOfWantedItem}}
     style={{height:98 , width:98 , borderRadius:49 }}                                
   />
     </View>
    </View>
    </View>
    <View style = {{  flex:0.5 ,alignItems:'center' }}>
    <View  style={{height:100 , width:100 , borderRadius:50 ,borderWidth:1,borderColor:'white'}} >
    <Image 
    source={{uri:this.state.picOfOfferedItem}}
    style={{height:98 , width:98 , borderRadius:49 }}                                
    />
    </View>
    </View>
    </View>
    <View style={{position:'absolute', bottom:30 ,flex:1,marginLeft:10,marginRight:10,flexDirection:'row', justifyContent:'center'}}>

    <View style={{flexDirection:'row',flex:0.25  , alignItems:'flex-start'}}>
    <Text style={{color:'white', fontSize:15 ,marginTop:18 }}>Abbrechen</Text>
    </View>

    <View style={{flexDirection:'row',flex:0.25 ,alignItems:'center' }}>
    <IcoButton
    onPress={this.back.bind(this)}
    source={require('funshare/src/img/dislike.png')}
    icostyle={{width:60, height:60}}
    />
    </View>

    <View style={{flexDirection:'row',flex:0.25 ,alignItems:'center'}}>
    <IcoButton
    source={require('funshare/src/img/like.png')}
    onPress={this.finishDeal.bind(this,this.state.childKey,this.state.uidOfOfferingUser,this.state.snapVal,this.state.newRef,
             this.state.uidOfLikedItem,this.state.keyOfWantedItem,this.state.keyOfOfferedItem)}
    icostyle={{width:60, height:60}}
    />
    </View>

   <View style={{flexDirection:'row',flex:0.25  , alignItems:'flex-start'}}>
    <Text style={{color:'white', fontSize:15 ,marginTop:18  }}>Bestätigen</Text>
    </View>



    </View>

    </View>
    </View>
    </Modal>
    <View style= {{flex:1}}>
    <Text style = {{color:'#FF5C7E' ,fontSize:16 }}>  New Matches </Text>
    </View>



    <View style = {{flex:1}}>
    <ListView

    dataSource={this.state.dataSource}
    renderRow={(rowData) => <View style = {{flex:1}} >{rowData}</View>}
    // renderSeparator={() => <View style={styles.separator} />}
    renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
    //renderFooter={(sectionId, rowId) => <View key={rowId} style={{alignSelf: 'center', borderBottomWidth:1 , borderBottomColor:'#dcdcdc', width: Dimensions.get("window").width-40,marginBottom:15,marginTop:15}} />}
    contentContainerStyle={{flex:1,paddingTop:20 ,backgroundColor:'white',}}/>
    </View>







    </ScrollView>
    </View>

    );
  }

}


export default PendingOffers;