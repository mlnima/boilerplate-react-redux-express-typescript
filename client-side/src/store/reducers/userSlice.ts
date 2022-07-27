import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk, RootState} from "../store";
import axios from "axios";
import {setAlert, setLoading} from "./globalSlice";

export interface UserSliceTypes {
    loading: boolean,
    isLogin: boolean,
    userData: {
        username: string,
        email: string,
        token: string,
        profileImage?: string
    }
}

const initialState: UserSliceTypes = {
    loading: false,
    isLogin: false,
    userData: {
        username: '',
        email: '',
        token: '',
    }
};

export const register = createAsyncThunk(
    'user/register',
    async (formData: {}, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true))
        const body = {
            formData
        }
        return await axios.post(`/api/v1/auth/register`, body).then(response => {
            thunkAPI.dispatch(setAlert({
                type: 'success',
                active: true,
                message: response?.data?.message,
            }))
        }).catch(error => {
            thunkAPI.dispatch(setAlert({
                type: 'error',
                active: true,
                message: error.response?.data?.message,
            }))
        }).finally(() => {
            thunkAPI.dispatch(setLoading(true))
        })
    });

export const login = createAsyncThunk(
    'user/login',
    async (formData: {}, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true))
        const body = {
            formData
        }
        return await axios.post(`/api/v1/auth/login`, body).then(response => {
            if (response.data.token) {
                localStorage.setItem('token', response.data.token)
            }
            thunkAPI.dispatch(setAlert({
                type: 'success',
                active: true,
                message: response?.data?.message,
            }))
            return response.data
        }).catch(error => {
            thunkAPI.dispatch(setAlert({
                type: 'error',
                active: true,
                message: error.response?.data?.message,
            }))
        }).finally(() => {
            thunkAPI.dispatch(setLoading(true))
        })
    });

export const autoLogin = createAsyncThunk(
    'user/autoLogin',
    async (token: string, thunkAPI) => {
        return await axios.post(`/api/v1/auth/autoLogin`, {token}).then(response => {
            thunkAPI.dispatch(setAlert({
                type: 'success',
                active: true,
                message: response?.data?.message,
            }))

            return response.data?.user || {}
        }).catch(error => {
            thunkAPI.dispatch(setAlert({
                type: 'error',
                active: true,
                message: error.response?.data?.message,
            }))
        }).finally(() => {
            thunkAPI.dispatch(setLoading(true))
        })
    });

export const fetchUserProfileImageUpload = createAsyncThunk(
    'user/fetchUserProfileImageUpload',
    async (image: any, thunkAPI) => {

        thunkAPI.dispatch(setLoading(true))
        return await axios.post('/api/v1/auth/userUploadImage', image).then(res => {

        }).catch(error => {

        }).finally(() =>     thunkAPI.dispatch(setLoading(false)))
    }
)

export const usersSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('token')
            return {
                ...state,
                isLogin: false,
                userData: {
                    username: '',
                    email: '',
                    token: '',
                }
            }
        }
    },
    extraReducers: (builder) => {
        // @ts-ignore
        builder
            .addCase(login.fulfilled, (state, action) => {
                return {
                    ...state,
                    isLogin: true,
                    userData: action.payload
                }
            })
            .addCase(autoLogin.fulfilled, (state, action) => {
                console.log(action)
                return {
                    ...state,
                    isLogin: true,
                    userData: action.payload
                }
            })

        ;
    },
});

export const {logout} = usersSlice.actions;

export const userReducer = (state: RootState) => state?.users || null;

export default usersSlice.reducer;