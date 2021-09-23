import { useFocusReturn } from '@mantine/hooks';
import { useState } from 'react';
import { Modal } from '@mantine/core';
import { AuthenticationForm } from '@mantine/core'
import { Group } from '@mantine/core'
import { Button } from '@mantine/core'
import { MODAL_SIZES } from '@mantine/core';

// import React, { useState } from 'react';
// import { Modal, Button, Group } from '@mantine/core';

const SignIn = () => {
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
        <Button color='teal ' onClick={() => setOpened(true)}>Login Up</Button>
      </Group>
    </>
  );
}



export default SignIn;  