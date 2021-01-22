import React, { useContext, useEffect, useState } from "react";
import { Table, Space, Tooltip, Modal, Form, Input, Button, Result } from 'antd';
import { tokenContext } from "../../context";
import {  LeftOutlined, RightOutlined } from '@ant-design/icons';



const Attendance: React.FC = () => {
	const tokens = useContext(tokenContext)
	const [dataSource, setDataSource] = useState<any>([])
	const [pagination, setPagination] = useState({ next: null, previous: null })

	useEffect(() => {
		(async () => {

			const res = await getListEmployee(process.env.REACT_APP_API + '/attendance_list')
			console.log(res);
			
			setDataSource(res.results)
			setPagination({next: res.next, previous: res.pervious})

		})()

	}, [])

	const getListEmployee = async (path: string, body?: object) => {
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
        const res = await getListEmployee(link)
		
		setDataSource(res.results)
		setPagination({next: res.next, previous: res.previous})
            


        
    }




	const columns = [
		{
			title: 'Attendance date',
			dataIndex: 'attendance_date',
			key: 'attendance_date',
		},
		{
			title: 'Employee',
			dataIndex: 'employee',
			key: 'employee',
		},
		{
			title: 'Check In',
			dataIndex: 'check_in',
			key: 'check_in',
		},
		{
			title: 'Check Out',
			dataIndex: 'check_out',
			key: 'check_out',
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
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




export default  Attendance