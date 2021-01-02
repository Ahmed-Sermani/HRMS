import React from 'react'
import { Row, Col, Typography, } from "antd";
const { Title, Text } = Typography

interface Props {
    gender: string,
    birthDay: string,
    maritalStatus: string,
    nationality: string,
    age: number,
    nationalId: string
}


const PersonalInfos: React.FC<Props> = (props:Props) => {

    return (
        <>
        <Title level={5}> Personal Info </Title>
        <Row gutter={40}>
            <Col>
                <Row gutter={5}>
                    <Col>
                        <Text type={'secondary'}>
                            Gender :
                </Text>
                    </Col>
                    <Col>
                        <Text strong>
                            {props.gender}
                </Text>
                    </Col>
                </Row>
                <Row gutter={5}>
                    <Col>
                        <Text type={'secondary'}>
                            Birth Date :
                </Text>
                    </Col>
                    <Col>
                        <Text strong>
                            {props.birthDay}
                </Text>
                    </Col>
                </Row>

                <Row gutter={5}>
                    <Col>
                        <Text type={'secondary'}>
                            Marital Status :
                </Text>
                    </Col>
                    <Col>
                        <Text strong>
                            {props.maritalStatus}
                </Text>
                    </Col>
                </Row>

            </Col>
            <Col>

                <Row gutter={5}>
                    <Col>
                        <Text type={'secondary'}>
                            Nationality :
                </Text>
                    </Col>
                    <Col>
                        <Text strong>
                            {props.nationality}
                </Text>
                    </Col>
                </Row>

                <Row gutter={5}>
                    <Col>
                        <Text type={'secondary'}>
                            Age :
                </Text>
                    </Col>
                    <Col>
                        <Text strong>
                            {props.age}
                </Text>
                    </Col>
                </Row>

                <Row gutter={5}>
                    <Col>
                        <Text type={'secondary'}>
                            National ID :
                </Text>
                    </Col>
                    <Col>
                        <Text strong>
                            {props.nationalId}
                </Text>
                    </Col>
                </Row>
            </Col>
        </Row>
        </>
        )


}


export default React.memo(PersonalInfos)