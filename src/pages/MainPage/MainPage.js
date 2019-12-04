import React, { Component } from 'react';
import { AsyncStorage,RefreshControl,Text, View, Image, ScrollView, TextInput, Button, TouchableOpacity, TouchableHighlight, SectionList, ActivityIndicator, StatusBar, FlatList } from 'react-native';
import firebase from 'react-native-firebase';
import { Actions} from 'react-native-router-flux';
import { SearchBar } from 'react-native-elements';

/**
 * The first arg is the options object for customization (it can also be null or omitted for default options),
 * The second arg is the callback which sends object: response (more info in the API Reference)
 */



cart = { sku: "jalak", title: "jalak", price: "111111" };
//ip = '11.11.11.76';

export default class MainPage extends Component {
    ref = firebase.firestore().collection('products');

    state = {

        isLoading: false,
        error: null,
        x: [],
        isURLloading: true,
        query: '',
        refreshing:false,
        hideTabBar: true,
        products:[]
    };
    // toggleTabBar() {
        
    //     console.log("toggleTabBar")
    //     this.setState(prevState => ({ hideTabBar: !prevState.hideTabBar }), () => {
    //         Actions.refresh({key: 'tabbarx', hideTabBar: this.state.hideTabBar});
    //     });
    //   };

  
    async setAuth(){
        console.log("setAuth")
        var result = await AsyncStorage.getItem('auth');
        if(!result) return;
        result = JSON.parse(result);
        global.userid = result.auth.id;
        global.cartChanged = true;
        global.userRole = result.auth.role;
        global.shipping = result.auth.shipping;
        global.userChanged = 0;
      console.log(global.userRole)
      }
    async componentWillMount() {
        this.getProduct()
        await this.setAuth();
        
        
        
      
            if(!global.userRole){ Actions.Login() 
            return}
            else if (global.userRole=='user') {
                
               }
            else {
                
                Actions.reset('AdminMenuPage')
               
               }

    }


    async getProduct() {
        this.setState({ isLoading: false })
        

        fetch(ip + '/getProductList')
            .then((response) => response.json())
            .then((responseJson) => {
             
           
             
                var products = responseJson;
               
this.setState({products})
                this.setState({ isLoading: false });
                this.setState({refreshing:false});
            })
            .catch((error) => {
                console.log(error.message);
            });

    }
    async onSearch() {

        console.log('onSearch');
        Actions.SearchPage(this.state.query);

    }
 

      handleSubmitEditing = ({ nativeEvent: { text: textVal } }) => {
        //console.log('xsxs')
        
      this.onSearch();
      };
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

        if (this.state.error) {
            
            return (<View style={{ flex: 1, padding: 20 }}>
                <ActivityIndicator />
                <StatusBar barStyle="dark-content" />
                <View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', }}>{this.state.error}</Text>
                </View>
            </View>);
        }

        return (
            <View style={{ flex: 1 }}>

                <View style={{ flex: 1, backgroundColor: "white" }}>
                
                    
                    <TextInput returnKeyType={'search'} onSubmitEditing={this.handleSubmitEditing} onChangeText={(query) =>{ this.setState({query})}} placeholder="Search your product" style={{ marginVertical: 25, borderRadius: 30, backgroundColor: "#F7F7F7", marginHorizontal: 16, paddingLeft: 30 }} />
                    <View style={{ height: 30, marginHorizontal: 20 }}>
                        <Text style={{ fontWeight: "bold", fontSize: 17 }}>Categories</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-around", marginVertical: 15 }}>
                        <View >
                            <TouchableHighlight>
                                <TouchableOpacity onPress={() => Actions.CategoriesPage('handmade')}>
                                    <Image source={require('../MainPage/shop.png')} style={{ width: 30, height: 30, resizeMode: "contain" }} ></Image>
                                    <Text style={{ paddingVertical: 15 }}>Handmade</Text>
                                </TouchableOpacity>
                            </TouchableHighlight>
                        </View>

                        <View >
                            <TouchableHighlight>
                                <TouchableOpacity onPress={() => Actions.CategoriesPage('mesin')}>
                                    <Image source={require('../MainPage/gift-box.png')} style={{ width: 30, height: 30, resizeMode: "contain" }} ></Image>
                                    <Text style={{ paddingVertical: 15 }}>Mesin</Text>
                                </TouchableOpacity>
                            </TouchableHighlight>
                        </View>

                    </View>


                    <View style={{ height: 48, marginHorizontal: 20, flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ fontWeight: "bold", fontSize: 17 }}>Best Selling</Text>
                        <TouchableOpacity onPress={() => Actions.MyCategoriesPage()}>
                            <Text style={{ fontSize: 14 }}>See all</Text>
                        </TouchableOpacity>
                    </View>


                    <ScrollView refreshControl={
            <RefreshControl refreshing={this.state.refreshing} onRefresh={() =>this.getProduct()} />
        }>
                        <FlatList style={{}}
                            data={this.state.products}
                            keyExtractor={(item, index) => item.id}
                            numColumns={2}
                            renderItem={({ item }) => (
                                <View style={{ }}>
                                    <TouchableHighlight>
                                        <TouchableOpacity onPress={() => Actions.DetailPage({ item })}>
                                            <Image source={{ uri: item.imageURL[0] }} style={{ borderRadius: 15, height: 145, width: 140, marginVertical: 10 ,marginHorizontal:20}}></Image>
                                            <Text style={{ marginHorizontal: 20 }}>{item.name}</Text>
                                            <Text style={{ marginHorizontal: 20, fontSize: 12, color: "grey" }}>Toko {item.username}</Text>
                                          <Text style={{ marginHorizontal: 20, fontSize: 12, color: "grey" }}>({item.shipping[0].city.name})</Text>
                                            <Text style={{ marginHorizontal: 20, fontSize: 13, color: "red", fontWeight: "bold" }}>Rp. {item.price}</Text></TouchableOpacity></TouchableHighlight>
                                </View>
                            )}
                        /></ScrollView>



                </View>


            </View>
        )
    }
}
