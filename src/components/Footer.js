import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Modal,
  Alert,
  TouchableOpacity 
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {AsyncStorage} from 'react-native';
//import MainPage from './pages/MainPage/MainPage';
state = {
  email: '',
      password: '',
      isLoggingIn: false,
      message: ''
  }
 
 


export default class Logo extends Component {

  onLoginSuccess(){

    Actions.MainPage({ email: this.state.email });
  }
  doLogin(){
    console.log('email = ' + this.state.email);
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(function(result) {
      console.log(result.user); 
      if(!result.user.emailVerified){
        return Alert.alert('Email Belum Diverifikasi');
}
var user = { auth:{id:result.user.uid}}

// You only need to define what will be added or updated
let UID123_delta = {
  age: 31,
  traits: {eyes: 'blue', shoe_size: 10},
};
AsyncStorage.setItem('auth', JSON.stringify(user), () => {
    AsyncStorage.getItem('auth', (err, result) => {
      console.log(result);
    });
  
});

      Actions.MainPage({ email: this.state.email });
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error.message);
      return Alert.alert(errorMessage);
      // ...
    });


  }


  onPress(x){
    if(String(x)=='Login') {console.log('logggg');this.doLogin();}
  }

 
render(){
		return(
			<View style={styles.container}>
          <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Email"
              placeholderTextColor = "#ffffff"
              selectionColor="#fff"
              keyboardType="email-address"
              onChangeText={(email) => this.setState({email})}
              onSubmitEditing={()=> this.password.focus()}
              ref={(input) => this.email = input}
              />
          <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor = "#ffffff"
              onChangeText={(password) => this.setState({password})}
              ref={(input) => this.password = input}
              />  
           <TouchableOpacity onPress={() => this.onPress(this.props.type)} style={styles.button}>
             <Text style={styles.buttonText}>{this.props.type}</Text>
           </TouchableOpacity>     
  		</View>
			)
	}
}

const styles = StyleSheet.create({
  container : {
    flexGrow: 1,
    justifyContent:'center',
    alignItems: 'center'
  },

  inputBox: {
    width:300,
    backgroundColor:'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal:16,
    fontSize:16,
    color:'#ffffff',
    marginVertical: 10
  },
  button: {
    width:300,
    backgroundColor:'#1c313a',
     borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 13
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  }
  
});