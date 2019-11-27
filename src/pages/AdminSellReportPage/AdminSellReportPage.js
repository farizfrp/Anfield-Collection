import React, { Component } from 'react';
import { Text, View, Image, ScrollView, TextInput, Button,TouchableOpacity,FlatList,ActivityIndicator,StatusBar,picker } from 'react-native';
import { Actions } from 'react-native-router-flux';
import DateTimePicker from "react-native-modal-datetime-picker";
//import { auth } from 'firebase-admin';



export default class AdminSellReportPage extends Component {
 date={end:new Date(),start:new Date()}
 
    state = {

        isLoading: true,
        error: null,
        x: [],
        isResult: this.isResult(),
        isDateTimePickerVisible: false,
        isStartDateTimePickerVisible:false,
        isEndDateTimePickerVisible:false,
        date:{end:this.date.end,start:new Date(this.date.start.setMonth(this.date.start.getMonth()-1))}

    };
 
    reportParam={start:0,end:0,merchant:global.userid}
orders=[];
total=0;
date={start:this.state.date.start,end:this.state.date.end}
isResult(){
result =true;

if(typeof this.props.lessThan === 'undefined'){

return false;
}
else{

  this.state.date.end=this.props.date.end;
this.state.date.start=this.props.date.start;
    return result;
  
  }
}


showStartDateTimePicker = () => {
    console.log("a7x")
    this.setState({ isStartDateTimePickerVisible: true });
 
  };
 
  hideStartDateTimePicker = () => {
    this.setState({ isStartDateTimePickerVisible: false });
  };
 
  handleStartDatePicked = date => {
   
    this.state.date.start=date;
    this.date.start=date;
//   /  this.setState( date.start: date });
    this.hideStartDateTimePicker();
  };


  showEndDateTimePicker = () => {
    this.setState({ isEndDateTimePickerVisible: true });
  };
 
  hideEndDateTimePicker = () => {
    this.setState({ isEndDateTimePickerVisible: false });
  };
 
  handleEndDatePicked = date => {
    this.state.date.end=date;
    this.date.end=date;
    console.log("A End date has been picked: ", date);
    this.hideEndDateTimePicker();
  };
   async componentDidMount() {
     this.getReport()

        if(this.props.range){
        this.range=this.props.range;
       // await this.getProducts();
        this.setState({isResult:true})
        }
        //console.log('Range', this.range);
    }
    async getReport() {
      this.setState({ isLoading: true });
      
     //   ip = '192.168.1.7';
        let x = await fetch('http://' + ip + ':3001/getAdminSellReport', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({data:{"merchant":"spPR3mbUETQ6aeXwtNuSdyxzIbV2","start":this.state.date.start,"end":this.state.date.end}})
      }).then((response) => response.json())
      .then((responseJson) => {
        this.orders=responseJson.result;
        this.total=responseJson.total;
        
        this.setState({ isLoading: false });
          
          this.setState({isResult:true})
         this.state.isResult=true;
      })
      .catch((error) => {
          console.log(error.message);
      });

    }
    render(){
    
        if (this.state.isLoading) {

            console.log('isLoading broo');

            return (<View style={{ flex: 1, padding: 20 }}>
                <ActivityIndicator />
                <StatusBar barStyle="dark-content" />
                <View>
                <Text>LOADINGGGGGGGGGG</Text>
                </View>
            </View>);
        }
       
    return (
        
        
        <ScrollView>
        <View>
        <Text>Sell Report Page</Text>
                        <Text>Tanggal Mulai</Text>
                        <>
        <Button style={{height:50}} title={this.state.date.start.toLocaleDateString()} onPress={this.showStartDateTimePicker} />
        <DateTimePicker
        date={this.state.date.start}
          isVisible={this.state.isStartDateTimePickerVisible}
          onConfirm={this.handleStartDatePicked}
          onCancel={this.hideStartDateTimePicker}
        />
      </>
                    
                    
                        <Text>Tanggal Selesai </Text>
                        <>
        <Button title={this.state.date.end.toLocaleDateString()} onPress={this.showEndDateTimePicker} />
        <DateTimePicker
          isVisible={this.state.isEndDateTimePickerVisible}
          onConfirm={this.handleEndDatePicked}
          onCancel={this.hideEndDateTimePicker}
        />
      </>
                   
       
                    <Button
          title="Show"
          color="red"
          onPress={() => this.getReport()}
        />
             <Text>Total : {this.total} </Text>   
    
                
          
          <FlatList 
data={this.orders}
keyExtractor={(item, index) => item.id }
numColumns={1}
renderItem={({item}) => (   
  <View><TouchableOpacity onPress={() => Actions.ReportDatePage({orders:item })} >
  <View style={{ marginTop: 10, marginHorizontal: 10, height: 30, backgroundColor: "#daffc2", borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
      <Text style={{ textAlign: "center", marginTop: 5 }}>{""}</Text>
  </View>
  <View style={{ marginHorizontal: 10, backgroundColor: "#f5f6f7", flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 1, borderColor: "grey" }}>
      <Text style={{ fontWeight: "bold", fontSize: 12, marginHorizontal: 20, marginVertical: 5 }}>INV/2019002/001</Text>
      <Text style={{ color: "grey", fontSize: 11, marginHorizontal: 20, marginVertical: 5 }} >{item.date}</Text>

  </View>
  <View style={{ borderBottomWidth: 1, borderColor: "grey", marginHorizontal: 10, borderBottomRightRadius: 10, borderBottomLeftRadius: 10 }}>
      <View style={{ flexDirection: "row", backgroundColor: "#f5f6f7" }}>
          <View style={{ marginTop: 30 }}>
              <Image source={{ uri: item.orders[0].data[0].imageURL[0] }} style={{ marginHorizontal: 20, borderRadius: 15, height: 90, width: 85 }}></Image></View>
          <View style={{ marginHorizontal: 25, marginVertical: 45 }}>
              <Text style={{}}>{item.orders[0].data[0].name} </Text>
              <Text style={{ color: "grey", fontSize: 12 }}>{item.orders.length} Order</Text>
              <Text style={{ color: "red" }}>Rp.{item.total} </Text>

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