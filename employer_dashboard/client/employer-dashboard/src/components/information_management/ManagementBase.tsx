import React from 'react'
import { Layout, Tabs } from 'antd'
import EmployeeForm from "./EmployeeForm";
import Assets from "./Assets";
import Sections from "./Sections";
import BankAccounts from "./BankAccounts";
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
                
                <TabPane tab="Assets" key="3">
                    <Assets />
                </TabPane>

                <TabPane tab="Sections" key="4">
                    <Sections />
                </TabPane>

                <TabPane tab="Bank Accounts" key="5">
                    <BankAccounts />
                </TabPane>
            </Tabs>
        </Content>
    )

}


export default ManagementBase