import React from 'react'
import { Card, Row, Col, Typography } from "antd";
const { Text } = Typography

interface Props {
    jobTitle: string,
    workType: string,
    directManager: string,
    branch: string,
    workLocation: string,
    department: string,
    section: string,
    hiringDate: string,
    periodOfEmployment: string,
    endOfProbation: string

}
const ProfessionalInfos: React.FC<Props> = (props: Props) => {
    return(
        <Card title='Professional Info' type={'inner'}>
            <Row justify={'space-around'}>
                <Col>
                <Row gutter={5} >
                    <Col>
                        <Text type={'secondary'}>
                            Job Title :
                        </Text>
                    </Col>
                    <Col>
                        <Text strong>
                            {props.jobTitle}
                        </Text>
                    </Col>
                </Row>
                <Row gutter={5}>
                    <Col>
                        <Text type={'secondary'}>
                            Work Type :
                        </Text>
                    </Col>
                    <Col>
                        <Text strong>
                            {props.workType}
                        </Text>
                    </Col>
                </Row>

                <Row gutter={5}>
                    <Col>
                        <Text type={'secondary'}>
                            Direct Manager :
                        </Text>
                    </Col>
                    <Col>
                        <Text strong>
                            {props.directManager}
                        </Text>
                    </Col>
                </Row>
                </Col>


                <Col>
                <Row gutter={5}>
                    <Col>
                        <Text type={'secondary'}>
                            Branch :
                        </Text>
                    </Col>
                    <Col>
                        <Text strong>
                            {props.branch}
                        </Text>
                    </Col>
                </Row>
                <Row gutter={5}>
                    <Col>
                        <Text type={'secondary'}>
                            Work location :
                        </Text>
                    </Col>
                    <Col>
                        <Text strong>
                            {props.workLocation}
                        </Text>
                    </Col>
                </Row>

                <Row gutter={5}>
                    <Col>
                        <Text type={'secondary'}>
                            Department :
                        </Text>
                    </Col>
                    <Col>
                        <Text strong>
                            {props.department}
                        </Text>
                    </Col>
                </Row>

                <Row gutter={5}>
                    <Col>
                        <Text type={'secondary'}>
                            Section :
                        </Text>
                    </Col>
                    <Col>
                        <Text strong>
                            {props.section}
                        </Text>
                    </Col>
                </Row>
                </Col>


                <Col>
                <Row gutter={5}>
                    <Col>
                        <Text type={'secondary'}>
                            Hiring Date :
                        </Text>
                    </Col>
                    <Col>
                        <Text strong>
                            {props.hiringDate}
                        </Text>
                    </Col>
                </Row>
                <Row gutter={5}>
                    <Col>
                        <Text type={'secondary'}>
                            End of Probation :
                        </Text>
                    </Col>
                    <Col>
                        <Text strong>
                            {props.endOfProbation}
                        </Text>
                    </Col>
                </Row>

                <Row gutter={5}>
                    <Col>
                        <Text type={'secondary'}>
                             Period of Employment :
                        </Text>
                    </Col>
                    <Col>
                        <Text strong>
                            {props.periodOfEmployment}
                        </Text>
                    </Col>
                </Row>
                </Col>
            </Row>
        </Card>
    )
}

export default ProfessionalInfos