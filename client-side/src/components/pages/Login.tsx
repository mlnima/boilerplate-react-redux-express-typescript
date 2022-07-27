import styled from "styled-components";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import React, {useEffect, useState} from "react";
import {login} from "../../store/reducers/userSlice";
import {useNavigate} from 'react-router-dom'

const Style = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;

  form {
    max-width: 320px;
  }
`

const Login = () => {
    const dispatch = useAppDispatch()
    const isLogin = useAppSelector((store)=>store.users.isLogin)
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: ''
    })
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(login(formData))
    }

    useEffect(() => {
        if (isLogin){
            navigate(-1)
        }
    }, [isLogin]);

    return (
        <Style>
            <h1>Login</h1>
            <form onSubmit={onSubmitHandler}>
                <input type="text"
                       name={'username'}
                       onChange={onChangeHandler}
                       value={formData.username}
                       className={'form-control-input'} placeholder={'username'}/>

                <input type="password"
                       name={'password'}
                       onChange={onChangeHandler}
                       value={formData.password}
                       className={'form-control-input'} placeholder={'password'}/>
                <button type={'submit'} className={'btn btn-primary'}>Login</button>
            </form>
        </Style>
    )
};
export default Login