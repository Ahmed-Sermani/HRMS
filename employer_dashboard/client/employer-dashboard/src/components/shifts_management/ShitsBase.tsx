import React from 'react'
import { Layout, Tabs } from 'antd'
import AddShift from "./AddShift";
import ShiftsList from "./ShiftsList";
import Attendance from "./Attendance";

const { Content } = Layout
const { TabPane } = Tabs


const ShiftsBase: React.FC = () => {

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
                <TabPane tab="Add Shift" key="1">
                    <AddShift />
                </TabPane>
                
                <TabPane tab="Shifts" key="2">
                    <ShiftsList />
                </TabPane>

                <TabPane tab="Attendance" key="3">
                    <Attendance />
                </TabPane>

            </Tabs>
        </Content>
    )

}


export default ShiftsBase