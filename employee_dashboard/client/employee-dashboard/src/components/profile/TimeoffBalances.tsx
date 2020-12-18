import React from 'react'
import { Card, Row, Col, Avatar } from "antd";
import  Airplane from '../images/Airplane'

const TimeoffBalances: React.FC = () => {
    return (
        <Card
            title = 'Timeoff Balances'
            type = {'inner'}
            style={{
                marginTop: '20px'
            }}
        >
            <Row justify={'space-around'}>
                <Col>
                    <Avatar 
                        size={150}
                        icon={<Airplane />}
                        style={{
                            backgroundColor: 'white',
                            border: "border: 1px solid #cea9a9"
                        }}
                    
                    />

                    
                </Col>


                <Col>
                ssssssss
                </Col>
            </Row>
        </Card>
    )
}

export default TimeoffBalances