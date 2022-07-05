import {useState, createContext} from 'react';
const LoginContext = createContext();
function LoginProvider({children}) {
    const [isLogin, setIsLogin] = useState(localStorage.getItem('UDPTisLogin'));
    const [user, setUser] = useState(localStorage.getItem('UDPTuser'));

    const value = {
        isLogin,
        user,
        updateLogin: () => {
            setIsLogin(!isLogin);
            localStorage.setItem('UDPTisLogin', !isLogin);
        },
        updateUser: (data) => {
            setUser(data);
            localStorage.setItem('UDPTuser', data);
        }
    };
    return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>;
}

export {LoginContext, LoginProvider};
