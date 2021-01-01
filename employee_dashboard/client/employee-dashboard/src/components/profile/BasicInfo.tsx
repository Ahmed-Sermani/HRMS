import React from 'react'
import { Row, Col, Typography } from "antd"
const { Text } = Typography

interface Props {
    name: string,
    employeeId: string,
}

const BasicInfo: React.FC<Props> = ({name, employeeId}:Props) => {

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
                {name}
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
                 {employeeId}
             </Text>
         </Col>
     </Row>
     </>
    )

}

export default React.memo(BasicInfo)