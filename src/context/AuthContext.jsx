import React,{createContext,useState,useEffect,useContext, use} from "react";
import api from "../api/api";
import { login, signup } from "../services/authServices";
import { getSignupInfo } from "../services/helper/authHelper";

export const AuthContext = createContext();

export const AuthContextProvider = ({children})=>{
    const GET_SPECIALIZATIONS_URL = '/auth/specializations';
    const CHECK_AUTHENTICATION_URL = '/auth/authorized';
    const SIGNUP_FAIL_MESSAGE = 'Signup failed';

    const [medicalSpecializations,setMedicalSpecializations] = useState([]);//for signup

    const [isAuthenticated,setIsAuthenticated] = useState(false);
    const [user,setUser] = useState(null);

    const [signupSuccess, setSignupSuccess] = useState(false);
    const [signupError , setSignupError] = useState(null);
    const [isSignupLoading , setIsSignupLoading] = useState(false);
    const [signupInfo , setSignupInfo] = useState({
        name : '',
        email: '',
        password: '',
        phone: '',
        dob: '',
        role: 'admin',
        specialization : [],
        experience: '',
        history: ''
      });

      console.log(signupInfo);
      const [loginSuccess, setLoginSuccess] = useState(false);
      const [loginError , setLoginError] = useState(null);
      const [isLoginLoading , setIsLoginLoading] = useState(false);
      const [loginInfo , setLoginInfo] = useState({
        email : '',
        password : ''
      })
      useEffect(() => { //setting up the user
        const user = JSON.parse(localStorage.getItem('User'));
        if (user) {
          api.get(CHECK_AUTHENTICATION_URL,{
            headers : {
              'Authorization' : `Bearer ${user.token}`
            }
          })
          .then(response =>{
            if (response?.data?.check) {
              setUser(user);
              setIsAuthenticated(true);
            }
          })
          .catch(error =>{
            setIsAuthenticated(false);
            setUser(null);
          })
        }
        else{
          setUser(null);
          setIsAuthenticated(false);
        }
      }, []);

      useEffect(() => {
        api.get(GET_SPECIALIZATIONS_URL)
        .then(response => {
            setMedicalSpecializations(response.data.specializations)
        })
        .catch(error =>{
            console.log(error);
        })
        
      }, [])

      const loginUser = async(e) =>{
        e.preventDefault();
        setIsLoginLoading(true);
        setLoginError(null);
        setLoginSuccess(false);
        try {
          
          const res = await login(loginInfo);
          setLoginSuccess(true)
          localStorage.setItem('User',JSON.stringify(res));
          setUser(res);
          setIsAuthenticated(true);
        } catch (error) {
          const errmsg =error?.response?.data?.message || error?.message || SIGNUP_FAIL_MESSAGE;
          setLoginError(errmsg);
        }
        finally{
          setIsLoginLoading(false)
        }
      }

      const signupUser = async(e)=>{
        e.preventDefault();
        console.log(signupInfo);
        setIsSignupLoading(true);
        setSignupError(null);
        setSignupSuccess(false);
        try {
          const info = getSignupInfo(signupInfo);
          if (!info.check) {
            throw (info.message);
          }
          console.log(info.data);
          const res = await signup(info.data);
          setSignupSuccess(true)
          localStorage.setItem('User',JSON.stringify(res));
          setUser(res);
          setIsAuthenticated(true);
        } catch (error) {
          const errmsg =error?.response?.data?.message || error?.message || error || SIGNUP_FAIL_MESSAGE;
          setSignupError(errmsg);
        }
        finally{
          setIsSignupLoading(false)
        }
      }

      const updateSignupInfo = (info) =>{
        setSignupInfo(info);
      }
      const updateLoginInfo = (info) =>{
        setLoginInfo(info);
      }
    
      const logoutUser = () =>{
        localStorage.removeItem('User');
        setUser(null);
        setIsAuthenticated(false);
      }
      const clearSignupState = () => {
        setSignupSuccess(false);
        setSignupError(null);
        setSignupInfo({
          name: '',
          email: '',
          password: '',
          phone: '',
          dob: '',
          role: 'admin',
          specialization: [],
          experience: '',
          history: ''
        });
      };
      const clearLoginState = () => {
        setLoginSuccess(false);
        setLoginError(null);
        setSignupInfo({
          email: '',
          password: ''
        });
      };

      return <AuthContext.Provider value={{user ,
       medicalSpecializations ,
        signupInfo , 
        loginInfo,
        signupError,
        loginError,
        signupSuccess,
        loginSuccess,
        isSignupLoading,
        isLoginLoading ,
         signupUser ,
          loginUser,
          updateLoginInfo,
          updateSignupInfo,
          logoutUser,
          clearSignupState,
          clearLoginState,
          isAuthenticated
          }}>
        {children}
      </AuthContext.Provider>
}

