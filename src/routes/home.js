import React from 'react';
import { Button,Search, Header ,Card, Image} from 'semantic-ui-react';
import $ from "jquery";
import {
Form,FormGroup,FormControl,Grid,Col,Well,PanelContainer,Panel,PanelHeader,PanelBody,Row
} from '@sketchpixy/rubix';
import LrnrCard from './lrnrCard'

export default class Home extends React.Component {

  constructor() {
    super();
    this.setParentState=this.setParentState.bind(this);
    this.state = {ucm:{}, lrnr:{}}
  }
componentWillMount() {
  this.resetComponent()
}
shouldComponentUpdate(nextProps, nextState){
   return this.state !== nextState;
   // and compare any props that might cause an update
}
resetComponent = () => this.setState({ isLoading: false, results: [], value: '',card:[""] })

handleResultSelect = (e, { result }) => {
  console.log("hai");
this.setState((prevState) => {
  return {
  value: result.title ,
  // ucmcard:(<LrnrCard lrnr={prevState.ucm} name={prevState.name} setParentState={this.setParentState} api={"ucm"}/>)
}});

}
setParentState(val,id,api){
this.setState((prevState)=>{
  prevState[api][id]=val;
  return {
    [api]:{...prevState[api]},
    lrnrcard:(<LrnrCard lrnr={prevState.lrnr} name={prevState.name} setParentState={this.setParentState} api={"lrnr"}/>),
    ucmcard:(<LrnrCard lrnr={prevState.ucm} name={prevState.name} setParentState={this.setParentState} api={"ucm"}/>)
}
})
}
handleSearchChange = (e, { value }) => {//ebrindisi@mvcc.edu
  if(e.target.value == "")
  {
    this.resetComponent()
  }
  this.setState({ isLoading: true, value })
  let lrnrPromise = new Promise(
   (resolve, reject) => {
  $.ajax({
      url: "https://web.lrnr.us/slack/getUserDetails?token=cUDqXAsejbqCG1xvfjGJI1Q4&text="+value,
      type: "POST",
      datatype:'JSON',
      success: function(data){
        resolve(data)
        },
      error:function(data){
        console.log(data,"ERR");
        resetComponent();
      }
  });
}
);
  $.ajax({
      url: "http://lrnr.us:8080/api/lrnr/user_details?token=RIaAlSR35EjkBWMJslGn92BE&text="+value,
      type: "POST",
      datatype:'JSON',
      success: function(ucmData){
        var results;
        lrnrPromise.then((lrnrData)=>{
          if(lrnrData.attachments)
            results=(lrnrData.attachments.length>1)?(ucmData.attachments)?[{description:lrnrData.attachments[0].text.split(":")[1].trim(),
                price:"lrnr/UCM",
                title:lrnrData.text.replace(/[*`]/g,"")}]:[{description:lrnrData.attachments[0].text.split(":")[1].trim(),
                    price:"lrnr",
                    title:lrnrData.text.replace(/[*`]/g,"")}]:(ucmData.attachments)?[{description:"Lrnr Enrollment  "+ucmData.attachments[9].text.split(":")[1].trim(),
                        price:"UCM",
                        title:ucmData.attachments[0].text.split(":")[1].trim()}]:[]
                        else {
                          results=[]
                        }
                this.setState({
                   isLoading: false,
                   results:results,
                   name:(lrnrData.attachments)?((lrnrData.attachments.length>1)?lrnrData.text.replace(/[*`]/g,""):(ucmData.attachments)?ucmData.attachments[0].text.split(":")[1].trim():""):"",
                   lrnr:(lrnrData.attachments)?((lrnrData.attachments.length>1)?lrnrData.attachments.reduce((acc,cur)=>{
                     var addr=(cur.text.split(":")[2])?cur.text.split(":")[2].trim():""
                     acc[cur.text.split(":")[0].trim()]=cur.text.split(":")[1].trim()+addr
                     return acc},{}):{}):{},
                    ucm:(ucmData.attachments)?ucmData.attachments.reduce((acc,cur)=>{
                      if(cur.text.includes(":"))
                        acc[cur.text.split(":")[0].trim()]=cur.text.split(":")[1].trim()
                      else {
                        var title=cur.text.replace(/[*=]/g,"")
                        if(title)
                          acc[title]=title
                      }
                      return acc;
                    },{}):{}
                })
        })
      }.bind(this),
      error:function(data){
        console.log(data,"ERR");
        resetComponent();
      }
  });
}
  render() {
    const { isLoading, value, results,lrnrcard,ucmcard } = this.state

    // lrnrcard:(<LrnrCard lrnr={this.state.lrnr} name={this.state.name} setParentState={this.setParentState} api={"lrnr"}/>),
    // ucmcard:(<LrnrCard lrnr={this.state.ucm} name={this.state.name} setParentState={this.setParentState} api={"ucm"}/>)
    return (
      <div>
      <br/>
        <br/>
        <Grid >
            <Col md={2} xs={3}/>
            <Col md={8}  xs={12}>
            <Search
                   loading={isLoading}
                   onResultSelect={this.handleResultSelect}
                   onSearchChange={this.handleSearchChange}
                   results={results}
                   value={value} id="simSearch" fluid
                   PanelHeader = "Enter Email."
                 />
            </Col>
            <Col md={2}  xs={3}/>
        </Grid>
          <br/><br/>
         <br/>
         <Grid >

             <Col  md={6} xs={12} >
              <LrnrCard lrnr={this.state.ucm} name={this.state.name} setParentState={this.setParentState} api={"ucm"}/>
             </Col>
             <Col  md={6}  xs={12}  >
             <LrnrCard lrnr={this.state.lrnr} name={this.state.name} setParentState={this.setParentState} api={"lrnr"}/>
             </Col>

         </Grid>
         </div>
    );
  }
}
