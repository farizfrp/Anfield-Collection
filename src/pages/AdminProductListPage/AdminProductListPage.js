import React, { Component } from 'react';
import { BackHandler,Alert,Text, View, Image, ScrollView, TextInput, Button,TouchableOpacity,FlatList,ActivityIndicator,StatusBar } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Swipeout from 'react-native-swipeout';

export default class AdminProductListPage extends Component {
    state = {

        isLoading: true,
        error: null,
        x: [],
        isURLloading: true,
        products:[]
    };
    merchantId=global.userid;
PRODUCT=[];
    componentDidMount() {
      this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        Actions.replace('AdminMenuPage'); // works best when the goBack is async
        return true;
      });
        this.getProductCat()
    }
    componentWillUnmount() {
      this.backHandler.remove();
    }
    async getProductCat() {

        console.log('getProductCat');
        
     //   ip = '192.168.1.7';
    await fetch('http://' + ip + ':3001/getAdminProductList').then((response) => response.json())
      .then((responseJson) => {
        this.PRODUCT=responseJson;
        this.setState({ products: responseJson });
        this.setState({ isLoading: false });
          
       
         
      })
      .catch((error) => {
          console.log(error.message);
      });

    }
    async pullProduct(productId,index) {
    
        this.state.products.splice(index,1)
        let products = this.state.products;
        
        this.setState({products})
 
         let x = await fetch('http://' + ip + ':3001/pullProduct', {
           method: 'POST',
           headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json'
           },
           body: JSON.stringify({ productId: productId })
     }).then(()=>{ console.log('Pulled');
        Actions.MerchantProductsPage();});
    
       
    
      }
    async promptPull(id,index) {

        Alert.alert(
          'Hapus Produk',
          'Anda yakin akan menghapus produk ini ?',
          [
    
            {
              text: 'Batal',
              onPress: () => { return; },
              style: 'cancel',
            },
            { text: 'Ya', onPress: () => this.pullProduct(id,index) },
          ],
          { cancelable: false },
        );
    
    
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
            
                    <View >
         
                    <View style={{flexDirection:"row",justifyContent:"center",marginVertical:32,flexWrap:"wrap"}}>
          
          <FlatList 
data={this.state.products}
keyExtractor={(item, index) => item.id }
numColumns={1}
renderItem={({item,index}) => (   <Swipeout right={ [
    {
        text: 'Edit',
        backgroundColor: 'blue',
        underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
        onPress: () => { Actions.EditProductPage({data:{images:item.imageURL,product:item}}) }
     },
    {
      text: 'Delete',
      backgroundColor: 'red',
      underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
      onPress: () => { this.promptPull(item.id,index) }
   }
  ]}
    autoClose='true'
    backgroundColor= 'transparent'>
    <View><View style={{ borderBottomWidth: 0.3, color: "grey", paddingTop: 15 }}>


    </View><View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
        <Image style={{ marginHorizontal: 20, width: 50, height: 50 }} source={{ uri: item.imageURL[0] }} />
        
       
        

      </View>
      <Text style={{ marginLeft: 120,  color: "Grey", paddingVertical: 5 }}>{item.name}
        </Text>

      <Text style={{ marginLeft: 120,  color: "Grey", paddingVertical: 5 }}>Stock : {item.quantityproduct} </Text>
      <Text style={{ marginLeft: 120, color: "Grey", paddingVertical: 5 }}>Terjual : {item.sell} </Text>
      <Text style={{ marginLeft: 120, marginTop: -1, color: "red" }}>Rp.{item.price }</Text>
      </View></Swipeout>
)}
/>
                      
                      
                    </View>
                    
                      </View>
                      </ScrollView>
        </View>
       
    )
}

}