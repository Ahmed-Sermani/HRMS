import React from 'react'
import { Row, Col, Typography } from "antd"
const { Text } = Typography
const BasicInfo: React.FC = () => {

    return(
         <>
         <Row gutter={5}>
         <Col>
             <Text type={'secondary'}>
                 Name :
             </Text>
         </Col>
         <Col>
             <Text strong>
                 Ahmad Sermani
             </Text>
         </Col>
     </Row>
     <Row gutter={5}>
         <Col>
             <Text type={'secondary'}>
                 Employee ID :
             </Text>
         </Col>
         <Col>
             <Text strong>
                 1123112
             </Text>
         </Col>
     </Row>
     </>
    )

}

export default BasicInfo