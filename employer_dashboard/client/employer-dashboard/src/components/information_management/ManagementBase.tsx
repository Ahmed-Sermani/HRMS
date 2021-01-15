import React from 'react'
import { Layout, Tabs } from 'antd'
import EmployeeForm from "./EmployeeForm";
const { Content } = Layout
const { TabPane } = Tabs


const ManagementBase: React.FC = () => {

    return (
        <Content
            className="site-layout-background"
            style={{
                margin: '10px 10px',
                padding: 10,
                minHeight: 280,
            }}
        >

        
            <Tabs type="card">
                <TabPane tab="Add Employee" key="1">
                    <EmployeeForm />
                </TabPane>
                <TabPane tab="Bank Accounts" key="2">
                    f
            </TabPane>
                <TabPane tab="Assets" key="3">
                    asd
            </TabPane>
            </Tabs>
        </Content>
    )

}


export default ManagementBase