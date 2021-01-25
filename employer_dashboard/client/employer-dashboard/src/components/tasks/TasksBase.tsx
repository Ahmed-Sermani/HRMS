import React from 'react'
import { Layout, Tabs } from 'antd'
import AddTask from "./AddTask";


const { Content } = Layout
const { TabPane } = Tabs


const TasksBase: React.FC = () => {

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
                <TabPane tab="Add Task" key="1">
                    <AddTask />
                </TabPane>
                
                <TabPane tab="Tasks" key="2">
                    asdf
                </TabPane>


            </Tabs>
        </Content>
    )

}


export default TasksBase