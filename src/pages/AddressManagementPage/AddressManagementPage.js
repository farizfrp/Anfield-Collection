import React, { Component } from 'react';
import { Alert, FlatList, Text, View, Image, ScrollView, TextInput, Button, TouchableOpacity, TouchableHighlight, SectionList, ActivityIndicator, StatusBar } from 'react-native';
import { Actions } from 'react-native-router-flux';


export default class AddressManagementPage extends Component {
  userid=global.userid;
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
    numItem: []

  };
  sum = 0;
  async componentWillMount(){
  await this.getAddress(this.userid)


 }
  async componentDidMount() {
    //this.pullCart()
    
   
  }

  async promptPull(val) {
    
    if(this.DATA[0].data.length==1){
      Alert.alert('Tidak dapat menghapus','Anda hanya memiliki satu alamat',[{text: 'Ok'}])
    }
 else{ Alert.alert(
      'Hapus Alamat',
      'Anda yakin akan menghapus alamat ini ?',
      [

        {
          text: 'Batal',
          onPress: () => { return; },
          style: 'cancel',
        },
        { text: 'Ya', onPress: () => this.pullAddress(val) },
      ],
      { cancelable: false },
    );

    }
  }
  async pullAddress(val) {

    var id= this.userid;
    let x = await fetch(ip + '/pullAddress', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({data:{ id:id,shipping: val }})


    });

    console.log('Pushed');
    Actions.AddressManagementPage();

  }
 
  async getAddress(userid) {
    result = null;
    console.log('getAddress');
    //   console.log(this.props.data);
    //   ip = '192.168.1.7';
    let x = await fetch(ip + '/getAddress', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userid: userid })
    }).then((response) => response.json())
        .then((responseJson) => {
          
          
            result = responseJson[0].shipping;
            global.shipping = result;
            this.DATA = [{
              title: "",
              data: responseJson[0].shipping
            }]
          
           
  this.setState({ isLoading: false })
            return result;

        })
        .catch((error) => {
            console.log(error.message);
        });
    return result;
    
}



  async pushCart() {
    console.log('pushcart');
    cart = { id: this.props.item.id, quantity: this.state.quantity };
    let x = await fetch(ip + '/addCart', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cart)
    }).then((response) => {
     




    });
    return;
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
              sections={this.DATA}
              keyExtractor={(item, index) => item + index}
              renderItem={({ item, index }) => (<TouchableOpacity onPress={() => Actions.EditAddressPage({ data:item })} ><View style={{ borderBottomWidth: 0.3, color: "grey", paddingTop: 15 }}>


              </View><View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                 
                  <Text style={{ fontSize: 14, fontWeight: "bold", marginLeft: -95 }}>{"x"}
                  </Text>

                 

                </View>
                <Text style={{ marginLeft: 120, marginTop: -30, color: "Grey", paddingVertical: 5 }}>Nama : {item.name} </Text>
                <Text style={{ marginLeft: 120, marginTop: -1, color: "red" }}>City : {item.city.name }</Text>
                <Text style={{ marginLeft: 120, marginTop: -1, color: "red" }}>Provice : {item.province.name }</Text>
                <Text style={{ marginLeft: 120, color: "Grey", paddingVertical: 5 }}>Detail : {item.address} </Text>
                <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
                    <TouchableOpacity onPress={() => this.promptPull(item)}>
                      <Image style={{ width: 50, height: 50, marginTop: -30, marginLeft: 5 }} source={require('../CartPage/delete.png')}></Image>
                    </TouchableOpacity>
                  </View>
             </TouchableOpacity> )}
            
            /></View>
        </ScrollView>
        <View style={{ flexDirection: "row", justifyContent: "space-around", backgroundColor: "#f5f6f7", height: 75 }}>
          <View style={{ justifyContent: "center" }}><Text style={{ fontWeight: "bold" }}>Tambah Alamat</Text>
            
          </View>

          <View style={{ height: 600, width: 120, borderRadius: 20, marginVertical: 20 }}>
            <Button
              title="+"
              color="red"
              onPress={() => Actions.AddAddressPage({ data: this.DATA })}
            />
          </View >

        </View>
      </View>




    )

  }
}
