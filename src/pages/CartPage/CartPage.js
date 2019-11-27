import React, { Component } from 'react';
import { Alert, FlatList, Text, View, Image, ScrollView, TextInput, Button, TouchableOpacity, TouchableHighlight, SectionList, ActivityIndicator, StatusBar } from 'react-native';
import { Actions,onEnter } from 'react-native-router-flux';
import InputSpinner from 'react-native-input-spinner';

export default class CartPageTest extends Component {

  DATA = [];
  // ip = '192.168.1.7';
  orderList = [];
  state = {

    isLoading: true,
    error: null,
    x: [],
    isURLloading: true,
    quantity: 1,
    number: 1,
    sum: 0,
    sumItem: [],
    numItem: [],
    item:[]

  };
  sum = 0;
  static onEnter(){
    console.log('onEnter')
  }
  async reloadPage(){

    if (this.props.item) {
      await this.pushCart();


    }
    this.getCart()

  }
  async componentDidMount() {
    //this.pullCart()
    if (this.props.item) {
      await this.pushCart();


    }
    this.getCart()

  }

  async promptPull(id) {

    Alert.alert(
      'Hapus Keranjang',
      'Anda yakin akan menghapus produk ini ?',
      [

        {
          text: 'Batal',
          onPress: () => { return; },
          style: 'cancel',
        },
        { text: 'Ya', onPress: () => this.pullCart(id) },
      ],
      { cancelable: false },
    );


  }
  async pullCart(id) {
    console.log('pull SKU = ' + id);

    let x = await fetch('http://' + ip + ':3001/pullCart', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productId: id,userId:global.userid })


    });
    this.setState({isLoading:true})
    await this.getCart()
    console.log('Pulled');
   

  }
  async getCart() {
const userid= global.userid
    console.log(1);

    let x = await fetch('http://' + ip + ':3001/getCarts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    
      body: JSON.stringify({userid : userid})})
      .then((response) => response.json())
      .then((responseJson) => {

        console.log(responseJson[0].product);
        DATA = [{
          title: responseJson[0],
          data: responseJson[0].product
        }]
        console.log(responseJson);
        this.orderList = responseJson[0].product;
if(this.orderList.length==0){this.setState({ isLoading: false })}
        this.orderList.sort(this.compare);

        responseJson[0].product==0?Alert.alert('Keranjang Kosong','Silahkan masukan produk yang anda inginkan ke keranjang',[{text: 'Ok', onPress: () => Actions.MainPage()}]):null

        console.log(this.DATA)
        this.sumTotal(0, 0);



      })
      .catch((error) => {
        console.log(error.message);
      });
    // this.setState({isLoading: false })
    this.setState({item:await this.groupBy(this.orderList)})
    
    this.setState({ isLoading: false })
    //console.log(this.orderList)
  }

  compare(a, b) {
    if (a.merchant < b.merchant) {
      return -1;
    }
    if (a.merchant > b.merchant) {
      return 1;
    }
    return 0;
  }


  async groupBy(collection) {
    var i = 0;
    var index=0
    let result = [{ title: null, merchantname: null, data: [] }];
    result[i].title = collection[0].merchant;
    result[i].merchantname = await this.getMerchantName(collection[0].merchant);
    for (var value of collection) {
      console.log(i);
      if (value.merchant == result[i].title) {
        // result[i].merchantname=await this.getMerchantName(value.merchant);
        result[i].data.push(value);
this.orderList[index].index=index;

      }
      else {
        i++;
        this.orderList[index].index=index;
        result.push({ title: null, merchantname: null, data: [] })
        console.log("else = " + value.merchant);
        result[i].merchantname = await this.getMerchantName(value.merchant);
        result[i].title = value.merchant;
        result[i].data.push(value);


      }index++;
    }
    console.log(result);
    this.DATA = result;
    return result;
  }
  sumTotal(num, index,indexItem) {
    console.log("Index = ", index)
    if (num != 0) {
      //this.sumItem[index]=num;
      console.log("OrderList", this.orderList)
      //this.orderList[index].quantity = num;
      this.orderList[indexItem].quantity=num;
      //this.state.numItem[index]=num;
    }
    var index = 0
    var result;
    this.sum = this.orderList.reduce(function (prev, cur) {
      // result[index]=(Number(cur.price)*Number(cur.quantity))
      return prev + (Number(cur.price) * Number(cur.quantity));
    }, 0);
    this.setState({ sum: this.sum });
    //this.state.sumItem=result;
  }

  async pushCart() {
    console.log('pushcart');
    cart = { id: this.props.item.id, quantity: this.state.quantity };
    let x = await fetch('http://' + ip + ':3001/addCart', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({cartItem:cart,userId:global.userid})
    }).then((response) => {
      console.log(response)




    });
    return;
  }

  async getMerchantName(id) {
    var result = null;
    console.log("IDNAMA", id)
    let x = await fetch('http://' + ip + ':3001/getMerchantName', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: id })
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        result = responseJson.username;
        return result;



      })
      .catch((error) => {
        console.log(error.message);
      });
    return result;
  }
  Item({ title }) {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
      </View>
    );
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

    if (this.state.error) {
      console.log('erorrrororororo broo');
      console.log(this.state.error);
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


        {/* card 1 barang 1 */}
        <ScrollView>

          <View style={{ backgroundColor: "#f5f4f2", marginTop: 10, marginHorizontal: 15, paddingTop: 10, paddingVertical: 30, borderRadius: 10 }}>
            <SectionList
              sections={this.state.item}
              keyExtractor={(item, index) => item + index}
              renderItem={({ item, index }) => (<View><View style={{ borderBottomWidth: 0.3, color: "grey", paddingTop: 15 }}>


              </View><View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                  <Image style={{ marginHorizontal: 20, width: 50, height: 50 }} source={{ uri: item.imageURL[0] }} />
                  <Text style={{ fontSize: 14, fontWeight: "bold", marginLeft: -95 }}>{item.name}
                  </Text>

                 
                    <TouchableOpacity onPress={() => this.promptPull(item.id)}>
                      <Image style={{ width: 30, height: 50, marginTop: -30, marginLeft: 65 }} source={require('../CartPage/delete.png')}

                      ></Image>
                    </TouchableOpacity>
                  

                </View>
                <Text style={{ marginLeft: 120, marginTop: -30, color: "Grey", paddingVertical: 5 }}>Stock {item.quantityproduct} </Text>
                <Text style={{ marginLeft: 120, marginTop: -1, color: "red" }}>Rp.{item.price * Number(item.quantity)}</Text>
                <InputSpinner
                  max={item.quantityproduct}
                  min={1}
                  step={1}
                  rounded={false}
                  colorMax={"#f04048"}
                  colorMin={"#40c5f4"}
                  value={this.state.number}
                  onChange={(num) => { this.sumTotal(num, index,item.index) }} /></View>)}
              renderSectionHeader={({ section: { merchantname } }) => (

                <View>
                  <Text style={{ fontSize: 15, marginLeft: 20, paddingTop: 5 }}>Toko : {merchantname}</Text>
                  <Text style={{ fontSize: 12, color: "grey", marginLeft: 20, font: 11, paddingTop: 5 }}>Kota Malang</Text>
                </View>


              )}
            /></View>
        </ScrollView>
        <View style={{ flexDirection: "row", justifyContent: "space-around", backgroundColor: "#f5f6f7", height: 75 }}>
          <View style={{ justifyContent: "center" }}><Text style={{ fontWeight: "bold" }}>Total Pembayaran</Text>
            <Text >Rp.{this.state.sum}</Text>
          </View>

          <View style={{ height: 600, width: 120, borderRadius: 20, marginVertical: 20 }}>
            <Button
              title="Checkout"
              color="red"
              onPress={() => Actions.OrderPage({ data: this.DATA })}
            />
          </View >

        </View>
      </View>




    )

  }
}
