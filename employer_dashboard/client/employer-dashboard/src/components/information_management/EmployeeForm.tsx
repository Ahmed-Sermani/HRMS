import React, { useContext } from 'react';
import {
    Form,
    Input,
    Select,
    Button,
    DatePicker,
    notification
} from 'antd';
import { tokenContext } from "../../context";
const { Option } = Select;



const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
        lg: { span: 5 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
        lg: { span: 12 }
    },
    style: {
        marginTop: 20
    }
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
        lg: {
            span: 0,
            offset: 5,
        }
    },
};


const EmployeeFrom = () => {
    const [form] = Form.useForm();
    const tokens = useContext(tokenContext)

    const onFinish = async (values: any) => {

        let parsed_data = { ...values }
        
        
        
    
        parsed_data.GOSI_salary = Number(parsed_data.GOSI_salary)
        parsed_data.base_salary = Number(parsed_data.base_salary)
        if ( Number.isNaN(parsed_data.GOSI_salary) || Number.isNaN(parsed_data.base_salary) ) {
            notification.open({
                type: 'error',
                message: 'one of the salary fields in not a number'
            })
            return
        }
    
        
        parsed_data.date_of_birth = parsed_data.date_of_birth.format('YYYY-MM-DD')
        parsed_data.end_of_probation = parsed_data.end_of_probation.format('YYYY-MM-DD')
        parsed_data.hiring_date = parsed_data.hiring_date.format('YYYY-MM-DD')
        parsed_data.end_of_contract = parsed_data.end_of_contract.format('YYYY-MM-DD')
        parsed_data.phone_number = parsed_data.prefix + parsed_data.phone_number
        delete parsed_data.prefix
        
        console.log(parsed_data);
        
        const res  = await fetch(process.env.REACT_APP_API + '/add_update_employee', {
            method: 'POST',
            body: JSON.stringify(parsed_data),
            headers: {
                Authorization: 'Bearer ' + tokens?.access,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }

        })

        const result = await res.json()

        if (result.hasOwnProperty('success') && result.success){
            notification.open({
                type:'success',
                message: 'success',
                description: 'The Employee Has Been Added Successfully'
            })
            form.resetFields()
        }
        else {
            notification.open({
                type:'error',
                message: 'Failed',
                description: result.message
            })
        }









    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="966">+966</Option>
                <Option value="971">+971</Option>
                <Option value="20">+20</Option>
                <Option value="963">+963</Option>
            </Select>
        </Form.Item>
    );





    return (
        <Form
            {...formItemLayout}
            form={form}
            name="add_employee"
            onFinish={onFinish}
            scrollToFirstError
            size={'large'}
        >
            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="first_name"
                label="First Name"
                rules={[
                    {
                        required: true,
                        message: 'Please input the First Name',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="last_name"
                label="Last Name"
                rules={[
                    {
                        required: true,
                        message: 'Please input the Last Name',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="hiring_date"
                label="Hiring Date"
                rules={[
                    { type: 'object' as const, required: true, message: 'Please select Date of Join' }
                ]}
            >
                <DatePicker />
            </Form.Item>

            <Form.Item
                name="date_of_birth"
                label="Date Of Birth"
                rules={[
                    { type: 'object' as const, required: true, message: 'Please select Date Of Birth' }
                ]}
            >
                <DatePicker />
            </Form.Item>

            <Form.Item
                name="end_of_contract"
                label="End Of Contract"
                rules={[
                    { type: 'object' as const, required: true, message: 'Please select End Of Contract' }
                ]}
            >
                <DatePicker />
            </Form.Item>

            <Form.Item
                name="end_of_probation"
                label="End of probation"
                rules={[
                    { type: 'object' as const, required: true, message: 'Please select End of probation' }
                ]}
            >
                <DatePicker />
            </Form.Item>

            <Form.Item
                name="username"
                label="Username"
                rules={[
                    {
                        required: true,
                        message: 'Please input the Username',
                    },
                ]}
            >
                <Input />
            </Form.Item>


            <Form.Item
                name="phone_number"
                label="Phone Number"
                rules={[
                    {
                        required: true,
                        message: 'Please input your phone number!'
                    }
                ]}
            >
                <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
            </Form.Item>


            <Form.Item
                name="office_number"
                label="Office Number"
                rules={[
                    {
                        required: true,
                        message: 'Please input the Office Number',
                    }
                ]}
            >
                <Input />
            </Form.Item>


            <Form.Item
                name="position"
                label="Position"
                rules={[
                    {
                        required: true,
                        message: 'Please input the Position',
                    }
                ]}
            >
                <Input />
            </Form.Item>




            <Form.Item
                name="national_id"
                label="National ID"
                rules={[
                    {
                        required: true,
                        message: 'Please input the National ID',
                    }
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="nationality"
                label="Nationality"
                rules={[
                    {
                        required: true,
                        message: 'Please input the Nationality',
                    }
                ]}
            >
                <Input />
            </Form.Item>


            <Form.Item
                name="job_title"
                label="Job Title"
                rules={[
                    { required: true, message: 'Please Input The Job Title' },
                ]}
            >
                <Input />
            </Form.Item>


            <Form.Item
                name="work_type"
                label="Work Type"
                rules={[
                    { required: true, message: 'Please Input The Work Type' },
                ]}
            >
                <Select>
                    <Select.Option value="Full Time">Full Time</Select.Option>
                    <Select.Option value="Part Time">Part Time</Select.Option>
                    <Select.Option value="Remotely">Remotely</Select.Option>
                </Select>
            </Form.Item>


            <Form.Item
                name="marital_status"
                label="Marital Status"
                rules={[
                    { required: true, message: 'Please Input The Marital Status' },
                ]}
            >
                <Select>
                    <Select.Option value="Single">Single</Select.Option>
                    <Select.Option value="Married">Married</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="gender"
                label="Gender"
                rules={[
                    { required: true, message: 'Please Input The Gender' },
                ]}
            >
                <Select>
                    <Select.Option value="Male">Male</Select.Option>
                    <Select.Option value="Female">Female</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="salutation"
                label="Salutation"
                rules={[
                    { required: true, message: 'Please Input The Salutation' },
                ]}
            >
                <Select>
                    <Select.Option value="Prof">Prof</Select.Option>
                    <Select.Option value="Master">Master</Select.Option>
                    <Select.Option value="Miss">Miss</Select.Option>
                    <Select.Option value="Mrs">Mrs</Select.Option>
                    <Select.Option value="Dr">Dr</Select.Option>
                    <Select.Option value="Mr">Mr</Select.Option>
                    <Select.Option value="Ms">Ms</Select.Option>
                    <Select.Option value="Eng">Eng</Select.Option>
                    <Select.Option value="Dev">Dev</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="direct_manager"
                label="Direct manager"
                rules={[{
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                },]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="supervisor"
                label="Supervisor"
                rules={[{
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="section"
                label="Section"
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="work_location"
                label="Work location"
                rules={[
                    { required: true, message: 'Please Input The Work location' },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="branch"
                label="Branch"
                rules={[
                    { required: true, message: 'Please Input The Branch' },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="base_salary"
                label="Base Salary"
                rules={[
                    {
                        required: true,
                        message: 'Please input the Base Salary',
                    }
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="GOSI_salary"
                label="GOSI Salary"
                rules={[
                    {
                        required: true,
                        message: 'Please input the GOSI Salary',
                    }
                ]}
            >
                <Input />
            </Form.Item>



            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Add Employee
                </Button>
            </Form.Item>
        </Form>
    );
};

export default EmployeeFrom