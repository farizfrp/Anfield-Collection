import React, { Component } from 'react';
import { ActivityIndicator, StatusBar, RefreshControl, Text, View, Image, ScrollView, TextInput, Button, StyleSheet, FlatList, Linking, Clipboard, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {Overlay,Icon} from 'react-native-elements';

export default class OrderDetailPage extends Component {
    data = this.props.products;
    state = {
        data: this.data,
        refreshing: false,
        products:this.props.products,
        isVisible:false,
        query:''
    }
    deliveryfee = '999';
    total = {
        item: (Number(this.data.total) - this.deliveryfee).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        deliveryfee: (this.deliveryfee).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        total: this.data.total
    }
    onSubmit() {
  
        var status = "ongoing";
        var orderId = this.props.id;
        var shipping = this.props.shipping;
        shipping.trackingnumber = this.state.query;
        shipping.status = status;
      
      
      
      
       
        let x = fetch(ip + '/updateShipping', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: { orderId: orderId, merchantId: global.userid, shipping: shipping } })
        }).then((response) => {
        this.setState({isVisible:false});
        Actions.reset('tabbarx')
        })
            .catch((error) => {
                console.log(error.message);
            });
      
      
      
      
      }
 
    paymentCheck() {

        this.setState({ refreshing: true });
     
        let x = fetch(ip + ':3001/checkPayment', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idorder: this.data.payment.order_id })
        }).then((response) => response.json())
            .then((responseJson) => {
           
                var data = this.data;
                data= responseJson;
               
                this.setState({ data });
               
                this.setState({ refreshing: false });
            })
            .catch((error) => {
                this.setState({ refreshing: false });
                console.log(error.message);
            });
        console.log("RefreshBROOO")

    }
    onDelivered(merchantId) {
        var status = "delivered";
        var orderId = this.data.id;
        var shipping = this.data.products.find(obj => obj.title == merchantId);
        shipping = shipping.shipping;
        shipping.status = status;




        
        let x = fetch(ip + ':3001/updateShipping', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: { orderId: orderId, merchantId: merchantId, shipping: shipping } })
        }).then((response) => Actions.OrderListPage())

            .catch((error) => {
                console.log(error.message);
            });




    }
    getStatus(shippingStatus) {
        var status = "undefined";
        var paymentStatus = this.props.transaction_status;
        if (paymentStatus == "pending") {
            status = "Belum Dibayar"
        }
        else if (paymentStatus == "expire") {
            status = "Order Gagal (Tidak Dibayar)"
        }
        else if (paymentStatus == "settlement" && shippingStatus == "notinserted") {
            status = "Sudah Dibayar (Belum Dikirim)"

        }
        else if (paymentStatus == "settlement" && shippingStatus == "ongoing") {
            status = "Sudah Dibayar (Sedang Dikirim)"

        }

        else status = "Order Selesai (Sudah Sampai)"
        return status;


    }
    renderTrackingButton(status) {

        if (status == "Sudah Dibayar (Belum Dikirim)") return <Button title='Input Resi ' onPress={() => this.setState({isVisible:true})} />
        return
    }
    render() {
        console.log(this.data)
        var shipping = this.props.shipping;
        var invoice = this.props.invoice;
        var username = this.props.username;
        var title = this.data.title;
        if (this.state.refreshing) {

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
                    {/* status pemesanan */}
                    <ScrollView
                        contentContainerStyle={styles.scrollView}
                        refreshControl={
                            <RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.paymentCheck()} />
                        }
                    >
                        <Overlay
             isVisible={this.state.isVisible}
             windowBackgroundColor="rgba(255, 255, 255, .5)"
            
             width="auto"
             height="auto"
      isVisible={this.state.isVisible}
      onBackdropPress={() => this.setState({ isVisible: false })}
    >
     <Icon
  name='clear' 
  onPress={()=>this.setState({isVisible:false})}
  iconStyle={{left:0}}
  />
      <TextInput  onChangeText={(query) =>{this.setState({query}) }}
       placeholder="Masukan Nomor Resi" style={{ marginVertical: 25, borderRadius: 30, backgroundColor: "#F7F7F7", marginHorizontal: 16, paddingLeft: 30 }} />
             <Button
          title="Input"
          color="blue"
          onPress={() => this.onSubmit()}
        />       
    </Overlay>

                        <View>
                        
                        

                        <>
                                   <View style={{ borderBottomWidth: 0.5, borderColor: "grey", borderTopWidth: 1, marginVertical: 10, borderColor: "grey" }}></View>
                                    <View>
                                        
                                        <View><Text style={{ fontSize: 13, color: "grey", marginTop: 10, marginHorizontal: 6 }}> Status</Text></View>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: "grey" }}>
                                        <Text style={{ fontSize: 15, color: "green", fontWeight: "bold" }}>{this.props.status}</Text>
                                        <Text style={{ color: "green" }}>Lihat</Text>
                                    </View>
        
                            
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 10, paddingVertical: 10, borderBottomWidth: 1, borderColor: "grey" }}>
                                        <Text style={{ fontSize: 12 }}>Tanggal Pembelian</Text>
                                        <Text style={{ fontSize: 12 }}>{this.data.created_on} </Text>
                                    </View>
                                   
                                    {invoice&&   <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 10, paddingVertical: 10, borderBottomWidth: 1, borderColor: "grey" }}>
                                        <Text style={{ fontSize: 12 }}>INV/20190909/XI1234</Text>
                                         <Text style={{ color: "green" }} 
                                                onPress={() => { Linking.openURL(invoice) }}>Lihat</Text>
                                </View>}</View>
                                    <View>
                                        <Text style={{ fontSize: 15, marginLeft: 20, paddingTop: 5 }}>Customer : {username}</Text>
                                        <Text style={{ fontSize: 15, marginLeft: 20, paddingTop: 5 }}>Tracking Number : {shipping.trackingnumber}</Text>
                                        <Text style={{ fontSize: 15, marginLeft: 20, paddingTop: 5 }}>Kurir - Service : {shipping.courier + " - " + shipping.service}</Text>
                                        <Text style={{ fontSize: 15, marginLeft: 20, paddingTop: 5 }}>Ongkos Kirim : {shipping.deliveryfee}</Text>
                                   

                                        
                                      
                                        <View style={{ borderBottomWidth: 0.5, borderColor: "grey", borderTopWidth: 1, marginVertical: 10, borderColor: "grey" }}></View>
                                        <Text style={{ fontSize: 15, fontWeight: "bold",textAlign:"center", marginVertical: 15, marginHorizontal: 17 }}>Daftar Produk</Text>
                                    </View>
