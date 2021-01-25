import { Form, Input, DatePicker, Button, Switch } from 'antd';

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 10 },
    style: {
        marginTop: 20
    }

};

const AddTask = () => {
    const onFinish = (values: any) => {
        console.log(values);
    };

    return (
        <Form {...layout} name="nest-messages" onFinish={onFinish} size='large' >
            <Form.Item name='employee' label="Assign To" rules={[{ required: true }, { type: 'email' }]}>
                <Input />
            </Form.Item>
            <Form.Item name='Title' label="Title" rules={[{ required: true }]}>
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