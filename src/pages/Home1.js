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
  BackAndroid,
  Platform,
  Text
} from 'react-native';
import IcoButton from 'funshare/src/components/icobutton';
import StyleVars from 'funshare/StyleVars';
import Login from './login';
import firebase from 'firebase';
import Routes from 'funshare/Routes';
import DataStore from 'funshare/DataStore';
import Actions from 'funshare/Actions';
import SharedStyles from 'funshare/SharedStyles';
import RNFetchBlob from 'react-native-fetch-blob'
import IconButton from 'funshare/src/components/icotextButton';
import ImagePicker from 'react-native-image-crop-picker';
const fs = RNFetchBlob.fs
const Blob = RNFetchBlob.polyfill.Blob
const polyfill = RNFetchBlob.polyfill
window.XMLHttpRequest = polyfill.XMLHttpRequest
window.Blob = polyfill.Blob
var deviceWidth = Dimensions.get('window').width -6;
var deviceheight = Dimensions.get('window').height  ;
const dirs = RNFetchBlob.fs.dirs
const prefix = ((Platform.OS === 'android') ? 'file://' : '')
const testImageName = `image-from-react-native-${Platform.OS}-${new Date()}.png`
var testFile = null;
const styles = StyleSheet.create({

  inputContainer: {
    flex:1,
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
    marginTop:10,
    textAlign: 'center',
    fontSize: 23,
    fontWeight: 'bold',
  },
  imageContainer:{  

    marginTop: 25,
    flex:0.3,
  },
  profilePictureContainer: {

    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center"
  },


  profilePicture: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 5,

  },



  buttongrop: {
    flex:1,
    justifyContent:'center',


  },


});

class Home1 extends React.Component {
  constructor(props) {
    super(props);
    this.exit = this.exit.bind(this);
    var currentUser = currentUserGlobal;
    this.state = {
      profilePicture:{uri:currentUser.photoURL} ,
      picdata:{uri:currentUser.photoURL},
      dummypic:{uri:currentUser.photoURL},
      username:currentUser.displayName   
    };
  }

  componentWillUnmount () {
    this._mounted = false;
    }


  exit(){
    BackAndroid.exitApp();   
  }
  componentWillMount() {
  var selfx = this;
    //Actions.auth();
    Actions.onboard.started.listen(this.onOnboardStarted.bind(this));
    Actions.onboard.completed.listen(this.onOnboardCompleted.bind(this));
    firebase.auth().onAuthStateChanged(function(user) {
      var save = this;
      if (user) {
        currentUserGlobal=user;
        var NotifRef = firebase.database().ref('Notifications/' + currentUserGlobal.uid+'/Unseen/');
        NotifRef.once("value")
        .then(function(snapshot) {
          var unseenNotifNumber = snapshot.numChildren(); 
          var unseenNotifNumberGlobal = snapshot.numChildren(); 
          //console.log("unseenNotifNumber",unseenNotifNumber,unseenNotifNumberGlobal);

        });
        NotifRef.on('child_added', function(data) {
          //console.log(data.val());
          NotifRef.once("value")
          .then(function(snapshot) {
            var unseenNotifNumber = snapshot.numChildren(); 
            var unseenNotifNumberGlobal = snapshot.numChildren(); 
            //console.log("unseenNotifNumber",unseenNotifNumber,unseenNotifNumberGlobal);

          });
        });
    var PendingRef = firebase.database().ref('Notifications/' + currentUserGlobal.uid+'/Pending/');
        PendingRef.once("value")
        .then(function(snapshot) {
          var PendingNotifNumber = snapshot.numChildren(); 
          var PendingNotifNumberGlobal = snapshot.numChildren(); 
          //console.log("unseenNotifNumber",unseenNotifNumber,unseenNotifNumberGlobal);

        });
        PendingRef.on('child_added', function(data) {
          //console.log(data.val());
          PendingRef.once("value")
          .then(function(snapshot) {
            var PendingNotifNumber = snapshot.numChildren(); 
            var PendingNotifNumberGlobal = snapshot.numChildren(); 
            //console.log("unseenNotifNumber",unseenNotifNumber,unseenNotifNumberGlobal);

          });
        });
    var AcceptedRef = firebase.database().ref('Notifications/' + currentUserGlobal.uid+'/Accepted/');
        AcceptedRef.once("value")
        .then(function(snapshot) {
          var AcceptedNotifNumberGlobal = snapshot.numChildren(); 

        });
        AcceptedRef.on('child_added', function(data) {
          //console.log(data.val());
          AcceptedRef.once("value")
          .then(function(snapshot) {
            var AcceptedNotifNumberGlobal = snapshot.numChildren(); 
          });
        });
}
else {
  selfx.logout();
}
});
  }

  componentDidMount() {
    this._mounted = true;
     //Actions.loadUser.completed.listen(this._onLoadUserCompleted.bind(this));
    Actions.logout.listen(this._onLogout.bind(this));
     var self=this;
  BackAndroid.addEventListener('hardwareBackPress', () => {
// console.log("did",currentUserGlobal);
self.exit();
return true;

});



  }

