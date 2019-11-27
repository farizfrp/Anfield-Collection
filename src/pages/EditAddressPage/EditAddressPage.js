import React, { Component } from 'react';
import { Alert, Text, View, Image, ScrollView, TextInput, Button, StyleSheet, ActivityIndicator, StatusBar } from 'react-native';

import RNPickerSelect from 'react-native-picker-select';
import { Actions } from 'react-native-router-flux';

//import { auth } from 'firebase-admin';





export default class EditAddressPage extends Component {
    userid=global.userid
    state = {
        isLoading: true,
        email: '',
        name: 'default',
        password: '',
        isLoggingIn: false,
        message: '',
        photo: null,
        path: "/storage/emulated/0/DCIM/Camera/IMG_20191005_101026.jpg",
        province: [],
        city: [],
        idProvince: 0,
        idCity: 0,
        addressDetail: "undefined",
        addressName:"undefined"
    }
    address=this.props.data;
city =this.address.city
province =this.address.province
address=this.props.data;
   async  componentDidMount() {



    let a =    await this.getProvince();
    let b =    await this.getCity(this.address.province.id,0);
       
        this.state.addressName=this.address.name,
        this.state.addressDetail=this.address.address,
        this.state.idCity=this.city.id;
        this.state.idProvince=this.province.id;
        
        this.setState({isLoading:false})

    }
  
    async getProvince() {

        console.log("getProvince");

        await fetch('https://api.rajaongkir.com/starter/province', {
            method: 'GET',
            headers: {

                'key': '7567d6480344c47b7e978c6a825077ce'
            }
        }).then((response) => response.json())
            .then((responseJson) => {

                data = responseJson.rajaongkir.results;
                const prov = data.map(function (row) {

                    // This function defines the "mapping behaviour". name and title 
                    // data from each "row" from your columns array is mapped to a 
                    // corresponding item in the new "options" array

                    return { label: row.province, value: row.province_id }
                })
                this.setState({ province: prov })
            })
            .catch((error) => {
                console.log(error.message);
            });
      
    }
    async getCity(id, index) {
        this.state.idProvince = id;
       

        await fetch('https://api.rajaongkir.com/starter/city?province=' + id, {
            method: 'GET',
            headers: {

                'key': '7567d6480344c47b7e978c6a825077ce'
            }
        }).then((response) => response.json())
            .then((responseJson) => {

                data = responseJson.rajaongkir.results;
                const city = data.map(function (row) {

                    // This function defines the "mapping behaviour". name and title 
                    // data from each "row" from your columns array is mapped to a 
                    // corresponding item in the new "options" array

                    return { label: row.type + " " + row.city_name, value: row.city_id }
                })
                
                this.setState({ city: city })
               
            })
            .catch((error) => {
                console.log(error.message);
            });
        console.log("City = = = = = ");
        
    }
    setCity(index){
        if(index==0) return
        
        index--;
        this.city={id:this.state.city[index].value,
          name:this.state.city[index].label
        
        }
        this.setState({idCity:this.city.id})
        this.state.idCity=this.city.id;
        
        
          }
        
        
          setProvince(index){
            index--;
            this.province={id:this.state.province[index].value,
              name:this.state.province[index].label}
              this.setState({idProvince:this.province.id})
        this.state.idProvince=this.province.id;
        }
    onSubmit() {
var id= this.userid;

var address= {name:this.state.addressName,address:this.state.addressDetail,province:this.province,city:this.city}
        let x = fetch('http://' + ip + ':3001/updateAddress', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body:JSON.stringify({data:{id:id,oldAddress:this.address,newAddress:address}})
          });
Actions.AddressManagementPage();


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
                            <Text style={{ fontSize: 25 }}>Tambah Alamat             </Text>
                            <Text style={{ color: "grey" }}>Tambahkan alamat baru</Text>
                            <View style={{ marginVertical: 10 }}></View>

                        </View>
                        <View style={{ marginLeft: 8, marginVertical: 10 }}>
                            <Text>Nama Alamat</Text>
                            <TextInput placeholder="Alamat Lengkap" style={styles.TextInputStyles}
                             defaultValue={this.address.name}     onChangeText={(text) => this.state.addressName = text} />
                        </View>
                        <View style={{ marginLeft: 8, marginVertical: 10 }}>
                            <Text>Provinsi</Text>
                            <RNPickerSelect
                                onValueChange={(value, index) =>{this.setProvince(index); this.getCity(value, index)}}
                                items={this.state.province}
                                value={this.state.idProvince}
                            />

                        </View>
                        <View style={{ marginLeft: 8, marginVertical: 10 }}>
                            <Text>Kota</Text>
                            <RNPickerSelect
                                onValueChange={(value, index) => { this.setCity(index);this.state.idCity }}
                                items={this.state.city}
                                value={this.state.idCity}
                            />

                        </View>

                        <View style={{ marginLeft: 8, marginVertical: 10 }}>
                            <Text>Detail Alamat</Text>
                            <TextInput placeholder="Alamat Lengkap" style={styles.TextInputStyles}
                              defaultValue={this.address.address}  onChangeText={(text) => this.state.addressDetail = text} />
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
