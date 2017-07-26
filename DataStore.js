'use strict';
import Reflux from 'reflux';

import AccessToken from 'funshare/AccessToken';
import Actions from 'funshare/Actions';
import ApiRequest from 'funshare/ApiRequest';
import firebase from 'firebase';
let currentUser = null;

export default Reflux.createStore({
  listenables: Actions,
  init: function () {},

  getCurrentUser() {
    

  },

  setCurrentUser(uid, user) {

    firebase.auth().onAuthStateChanged(function(user1) {
      if (user1) {
        currentUserGlobal=user1;
      }
      else {

        alert("login lll");
      }
    });
//currentUser = Object.assign(user);
},

onLogin: function (data) {
//alert("i'm here 1");
ApiRequest.login(data)
.then((result) => {
  result.getToken().then(function(data) {
// alert(result.uid);
AccessToken.set(data)
.then(() => Actions.login.completed(result))

});

})
.catch((err) => Actions.login.failed(err))
},
onLoginCompleted: function (data) {
  Actions.loadUser(data.uid);
},
onLoginFailed: function (error) {
//console.log("Login failed with error: ", error.message);
},

onSignup: function (data) {
  ApiRequest.signup(data)
  .then((userData) => Actions.signup.completed(data, userData))
  .catch((err) => Actions.signup.failed(err));
},
onSignupCompleted: function (data, user) {
  Actions.login(data);
},
onSignupFailed: function (error) {
  console.error("Signup failed with error", error.message);
},

onLoadUser: function (userId) {
  ApiRequest.loadUser(userId)
  .then((user) => Actions.loadUser.completed(userId, user))
  .catch((err) => Actions.loadUser.failed(err));
},
onLoadUserCompleted: function (uid, user) {

  this.setCurrentUser(uid, user);
},
onLoadUserFailed: function (error) {
  console.error("Loading user failed with error: ", error.message);
},

onLogout: function () {
  ApiRequest.logout();
  AccessToken.clear();
},
onOnboard: function (payload) {

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
//   alert("datastore");
// alert(payload);
ApiRequest.updateUser(user.uid, payload)
.then((user) => Actions.onboard.completed(user))
.catch((err) => Actions.onboard.failed(err))

}
});

},
onUploadPost: function (image) {


  ApiRequest.uploadPost(this.getCurrentUser().uid,{
    userId: this.getCurrentUser().uid,
    user: this.getCurrentUser().displayName,
    picture: image,
    createdAt: new Date().toString(),

  })
  .then((data) => Actions.uploadPost.completed(data))
  .catch((err) => Actions.uploadPost.failed(err));







/*    firebase.auth().onAuthStateChanged(function(user) {
if (user) {
ApiRequest.uploadPost(user.uid,{
userId: user.uid,
user: this.getCurrentUser().displayName,
picture: image,
createdAt: new Date().toString(),

})
.then((data) => Actions.uploadPost.completed(data))
.catch((err) => Actions.uploadPost.failed(err));


}
});*/

}
});