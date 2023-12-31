import React,{useState,useEffect} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import {Form,Input,message} from "antd";
import axios from 'axios';
import Spinner from '../components/Spinner.js';

const Login=()=>{
  const navigate = useNavigate();
  const [loading,setLoading]=useState(false);

  // Submit Handler
  const submitHandler=async(values)=>{
    try{
      setLoading(true);
      const {data}=await axios.post("/user/login",values);
      setLoading(false);
      message.success('User Login Successfully');
      localStorage.setItem('user',JSON.stringify({...data.user,password:''}))
      navigate('/');
    }catch(error){
      setLoading(false);
      message.error('Something went wrong');
    }
  };

  //prevent for login user
  useEffect(()=>{
    if (localStorage.getItem('user')){
      navigate("/");
    }
  },[navigate]);

  return(
    <>
      <div className='login-page'>
        {loading&&<Spinner />}
        <Form layout='vertical' onFinish={submitHandler}>
          <h2>Login Page</h2>

          <Form.Item label="E-mail" name="email">
            <Input type='email'/>
          </Form.Item>

          <Form.Item label="Password" name="password">
            <Input type='password'/>
          </Form.Item>

          <div className='d-flex justify-content-between'>
            <Link to='/register'>Not a User, Please Register</Link>
          </div>
          <div className='p-2'></div>
          <div className='d-flex justify-content-between'>
            <button className='btn btn-primary'>Login</button>
          </div>
        </Form>
      </div>
    </>
  )
}

export default Login;