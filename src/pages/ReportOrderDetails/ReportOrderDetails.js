import React, { Component } from 'react';
import { Text, View, Image, ScrollView, TextInput, Button,TouchableOpacity,FlatList,ActivityIndicator,StatusBar,picker,Linking } from 'react-native';
import {Overlay,Icon} from 'react-native-elements';
import { Actions} from 'react-native-router-flux';
//import { auth } from 'firebase-admin';



export default class ReportOrderDetails extends Component {
 date={end:new Date(),start:new Date()}
 
    state = {

        isLoading: true,
        error: null,
       isVisible:false,
       query:''
    
    };
 data=this.props.products;
 shipping=this.props.shipping;
  orders;
  orders=this.props.orders;
   async componentDidMount() {
   // this.orders=this.props.orders;
  
// console.warn("ord",this.orders.orders)
// console.warn("ord",this.orders.orders.length)
    }
    getStatus(paymentStatus,shippingStatus) {
      var status = "undefined";
    
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
onSubmit() {
  
  var status = "ongoing";
  var orderId = this.props.id;
  var shipping = this.shipping;
  shipping.trackingnumber = this.state.query;
  shipping.status = status;




 
  let x = fetch('http://' + ip + ':3001/updateShipping', {
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
    render(){
      var total=this.props.total;
      var invoice=this.props.invoice;
      var customer=this.props.customer;
      var date=this.props.date;
      var paymentStatus=this.props.paymentStatus;
      var shippingStatus=this.props.shipping.status;
    return (
        
     
        <ScrollView>
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
        <Text>Order Report Detail</Text>
        <Text>Date : {date}</Text>
        <Text>Status : {this.getStatus(paymentStatus,shippingStatus)}</Text>
        <Text>Total :Rp.{total}</Text>
        <Text>Invoice :   <Text
    style={{color: 'red'}}
    onPress={() => {Linking.openURL(invoice)}}
  >
    {invoice}
  </Text></Text>
        <Text>Customer : {customer}</Text>
       {this.renderTrackingButton(this.getStatus(paymentStatus,shippingStatus))} 
          <FlatList 
data={this.props.products}
//keyExtractor={(item, index) => item.id }
numColumns={1}
renderItem={({item}) => (   
  <View>
  <View style={{ marginTop: 10, marginHorizontal: 10, height: 30, backgroundColor: "#daffc2", borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
      <Text style={{ textAlign: "center", marginTop: 5 }}>{""}</Text>
  </View>
  <View style={{ marginHorizontal: 10, backgroundColor: "#f5f6f7", flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 1, borderColor: "grey" }}>
      <Text style={{ fontWeight: "bold", fontSize: 12, marginHorizontal: 20, marginVertical: 5 }}>INV : {item.total}</Text>
      <Text style={{ color: "grey", fontSize: 11, marginHorizontal: 20, marginVertical: 5 }} >{item.name}</Text>

  </View>
  <View style={{ borderBottomWidth: 1, borderColor: "grey", marginHorizontal: 10, borderBottomRightRadius: 10, borderBottomLeftRadius: 10 }}>
      <View style={{ flexDirection: "row", backgroundColor: "#f5f6f7" }}>
      <View style={{ marginTop: 30 }}>
              <Image source={{ uri: item.imageURL[0] }} style={{ marginHorizontal: 20, borderRadius: 15, height: 90, width: 85 }}></Image></View>
          <View style={{ marginHorizontal: 25, marginVertical: 45 }}>
              <Text style={{}}> </Text>
              <Text style={{ color: "grey", fontSize: 11, marginHorizontal: 20, marginVertical: 5 }} >{item.name}</Text>
              <Text style={{ color: "grey", fontSize: 12 }}>{item.quantity} Barang</Text>
              <Text style={{ color: "red" }}>Total : Rp.{item.total} </Text>

          </View>
      </View>
  </View></View>
)}
/>
                      

                    </View>
                      
                      
                    
                    
                      
                      </ScrollView>
      
       
    )
}

}