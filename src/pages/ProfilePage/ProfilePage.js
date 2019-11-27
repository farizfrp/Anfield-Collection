import React, { Component } from 'react';
import { Text, View, Image, ScrollView, TextInput, Button,TouchableOpacity , TouchableHighlight,StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';


export default class EditProfilePage extends Component {
    userId=global.userid;
    profile={
        username:null,
        email:'default@default.com',
        address:[],
        imageURL:'https://cnam.ca/wp-content/uploads/2018/06/default-profile.gif',
        birthday:null,
        phone:null,
        gender:null
    };
    state={
        profile:this.profile
    }
    componentDidMount() {

        this.getProfile();
                }
    async getProfile() {

        console.log('getProductCat');
        
     //   ip = '192.168.1.7';
        let x = await fetch('http://' + ip + ':3001/getProfile', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({userId : this.userId})
      }).then((response) => response.json())
      .then((responseJson) => {
        profile=responseJson;
        this.setState({ profile});
      
          console.log(responseJson);
       
         
      })
      .catch((error) => {
          console.log(error.message);
      });

    }
    render(){
        return (
            <View style={{ flex: 1 }}>
    
                <View style={{ flex: 1, backgroundColor: "white", }}>
                <ScrollView>
          
    <Avatar
      size="large"
      rounded
      source={{
        uri:
         this.state.profile.imageURL,
      }}
     
      activeOpacity={0.7}
      containerStyle={{marginHorizontal:30,marginVertical:30}}
    />
    
        <Text style={{marginHorizontal:120,marginVertical:-90,fontSize:15}}>{this.state.profile.username}</Text>
    
    
        <View style={{ marginHorizontal: 30,paddingTop:140}}>
                            <Text>Nama Lengkap</Text>
                            <TextInput
                           editable={false}
                            defaultValue={this.state.profile.username} 
                            style={ styles.TextInputStyles} />
    
                        </View>
                        <View style={{ marginHorizontal: 30,paddingTop:15}}>
                           
                         
            <View style={{ marginHorizontal: 30,paddingTop:15}}>
                            <Text>Tanggal Lahir</Text>
                            <TextInput editable={false}
                            defaultValue={new Date(this.state.profile.birthday) .toLocaleDateString()} 
                            style={ styles.TextInputStyles} />
           
                        </View>
                        <View style={{ marginHorizontal: 30,paddingTop:15}}>
                            <Text>Jenis kelamin</Text>
                            <TextInput editable={false}
                            defaultValue={this.state.profile.gender} 
                            placeholder={this.state.profile.gender} style={ styles.TextInputStyles} />
    
                        </View>
                        <View style={{ marginHorizontal: 30,paddingTop:15}}>
                            <Text>Email (belum bisa diubah)</Text>
                            <TextInput editable={false}
                            defaultValue={this.state.profile.email} 
                         style={ styles.TextInputStyles} />
    
                        </View>
                        <View style={{ marginHorizontal: 30,paddingTop:15}}>
                            <Text>No Hp</Text>
                            <TextInput
                            editable={false}
                            defaultValue={this.state.profile.phone} 
                           style={ styles.TextInputStyles} />
    
                        </View>
                        <View style={{ marginHorizontal: 35,borderRadius:20,marginVertical:0}}>
              
              
                  </View>
                   </View>
                        </ScrollView>
    
            
            
                </View>
               
             
                   
            </View>
         )
   }}
   const styles = StyleSheet.create({
    borderContainer: {
        borderWidth:2,
        borderRadius:16,
        borderColor: "red",
        height: 499, 
        marginHorizontal:30,
        marginTop:30,
        marginVertical:30
    },

}); 



