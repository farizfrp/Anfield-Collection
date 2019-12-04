import React, { Component } from 'react';
import { Alert,ActivityIndicator, StatusBar, FlatList, TouchableOpacity, Text, View, Image, ScrollView, TextInput, Button, StyleSheet, Picker } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Actions } from 'react-native-router-flux';
//import { auth } from 'firebase-admin';

export default class OrderPage extends Component {
    data = this.props.data;
    userId=global.userid;
    state = {
        isLoading: true,
        textInputs: [],
        courierservices: [],
        customerAddress:[]
    };

    order = {
        created_on: new Date(),

        shipping: {
            customer: "Fariz Reynaldo",
            address: "default",
            city: "default",
            region: "default",
            state: "default",
            delivery_notes: "default",

            tracking: {
                company: "JNE",
                tracking_number: "22122X211SD",
                status: "baru saja di input",
                estimated_delivery: "5 November 2019"
            }
        },

        payment: {
            method: "visa",
            transaction_id: "2312213312XXXTD",
            total: 0
        },

        products: this.data
    }

  
    courier = [{ label: "JNE", value: "jne" }, { label: "POS Indonesia", value: "pos" }, { label: "Tiki", value: "tiki" }];
    courierservices = [];
    shipping = {
        origin: 0,
        destination: 33,
        weight: 300,
        courier: "jne",
        deliveryfee: 0
    }
    shippings = [];
    async createAddressOptions(){
        var shipping = await this.getAddress(this.userId)
        if(shipping.length==0) Alert.alert('Alamat anda belum terdaftar','Silahkan daftarkan alamat anda',[{text: 'Ok', onPress: () => Actions.AddressManagementPage()}])
       var result=[];
        
for(var ship of shipping){
result.push({label: ship.name + " - " + ship.address, value: ship.city.id})
}

var customerAddress= result;
this.shipping.destination=customerAddress[0].value;

this.setState({customerAddress})
}
   
    

    async onCourierChange(index) {

        this.courierservices[index] = await this.getCourierServices(index);
        this.setState({ courierservices: this.courierservices })

       

    }

    async componentDidMount() {
        index = 0;
        result = [];


await this.createAddressOptions();
        // this.shipping.origin = ad.value;
        
      

await this.initiateShippings();
     
        for (const ship of this.shippings){


           await this.onCourierChange(index);
           
            index++;
        }
       
       
     this.setState({ isLoading: false })

    }
    async initiateShippings(){
      
       var index = 0;
        for (const ad of this.data) {
           
            // this.shipping.origin = ad.value;
            var address = await this.getAddress(ad.title);
        address=address[0].city.id
         
            this.shippings[index] = {
                origin: address,
                destination: this.shipping.destination,
                destinationAddress: 'undefined',
                weight: 0 ,
                courier: this.shipping.courier,
                deliveryfee: this.shipping.deliveryfee
            };
            for(const weight of ad.data){
               this.shippings[index].weight=this.shippings[index].weight+( Number(weight.shipping_details.weight)*weight.quantity);

           }
          
            index++;

        }
     
return;
    }
    async onAddressChange(addressIndex) {
        addressIndex = addressIndex - 1;
        var services;
        var index = 0;
        for (const address of this.shippings) {
    
            this.shippings[index].destination = this.state.customerAddress[addressIndex].value;
            this.shippings[index].destinationAddress = this.state.customerAddress[addressIndex].label;
         
            index++;
        }
        index = 0;
      
        for (const res of this.shippings) {
            services[index] = await this.getCourierServices(index);
            index++;


        }
        this.setState({ courierservices: services })
      
    }

