'use strict';
import setting from 'funshare/src/pages/setting';
import search from 'funshare/src/pages/search';
import Home from 'funshare/src/pages/Home';
import Home1 from 'funshare/src/pages/Home1';
import login from 'funshare/src/pages/login';
import signup from 'funshare/src/pages/signup';
import account from 'funshare/src/pages/account';
import button from 'funshare/src/components/button';
import Onboarding from 'funshare/Screens/Onboarding';
import details from 'funshare/src/pages/details';
import fuck from 'funshare/src/pages/fuck';
import addstuff from 'funshare/src/pages/addstuff';
import mystuff from 'funshare/src/pages/mystuff';
import searchresult from 'funshare/src/pages/searchresult';
import wishlist from 'funshare/src/pages/wishlist'; 
import chatscreen from 'funshare/src/pages/chatscreen';
import AcceptedOffers from 'funshare/src/pages/AcceptedOffers';
import PendingOffers from 'funshare/src/pages/PendingOffers';
import OfferChat from 'funshare/src/pages/OfferChat';
import Tinder from 'funshare/Tinder';
import ModalExample from 'funshare/src/pages/ModalExample';



class Routes {
  get(route, args) {
    if ("undefined" == typeof this[route]) {
      console.warn("No route found with name: " + route);
      return false;
    } else {
      return this[route].call(this, args);
    }
  }


  login() {
    return {
      name: "login",
      title: "login",
      component: login,
      leftButton: button,
      rightButton: button,
      hideNavigationBar: true,
      statusBarStyle: "light-content"
    }
  }
  chatscreen(tab) {
    return {
      name: "chatscreen",
      passProps: {tab:tab},
      component: chatscreen,
 
    }
  }
    AcceptedOffers() {
    return {
      name: "AcceptedOffers",
      
      component: AcceptedOffers,
 
    }
  }
  Home(category , search ,Startsearch) {
    return {
      name: "Home",      
      component: Home,
      passProps: { category: category , search: search , Startsearch:Startsearch },
 
    }
  }

  signup() {
    return {
      name: "signup",
 
      component: signup,
      hideNavigationBar: true,
 
    }
  }
  ModalExample(info) {
    return {
      name: "ModalExample",
      component: ModalExample,
      passProps: { info:info },
    }
  }


  setting() {
    return {
      name: "setting",
      component: setting,
    }
  }
  account() {
    return {
      name: "account",     
      component: account,     
    }
  }
  wishlist() {
    return {
      name: "wishlist",
      component: wishlist,
  
    }
  }
  PendingOffers() {
    return {
      name: "PendingOffers",
      component: PendingOffers,
    }
  }
  onboarding(user) {
    return {
      name: "onboarding",
      title: "Welcome",
      component: Onboarding,
      passProps: { user: user },
      statusBarStyle: "light-content"
    }
  }

  Home1(user) {
    return {
      name: "Home1",  
      component: Home1,
      passProps: { user: user },    
 
    }
  }
  
  details(info) {
    return {
      name: "details",
 
      component: details,
      passProps: { info:info },
 
    }
  }
  Tinder() {
    return {
      name: "Tinder",
      component: Tinder,
 
    }
  }
  fuck(iteminfo ) {
    return {
      name: "fuck", 
      component: fuck,  
      passProps: {  iteminfo: iteminfo},
    }
  }
  mystuff() {
    return {
      name: "mystuff",
      component: mystuff,     
    }
  } 
    searchresult(searchItems) {
    return {
      name: "searchresult",
      component: searchresult,
      passProps: {searchMatches: searchItems}     
    }
  }
  OfferChat(iteminfo) {
    return {
      name: "OfferChat",
      component: OfferChat,  
      passProps: {  iteminfo: iteminfo},   
    }
  } 
  addstuff() {
    return {
      name: "addstuff",
      component: addstuff,
    }
  }
  search() {
    return {
      name: "search",
      component: search,
    }
  }
  
  
}

export default new Routes()
