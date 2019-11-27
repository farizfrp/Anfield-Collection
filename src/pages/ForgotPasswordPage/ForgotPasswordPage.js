import React, { Component } from 'react';
import { Text, View, Image, ScrollView, TextInput, Button ,StyleSheet,Alert} from 'react-native';
import firebase from 'react-native-firebase';
import {Actions} from 'react-native-router-flux';

state = {
    email: '',
    }
 
   
export default class ForgotPasswordPage extends Component {

    onReset(){

        
        
        firebase.auth().sendPasswordResetEmail(this.state.email).then(function() {
            Actions.login();  Alert.alert('Link Reset Password Sudah Dikirim ,Cek Email Anda . ..');
           
          // Email sent.
        }).catch(function(error) {
            Alert(error);
        });
       

    }
    render(){
     return (
        <View style={{ flex: 1 }}>

            <View style={{ flex: 1, backgroundColor: "white" }}>
                <View style={styles.borderContainer}>
                    <View style={{ marginHorizontal:30,marginVertical:30 }}>
                        <Text style={{ fontSize: 25 }}>Reset            </Text>
                        <Text style={{color:"grey"}}>Type Your Email Address </Text>
                        <View style={{marginVertical:10}}></View>

                    </View>
                    <View style={{ marginHorizontal: 30}}>
                        <Text>Email</Text>
                        <TextInput onChangeText={(email) => this.setState({email})}placeholder="haha@example.com" style={ styles.TextInputStyles} />
                    </View>
                  
                   
              <View style={{ marginHorizontal: 35,borderRadius:20,marginVertical:10}}>
              <Button
          title="Reset"
          color="red"
          onPress={() => this.onReset()}
        />
              </View>
                </View>

            </View>

        </View>
    )
}}
const styles = StyleSheet.create({
    borderContainer: {
        borderWidth:2,
        borderRadius:20,
        borderColor: "red",
        height: 500, 
        marginHorizontal: 40,
        marginTop:30
    },
TextInputStyles : {
    borderBottomWidth: 2, 
    borderColor: "red" 
}
});
