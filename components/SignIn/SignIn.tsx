import { useFocusReturn } from '@mantine/hooks';
import { useState } from 'react';
import { Modal } from '@mantine/core';
// import { AuthenticationForm } from '@mantine/core'
import { Group } from '@mantine/core'
import { Button } from '@mantine/core'
import { MODAL_SIZES } from '@mantine/core';
import React, { FC } from 'react';
import { FcGoogle } from "react-icons/fc"
import { SiFacebook } from "react-icons/si"
import { FaTwitter } from "react-icons/fa"
import { RiTwitterLine } from "react-icons/ri"

// test1

interface DataProps {
  color: string,
  text: string,
  variant?: 'outline' | 'light'
}

const SignIn: FC<DataProps> = (props) => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        hideCloseButton
        size={350}
      >
        Modal without header, press escape or click on overlay to close
        <form action="#">
          <label htmlFor="name">name: </label>
          <input id="name" type="text" name="name" />
        </form>

        {/* Button Google */}
        <div style={{textAlign: 'center'}}>

          <Button
            component="a"
            target="_blank"
            rel="noopener noreferrer"
            href="https://google.com"
            leftIcon={<FcGoogle />}
            styles={{
              root: {
                backgroundColor: '#ffffff',
                border: 0,
                height: 42,
                paddingLeft: 20,
                paddingRight: 20,
                color: 'black',
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
                paddingLeft: 20,
                paddingRight: 20,
                color: 'black'
              },

              leftIcon: {
                marginRight: 15,
              },

            }}
          >Sign in with Facebook
          </Button>
        </div>

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



export default SignIn;