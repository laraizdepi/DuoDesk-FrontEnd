import { useFocusReturn } from '@mantine/hooks';
import { useState } from 'react';
import { Modal, Group, Button } from '@mantine/core';

import React, { FC } from 'react';
// icons
import { FcGoogle } from "react-icons/fc"
import { SiFacebook } from "react-icons/si"
import { FaTwitter } from "react-icons/fa"
import { RiTwitterLine } from "react-icons/ri"

import SignUp from '../Authenticacion/SignUp';
// import SignIn from '../Authenticacion/SignIn';

import style from "../SignUpComplete/styles.module.sass"
interface DataProps {
  color: string,
  text: string,
  variant?: 'outline' | 'light',
  form ?: 'SignUp' | 'SignIn'
}


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

        <SignUp/>
    

        {/* Button Google */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>

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

          {/* Button Twitter */}
          <Button
            className = {style.buttonTwitter}
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