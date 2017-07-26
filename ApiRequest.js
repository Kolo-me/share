'use strict';
import firebase from 'firebase';
class ApiRequest {


  signup(data) {
    return new Promise((next, error) => {
      this.firebase.createUser(data)
      .then((authData) => {
        let userRef = this.firebase.child('profiles').child(authData.uid);
        userRef.set({ email: data.email })
        .then(() => next(data))
        .catch((err) => error(err));
      })
      .catch((err) => error(err));
    });
  }

  login(data) {
    return new Promise((next, error) => {

      firebase.auth().signInWithEmailAndPassword(
       data.email,
       data.password
       ).then(function(result) {
         next(result);

       }, function(error) {
        alert("Sign-in failed");
      });

     });
  }


  logout() {
  	firebase.auth().signOut().then(function() {
  		alert("Sign-out successful");
  	}, function(error) {
  		alert("Sign-out failed");
  	});
  }

  loadUser(uid) {
    return new Promise((next, error) => {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {

              
            next(user);
         } 
        else {
       
        }
    });
      firebase.database().ref('profiles/' + uid ).on('value', function(snapshot) {

      });
      firebase.database().ref().child('profiles').child(uid).once('value')
      .then((snapshot) => next(snapshot.val()))
      .catch((err) => error(err));
    });
  }
  updateUser(uid, payload) {
     
    return new Promise((next, error) => {
    var user = firebase.auth().currentUser;
    user.updateProfile({
      photoURL: payload
    }).then(function() {
     next(payload);
    }, function(error) {
    });   
    });      
  }
   


}

export default new ApiRequest();
