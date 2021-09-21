import './App.css';
import { Form, Input, Button, Typography, Divider } from 'antd';
import axios from 'axios'
import { useState } from 'react';

const URL = "https://xfoil-technical-interview.herokuapp.com"

function App() {
  const { Title, Paragraph, Text, Link } = Typography;
  const [ loginErr, setLoginErr ] = useState(null)
  const [ userData, setUserData ] = useState(null)

  const onFinish = (values) => {
    setLoginErr(null)
    axios.post(URL+"/login",{
        username:values.username,
        password:parseInt(values.password),
    })
    .then((resp)=>{
      if(resp.status===200) {
        setUserData(resp.data)
        console.log("LOGGED IN",resp.data)
      }
    })
    .catch((err)=>{
      setLoginErr("Please provide correct credentials")
      console.log("LOGIN ERR", err)
    })
    console.log(values)
  }

  return (
    <div className="">
      {
        userData
        ?
        <div>
          <Title>{userData.firstNameAdmin + " " + userData.lastNameAdmin}</Title>
          <Paragraph>{userData.companyId}</Paragraph>
          <Title>Location</Title>
          <Paragraph>
            <ul>
              {
                userData.locationObjects.map((item, index)=> (
                  <li key={index}>
                    <Text>{item.locationName}</Text>
                  </li>
                ))
              }
            </ul>
          </Paragraph>
          <Title>Current Location</Title>
          <Paragraph>
            <ul>
              {
                userData.currentLocation.map((item, index)=> (
                  <li key={index}>
                    <Text>{item.locationName}</Text>
                  </li>
                ))
              }
            </ul>
          </Paragraph>
        </div>
        :
        <>
          <div>Login Page</div>
          <div>
            <Form
              name="basic"
              labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
              // autoComplete="off"
            >
              <Form.Item
                label="Email"
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Email!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
                >
                  <Input.Password />
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <div style={{color:'red'}}>{loginErr || ""}</div>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </>
      }
    </div>
  );
}

export default App;
