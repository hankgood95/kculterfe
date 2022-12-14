import React,{useState,useRef} from 'react';
import './LoginPage.css';
import loginimg from '../../src_asset/로그인배경.png';
import loginblack from '../../src_asset/loginblack.png';
import Loginlogo from '../presentation/Loginlogo';
import Loginbtn from '../container/Loginbtn';
import ForgotPwdModal from '../presentation/ForgotPwd';
import SignUpModal from '../presentation/SignUpModal';
import '../presentation/LoginPage.css';
import '../presentation/LoginPage';


function LoginPage(){

    const [ForgotPwd, setForgotPwd] = useState(false);
    const [SignUp, setSignUp] = useState(false);
    const [email,setEmail] = useState("");
    const [pwd,setPwd] = useState("");

    const close = () => {
        setSignUp(false);
        window.location.reload();
    }

 

    return(
       <>
        <div className='login-con'>
          <img src={loginimg} /> 
          <div className='login-top'> 
          <Loginlogo className='loginNav' id ="login-loggo"/> 
          </div>
            <div className='login-div'>
                <div className='login-black'>
                    <img src={loginblack}></img>
                </div>
                <div className='inpult-nav'>
                    <input className='input-css1' 
                        type='text'
                        placeholder='E-mail'
                        onChange={e => setEmail(e.target.value)}
                        autoFocus/>
                    <input className='input-css2'
                    type='password'
                    placeholder='Password'
                    onChange={e=> setPwd(e.target.value)}
                    />
                <Loginbtn email={email} pwd={pwd}>LOGIN</Loginbtn>
                <div className="signup-btn" onClick={()=> setSignUp(true)}>
                    <button
                        onClick={()=> setSignUp(true)}
                    >SIGNUP</button>
                </div>
                </div>
                <SignUpModal
                    show={SignUp} onHide={close}
                    /> 
                
                <div className="for-pwd">
                <ForgotPwdModal
            show={ForgotPwd} onHide={()=>setForgotPwd(false)}
            />
                    <button 
                        onClick={() => setForgotPwd(true)}
                        className='pwd'
                    >Forgot your password ?</button>
                </div>
            </div>
        </div>
        </>
    );
}
export default LoginPage;