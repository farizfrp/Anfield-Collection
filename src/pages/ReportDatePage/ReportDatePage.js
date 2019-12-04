import React, { Component } from 'react';
import { Text, View, Image, ScrollView, TextInput, Button,TouchableOpacity,FlatList,ActivityIndicator,StatusBar,picker } from 'react-native';
import { Actions } from 'react-native-router-flux';
import DateTimePicker from "react-native-modal-datetime-picker";
//import { auth } from 'firebase-admin';



export default class ReportDatePage extends Component {
 date={end:new Date(),start:new Date()}
 
    state = {

        isLoading: true,
        error: null,
       
    
    };
 
  orders;
  orders=this.props.orders;

   async componentDidMount() {
    data=this.props.orders;
console.log("order",data)
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
   
    render(){
   
       
    return (
        
        
        <ScrollView>
        <View>
        <Text>sell by date detail</Text>
        <Text>Total : Rp.{this.props.orders.total}</Text>
       
          
          <FlatList 
data={this.props.orders.orders.reverse()}
//keyExtractor={(item, index) => item.id }
numColumns={1}
renderItem={({item}) => (  <View><TouchableOpacity onPress={() =>
    Actions.ReportOrderDetails({ payment:item.payment,paymentStatus:item.transaction_status,shipping:item.shipping,customer:item.username,
    date:item.date,invoice:item.invoice,total:item.total,products:item.data,merchantname:item.merchantname,
    id:item.id,userid:item.userid,username:item.username,status:this.getStatus(item.transaction_status,item.shipping.status)
     })} >
   <View style={{ marginTop: 10, marginHorizontal: 10, height: 30, backgroundColor: "#daffc2", borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
       <Text style={{ textAlign: "center", marginTop: 5 }}>{this.getStatus(item.transaction_status,item.shipping.status)}</Text>
   </View>
   <View style={{ marginHorizontal: 10, backgroundColor: "#f5f6f7", flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 1, borderColor: "grey" }}>
       <Text style={{ fontWeight: "bold", fontSize: 12, marginHorizontal: 20, marginVertical: 5 }}>{item.id}</Text>
       <Text style={{ color: "grey", fontSize: 11, marginHorizontal: 20, marginVertical: 5 }} >{
       (new Date(this.orders.date)).toLocaleDateString('id-ID',{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</Text>
 
   </View>
   <View style={{ borderBottomWidth: 1, borderColor: "grey", marginHorizontal: 10, borderBottomRightRadius: 10, borderBottomLeftRadius: 10 }}>
       <View style={{ flexDirection: "row", backgroundColor: "#f5f6f7" }}>
       <View style={{ marginTop: 30 }}>
               <Image source={{ uri: item.data[0].imageURL[0] }} style={{ marginHorizontal: 20, borderRadius: 15, height: 90, width: 85 }}></Image></View>
           <View style={{ marginHorizontal: 25, marginVertical: 45 }}>
               <Text > {item.data[0].name}</Text>
               <Text style={{ color: "grey"}}  >{item.username}</Text>
               <Text style={{ color: "grey", fontSize: 12 }}>{item.data.length} Jenis Barang</Text>
               <Text style={{ color: "red" }}>Total : Rp.{item.total} </Text>
 
           </View>
       </View>
   </View></TouchableOpacity></View>
)}
/>
                      

                    </View>
                      
                      
                    
                    
                      
                      </ScrollView>
      
       
    )
}

}