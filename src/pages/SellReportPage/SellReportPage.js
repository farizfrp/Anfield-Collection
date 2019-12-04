import React, { Component } from 'react';
import { Dimensions,View, Image, ScrollView, TextInput, TouchableOpacity,FlatList,ActivityIndicator,StatusBar,picker } from 'react-native';
import { Container, Header, Content, Button, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';
import { Actions } from 'react-native-router-flux';
import DateTimePicker from "react-native-modal-datetime-picker";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
//import { auth } from 'firebase-admin';



export default class SellReportPage extends Component {
 date={end:new Date(),start:new Date()}
 
    state = {

        isLoading: true,
        error: null,
        x: [],
        isResult: this.isResult(),
        isDateTimePickerVisible: false,
        isStartDateTimePickerVisible:false,
        isEndDateTimePickerVisible:false,
        date:{end:this.date.end,start:new Date(this.date.start.setMonth(this.date.start.getMonth()-1))},
        labels:[],
        data:[]

    };
 
    reportParam={start:0,end:0,merchant:global.userid}
orders=[];
total=0;
quantity=0;
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
   console.log('xsxs')
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
        let x = await fetch(ip + '/getSellReport', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({data:{"merchant":global.userid,"start":this.state.date.start,"end":this.state.date.end}})
      }).then((response) => response.json())
      .then((responseJson) => {
        this.orders=responseJson.result;
        this.total=responseJson.total;
        this.quantity=responseJson.quantity;
       var data = this.orders.map(a => Number((a.total.replace(',','').substring(0,a.total.length-4))));
       data.reverse()
       console.log(data)
       var labels =this.orders.map(a => (new Date(a.date)).toLocaleDateString('id-ID'));
       labels.reverse()
       console.log(labels)
       this.setState({ data });
       this.setState({ labels });
        console.log("report",this.orders);
        this.setState({ isLoading: false });
          
          this.setState({isResult:true})
         this.state.isResult=true;
      })
      .catch((error) => {
        this.setState({ isLoading: false });
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
  <Text>Bezier Line Chart</Text>
  <LineChart

    data={{
      labels: this.state.labels,
      datasets: [
        {
          data: this.state.data
        }
      ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={220}
    yAxisLabel={"Rp."}
    yAxisSuffix={"k"}
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 0, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
</View>
        <View>
      
    
                        <Text>Tanggal Mulai</Text>
                        <>
                        <ListItem onPress={this.showStartDateTimePicker} >
            <Left>
              <Button style={{  backgroundColor: "#FF9501" }}>
                <Icon active name="play" ></Icon>
              </Button>
              <Text  style={{ left:20}}>{this.state.date.start.toLocaleDateString('id-ID',{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</Text>
            </Left>
            
            
          
            <Right>
            <Icon active name="arrow-forward" />
            </Right>
</ListItem>


        <DateTimePicker
        date={this.state.date.start}
          isVisible={this.state.isStartDateTimePickerVisible}
          onConfirm={this.handleStartDatePicked}
          onCancel={this.hideStartDateTimePicker}
        />
      </>
                    
                    
                        <Text>Tanggal Selesai </Text>
                        <>
                        <Content>
                        <ListItem onPress={this.showEndDateTimePicker} >
            <Left>
              <Button style={{  backgroundColor: "#FF9501" }}>
                <Icon active name="square" ></Icon>
              </Button>
              <Text  style={{ left:20}}>{this.state.date.end.toLocaleDateString('id-ID',{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</Text>
            </Left>
            
            
          
            <Right>
            <Icon active name="arrow-forward" />
            </Right>
</ListItem></Content>
        <DateTimePicker
          isVisible={this.state.isEndDateTimePickerVisible}
          onConfirm={this.handleEndDatePicked}
          onCancel={this.hideEndDateTimePicker}
        />
      </>
                   
       
                    <Button
          onPress={() => this.getReport()}
        ><Body><Text style={{ color:"white" }}>SHOW</Text></Body></Button>
           <View style={{marginTop:15,}}>
                <Text style={{fontWeight: 'bold',textAlign:"center",textDecorationLine: 'underline'}} >Orders</Text>
          
          <FlatList 
data={this.orders}
keyExtractor={(item, index) => item.id }
numColumns={1}
renderItem={({item}) => ( <ListItem onPress={()=> Actions.ReportDatePage({orders:item })}>
<Left>
    <Text>{(new Date(item.date)).toLocaleDateString('id-ID',{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) + ' ('+item.orders.length+' order)'}</Text>
    <Text>{' Rp.'+item.total}</Text>
</Left>
<Right>
  <Icon name="arrow-forward" />
</Right>
</ListItem>
)}
/>
</View>
<ListItem onPress={()=>Actions.OrderListPage()} >
      
      <Button style={{ width:"50%", backgroundColor: "#FF9501" }}>
      
        <Body>
        <Text style={{ color:"white" }} >Rp. {this.total}</Text></Body>
      </Button>
     
   
    
    
  
    
    <Button style={{ width:"50%", backgroundColor: "blue" }}>
   
        <Body>
           <Text style={{ color:"white" }}>{this.quantity} Qty</Text></Body>
       </Button>

    
  </ListItem>
                      

                    </View>
                      
                      
                    
                    
                      
                      </ScrollView>
      
       
    )
}

}