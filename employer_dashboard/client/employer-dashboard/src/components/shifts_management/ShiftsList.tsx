import React, { useContext, useState } from 'react'
import { Table, Popconfirm, notification, Modal, Form, Input, Button } from 'antd';
import { tokenContext } from "../../context";
import { useEffect } from 'react';

const ShiftsList: React.FC = () => {
    const tokens = useContext(tokenContext)
	const [dataSource, setDataSource] = useState<any>([])
	useEffect(() => {
		(async () => {

			const res = await fetch(process.env.REACT_APP_API + '/shift_viewset', {
				method: 'GET',
				headers: {
					Authorization: 'Bearer ' + tokens?.access,
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				}
			})

			setDataSource(await res.json())


		})()

	}, [])

	const handleDelete = async (id: number) => {
		try {
			await fetch(process.env.REACT_APP_API + `/shift_viewset/${id}/`, {
				method: 'DELETE',
				headers: {
					Authorization: 'Bearer ' + tokens?.access,
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				}
			})
			notification.success({ message: 'Deleted Successfully' })
		}
		catch (e) {
			notification.error({ message: 'Error While Deleting' })
		}


	}


	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'From',
			dataIndex: '_from',
			key: '_from',
		},
		{
			title: 'To',
			dataIndex: 'to',
			key: 'to',
		},
		{
			title: 'Days Of Week',
			dataIndex: 'days_of_week',
			key: 'days_of_week',
		},
		{
			title: 'operation',
			dataIndex: 'operation',
			render: (_: any, record: any) =>
				dataSource.length >= 1 ?
					(
						<Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)} >
							<a>Delete</a>
						</Popconfirm>
					) : null,
		},
	];

	return (
		<>
			<Table
				columns={columns}
				dataSource={dataSource}
				bordered
				size="large"
			/>
		</>
	)
}

export default ShiftsList