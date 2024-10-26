import {
  useContext,
  createContext,
  useMemo,
  useReducer,
  useState,
} from "react";
import { authReducer } from "./store/reducer";

export const AuthContext = createContext({
  user: null,
  token: null,
  loading: true,
  setLoading: () => { },
  login: () => { },
  logout: () => { },
});

const AuthContextProvider = ({ children }) => {
  const initState = {
    user: localStorage.getItem("user")
      ? localStorage.getItem("user")
      : null,
    token: localStorage.getItem("token") || null,
  };

  const [state, dispatch] = useReducer(authReducer, initState);
  const [loading, setLoading] = useState(true);

  const login = (user, token) => {
    dispatch({ type: "LOGIN", payload: { user, token } });
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const memorizedValue = useMemo(
    () => ({
      user: state?.user,
      token: state?.token,
      loading,
      setLoading,
      login,
      logout,
    }),
    [state, loading]
  );

  return (
    <AuthContext.Provider value={memorizedValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContextProvider;
