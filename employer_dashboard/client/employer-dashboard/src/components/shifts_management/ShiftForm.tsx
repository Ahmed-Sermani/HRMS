import React from 'react'
import { Button, Form, Input, notification, Typography } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { TimePicker } from 'antd';
const { Paragraph } = Typography
const { RangePicker } = TimePicker;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
    },
};
const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
    },
};

const checkIfDuplicateExists = (w: Array<string> | string) => {
    return new Set(w).size !== w.length
}

interface Props {
    onFinish: (values: {employees: Array<string>, shift_title: string, days_of_week: string, time: Array<any>}) => void
}


const ShiftFrom: React.FC<Props> = ({ onFinish }) => {


    return (
        <Form
            name="dynamic_form_item"

            onFinish={onFinish}
            style={{
                marginTop: 20,
                width: '100%'
            }}
            size='large'

        >

            <Form.Item
                label='Shift Title'
                labelCol={{ "xs": { "span": 24 }, "sm": { "span": 4 } }}
                wrapperCol={{ "xs": { "span": 24 }, "sm": { "span": 12 } }}
                name='shift_title'
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label='Time'
                labelCol={{ "xs": { "span": 24 }, "sm": { "span": 4 } }}
                wrapperCol={{ "xs": { "span": 24 }, "sm": { "span": 12 } }}
                name='time'
                rules={[{ required: true }]}
            >
                <RangePicker />
            </Form.Item>

            <Form.Item
                label='Days Of The Week'
                labelCol={{ "xs": { "span": 24 }, "sm": { "span": 4 } }}
                wrapperCol={{ "xs": { "span": 24 }, "sm": { "span": 12 } }}
                name='days_of_week'
                rules={[{ required: true },
                () => ({
                    validator: async (_, value) => {
                        if (value) {
                            const num = Number(value)
                            if (Number.isNaN(num)) {
                                return Promise.reject('Only Numbers Are Allowed');
                            }

                            if (checkIfDuplicateExists(value)) {
                                return Promise.reject('Duplicate Numbers Detected');
                            }
                        }
                    },

                }),

                ]}
                extra={days}
            >
                <Input />
            </Form.Item>

            <Form.List
                name="employees"
                rules={[
                    {
                        validator: async (_, employees) => {
                            if (!employees || employees.length < 1) {
                                notification.error({ message: 'Input At least 1 Employee' })
                                return Promise.reject(new Error());
                            }
                            if (employees.length > 1 && checkIfDuplicateExists(employees)) {
                                notification.error({ message: 'Duplicate Employee Email' })
                                return Promise.reject(new Error());
                            }
                        },
                    },
                ]}
            >


                {(fields, { add, remove }, { errors }) => (
                    <>
                        {fields.map((field, index) => (
                            <Form.Item
                                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                label={index === 0 ? 'employees' : ''}
                                required={false}
                                key={field.key}
                            >
                                <Form.Item
                                    {...field}
                                    validateTrigger={['onChange', 'onBlur']}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input employee's Email or delete this field.",
                                        },
                                        {
                                            type: 'email',
                                            message: "Invalid Email",
                                        }
                                    ]}
                                    noStyle
                                >
                                    <Input placeholder="Employee Email" style={{ width: '60%' }} />
                                </Form.Item>
                                {fields.length > 1 ? (
                                    <MinusCircleOutlined
                                        className="dynamic-delete-button"
                                        onClick={() => remove(field.name)}
                                    />
                                ) : null}
                            </Form.Item>
                        ))}
                        <Form.Item
                            wrapperCol={{ "xs": { "span": 10, offset: 0 }, "sm": { "span": 24, offset: 4 } }}
                        >
                            <Button
                                type="dashed"
                                onClick={() => add()}
                                style={{ width: '60%' }}
                                icon={<PlusOutlined />}
                            >
                                Add Employee
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

const days = (
    <Paragraph>

        this will be like '0123456'
        <br />
        0 = Saturday
        <br />
        1 = Sunday
        <br />
        2 = Monday
        <br />
        3 = Tuesday
        <br />
        4 = Wensday
        <br />
        5 = Thursday
        <br />
        6 = Friday
    </Paragraph>
)
export default ShiftFrom