import React,{Component} from 'react';
import axios from 'axios'
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import PageTitle from "../components/common/PageTitle";
export default class User extends Component{
    constructor(props){
        super(props);
        this.state={ulist:[]}
    }
    componentWillMount(){
        axios.get('http://localhost:8080/users')
            .then(res=>{
                console.log(res.data)
                this.setState({ulist:res.data.users})
            })
            .catch(error=>{
                
            })
    }

    render(){
        return(<Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="User List" subtitle="All Users" className="text-sm-left" />
        </Row>
    
        {/* Default Light Table */}
        <Row>
          <Col>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0">Active Users</h6>
              </CardHeader>
              <CardBody className="p-0 pb-3">
                <table className="table mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th scope="col" className="border-0">
                        #
                      </th>
                      <th scope="col" className="border-0">
                        First Name
                      </th>
                      <th scope="col" className="border-0">
                        Last Name
                      </th>
                      <th scope="col" className="border-0">
                        Phone
                      </th>
                      <th scope="col" className="border-0">
                        Address
                      </th>
                      <th scope="col" className="border-0">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                      {this.state.ulist.map((listvalue,index)=>{
                          return  <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{listvalue.firstName}</td>
                                    <td>{listvalue.lastName}</td>
                                    <td>{listvalue.address}</td>
                                    <td>{listvalue.phone}</td>
                                    <td>{listvalue.landmark}</td>
                                    </tr>
                      })}
               
                </tbody>
                </table>
              </CardBody>
             </Card>
             </Col>
            </Row>
        </Container>)
    }
}