import React, { useContext, useRef } from 'react'
import { Row, Col, Modal, Button, Upload, Input } from "antd"
import { UploadOutlined } from '@ant-design/icons'
import { tokenContext } from "../../context";
import { openNotificationWithIcon } from "../notification";
import { useHistory } from 'react-router';




const ProfileCardActions: React.FC = () => {
    const [visible, setVisible] = React.useState<boolean>(false);
    const [confirmLoading, setConfirmLoading] = React.useState<boolean>(false);
    const password = useRef()
    const newPassword = useRef()
    const passwordConfirmation = useRef()
    const histrory = useHistory()
    const tokens = useContext(tokenContext)
    const showChangePasswordModal = () => {
        setVisible(true)
    }

    const handleSubmit = async () => {
        setConfirmLoading(true);

        const result = await sendPasswordResetRequest(
            //@ts-ignore
            password.current.state.value,
            //@ts-ignore
            passwordConfirmation.current.state.value,
            //@ts-ignore
            newPassword.current.state.value,
            tokens
        )
        if (!result.success){
            openNotificationWithIcon({
                type: 'warning',
                title: 'Error in setting password',
                description: result.message
            })
        }
        else {
            openNotificationWithIcon({
                type: 'success',
                title: 'Password changed successfully',
                description: result.message
            })
        }
        setVisible(false);
        setConfirmLoading(false);
    };


    const handleCancel = () => {
        setVisible(false);
    };


    const fileUploadOnChangeHandler = (info: any) => {
        if (info.file.status === 'done') {
            openNotificationWithIcon({
                description: `${info.file.name} file uploaded successfully`,
                title: 'Done',
                type: 'info'
            });
            histrory.push('/employee_dashboard')
        } else if (info.file.status === 'error') {
            openNotificationWithIcon({
                description: `${info.file.name} file upload failed.`,
                title: 'Failed',
                type: 'error'
            });
        }
    }
    return (    
        <>
            <Row justify={'space-between'}>
                <Col>
                    <Upload 
                        name = 'profile-image'
                        action = {process.env.REACT_APP_API + '/upload_image'}
                        headers= {{
                            Authorization: 'Bearer ' + tokens?.access
                        }}
                        onChange = {fileUploadOnChangeHandler}
                    >
                        <Button type="primary" shape="round"  >
                            <UploadOutlined /> Change Image
                        </Button>
                    </Upload>
                </Col>

                <Col>
                    <Button type="primary" shape="round" onClick={showChangePasswordModal}>
                        Change Password
                    </Button>
                </Col>
            </Row>
            <Modal
                title="Password Reset"
                visible={visible}
                onOk={handleSubmit}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                okText='Confirm'
            >
                <Row justify={'space-between'}>
                    <Input.Password
                        placeholder="current password"
                        ref={password}
                    />

                    <Input.Password
                        placeholder="new password"
                        ref={newPassword}
                    />

                    <Input.Password
                        placeholder="confirm password"
                        ref={passwordConfirmation}
                    />

                </Row>
            </Modal>
        </>
    )
}

async function sendPasswordResetRequest(password: any, passwordConfirmation: any, newPassword: any, tokens: any) {

    const res = await fetch(process.env.REACT_APP_SERVER_URL + '/core/api/password_reset/',
        {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + tokens.access,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                'password-confirmation': passwordConfirmation,
                'password': password,
                'new-password': newPassword
            })
        }
    )
    const result = await res.json()

    return result

}

export default React.memo(ProfileCardActions)