    async getCourierServices(index) {
     
        var results = null;
        await fetch('https://api.rajaongkir.com/starter/cost', {
            method: 'POST',
            headers: {

                'key': '7567d6480344c47b7e978c6a825077ce',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.shippings[index])
        }).then((response) => response.json())
            .then((responseJson) => {
               
                results = responseJson.rajaongkir.results[0].costs;
               
                this.courierservices[index] = results;
               
               
               // results = this.courierservices[index];

                this.state.courierservices[index]= results[index];
               
               
                index++;
            })
            .catch((error) => {
              
            });
           results= results.map(function (row) {
                return { label: row.service + " - (" + row.cost[0].etd + " Hari) - Rp." + row.cost[0].value, value: {cost:row.cost[0].value,service:row.service }}
            })
            
        return results;

    }
    async getAddress(userid) {
        result = null;
      
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
                if(responseJson[0].shipping.length==0) Alert.alert('Alamat anda belum terdaftar','Silahkan daftarkan alamat anda',[{text: 'Ok', onPress: () => Actions.AddressManagementPage()}])
             
                // this.shipping.destination = responseJson[0].shipping[0].city.id;
               
                // this.setState({ isLoading: false });
      
                result = responseJson[0].shipping;


            })
            .catch((error) => {
                console.log(error.message);
            });
        return result;
        
    }
    async onSubmit() {

        var index = 0;
        this.order.userid = global.userid;
        this.order.username = global.username;
for(const ord of this.data){
this.order.products[index].shipping=this.shippings[index];
index++;

}
        //ip='192.168.1.7';
         let x = await fetch(ip + '/addOrder', {
             method: 'POST',
             headers: {
                'Accept': 'application/json',
                 'Content-Type': 'application/json'
          },
             body: JSON.stringify(this.order)
        });
global.cartChanged=true;
   
        Actions.reset('tabbarx');

    }

    render() {
        if (this.state.isLoading) {


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
                <ScrollView
                    style={{
                        flex: 1,

                    }}>
                    <View style={{ flex: 1, backgroundColor: "white" }}>


                        <View style={{ marginLeft: 8, marginVertical: 30 }}>
                            <Text style={{ fontSize: 25 }}>Order Detail             </Text>
                            <Text style={{ color: "grey" }}>Isi Detail Order</Text>
                            <View style={{ marginVertical: 10 }}></View>

                        </View>
                        <View style={{ marginLeft: 8, marginVertical: 10 }}>
                            <Text>Alamat</Text>
                            <RNPickerSelect

                                onValueChange={(value, index) => {
                                
                                    this.shipping.destination = value;
                                    this.shipping.address = this.state.customerAddress[index-1].label;
                                 
                                    this.onAddressChange(index);
                                   
                                }}
                                items={this.state.customerAddress}
                            />

                        </View>

                        <View style={{ marginLeft: 8, marginVertical: 10 }}>
                            <Text>Jenis Pembayaran</Text>
                            <RNPickerSelect
                                onValueChange={(value) => console.log(value)}
                                items={[
                                    { label: 'BCA Virtual Account', value: 'bca' },
                                    { label: 'GO-PAY', value: 'gopay' },
                                    { label: 'Merchant Indomaret', value: 'indomaret' },
                                ]}
                            />

                        </View>
                        <View style={{ flex: 1, marginTop: 20 }}>
                            <FlatList
                                style={{ flex: 1 }}
                                data={this.data}
                                renderItem={({ item, index }) => {
                                    return (

                                        <View style={{ marginLeft: 8, marginVertical: 10 }}>
                                <Text>Toko {item.merchantname} ({item.citymerchant})</Text>




                                            <View style={{ marginLeft: 8, marginVertical: 10 }}>
                                                <Text>Kurir </Text>
                                                <RNPickerSelect
                                                    onValueChange={(value) => {
                                                        
                                                        this.shippings[index].courier=value;
                                                        this.onCourierChange(index);
                                                        
                                                    }}
                                                    items={this.courier}
                                                />

                                            </View>
                                            <View style={{ marginLeft: 8, marginVertical: 10 }}>
                                                <Text>Service Kurir </Text>
                                                <RNPickerSelect
                                                    onValueChange={(value) => {
                                                        
                                                     this.shippings[index].deliveryfee=value.cost;
                                                     this.shippings[index].service=value.service;
                                                      
                                                    }}
                                                    items={this.state.courierservices[index]}
                                                />

                                            </View>

                                        </View>

                                    );
                                }}
                            />
                        </View>



                        <View style={{ marginHorizontal: 8, borderRadius: 20, marginVertical: 10 }}>
                            <Button
                                title="Tambahkan"
                                color="red"
                                onPress={() => this.onSubmit()}
                            />
                        </View>
                    </View>


                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    borderContainer: {

        borderRadius: 16,

        height: 669,
        marginHorizontal: 30,
        marginTop: 30,
        marginVertical: 30
    },
    TextInputStyles: {
        borderBottomWidth: 2,
        borderColor: "red"
    }
});
