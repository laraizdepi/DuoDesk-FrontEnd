import { useFocusReturn } from '@mantine/hooks';
import { useState } from 'react';
import { Modal } from '@mantine/core';
// import { AuthenticationForm } from '@mantine/core'
import { Group } from '@mantine/core'
import { Button } from '@mantine/core'
import { MODAL_SIZES } from '@mantine/core';
import React, { FC } from 'react';


interface DataProps {
  color: string,
  text: string,
  variant ?: 'outline' | 'light'
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
      </Modal>

      <Group position="center">
        <Button
          color={props.color}
          onClick={() => setOpened(true)}
          variant= {props.variant}
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