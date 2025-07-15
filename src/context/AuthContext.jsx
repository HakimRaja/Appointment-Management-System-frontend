import React,{createContext,useState,useEffect,useContext, use} from "react";
import api from "../api/api";
import { login, signup } from "../services/authServices";

export const AuthContext = createContext();

export const AuthContextProvider = ({children})=>{
    const GET_SPECIALIZATIONS_URL = '/auth/specializations';
    const [medicalSpecializations,setMedicalSpecializations] = useState([]);//for signup

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
        specialization_id: [],
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
            setUser(user)
        }
      }, [])

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
        } catch (error) {
          const errmsg = error;
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

          const res = await signup(signupInfo);
          setSignupSuccess(true)
          localStorage.setItem('User',JSON.stringify(res));
          setUser(res);
        } catch (error) {
          const errmsg = error;
          console.log(error);
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
          specialization_id: [],
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
          clearLoginState
          }}>
        {children}
      </AuthContext.Provider>
}

