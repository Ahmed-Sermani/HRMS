import React from 'react';
import { Tabs, Layout } from 'antd';
import ProfileTab from './ProfileTab'
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
                <TabPane tab="Tab 2" key="2">
                    Content of Tab Pane 2
            </TabPane>
                <TabPane tab="Tab 3" key="3">
                    Content of Tab Pane 3
            </TabPane>
            </Tabs>
        </Content>
    )

}

export default Profile
