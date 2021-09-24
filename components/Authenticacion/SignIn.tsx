import React, { useState } from 'react';
import { useForm } from '@mantine/hooks';
import { EnvelopeClosedIcon, LockClosedIcon } from '@modulz/radix-icons';
import {
    TextInput,
    PasswordInput,
    Group,
    Checkbox,
    Button,
    Paper,
    Text,
    LoadingOverlay,
    useMantineTheme,
} from '@mantine/core';
import {Password} from 'primereact/password';


export interface AuthenticationFormProps {
    noShadow?: boolean;
    noPadding?: boolean;
    noSubmit?: boolean;
    style?: React.CSSProperties;
}

// imports 



export function SignIn({noShadow,noPadding,noSubmit,style,}: AuthenticationFormProps) {
    const [formType, setFormType] = useState<'register' | 'login'>('register');
    const [loading, setLoading] = useState(false);
    // const [error, setError] = useState<string>(null);
    const theme = useMantineTheme();
    const inputVariant = theme.colorScheme === 'dark' ? 'filled' : 'default';

    const toggleFormType = () => {
        setFormType((current) => (current === 'register' ? 'login' : 'register'));
        // setError(null);
    };

    const form = useForm({initialValues: {firstName: '',lastName: '',email: '',password: '',termsOfService: true,},
        validationRules: {
            firstName: (value) => formType === 'login' || value.trim().length >= 2,
            lastName: (value) => formType === 'login' || value.trim().length >= 2,
            email: (value) => /^\S+@\S+$/.test(value),
            password: (value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value),
        },
    });
    const handleSubmit = () => {
        setLoading(true);
        // setError(null);
        setTimeout(() => {
          setLoading(false);
        //   setError(
        //     formType === 'register'
        //       ? 'User with this email already exists'
        //       : 'User with this email does not exist'
        //   );
        }, 3000);
      };
      return (
        <Paper
          padding={noPadding ? 0 : 'lg'}
        //   shadow={noShadow ? null : 'sm'}
          style={{
            position: 'relative',
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
            ...style,
          }}
        >
            {/* Form of login Up */}
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <LoadingOverlay visible={loading} />
            {formType === 'register' && (
              <div style={{ display: 'flex', marginBottom: 15 }}>

                    {/* Nombres  */}

                <TextInput
                  data-autofocus
                  required
                  placeholder="Juan"
                  label="Nombre"
                  radius="lg"
                  style={{ marginRight: 20, flex: '0 0 calc(50% - 10px)' }}
                  value={form.values.firstName}
                  onChange={(event) => form.setFieldValue('firstName', event.currentTarget.value)}
                  onFocus={() => form.setFieldError('firstName', false)}
                  error={form.errors.firstName && 'First name should include at least 2 characters'}
                  variant={inputVariant}
                />
    
                <TextInput
                  required
                  placeholder="Caballero"
                  label="Apellido"
                  radius="lg"
                  style={{ flex: '0 0 calc(50% - 10px)' }}
                  value={form.values.lastName}
                  onChange={(event) => form.setFieldValue('lastName', event.currentTarget.value)}
                  onFocus={() => form.setFieldError('lastName', false)}
                  error={form.errors.lastName && 'Last name should include at least 2 characters'}
                  variant={inputVariant}
                />
              </div>
            )}
    
            <TextInput

                // Correo Electronico

              required
              placeholder="Tu Correo"
              label="Email"
              radius="lg"
              icon={<EnvelopeClosedIcon />}
              value={form.values.email}
              onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
              onFocus={() => form.setFieldError('email', false)}
              error={form.errors.email && 'Field should contain a valid email'}
              variant={inputVariant}
            />
    
            <PasswordInput

                // Contraseña

              style={{ marginTop: 15 }}
              required
              placeholder="Micoworking1"
              label="Contraseña"
              showPasswordLabel="Show password"
              hidePasswordLabel="Hide password"
              icon={<LockClosedIcon />}  
              radius="lg"
              value={form.values.password}
              onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
              onFocus={() => form.setFieldError('password', false)}
              variant={inputVariant}
              error={
                form.errors.password &&
                'Password should contain 1 number, 1 letter and at least 6 characters'
              }
            />
            {/* <Password value={value} onChange={(e) => setValue(e.target.value)} /> */}

    
            {formType === 'register' && (
              <Checkbox
                style={{ marginTop: 20 }}
                label="I agree to sell my soul and privacy to this corporation"
                checked={form.values.termsOfService}
                onChange={(event) => form.setFieldValue('termsOfService', event.currentTarget.checked)}
                color = "pink"
              />
            )}
    
            {/* {error && (
              <Text color="red" size="sm" style={{ marginTop: 10 }}>
                {error}
              </Text>
            )} */}
    
            {!noSubmit && (
              <Group position="apart" style={{ marginTop: 25 }}>
                <Button variant="link" color="teal" onClick={toggleFormType} size="sm">
                  {formType === 'register'
                    ? 'Tienes Una Cuenta? Inicie Sesion'
                    : "Don't have an account? Register"}
                </Button>
    
                <Button color="teal" type="submit">
                  {formType === 'register' ? 'Registro' : 'Login'}
                </Button>
              </Group>
            )}
          </form>
        </Paper>
      );
}
export default SignIn


