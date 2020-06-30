import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {auth} from '../_actions/user_action';

export default function(SpecificComponent,option,adminRoute=null){

    //option
    //null => 아무나 출입가능한 페이지
    //true => 로그인한 유저만 출입 가능한 페이지
    //false => 로그인한 유저는 출입 불가능한 페이지

    const dispatch = useDispatch();

    function AuthenticationCheck(props){
        useEffect(() => {
            dispatch(auth()).then(response => {
                console.log(response)
                if(!response.payload.isAuth){
                    if(option){
                        props.history.push('/login');
                    }
                }else{
                    if(adminRoute && !response.payload.isAdmin){
                        props.history.push('/');
                    }else{
                        if(!option){
                            props.history.push('/');
                        }
                    }
                }
            });
        }, [])

        return(
            <SpecificComponent/>
        )
    }

    return AuthenticationCheck
}