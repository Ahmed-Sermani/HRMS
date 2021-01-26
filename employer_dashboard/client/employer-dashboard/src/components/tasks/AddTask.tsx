import { Form, Input, DatePicker, Button, Switch, notification } from 'antd';
import { useContext } from 'react';
import { tokenContext } from "../../context";
const { useForm } = Form
const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 10 },
    style: {
        marginTop: 20
    }

};

const AddTask = () => {
    const [form] = Form.useForm();
    const tokens = useContext(tokenContext)

    const onFinish = async (values: any) => {

        values.dead_line = values.dead_line.format('YYYY-MM-DD HH:mm:ss')
        if (values.schedule) {
            values.send_at = values.send_at.format('YYYY-MM-DD HH:mm:ss')
        }
        
        
        try {
            const res = await fetch(process.env.REACT_APP_API + '/task_viewset/', {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + tokens?.access,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(values)
            })

            const result = await res.json()

            if (!result.success){
                notification.error({message: result.message})
                return
           }

           notification.success({message: 'Added Successfully'})
           form.resetFields()
            
        }
        catch(e){
            notification.error({message: 'Error Encountered while adding the task'})
        }

        
    };

    return (
        <Form {...layout} form={form} name="nest-messages" onFinish={onFinish} size='large' >
            <Form.Item name='employee' label="Assign To" rules={[{ required: true }, { type: 'email' }]}>
                <Input />
            </Form.Item>
            <Form.Item name='title' label="Title" rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item name='description' label="Description" rules={[{ required: true }]}>
                <Input.TextArea />
            </Form.Item>

            <Form.Item name='dead_line' label="Dead Line" rules={[{ required: true }]}>
                <DatePicker showTime />
            </Form.Item>

            <Form.Item label="Schedule" name='schedule'>
                <Switch />
            </Form.Item>

            <Form.Item name='send_at' label="Send At" rules={[{ required: true }]}>
                <DatePicker showTime />
            </Form.Item>


            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 5 }}>
                <Button type="primary" htmlType="submit">
                    Add
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddTask