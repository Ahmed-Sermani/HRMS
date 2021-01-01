import React, { useState } from 'react'
import { Card, Row, Col, Typography } from 'antd'
const { Text } = Typography


interface Props {
    basicSalary: string,
    GOSISalary: string,
    totalSalary: string
}


const SalaryPackage: React.FC<Props> = (props: Props) => {
    const [isBlurred, setBlurred] = useState<boolean>(true)

    const style = isBlurred ?
        {
            color: 'transparent',
            textShadow: '0 0 10px rgba(0,0,0,1)'
        } :
        {
            color: 'black',
            textShadow: '0 0 0px rgba(0,0,0,0)'
        }

    return (
        <Card
            title='Salary Package'
            type={'inner'}
            style={{
                marginTop: '20px',

            }}
            onMouseEnter={setBlurred.bind(null, false)}
            onMouseLeave={setBlurred.bind(null, true)}

        >
            <Row justify={'space-around'}>
                <Col>
                    <Row gutter={5} >
                        <Col>
                            <Text type={'secondary'} style={{ ...style }}>
                                Basic Salary :
                            </Text>
                        </Col>
                        <Col>
                            <Text strong style={{ ...style }}>
                                {props.basicSalary}
                            </Text>
                        </Col>
                    </Row>

                </Col>

                <Col>
                    <Row gutter={5} >
                        <Col>
                            <Text type={'secondary'} style={{ ...style }}>
                                GOSI Salary :
                </Text>
                        </Col>
                        <Col>
                            <Text strong style={{ ...style }}>
                                {props.GOSISalary}
                            </Text>
                        </Col>
                    </Row>

                </Col>


                <Col>
                    <Row gutter={5} >
                        <Col>
                            <Text type={'secondary'} style={{ ...style }}>
                                Total Salary :
                            </Text>
                        </Col>
                        <Col>
                            <Text strong style={{ ...style }}>
                                {props.totalSalary}
                            </Text>
                        </Col>
                    </Row>

                </Col>
            </Row>
        </Card>
    )
}

export default SalaryPackage