import React, { useEffect, useState } from 'react';
import { Navbar, Container, Row, Col } from "react-bootstrap"
import { useRouter } from 'next/dist/client/router';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Menu, Group } from '@mantine/core';
import { NextLink } from '../NextLink/NextLink';

import SearchImputTest from "../SearchInput/SearchInput"
import AuthModal from '../Authenticacion/AuthModal';

import { loginUser, logoutUser } from '../../Redux/actions/authActions';

import style from './Navbar.module.sass'

const NavBar = () => {
	const dispatch = useDispatch()
	const router = useRouter()

	useEffect(() => {
		dispatch(loginUser(true))
	}, [])

	const user = useSelector((state: any) => {
		return state.authentication
			? state.authentication
			: { logged: false }
	})

	const logOutHandler = () => {
		dispatch(logoutUser())
	}


	return(
		<div className="flex flex-row">
			<div></div>
			<div></div>
			<div></div>
		</div>
	)
}

export default NavBar