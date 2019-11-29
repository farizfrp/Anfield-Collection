import React, { Component } from 'react';
import { BackHandler,Text, View, Image, ScrollView, TextInput, Button, TouchableOpacity, FlatList, ActivityIndicator, StatusBar, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';


export default class OrderListPage extends Component {
    state = {

        isLoading: true,
        error: null,
        x: [],
        isURLloading: true

    };
    name = 'tas'
    ORDER = [];
    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            Actions.replace('AccountMenuPage'); // works best when the goBack is async
            return true;
          });
        this.getOrderList()
    }
    componentWillUnmount() {
        this.backHandler.remove();
      }
    async getOrderList() {

        console.log(1);

        let x = await fetch('http://' + ip + ':3001/getOrderList', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userid: global.userid })
        })
            .then((response) => response.json())
            .then((responseJson) => {


                this.ORDER = responseJson;

                this.ORDER.created_on = new Date(this.ORDER.created_on)
                this.setState({ isLoading: false })
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

            <View style={{ flex: 1 }}>

                <View style={{ flex: 1, backgroundColor: "white", }}>
                    <ScrollView>


                        <FlatList
                            data={this.ORDER}
                            keyExtractor={(item, index) => item.id}
                            numColumns={1}
                            renderItem={({ item }) => (
                                <View><TouchableOpacity onPress={() => Actions.OrderDetailPage({ item })} >
                                    <View style={{ marginTop: 10, marginHorizontal: 10, height: 30, backgroundColor: "#daffc2", borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                                        <Text style={{ textAlign: "center", marginTop: 5 }}>{item.payment.transaction_status}</Text>
                                    </View>
                                    <View style={{ marginHorizontal: 10, backgroundColor: "#f5f6f7", flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 1, borderColor: "grey" }}>
                            <Text style={{ fontWeight: "bold", fontSize: 12, marginHorizontal: 20, marginVertical: 5 }}>{item.id}</Text>
                                        <Text style={{ color: "grey", fontSize: 11, marginHorizontal: 20, marginVertical: 5 }} >{this.timestampToDate(item.created_on)}</Text>

                                    </View>
                                    <View style={{ borderBottomWidth: 1, borderColor: "grey", marginHorizontal: 10, borderBottomRightRadius: 10, borderBottomLeftRadius: 10 }}>
                                        <View style={{ flexDirection: "row", backgroundColor: "#f5f6f7" }}>
                                            <View style={{ marginTop: 30 }}>
                                                <Image source={{ uri: item.products[0].data[0].imageURL[0] }} style={{ marginHorizontal: 20, borderRadius: 15, height: 90, width: 85 }}></Image></View>
                                            <View style={{ marginHorizontal: 25, marginVertical: 45 }}>
                                                <Text style={{}}>{item.products[0].data[0].name} </Text>
                                                <Text style={{ color: "grey", fontSize: 12 }}>{item.products.length} Toko</Text>
                                                <Text style={{ color: "red" }}>Rp.{item.total} </Text>

                                            </View>
                                        </View>
                                    </View></TouchableOpacity></View>
                            )}
                        />



                    </ScrollView>

                </View>

                <View style={{ height: 50, backgroundColor: "white", flexDirection: "row", justifyContent: "space-around" }}>
                    <Image source={require('../MainPage/home.png')} style={{ alignSelf: "center", width: 30, height: 30, resizeMode: "contain", marginBottom: 10 }}></Image>
                    <Image source={require('../MainPage/shopping-cart.png')} style={{ alignSelf: "center", width: 30, height: 30, resizeMode: "contain", marginBottom: 10 }}></Image>
                    <Image source={require('../MainPage/profile.png')} style={{ alignSelf: "center", width: 30, height: 30, resizeMode: "contain", marginBottom: 10 }}></Image>
                </View>

            </View>
        )
    }



}

