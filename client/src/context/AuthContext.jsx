import React,{createContext,useState,useEffect,useContext, use} from "react";
import api from "../api/api";

export const authContext = createContext();

export const authContextProvider = ({children})=>{
    const [medicalSpecializations,setMedicalSpecializations] = use([]);//for signup

    const [user,setUser] = use(null);

    const [signupSuccess, setSignupSuccess] = use(false);
    const [signupError , setSignupError] = use(false);
    const [isSignupLoading , setIsSignupLoading] = useState(false);
    const [signupInfo , setSignupInfo] = use({
        name : '',
        email: '',
        password: '',
        phone: '',
        dob: '',
        role: 'admin',
        specialization: '',
        experience: '',
        history: ''
      });

      const [loginSuccess, setLoginSuccess] = use(false);
      const [loginError , setLoginError] = use(false);
      const [isLoginLoading , setIsLoginLoading] = useState(false);
      const [loginInfo , setLoginInfo] = use({
        email : '',
        password : ''
      })

      useEffect(() => { //setting up the user
        const user = localStorage.getItem('User');
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
      
    
    
      return <authContext.Provider value={{user , medicalSpecializations , signupInfo , loginInfo,signupError,loginError,signupSuccess,loginSuccess,isSignupLoading,isLoginLoading}}>
        {children}
      </authContext.Provider>
}

