import React, { Component } from 'react';
import { Text, View, Image, ScrollView, TextInput, Button, TouchableOpacity, FlatList, ActivityIndicator, StatusBar, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
//import { auth } from 'firebase-admin';


export default class ListProduct extends Component {
    state = {

        isLoading: true,
        error: null,
        x: [],
        isURLloading: true

    };
    auth=auth;
    name = 'tas'
    ORDER = [];
    componentDidMount() {

        this.OrderListMerchant()
    }
    async OrderListMerchant() {

       
     //   ip = '192.168.1.7';
        let x = await fetch(ip + '/getProductListMerchant', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({cat : global.userid})
      }).then((response) => response.json())
      .then((responseJson) => {
        this.PRODUCT=responseJson;
        this.setState({ isLoading: false });
          console.log(responseJson);
       
         
      })
      .catch((error) => {
          console.log(error.message);
      });

    }
    timestampToDate(timestamp) {
        var datedate = new Date(timestamp);
        return datedate.toLocaleString();




    }
    render() {
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

         
            <View style={{flex:1}}>
           
            <ScrollView>
            <FlatList
                            data={this.PRODUCT}
                            keyExtractor={(item, index) => item.id}
                            numColumns={1}
                            renderItem={({ item }) => (
                                <View><TouchableOpacity onPress={() => Actions.DetailPage({ item })} >
                                    <View style={{ marginTop: 10, marginHorizontal: 10, height: 30, backgroundColor: "#daffc2", borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                                        <Text style={{ textAlign: "center", marginTop: 5 }}>{item.merchant}</Text>
                                    </View>
                                    <View style={{ marginHorizontal: 10, backgroundColor: "#f5f6f7", flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 1, borderColor: "grey" }}>
                                        <Text style={{ fontWeight: "bold", fontSize: 12, marginHorizontal: 20, marginVertical: 5 }}>INV/2019002/001</Text>
                                        <Text style={{ color: "grey", fontSize: 11, marginHorizontal: 20, marginVertical: 5 }} ></Text>

                                    </View>
                                    <View style={{ borderBottomWidth: 1, borderColor: "grey", marginHorizontal: 10, borderBottomRightRadius: 10, borderBottomLeftRadius: 10 }}>
                                        <View style={{ flexDirection: "row", backgroundColor: "#f5f6f7" }}>
                                            <View style={{ marginTop: 30 }}>
                                                <Image source={{ uri: item.imageURL[0] }} style={{ marginHorizontal: 20, borderRadius: 15, height: 90, width: 85 }}></Image></View>
                                            <View style={{ marginHorizontal: 25, marginVertical: 45 }}>
                                                <Text style={{}}>{item.name} </Text>
                                                <Text style={{ color: "grey", fontSize: 12 }}>{item.quantityproduct} Barang</Text>
                                                <Text style={{ color: "red" }}>Rp.{item.price} </Text>

                                            </View>
                                        </View>
                                    </View></TouchableOpacity></View>
                            )}
                        />
 
            </ScrollView>
          </View>
        )
    }



}

