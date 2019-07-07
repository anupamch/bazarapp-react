import React,{Component} from 'react'
import { Container, Row, Col } from "shards-react";
import PageTitle from "../components/common/PageTitle";
class Dashboard extends Component{
    render(){
       
        return(<Container fluid className="main-content-container px-4">
             <Row noGutters className="page-header py-4">
            <PageTitle sm="4" title="Dashboard" subtitle="Admin Dashboard" className="text-sm-left" />
            </Row>
            Welcome Admin
            </Container>)
    };
}

export default Dashboard