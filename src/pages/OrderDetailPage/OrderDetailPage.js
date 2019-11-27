import React, { Component } from 'react';
import { SectionList, ActivityIndicator, StatusBar, RefreshControl, Text, View, Image, ScrollView, TextInput, Button, StyleSheet, FlatList, Linking, Clipboard, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';


export default class OrderDetailPage extends Component {
    data = this.props.item;
    state = {
        data: this.data,
        refreshing: false
    }
    deliveryfee = this.sumShipping();
    total = {
        item: (Number(this.data.total) - this.deliveryfee).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        deliveryfee: (this.deliveryfee).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        total: this.data.payment.gross_amount
    }
    sumShipping() {
        shipping = this.data.products;
        result = 0;
        for (const fee of shipping) {
            result = result + fee.shipping.deliveryfee;
        }
        return result;
    }
    paymentCheck() {

        this.setState({ refreshing: true });
     
        let x = fetch('http://' + ip + ':3001/checkPayment', {
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




        
        let x = fetch('http://' + ip + ':3001/updateShipping', {
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
        var paymentStatus = this.state.data.payment.transaction_status;
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
    renderDeliveryButton(status, title) {
        console.log('Status', status);
        if (status == "Sudah Dibayar (Sedang Dikirim)") return <Button title='Sampai ' onPress={() => this.onDelivered(title)} />
        return
    }
    render() {
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

                        <View>
                            <View><Text style={{ fontSize: 13, color: "grey", marginTop: 10, marginHorizontal: 6 }}> Status</Text></View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: "grey" }}>
                                <Text style={{ fontSize: 15, color: "green", fontWeight: "bold" }}>{this.state.data.payment.transaction_status}</Text>
                                <Text style={{ color: "green" }}>Lihat</Text>
                            </View>

                            {/* tanggal pembelian */}
                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 10, paddingVertical: 10, borderBottomWidth: 1, borderColor: "grey" }}>
                                <Text style={{ fontSize: 12 }}>Tanggal Pembelian</Text>
                                <Text style={{ fontSize: 12 }}>{this.data.created_on} 15:19 WIB</Text>
                            </View>
                            {/* invoice */}
                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 10, paddingVertical: 10, borderBottomWidth: 1, borderColor: "grey" }}>
                                <Text style={{ fontSize: 12 }}>INV/20190909/XI1234</Text>
                                <Text style={{ color: "green" }}>Lihat</Text>
                            </View>
                            {/* daftar produk */}
                            <View><Text style={{ fontSize: 15, fontWeight: "bold", marginVertical: 15, marginHorizontal: 17 }}>Daftar Produk</Text></View>
                            {/* product */}



                            <SectionList
                                sections={this.state.data.products}
                                keyExtractor={(item, index) => item + index}
                                renderItem={({ item, index }) => (<View><View style={{ borderBottomWidth: 0.3, color: "grey", paddingTop: 15 }}>


                                </View><View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                                        <Image style={{ marginHorizontal: 20, width: 50, height: 50 }} source={{ uri: item.imageURL[0] }} />
                                        <Text style={{ fontSize: 14, fontWeight: "bold", marginLeft: -95 }}>{item.name}
                                        </Text>



                                    </View>
                                    <Text style={{ marginLeft: 120, marginTop: -30, color: "Grey", paddingVertical: 5 }}>Quantity : {item.quantity} </Text>
                                    <Text style={{ marginLeft: 120, marginTop: -1, color: "red" }}>Rp.{item.price}</Text>
                                </View>)}
                                renderSectionHeader={({ section: { invoice, merchantname, shipping, title }, index }) => (

                                    <View>
                                        <Text style={{ fontSize: 15, marginLeft: 20, paddingTop: 5 }}>Toko : {merchantname}</Text>
                                        <Text style={{ fontSize: 15, marginLeft: 20, paddingTop: 5 }}>Tracking Number : {shipping.trackingnumber}</Text>
                                        <Text style={{ fontSize: 15, marginLeft: 20, paddingTop: 5 }}>Kurir - Service : {shipping.courier + " - " + shipping.service}</Text>
                                        <Text style={{ fontSize: 15, marginLeft: 20, paddingTop: 5 }}>Ongkos Kirim : {shipping.deliveryfee}</Text>
                                        <Text style={{ fontSize: 15, marginLeft: 20, paddingTop: 5 }}>Status : {this.getStatus(shipping.status)}</Text>
                                        <Text style={{ fontSize: 15, marginLeft: 20, paddingTop: 5 }}>Invoice :
  <Text
                                                style={{ color: 'red' }}
                                                onPress={() => { Linking.openURL(invoice) }}
                                            >
                                                {invoice}
                                            </Text>

                                        </Text>
                                        {this.renderDeliveryButton(this.getStatus(shipping.status), title)}
                                    </View>


                                )}
                            />
                            {/* product */}


                            <View style={{ borderBottomWidth: 0.5, borderColor: "grey", borderTopWidth: 1, marginVertical: 10, borderColor: "grey" }}>
                                <View><Text style={{ fontSize: 15, fontWeight: "bold", marginVertical: 15, marginHorizontal: 17 }}>Detail Pengiriman</Text></View>
                                <View style={{}}>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20, marginVertical: 10 }}>
                                        <Text style={{ color: "grey" }}>Nama                               :</Text>
                                        <Text style={{ fontWeight: "bold", textAlign: "left" }}>{this.data.shipping.customer} </Text>

                                    </View>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20, marginVertical: 10 }}>
                                        <Text style={{ color: "grey" }}>Kurir Pengiriman           :</Text>
                                        <Text style={{ fontWeight: "bold", textAlign: "left" }}> {this.data.shipping.tracking.company} </Text>

                                    </View>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20, marginVertical: 10 }}>
                                        <Text style={{ color: "grey" }}>No Resi                            :</Text>
                                        <Text style={{ fontWeight: "bold", textAlign: "left" }}> {this.data.shipping.tracking.tracking_number}  </Text>

                                    </View>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20, marginVertical: 10, paddingBottom: 20 }}>
                                        <Text style={{ color: "grey" }}>Alamat Pengiriman      :</Text>
                                        <Text style={{ fontWeight: "bold", textAlign: "left" }}>
                                            {this.data.shipping.address}</Text>

                                    </View>





                                </View>
                            </View>
                            <View style={{ marginVertical: 10, borderColor: "grey" }}>
                                <View><Text style={{ fontSize: 15, fontWeight: "bold", marginVertical: 15, marginHorizontal: 17 }}>Informasi Pembayaran</Text></View>
                                <View style={{}}>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20, marginVertical: 10, borderBottomWidth: 0.5, borderColor: "grey", paddingBottom: 5 }}>

                                        <Text style={{ color: "grey" }}>Metode Pembayaran {this.data.payment.va_numbers[0].bank}        :  </Text>

                                        <Text style={{ fontWeight: "bold", textAlign: "left" }}>{this.data.payment.va_numbers[0].va_number} </Text>
                                        {this.data.payment.transaction_status == 'pending' ? <Text
                                            style={{ color: 'red' }}
                                            onPress={() => {
                                                Alert.alert('Virtual Account Sudah Dicopy !', ' Silahkan Masukan No Virtual Account Anda pada web berikut ',
                                                    [{ text: 'Ok', onPress: () => Linking.openURL('https://simulator.sandbox.midtrans.com/bca/va/index') }]);
                                                Clipboard.setString(this.data.payment.va_numbers[0].va_number);
                                                // 
                                            }}
                                        >
                                            Bayar
  </Text> : null}

                                    </View>

                                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20, marginVertical: 10 }}>
                                        <Text style={{ color: "grey" }}>Total Harga (3 Barang)     :</Text>
                                        <Text style={{ fontWeight: "bold", textAlign: "left" }}> Rp.{this.total.item} </Text>

                                    </View>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20, marginVertical: 10 }}>
                                        <Text style={{ color: "grey" }}>Ongkos Kirim                       :</Text>
                                        <Text style={{ fontWeight: "bold", textAlign: "left" }}> Rp.{this.total.deliveryfee} </Text>

                                    </View>







                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20, marginVertical: 10, borderTopWidth: 1, borderColor: "grey", paddingVertical: 10 }}>
                                    <Text style={{ color: "grey" }}>Total Harga ({this.data.products.length} Barang)      :</Text>
                                    <Text style={{ fontWeight: "bold", color: "red" }}> Rp.{this.total.total} </Text>
                                </View>
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

