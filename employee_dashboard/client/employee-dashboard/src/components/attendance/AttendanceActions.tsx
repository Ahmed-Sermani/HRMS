import React, { useContext, useEffect, useState } from 'react'
import { Space, Button, Typography, Row, notification } from "antd";
import {
	LoginOutlined,
	LogoutOutlined
} from '@ant-design/icons';
import { shiftSubContext, tokenContext } from "../../context";
const { Text } = Typography
interface ButtonState {
	loading: boolean,
	disabled: boolean,
	checked_time?: string,
}

const AttendanceActions: React.FC = () => {
	const shiftSub = useContext(shiftSubContext)
	const tokens = useContext(tokenContext)

	const [checkInState, setCheckInState] = useState<ButtonState>({
		loading: false,
		disabled: false
	})

	const [checkOutState, setCheckOutState] = useState<ButtonState>({
		loading: false,
		disabled: true
	})

	useEffect(() => {
		console.log(shiftSub?.is_off_today);

		if (shiftSub?.is_off_today) {
			notification.open({
				message: "You're Off Today And Can't Record Attendance",
				type: 'info',
				duration: 20
			})
			setCheckInState(
				{
					...checkInState,
					disabled: true
				}
			)
			setCheckOutState(
				{
					...checkOutState,
					disabled: true
				}
			)
			return
		}

		// check location within polygon
		navigator.geolocation.getCurrentPosition((position) => {
			const is_inside = inside(
				{
					lat: position.coords.latitude,
					lng: position.coords.longitude
				},
				shiftSub?.shift?.polygon || []
			)
			if (!is_inside) {
				notification.open({
					message: "You're Outside Off The Allowed Area To Attends In",
					type: 'info',
					duration: 20
				})
				setCheckInState(
					{
						...checkInState,
						disabled: true
					}
				)
				setCheckOutState(
					{
						...checkOutState,
						disabled: true
					}
				)
				return
			}

		})

		// check if already checked in
		if (shiftSub?.checking_info_for_today.checked_in) {
			setCheckInState(
				{
					...checkInState,
					disabled: true,
					checked_time: shiftSub?.checking_info_for_today.checked_in_time
				}
			)
		}

		//check if checked out
		if (shiftSub?.checking_info_for_today.checked_out) {
			setCheckOutState(
				{
					...checkOutState,
					disabled: true,
					checked_time: shiftSub?.checking_info_for_today.checked_out_time
				}
			)
		}



	}, [])

	const checkInHandler = (e: any) => {
		navigator.geolocation.getCurrentPosition(async (position) => {
			setCheckInState({
				...checkInState,
				loading: true
			})
			const res = await fetch(process.env.REACT_APP_API + '/shift', {
				method: 'POST',
				headers: {
					Authorization: 'Bearer ' + tokens?.access,
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				body: JSON.stringify({
					action: 'check-in',
					lng: position.coords.longitude,
					lat: position.coords.latitude

				})
			})
			const result: any = await res.json()
			if (!result.success) {
				notification.open(
					{
						message: result.message,
						type: 'error'
					}
				)
			}

			setCheckInState({
				...checkInState,
				disabled: true,
				checked_time: new Date().toLocaleTimeString('en-GB')
			})

			setCheckOutState({
				...checkOutState,
				disabled: false
			})




		})


	}


	const checkOutHandler = async (e: any) => {
		setCheckOutState({
			...checkOutState,
			loading: true
		})
		const res = await fetch(process.env.REACT_APP_API + '/shift', {
			method: 'POST',
			headers: {
				Authorization: 'Bearer ' + tokens?.access,
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				action: 'check-out'
			})
		})
		const result: any = await res.json()
		if (!result.success) {
			notification.open(
				{
					message: result.message,
					type: 'error'
				}
			)
		}

		setCheckOutState({
			...checkOutState,
			disabled: true,
			checked_time: new Date().toLocaleTimeString('en-GB')
		})
	}

	return (
		<Space align='baseline'
			style={
				{
					display: 'flex',
					marginTop: '5vw',
					justifyContent: 'space-around'
				}
			}

		>

			<div>
				<Row>
					<Button
						type="primary"
						shape='round'
						icon={<LoginOutlined />}
						size='large'
						style={
							{
								width: '200px',
								height: '100px',
								fontSize: '16pt'
							}
						}
						disabled={checkInState.disabled}
						loading={checkInState.loading}
						onClick={checkInHandler}
					>
						Check-In
          		</Button>
				</Row>
				<Row align='middle' justify='center'>
					{checkInState.checked_time && <Text type='success' strong keyboard style={{ fontSize: '16pt', marginTop: '10px' }}>{checkInState.checked_time}</Text>}
				</Row>

			</div>
			<div>
				<Row>
					<Button
						type="primary"
						shape='round'
						icon={<LogoutOutlined />}
						size='large'
						style={
							{
								width: '200px',
								height: '100px',
								fontSize: '16pt'
							}
						}
						disabled={checkOutState.disabled}
						loading={checkOutState.loading}
						onClick={checkOutHandler}

					>

						Check-Out
          		</Button>
				</Row>
				<Row align='middle' justify='center'>
					{checkOutState.checked_time && <Text type='success' strong keyboard style={{ fontSize: '16pt', marginTop: '10px' }}>{checkOutState.checked_time}</Text>}
				</Row>
			</div>

		</Space>
	)
}

function inside(point: { lat: number, lng: number }, polygon: Array<{ lat: number, lng: number }>) {

	var x = point.lat, y = point.lng;
	var inside = false;
	for (var i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
		var xi = polygon[i].lat, yi = polygon[i].lng;
		var xj = polygon[j].lat, yj = polygon[j].lng;

		var intersect = ((yi > y) !== (yj > y))
			//@ts-ignore
			&& (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
		if (intersect) inside = !inside;
	}
	return inside;
};






export default AttendanceActions