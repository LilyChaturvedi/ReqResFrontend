import { createContext, useState } from "react";
interface AuthContextType {
  token: boolean;
  setToken: React.Dispatch<React.SetStateAction<boolean>>;
}
export const authContext = createContext<AuthContextType | null>(null);

const AuthWrapper = (props: { children: JSX.Element }) => {
  const [token, setToken] = useState(false);

  return (
    <div>
      <authContext.Provider value={{ token, setToken }}>
        {props.children}
      </authContext.Provider>
    </div>
  );
};

export default AuthWrapper;
