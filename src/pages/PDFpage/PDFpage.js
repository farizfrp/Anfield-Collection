import React, { Component } from 'react';
import { Text, View, Image, ScrollView, TextInput, Button,TouchableOpacity,FlatList,ActivityIndicator,StatusBar, Linking } from 'react-native';
import { Actions } from 'react-native-router-flux';

import {PermissionsAndroid} from 'react-native';
export default class PDFpage extends Component {
    state = {

        isLoading: true,
        error: null,
        x: [],
        isURLloading: true

    };
    async  requestStoragePermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'Cool Photo App Camera Permission',
              message:
                'Cool Photo App needs access to your camera ' +
                'so you can take awesome pictures.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the camera');
          } else {
            console.log('Camera permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    name=this.props.data;
PRODUCT=[];
    componentDidMount() {
      //  this.requestStoragePermission()
      
        console.log('name onSearch ===');
        console.log(this.name);
        this.getProductCat()
    }
    async getProductCat() {

        console.log('SearchPage');
        //console.log(this.props.data);
      //  ip = '192.168.1.7';
        let x = await fetch('http://' + ip + ':3001/getProductName', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({query : this.name})
      }).then((response) => response.json())
      .then((responseJson) => {
        this.PRODUCT=responseJson;
       // this.setState({ isLoading: false });
          console.log(responseJson);
       
         
      })
      .catch((error) => {
          console.log(error.message);
      });

    }
    render(){
        if (this.state.isLoading) {

            console.log('isLoading broo');

            return (<View style={{ flex: 1, padding: 20 }}>
       
                <ActivityIndicator />
                <StatusBar barStyle="dark-content" />
                <View>
                <Text>Hey guys I wanted to share this awesome thing just press
  <Text
    style={{color: 'red'}}
    onPress={() => {Linking.openURL('http://www.example.com/')}}
  >
    here
  </Text>
  to see it in your browser
</Text>
                </View>
            </View>);
        }
    return (
        <View style={{ flex: 1 }}>
        <ScrollView>
            <Image style={{height:300,width:380, resizeMode:"contain",backgroundColor:"grey"}} source={require('../CategoriesPage/eva.png')}></Image>
                    <View style={{ flex: 1, backgroundColor: "white",translateY:-110,borderTopRightRadius: 50,borderTopLeftRadius:50}}>
         
                    <View style={{flexDirection:"row",justifyContent:"center",marginVertical:32,flexWrap:"wrap"}}>
          
          <FlatList 
data={this.PRODUCT}
keyExtractor={(item, index) => item.id }
numColumns={2}
renderItem={({item}) => (   
    <View style={{paddingHorizontal:8}}>
    <TouchableOpacity onPress={()=>Actions.DetailPage({ item })}>
        <Image source={{ uri: item.imageURL[0] }} style={{borderRadius:15,height:145,width:140}}></Image>     
        </TouchableOpacity>
        <Text style={{marginHorizontal:20}}>{item.title}</Text>
        <Text style={{marginHorizontal:20,fontSize:12,color:"grey"}}>{item.name}</Text>
        <Text style={{ marginHorizontal: 20, fontSize: 12, color: "grey" }}>{item.merchant}</Text>
        <Text style={{marginHorizontal:20,fontSize:13,color:"red",fontWeight:"bold"}}>{item.price}</Text>
    </View>
)}
/>
                      
                      
                    </View>
                    
                      </View>
                      </ScrollView>
        </View>
       
    )
}

}