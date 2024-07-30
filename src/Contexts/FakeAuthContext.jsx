import { act, createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = { user: null, isAuthenticated: false };

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("Unknown action!");
  }
}

const FAKE_USER = {
  name: "Krishna",
  email: "krishna@example.com",
  password: "radha",
  avatar:
    "https://i.pinimg.com/originals/3d/e3/b8/3de3b837936bf92e18dd2aaad85996cd.jpg",
  //   "https://i.pravatar.cc/100?u=zz"
};

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }
  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside the AuthProvider");

  return context;
}

export { AuthProvider, useAuth };
