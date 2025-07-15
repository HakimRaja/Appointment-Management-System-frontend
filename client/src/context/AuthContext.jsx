import React,{createContext,useState,useEffect,useContext, use} from "react";
import api from "../api/api";

export const AuthContext = createContext();

export const AuthContextProvider = ({children})=>{
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
        specialization_id: '',
        experience: '',
        history: ''
      });
      const [loginSuccess, setLoginSuccess] = useState(false);
      const [loginError , setLoginError] = useState(null);
      const [isLoginLoading , setIsLoginLoading] = useState(false);
      const [loginInfo , setLoginInfo] = useState({
        email : '',
        password : ''
      })
      // console.log(signupInfo);
      useEffect(() => { //setting up the user
        const user = JSON.parse(localStorage.getItem('User'));
        if (user) {
            setUser(user)
        }
      }, [])
      
      useEffect(() => {
        api.get('/auth/specializations')
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
          
          const res = await api.post('/auth/login',loginInfo);
          // if (!res?.message) {
          //   throw error;
          // }
          setLoginSuccess(true)
          localStorage.setItem('User',JSON.stringify(res.data
            // userId : res?.userId,
            // email : res?.email,
            // name : res?.name,
            // token : res?.token,
            // role : res?.role
          ));
          setUser(res.data);
          // alert(res?.message);

          navigate('/');
        } catch (error) {
          // alert(error?.message || 'Signup Failed');
          const errmsg = error?.response?.data?.message || error?.message || 'Login Failed';
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
          
          const res = await api.post('/auth/signup',signupInfo);
          // if (!res?.message) {
          //   throw error;
          // }
          setSignupSuccess(true)
          localStorage.setItem('User',JSON.stringify(res?.data));
          setUser(res.data);
          // alert(res?.message);
        } catch (error) {
          // alert(error?.message || 'Signup Failed');
          const errmsg = error?.response?.data?.message || error?.message || 'Signup Failed';
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
          specialization_id: '',
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

