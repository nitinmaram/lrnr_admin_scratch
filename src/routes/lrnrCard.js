import React from 'react';
import { Button,Search, Header ,Card, Image} from 'semantic-ui-react';
import $ from "jquery";
import {
Form,FormGroup,FormControl,Grid,Col,PanelContainer,Panel,PanelHeader,PanelBody,Row,DropdownButton,MenuItem,ButtonToolbar
} from '@sketchpixy/rubix';
export default class LrnrCard extends React.Component {
  constructor() {
    super();

    this.handleSearchChange=this.handleSearchChange.bind(this)
  }


handleSearchChange(value,e){

  if(typeof(value)=="string")
  {
    e.target.value=value
  this.props.setParentState(e.target.value,e.target.id,this.props.api)
  }
  else {
    this.props.setParentState(value.target.value,value.target.id,this.props.api)
  }
}
render(){
  const {lrnr,name,api}=this.props

  console.log(lrnr);
  var inputStyle={border: 'none', background: 'none',  borderBottom: '1px solid #666' ,borderBottomStyle: "dashed"};
  if(Object.keys(lrnr).length != 0 && lrnr == this.props.lrnr)
  return(
    <PanelContainer>
   <Panel>
     <PanelHeader className='bg-myblack' style={{margin:"0px",padding:"15px"}}>
     <Grid>
       <Row>
       <Col xs={12} className='fg-mycyan'>
         <h3>{api}</h3>
       </Col>
       </Row>
     </Grid>
     </PanelHeader>
     <PanelBody>
    <Card fluid raised style={{boderColor:"white !important"}}>
            <Card.Content>
                <Card.Header>
                    {(Object.keys(lrnr).length === 0)?"":name}
                  </Card.Header>
                  <Card.Meta>
                    {lrnr["Role"]}
                  </Card.Meta>
                <Card.Description>
                <Form horizontal>
          	     {Object.keys(lrnr).map((value,index)=>{
                   if(value=="User Subscriptions"||value=="User Purchases")
                      return(
                        <h3 style={{marginTop:"0px"}}> {value}</h3>
                      )
                      if(value=="Name")
                        return <br/>
                      if(value=="Magic Link")
                        return (
                        <FormGroup >
                          <Col  sm={3} >
                            {value}
                          </Col>
                          <Col sm={9}>
                            {(api=="lrnr")?<FormControl id={value} onChange={this.handleSearchChange} componentClass="textarea" value={lrnr[value]} style={inputStyle}/>:<p>{lrnr[value]}</p>}
                          </Col>
                      </FormGroup>)
                      if(value=="Course")
                      return(
                        <FormGroup >
                          <Col  sm={3} >
                            {value}
                          </Col>
                          <Col sm={9}>
                              <ButtonToolbar>
                              <DropdownButton bsStyle={"link"} title={lrnr[value]} >
                               <MenuItem eventKey="1" id="Course" onClick={this.handleSearchChange.bind(this,value="Action")}>Action</MenuItem>
                               <MenuItem eventKey="2" id="Course"  onClick={this.handleSearchChange.bind(this,value="Another action")}>Another action</MenuItem>
                               <MenuItem eventKey="3"  id="Course"  onClick={this.handleSearchChange.bind(this,value="Active Item")}>Active Item</MenuItem>
                               <MenuItem divider />
                               <MenuItem eventKey="4" id={"Course"}  onClick={this.handleSearchChange.bind(this,value=lrnr["Course"])} >{lrnr["Course"]} </MenuItem>
                               </DropdownButton>
                              </ButtonToolbar>
                          </Col>
                      </FormGroup>)

                    return (
                    <FormGroup >
                      <Col  sm={3} >
                        {value}
                      </Col>
                      <Col sm={9}>
                        {(api=="lrnr")?(value=="Role"||value=="Section")?<p style={{paddingTop:"3px",paddingLeft:"10px"}}>{lrnr[value]}</p>:<FormControl id={value} onChange={this.handleSearchChange} type="text" value={lrnr[value]} style={inputStyle}/>:<p>{lrnr[value]}</p>}
                      </Col>
                  </FormGroup>)
                    }
                    )
                  }
                </Form>
              </Card.Description>
          </Card.Content>
        </Card>
        </PanelBody>
        </Panel>
        </PanelContainer>
  )
  else {
    return(
      <div/>
    )
  }
}


}
