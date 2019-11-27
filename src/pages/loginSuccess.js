import React, { Component } from 'react';
import { Text, View } from 'react-native';
import firebase from 'react-native-firebase';
import {Actions} from 'react-native-router-flux';
export default class loginSuccess extends Component {
  render() {
    state = {
        email: '',
            password: '',
            isLoggingIn: false,
            message: ''
        }

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          this.state.email=user.email;
          console.log(this.state.email);
        }});

    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Login Successfull !!!!!</Text>
      </View>
    );
  }
}