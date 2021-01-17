import React, { useContext, useEffect, useState } from 'react'
import { Table, notification, Form, Input, Modal, Button } from 'antd'
import { tokenContext } from '../../context'

const Sections: React.FC = () => {

    const tokens = useContext(tokenContext)
	const [dataSource, setDataSource] = useState<any>([])
	useEffect(() => {
		(async () => {

			const res = await fetch(process.env.REACT_APP_API + '/section_viewset', {
				method: 'GET',
				headers: {
					Authorization: 'Bearer ' + tokens?.access,
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				}
			})
            const result = await res.json()
            
			setDataSource(result) 


		})()

	}, [])
    
    
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Department',
            dataIndex: 'department',
            key: 'department',
        },
        {
            title: 'Section',
            dataIndex: 'name',
            key: 'name',
        }
    ]

    

    return(
        <>
			<CollectionsPage />
			<Table
				columns={columns}
				dataSource={dataSource}
				bordered
				size="large"
			/>
		</>
    )
}


interface Values {
	department: string;
	section: string;
}

interface CollectionCreateFormProps {
	visible: boolean;
	onCreate: (values: Values) => void;
	onCancel: () => void;
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
	visible,
	onCreate,
	onCancel,
}) => {
	const [form] = Form.useForm();
	return (
		<Modal
			visible={visible}
			title="Create a new Section"
			okText="Create"
			cancelText="Cancel"
			onCancel={onCancel}
			onOk={() => {
				form
					.validateFields()
					.then(values => {
						form.resetFields();
						onCreate(values);
					})
					.catch(info => {
						console.log('Validate Failed:', info);
					});
			}}
		>
			<Form
				form={form}
				layout="vertical"
				name="form_in_modal"
			>
				<Form.Item
					name="name"
					label="Section"
					rules={[{ required: true, message: 'Please input the Section name' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					name="department"
					label="Department"
					rules={[{ required: true, message: 'Please input the Department ' }]}
				>
					<Input />
				</Form.Item>
			</Form>
		</Modal>
	);
};

const CollectionsPage = () => {
	const [visible, setVisible] = useState(false);
	const tokens = useContext(tokenContext)

	const onCreate = async (values: any) => {
		try {
            
			const res = await fetch(process.env.REACT_APP_API + `/section_viewset/`, {
				method: 'POST',
				headers: {
					Authorization: 'Bearer ' + tokens?.access,
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				body: JSON.stringify(values)
			})
			const result = await res.json()

			if (result.hasOwnProperty('success') && !result.success) {
				notification.error({ message: result.message })
			}
			else {
				notification.success({ message: 'Added Successfully' })
			}
		}
		catch (e) {
			notification.error({ message: 'Error While Adding' })

		}
		setVisible(false);
	};

	return (
		<div style={{ marginBlock: 20 }}>
			<Button
				type="primary"
				onClick={() => {
					setVisible(true);
				}}
			>
				New Section
        </Button>
			<CollectionCreateForm
				visible={visible}
				onCreate={onCreate}
				onCancel={() => {
					setVisible(false);
				}}
			/>
		</div>
	);
};



export default Sections