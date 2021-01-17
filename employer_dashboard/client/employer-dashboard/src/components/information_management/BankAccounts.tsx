import React, { useContext, useEffect, useState } from 'react'
import { Table, notification, Form, Input, Modal, Button } from 'antd'
import { tokenContext } from '../../context'

const Sections: React.FC = () => {

    const tokens = useContext(tokenContext)
	const [dataSource, setDataSource] = useState<any>([])
	useEffect(() => {
		(async () => {

			const res = await fetch(process.env.REACT_APP_API + '/bank_viewset', {
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
    
    
    const columns = [
        {
            title: 'Employee',
            dataIndex: 'employee',
            key: 'employee',
        },
        {
            title: 'Bank',
            dataIndex: 'bank',
            key: 'bank',
        },
        {
            title: 'Card Number',
            dataIndex: 'card_number',
            key: 'card_number',
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
					name="employee"
					label="Employee"
					rules={[{ required: true, message: 'Please input the Employee email' }, { type: 'email'}]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					name="bank"
					label="Bank"
					rules={[{ required: true, message: 'Please input the Department ' }]}
				>
					<Input />
				</Form.Item>

                <Form.Item
					name="card_number"
					label="Card Number"
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
            
            
			const res = await fetch(process.env.REACT_APP_API + `/bank_viewset/`, {
				method: 'POST',
				headers: {
					Authorization: 'Bearer ' + tokens?.access,
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				body: JSON.stringify(values)
			})
	
    		notification.success({ message: 'Added Successfully' })
			
		}
		catch (e) {
			notification.error({ message: 'No Such Employee' })

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
				New Bank Account
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