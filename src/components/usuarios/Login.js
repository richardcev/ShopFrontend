import React, { useState } from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, LinkedinOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Title } = Typography;

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
`;

const FormContainer = styled.div`
  border: 1px solid #d1d1d1;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
`;

const SocialContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 10px;
`;

const StyledIcon = styled.div`
  font-size: 24px;
`;

const Login = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Valores enviados:', values);
  };

  return (
    <LoginContainer>
      <FormContainer>
        <Title level={2} style={{textAlign:'center'}}>Iniciar sesión</Title>
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Por favor ingresa tu correo electrónico' }]}
          >
            <Input size="large" placeholder="Correo electrónico" type="email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}
          >
            <Input.Password size="large" placeholder="Contraseña" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" size="large" htmlType="submit">
              Ingresar
            </Button>
          </Form.Item>
          <SocialContainer>
        <p>Visítanos</p>
        <SocialIcons>
          <StyledIcon>
            <FacebookOutlined />
          </StyledIcon>
          <StyledIcon>
            <TwitterOutlined />
          </StyledIcon>
          <StyledIcon>
            <InstagramOutlined />
          </StyledIcon>
          <StyledIcon>
            <LinkedinOutlined />
          </StyledIcon>
        </SocialIcons>
      </SocialContainer>
        </Form>
      </FormContainer>
    </LoginContainer>
  );
};

export default Login;
