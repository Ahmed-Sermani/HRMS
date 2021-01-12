import React from 'react';
import { Tabs, Layout } from 'antd';
import ProfileTab from './ProfileTab'
import BankAccounts from './BankAccounts'
import Assets from './Assets'
const { TabPane } = Tabs
const { Content } = Layout

const Profile: React.FC = () => {

    return (
        <Content
            className="site-layout-background"
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
            }}
        >

            <Tabs type="card">
                <TabPane tab="Profile" key="1">
                    <ProfileTab />
                </TabPane>
                <TabPane tab="Bank Accounts" key="2">
                    <BankAccounts />
            </TabPane>
                <TabPane tab="Assets" key="3">
                    <Assets />
            </TabPane>
            </Tabs>
        </Content>
    )

}

export default Profile
