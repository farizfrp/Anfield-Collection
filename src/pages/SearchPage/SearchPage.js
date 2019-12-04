import React, { Component } from 'react';
import { Text, View, Image, ScrollView, TextInput, Button,TouchableOpacity,FlatList,ActivityIndicator,StatusBar } from 'react-native';
import { Actions } from 'react-native-router-flux';


export default class SearchPage extends Component {
    state = {

        isLoading: true,
        error: null,
        x: [],
        isURLloading: true

    };
    
    name=this.props.data;
PRODUCT=[];
    componentDidMount() {
        
        this.getProductCat()
    }
    async getProductCat() {

       
      //  ip = '192.168.1.7';
        let x = await fetch(ip + '/getProductName', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({query : this.name})
      }).then((response) => response.json())
      .then((responseJson) => {
        this.PRODUCT=responseJson;
        this.setState({ isLoading: false });
         
       
         
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
                    <Text style={{ fontSize: 20, fontWeight: 'bold', }}>LOADING !!!</Text>
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