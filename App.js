

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  StatusBar 
} from 'react-native';
//import firebase from 'react-native-firebase';

import Routes from './src/Routes';
import {AsyncStorage} from 'react-native';
import { Actions } from 'react-native-router-flux';

console.disableYellowBox= true;

ip='192.168.0.20';






export default class App extends Component {
  async  setAuth(){
    var result = await AsyncStorage.getItem('auth');
  global.userid= result.id;
  
  }
  constructor(){
 
    super();
   // global.userid ="EtYgk5SAmBe63ERd1WveRJZ299C2";
    // Creating Global Variable.
    this.setAuth();
  }
 
async setAuth(){
  console.log("setAuth")
  var result = JSON.parse(await AsyncStorage.getItem('auth'));
  
  global.userid = result.auth.id;
  global.cartChanged = false;

}
async componentDidMount(){

this.setAuth();

}
 
  render() {
 


    return (
      <View style={styles.container}>
        <StatusBar
           backgroundColor="#1c313a"
           barStyle="light-content"
         />
        <Routes/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
  }
});
