import { Navbar, Container, Row, Col } from "react-bootstrap"
import SearchImputTest from "../SearchInput/SearchInputTest"
import style from './Navbar3test.module.sass'
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { loginUser, logoutUser } from '../../Redux/actions/authActions';
import { Menubar } from 'primereact/menubar';
import { useRouter } from 'next/dist/client/router';
import AuthModal from '../Authenticacion/AuthModal';
import { NextLink } from '../NextLink/NextLink';
import {Avatar, Button, Menu, Group } from '@mantine/core';

const NavbarNew3 = () => {
  const dispatch = useDispatch()
	const router = useRouter()

	useEffect(() => {
		dispatch(loginUser(true))
	}, [])

	const user = useSelector((state: any) => {
		return state.authentication
			? state.authentication
			: { logged: false }
	}
	)
	const logOutHandler = () => {
		dispatch(logoutUser())
	}
  return (
    <Navbar fixed="top" style={{ backgroundColor: 'white', height: '80px' }}>
      <Container>
        <Navbar.Brand href="#home" className={style.Brand}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/2048px-Octicons-mark-github.svg.png" width="50"
            height="50" alt="" />
          DuoDesk
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Container>
            <SearchImputTest />
          </Container>
          <div className = {style.Login} onClick = {()=>console.log('its worked')}>
            <img width="50"
              height="50" src="https://thumbs.dreamstime.com/b/user-icon-trendy-flat-style-isolated-grey-background-user-symbol-user-icon-trendy-flat-style-isolated-grey-background-123663211.jpg" alt="" />
            <Navbar.Text>
              Hola <a href="#login">Brayan</a>
            </Navbar.Text>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarNew3