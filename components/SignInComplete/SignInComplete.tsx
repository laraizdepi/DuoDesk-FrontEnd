import { useState } from 'react';
import { Modal, Group, Button } from '@mantine/core';
import React, { FC } from 'react';
// icons
import { FcGoogle } from "react-icons/fc"
import { SiFacebook } from "react-icons/si"
import { FaTwitter } from "react-icons/fa"
import { RiTwitterLine } from "react-icons/ri"
import {TiVendorMicrosoft} from 'react-icons/ti'

import SignIn from '../Authenticacion/SignIn';
// import SignIn from '../Authenticacion/SignIn';

import style from "../SignInComplete/styles.module.sass"

import { Col, Row } from 'react-bootstrap'
interface DataProps {
  color: string,
  text: string,
  variant?: 'outline' | 'light',
  form?: 'SignUp' | 'SignIn'
}

// Sign IN 

const SignInComplete: FC<DataProps> = (props) => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        hideCloseButton
        size={600}
      >
        {/* form of sign Up */}
        {/* <{props.form}/> */}
        <SignIn />


        {/* Button Google */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <Row>
            <Col xs = {12} >
              <Button className={style.ButtonGoogle}
                component="a"
                target="_blank"
                rel="noopener noreferrer"
                href="https://google.com"
                leftIcon={<FcGoogle />}
                styles={{
                  root: {
                    backgroundColor: '#ffffff',
                    border: 1,
                    height: 42,
                    paddingLeft: 28,
                    paddingRight: 28,
                    marginBottom: 10,
                    marginTop: 10,

                    color: '#898989',
                    // border: "1px", "solid", "black"
                  },

                  leftIcon: {
                    marginRight: 15,
                  },

                }}
              >Sign in with google
              </Button>
            </Col>
            <Col xs={12} >
              {/* Button Facebook */}
              <Button
                component="a"
                target="_blank"
                rel="noopener noreferrer"
                href="https://facebook.com"
                leftIcon={<SiFacebook />}
                styles={{
                  root: {
                    backgroundColor: '#4267b2',
                    border: 0,
                    height: 42,
                    paddingLeft: 20,
                    paddingRight: 20,
                    marginBottom: 10,
                    color: 'white'
                  },

                  leftIcon: {
                    marginRight: 15,
                  },

                }}
              >Sign in with Facebook
              </Button>
            </Col>

            <Col xs = {12} >
              {/* Button Twitter */}
              <Button
                className={style.buttonTwitter}
                component="a"
                target="_blank"
                rel="noopener noreferrer"
                href="https://twitter.com"
                leftIcon={<FaTwitter />}
                styles={{
                  root: {
                    backgroundColor: '#5aaaf4',
                    border: 0,
                    height: 42,
                    paddingLeft: 31,
                    paddingRight: 31,
                    color: 'white',
                    // icon: { color: 'red' },
                  },

                  leftIcon: {
                    marginRight: 15,
                  },

                }}
              >Sign in with twitter
              </Button>
            </Col>
            <Col xs={12} >
              {/* Button microsoft */}
              <Button
                component="a"
                target="_blank"
                rel="noopener noreferrer"
                href="https://microsoft.com"
                leftIcon={<TiVendorMicrosoft />}
                styles={{
                  root: {
                    backgroundColor: '#2f2f2f',
                    border: 0,
                    height: 42,
                    paddingLeft: 20,
                    paddingRight: 20,
                    marginBottom: 10,
                    color: 'white'
                  },

                  leftIcon: {
                    marginRight: 15,
                  },

                }}
              >Sign in with microsoft
              </Button>
            </Col>
          </Row>






        </div>

        {/* ////////////// final form    */}


      </Modal>

      <Group position="center">
        <Button
          color={props.color}
          onClick={() => setOpened(true)}
          variant={props.variant}
          radius='lg'
          size="md"
          style={{ marginRight: '10px' }}
        >
          {props.text}
        </Button>
      </Group>
    </>
  );
}



export default SignInComplete;