</>

                            <FlatList
                                data={this.props.products}
                                keyExtractor={(item, index) => item + index}
                                renderItem={({ item, index }) => (<View><View style={{ borderBottomWidth: 0.3, color: "grey" }}>


                                </View><View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                                        <Image style={{ marginHorizontal: 20, width: 50, height: 50 }} source={{ uri: item.imageURL[0] }} />
                                        



                                    </View>
                                    <Text style={{ marginLeft: 120, marginTop: -50, fontSize: 14, fontWeight: "bold", }}>{item.name} </Text>
                                    <Text style={{ marginLeft: 120, color: "Grey", paddingVertical: 5 }}>Quantity : {item.quantity} </Text>
                                    <Text style={{ marginLeft: 120, marginTop: -1, color: "red" }}>Rp.{item.price}</Text>
                                </View>)}/>
        
                                 
          

                             
                            {/* product */}


                        
                            <View style={{ marginVertical: 10, borderColor: "grey" }}>
                            <View style={{ borderBottomWidth: 0.5, borderColor: "grey", borderTopWidth: 1, marginVertical: 10, borderColor: "grey" }}></View>
                                <View><Text style={{ fontSize: 15, fontWeight: "bold", marginVertical: 15, marginHorizontal: 17 }}>Informasi Pembayaran</Text></View>
                                <View style={{}}>
                                

                                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20, marginVertical: 10 }}>
                                        <Text style={{ color: "grey" }}>Total Harga (3 Barang)     :</Text>
                                        <Text style={{ fontWeight: "bold", textAlign: "left" }}> Rp.{this.props.total} </Text>

                                    </View>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20, marginVertical: 10 }}>
                                        <Text style={{ color: "grey" }}>Ongkos Kirim                       :</Text>
                                        <Text style={{ fontWeight: "bold", textAlign: "left" }}> Rp.{shipping.deliveryfee} </Text>

                                    </View>







                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20, marginVertical: 10, borderTopWidth: 1, borderColor: "grey", paddingVertical: 10 }}>
                                    <Text style={{ color: "grey" }}>Total Harga ({this.data.length} Barang)      :</Text>
                                    <Text style={{ fontWeight: "bold", color: "red" }}> Rp.{this.props.total+shipping.deliveryfee} </Text>
                                </View>
                                {this.renderTrackingButton(this.props.status)}
                            </View>





                        </View>
                    </ScrollView>
                </View>


              

            </View>

        )

    }
}
const styles = StyleSheet.create({
    container: {

        resizeMode: "cover",
        width: 399,
        height: 299
    },
    text: {
        marginHorizontal: 30,
        fontSize: 26,
        fontWeight: "bold",
        marginVertical: 10,
        alignSelf: "center"



    }
});

