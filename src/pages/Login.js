import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar ,
  TouchableOpacity
} from 'react-native';

import Logo from '../components/Logo';
import Form from '../components/Form';

import {Actions} from 'react-native-router-flux';
import {
  Alert
} from 'react-native';
export default class Login extends Component {

	register() {
		Actions.RegisterPage();
	}
	resetPassword() {
		Actions.ForgotPasswordPage();
	}
	render() {
    console.log('login.js');
		return(
			<View style={styles.container}>
				<Logo/>
				<Form type="Login"/>
				<View style={styles.signupTextCont}>
					<Text style={styles.signupText}>Don't have an account yet?</Text>
					<TouchableOpacity onPress={this.register}><Text style={styles.signupButton}> Register </Text></TouchableOpacity>
				</View>
        <View style={styles.signupTextCont}>
					<Text style={styles.signupText}>Forgot Your Password ?</Text>
					<TouchableOpacity onPress={this.resetPassword}><Text style={styles.signupButton}> Reset Password </Text></TouchableOpacity>
				</View>
			</View>	
			)
	}
}

const styles = StyleSheet.create({
  container : {
    backgroundColor:'#455a64',
    flex: 1,
    alignItems:'center',
    justifyContent :'center'
  },
  signupTextCont : {
  	flexGrow: 1,
    alignItems:'flex-end',
    justifyContent :'center',
    paddingVertical:16,
    flexDirection:'row'
  },
  signupText: {
  	color:'rgba(255,255,255,0.6)',
  	fontSize:16
  },
  signupButton: {
  	color:'#ffffff',
  	fontSize:16,
  	fontWeight:'500'
  }
});
