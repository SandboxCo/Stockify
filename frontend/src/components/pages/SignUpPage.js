import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../providers/DataProvider';
import { useAuth } from '../../providers/AuthProvider';

import HorizontalNav from '../HorizontalNav';

import MultiStepForm from '../MultiStepForm';

const SignUpPage = () => {
    const navigate = useNavigate()

    const {signIn, isSignedIn} = useAuth()

    const {testData} = useData()

    useEffect(()=>{
        console.log(isSignedIn())
        if (isSignedIn()){
            navigate("/")
        }
    }, [])

    return (
        <div
            style={{height:"100vh", width:"100vw", display:"flex",flexDirection:"column"}}
        >
            <div style={{height:"9%"}}>
                <HorizontalNav/>
            </div>
            <div style={{height:"91%", backgroundColor:"#eee"}}>
                <MultiStepForm/>
            </div>
        </div>
    );
};
export default SignUpPage;