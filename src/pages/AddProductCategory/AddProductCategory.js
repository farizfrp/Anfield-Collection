import React, { Component } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import Swipeout from 'react-native-swipeout';
import { Actions } from 'react-native-router-flux';

export default class AddProductCategory extends Component {

  constructor(props){
    super(props);
    this.state = {
      textInput : [],
      inputData : []
    }
  }




 async componentDidMount(){
 var type = this.props.data;
var categories = await this.getCategories(type);

var index=0;
for(var cat of categories){
  
  this.addTextInput(index,cat.name)
  this.addValues(cat.name, index)
index++;
}

  }


  async getCategories(type) {

       
    //   ip = '192.168.1.7';
       let x = await fetch(ip + '/getCategoriesType', {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({type : type})
     }).then((response) => response.json())
     .then((responseJson) => {
       var result =responseJson[0].value;
       this.setState({ isLoading: false });
       
      
        return result;
     })
     .catch((error) => {
         console.log(error.message);
     });
return x;
   }


async updateCategories(){
var categories = this.state.inputData.map(function (row) {

  return { name:row.text }
})
  let x = await fetch(ip + '/updateCategories', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({type : this.props.data,value:categories})
  }).then((response) => response.json())
  .then((responseJson) => {
   console.log("Update Berhasil")
  })
  .catch((error) => {
      console.log(error.message);
  });



}
   async onSubmit() {
console.log("onSubmit")
    await this.updateCategories()
    Actions.CategoryManagementPage();
}

  //function to add TextInput dynamically
  addTextInput = (index,value) => {
    
    let swipeBtns = [
      {
        text: 'Delete',
        backgroundColor: 'red',
        underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
        onPress: () => { this.removeTextInput(index) }
     }
    ];
    let textInput = this.state.textInput;
    textInput.push(<Swipeout right={swipeBtns}
      autoClose='true'
      backgroundColor= 'transparent'><TextInput id={index} style={styles.textInput} defaultValue={value}
      onChangeText={(text) => this.addValues(text, index)} /></Swipeout>);
    this.setState({ textInput });
  }

  //function to remove TextInput dynamically
  removeTextInput = (index,id) => {
    let textInput = this.state.textInput;
    let inputData = this.state.inputData;
    
    delete textInput[index]
    inputData.splice(index,1);
    this.setState({ textInput,inputData });
  }

  //function to add text from TextInputs into single array
  addValues = (text, index) => {
    let dataArray = this.state.inputData;
    let checkBool = false;
    if (dataArray.length !== 0){
      dataArray.forEach(element => {
        if (element.index === index ){
          element.text = text;
          checkBool = true;
        }
      });
    }
    if (checkBool){
    this.setState({
      inputData: dataArray
    });
  }
  else {
    dataArray.push({'text':text,'index':index});
    this.setState({
      inputData: dataArray
    });
  }
  }

  //function to console the output
  getValues = () => {

  }


  render(){
    return(
      <View>
        <View style= {styles.row}>
          <View style={{margin: 10}}>
        <Button title='Add' onPress={() => this.addTextInput(this.state.textInput.length)} />
        </View>
        <View style={{margin: 10}}>
        <Button title='Remove' onPress={() => this.removeTextInput()} />
        </View>
        </View>
        {this.state.textInput.map((value) => {
        
          return value
        })}
   
        <Button title='Simpan ' onPress={() => this.onSubmit()} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  buttonView: {
  flexDirection: 'row'
  },
  textInput: {
  height: 40,
  borderColor: 'black', 
  borderWidth: 1,
  margin: 20
},
row:{
  flexDirection: 'row',
  justifyContent: 'center'
  },
});