  goToHome()
  {
    this.props.replaceRoute(Routes.Home());
  }
  goToWish()
  {
    this.props.replaceRoute(Routes.wishlist());
  }
  goToPendingOffers()
  {
    this.props.replaceRoute(Routes.PendingOffers());
  }
  render() {
    const TopNavigation = () => (
      <View style={{ padding: 10, flexDirection: 'row', backgroundColor: '#FF5C7E' }}>
      <View style={{ flex:0.4 , justifyContent:'center' , margin:5  }}>



      </View>

      <View style={{ flex:0.2 , alignItems:'center', justifyContent:'center'   }}>
      <Image
      source={require('funshare/src/img/f.png')}
      style={{width:45, height:45}}
      />
      </View>

      <View style={{ flex:0.4 , alignItems:'flex-end', justifyContent:'center' , margin:5  }}>
      <IcoButton
      source={require('funshare/src/img/swop.png')}
      onPress={this.goToHome.bind(this)}
      icostyle={{width:35, height:35}}
      />

      </View>

      </View>
      );
    return (

      <View style={{  flex:1, backgroundColor:'white',   }}>
      <TopNavigation/>  



      <View style={styles.imageContainer}>

      <View
      style={styles.profilePictureContainer}
      >
       
      <View style = {styles.profilePicture}>

        <Image
        source={this.state.dummypic}
        style={styles.profilePicture}
        >

        </Image>

         <TouchableOpacity
          style = {{ flex:1, width:28,height:28,borderRadius:14, backgroundColor: '#FF5C7E',position: 'absolute',alignItems:'center',justifyContent:'center', bottom:5 , right:5}}
          onPress={this.uploadphoto.bind(this)}
        >
        <Image source={require('../img/edit.png')}

        style={{width:18,height:18}}/>
        </TouchableOpacity>
      </View>
   
     
      </View>
      <View>
      <Text
      style={styles.username}
      >{this.state.username}</Text>
      </View>
      </View>



      <View style= {{flex:0.3,marginTop:30,alignItems:'center' , }}>
      <View style = {styles.buttongrop} >

    
      <IconButton     
      container={{flex:1}}
      withoutlike={true}
      value={"Meine Objekte"}
      source={require('../img/box.png')}
      icostyle={{ width:30,
        height: 30,
        marginLeft:3}}
        onPress={this.goTomysuff.bind(this)}
        />

        <IconButton
        container={{  flex: 1 ,flexDirection: "row" }}
        withoutlike={true}
        value={"Einstellungen"}
        source={require('../img/tools.png')}
        onPress={this.goToSetting.bind(this)}
        />

     
     
        <IconButton
        container={{  flex: 1 , flexDirection: "row" }}
        withoutlike={true}
        value={"Wunschliste"}
        source={require('../img/wunsch.png')}
        onPress={this.goToWish.bind(this)}
        />

       
 

      
        </View>
        </View>

        <View style = {{flex:0.1,marginBottom:10,justifyContent:'flex-end',  alignItems:'center'}}>

        <Image

        source={require('../img/ifunshare.png')}
        style={{height:50, width:170 }}

        />

        </View>

        </View>

        );
      }
      uploadphoto() {
          var self =this;
          ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
         
         self.prepare1(image.path);
        
        }).catch(e => {
          alert(e);
        });;
      }

      addstuff() {

        this.props.replaceRoute(Routes.addstuff());

      }

      goTomysuff() {

        this.props.replaceRoute(Routes.mystuff());

      }
      goToAcceptedOffers() {

        this.props.replaceRoute(Routes.AcceptedOffers());

      }

      goToSetting() {

        this.props.replaceRoute(Routes.setting());

      }
      upload() {         
        let rnfbURI = RNFetchBlob.wrap(this.state.profilePicture)
//alert(rnfbURI);
// create Blob from file path
//alert(this.state.profilePicture);
Blob.build(rnfbURI, { type : 'image/jpeg;'})
.then((blob) => {
// upload image using Firebase SDK
// alert("st");
var  uploadTask = firebase.storage()
.ref('users profile photos')

.child(testImageNamesakka)
.put(blob, { contentType : 'image/png' });
uploadTask.on('state_changed', function(snapshot){
// Observe state change events such as progress, pause, and resume
// See below for more detail
}, function(error) {
  alert(error);
}, function() {
  alert("successful");
// Handle successful uploads on complete
// For instance, get the download URL: https://firebasestorage.googleapis.com/...
var downloadURL = uploadTask.snapshot.downloadURL;
});


})
}
_onLoadUserCompleted(user) {
 
}

_onLogout() {
  this.props.replaceRoute(Routes.login());
}
logout(){
  firebase.auth().signOut().then(function() {
    alert("Sign-out successful");
  }, function(error) {
    alert("Sign-out failed");
  });
  this.props.replaceRoute(Routes.login());

//Actions.logout();

}
onOnboardStarted(url) {


  Actions.onboard(url);
}

onOnboardCompleted() {
if(this._mounted){
 var image ={uri:currentUserGlobal.photoURL}
 this.setState({dummypic:image});
}
}
prepare1(File){       
var self = this;
// prepare upload image
RNFetchBlob
.config({ fileCache : true, appendExt : 'png' })
.fetch('GET', 'https://avatars0.githubusercontent.com/u/5063785?v=3&s=460')
.then((resp) => {
  testFile =File;
// alert(testFile);
self.upload1();
})
}
upload1(){  
  let rnfbURI = RNFetchBlob.wrap(testFile)
// create Blob from file path
//alert(rnfbURI);
Blob
.build(rnfbURI, { type : 'image/jpeg;'})
.then((blob) => {
// upload image using Firebase SDK
var uploadTask = firebase.storage()
.ref('profiles')
.child('uid')
.child(testImageName);
uploadTask.put(blob, { contentType : 'image/png' })
.then((snapshot) => {
  uploadTask.getDownloadURL().then(function(url) {

//alert(scc);
Actions.onboard.started(url);


}).catch(function(error) {
  alert(error)
});
})
})


}



}


export default Home1;