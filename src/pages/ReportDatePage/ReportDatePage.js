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
renderItem={({item}) => (   
  <View><TouchableOpacity onPress={() =>
   Actions.ReportOrderDetails({ paymentStatus:item.transaction_status,shipping:item.shipping,customer:"customer",
   date:this.props.orders.date,invoice:item.invoice,total:item.total,products:item.data,
   id:item.id,userid:item.userid
    })} >
  <View style={{ marginTop: 10, marginHorizontal: 10, height: 30, backgroundColor: "#daffc2", borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
      <Text style={{ textAlign: "center", marginTop: 5 }}>{""}</Text>
  </View>
  <View style={{ marginHorizontal: 10, backgroundColor: "#f5f6f7", flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 1, borderColor: "grey" }}>
      <Text style={{ fontWeight: "bold", fontSize: 12, marginHorizontal: 20, marginVertical: 5 }}>INV : {item.invoice}</Text>
      <Text style={{ color: "grey", fontSize: 11, marginHorizontal: 20, marginVertical: 5 }} >{"Customer"}</Text>

  </View>
  <View style={{ borderBottomWidth: 1, borderColor: "grey", marginHorizontal: 10, borderBottomRightRadius: 10, borderBottomLeftRadius: 10 }}>
      <View style={{ flexDirection: "row", backgroundColor: "#f5f6f7" }}>
      <View style={{ marginTop: 30 }}>
              <Image source={{ uri: item.data[0].imageURL[0] }} style={{ marginHorizontal: 20, borderRadius: 15, height: 90, width: 85 }}></Image></View>
          <View style={{ marginHorizontal: 25, marginVertical: 45 }}>
              <Text style={{}}> </Text>
              <Text style={{ color: "grey", fontSize: 11, marginHorizontal: 20, marginVertical: 5 }} >{"Customer"}</Text>
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