import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import PerformEvalModal from '../../components/PerformEvalModal'

function WURK() {
    return (
        <Container fluid>
            <Row>
                <Col>
                    <h1 className='wurklo__textColor mb-0 text-center'>Pending</h1>
                </Col>
            </Row>
            <Row className='m-5 mb-5'>

            </Row>
            <Row>
                <Col>
                    <h1 className='wurklo__textColor mb-0 text-center'>Hired</h1>
                </Col>
            </Row>
            <Row className='m-5 mb-5'>

            </Row>
            <Row>
                <Col>
                    <h1 className='wurklo__textColor mb-0 text-center'>Completed</h1>
                </Col>
            </Row>
            <Row className='m-5 mb-5'>
                <PerformEvalModal />
            </Row>
            <Row>
                <Col>
                    <h1 className='wurklo__textColor mb-0 text-center'>Fired</h1>
                </Col>
            </Row>
            <Row className='m-5 mb-5'>

            </Row>
        </Container>
    )
}

export default WURK