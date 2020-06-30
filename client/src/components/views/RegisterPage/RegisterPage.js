import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import {registerUser} from '../../../_actions/user_action';
import {withRouter} from 'react-router-dom';

function RegisterPage(props) {
    const dispatch = useDispatch();
    const [Email,setEmail] = useState("");
    const [Name, setName] = useState("");
    const [Password,setPassword] = useState("");
    const [Cpassword, setCpassword] = useState("");

    const onEmailHandler = (event) =>{
        setEmail(event.target.value);
    }
    const onNameHandler = (event) => {
        setName(event.target.value);
    }
    const onPasswordHandler = (event) =>{
        setPassword(event.target.value);
    }
    const onCpasswordHandler = (event) => {
        setCpassword(event.target.value);
    }
    const onSubmitHandler = (event) => {
        event.preventDefault();
        if(Password.length < 5){
            return alert('비밀번호는 5자 이상으로 해주세요');
        }else if(Password !== Cpassword){
            return alert('비밀번호를 확인해 주세요');
        }
        let body = {
            email:Email,
            name:Name,
            password:Password
        }

        dispatch(registerUser(body))
        .then(response => {
            if(response.payload.success){
                alert('회원가입 완료!!');
                props.history.push('/login');
            }else{
                if(response.payload.err.keyPattern.email === 1)
                alert('중복된 아이디가 존재합니다.');
            }
        })
    }
    return (
        <div style={{
            display:'flex', justifyContent:'center', alignItems:'center',
            width:"100%", height:'100vh'
        }}>
            <form style={{display:'flex', flexDirection:'column'}} onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <label>Confirm Password</label>
                <input type="password" value={Cpassword} onChange={onCpasswordHandler} />
                <br/>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default withRouter(RegisterPage);
