import React, { useContext, useEffect, useState } from "react";
import { Table, Space, Tooltip, Modal, Form, Input, Button, Result } from 'antd';
import { tokenContext } from "../../context";
import {  LeftOutlined, RightOutlined } from '@ant-design/icons';



const TaskList: React.FC = () => {
	const tokens = useContext(tokenContext)
	const [dataSource, setDataSource] = useState<any>([])
	const [pagination, setPagination] = useState({ next: null, previous: null })

	useEffect(() => {
		(async () => {

			const res = await getListTask(process.env.REACT_APP_API + '/task_viewset')
			console.log(res);
			
			setDataSource(res.results)
			setPagination({next: res.next, previous: res.pervious})

		})()

	}, [])

	const getListTask = async (path: string, body?: object) => {
		const res = await fetch(path, {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + tokens?.access,
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify(body),
	
		})
		return await res.json()
	
	}
	
	const nextOrPerviousPageHandler = async (link: any) => {
        const res = await getListTask(link)
		
		setDataSource(res.results)
		setPagination({next: res.next, previous: res.previous})
            


        
    }




	const columns = [
        {
			title: 'Employee',
			dataIndex: 'employee',
			key: 'employee',
		},
		{
			title: 'Title',
			dataIndex: 'title',
			key: 'title',
		},
		{
			title: 'Description',
			dataIndex: 'description',
			key: 'description',
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
		},
		{
			title: 'Type',
			dataIndex: 'task_type',
			key: 'task_type',
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
		},
		{
			title: 'Assigned at',
			dataIndex: 'assigned_at',
			key: 'assigned_at',
		}
	
	];

	return (
		<>
			<Table
				columns={columns}
				dataSource={dataSource}
				bordered
				size="large"
				pagination={false}
			/>
			<Space style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 10 }}>
                <Tooltip title="pervious">
                    <Button disabled={!Boolean(pagination.previous)} type="primary" shape="circle" icon={<LeftOutlined />} onClick={nextOrPerviousPageHandler.bind(null, pagination.previous)} />
                </Tooltip>

                <Tooltip title="next"  >
                    <Button disabled={!Boolean(pagination.next)} type="primary" shape="circle" icon={<RightOutlined />} onClick={nextOrPerviousPageHandler.bind(null, pagination.next)} />
                </Tooltip>
            </Space>
		</>
	)
}




export default  TaskList