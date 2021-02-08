import React, { useState, useContext, useEffect } from 'react'
import { Table, Button, Space, Layout, notification } from 'antd';
import { tokenContext } from "../../context";
const { Content } = Layout


const ShiftsBase: React.FC = () => {

    const tokens = useContext(tokenContext)
    const [dataSource, setDataSource] = useState<any>([])

    useEffect(() => {
        (async () => {

            const res = await getListTask(process.env.REACT_APP_API + '/task_viewset')
            console.log(res);

            setDataSource(res)

        })()

    }, [])

    const getListTask = async (path: string, body?: object, method: string = 'GET') => {
        const res = await fetch(path, {
            method: method,
            headers: {
                Authorization: 'Bearer ' + tokens?.access,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(body),

        })
        return await res.json()

    }

    const startProgressHandler = async (id: number) => {

        try{
            await getListTask(process.env.REACT_APP_API + `/task_viewset/${id}/`, {status: 'In Progress'}, 'PUT')
            notification.success({message: 'Start Progress'})
        }
        catch(e){
            notification.error({message: 'Error Encountered'})
        }

    }

    const doneHandler = async (id: number) => {

        try{
            await getListTask(process.env.REACT_APP_API + `/task_viewset/${id}/`, {status: 'Done'}, 'PUT')
            notification.success({message: 'Done'})
        }
        catch(e){
            notification.error({message: 'Error Encountered'})
        }

    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'name'
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Deadline',
            dataIndex: 'deadline',
            key: 'deadline',
        },
        {
            title: 'Actions',
            key: 'action',
            render: (_: any, record: any) => (
                <Space size="middle">
                    {record.status == 'New'? <Button onClick={startProgressHandler.bind(null, record.id)}>Start Progress</Button> : <Button onClick={doneHandler.bind(null, record.id)} >Done</Button>  }
                </Space>
            ),
        },
    ];

    return (
        <Content
            className="site-layout-background"
            style={{
                margin: '10px 10px',
                padding: 10,
                minHeight: 280,
            }}
        >

            <Table size='large' columns={columns} dataSource={dataSource} />

        </Content>
    )

}


export default ShiftsBase