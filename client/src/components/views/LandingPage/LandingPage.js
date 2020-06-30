import React, {useEffect} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

function LandingPage(props) {
    useEffect(() => {
        axios.get('/api/hello')
        .then(res => console.log(res.data))
    },[]);
    const logoutHandler = (event) =>{
        event.preventDefault();
        axios.get('/api/users/logout')
        .then(response => {
            if(response.data.success){
                props.history.push('/login');
            }else{
                alert('error');
            }
        })
    }
    return (
        <div style={{
            display:'flex', justifyContent:'center', alignItems:'center',
            width:"100%", height:'100vh', flexDirection:'column'
        }}>
            <h2>시작 페이지</h2>
            <button onClick={logoutHandler}>Logout</button>
        </div>
    )
}

export default withRouter(LandingPage);