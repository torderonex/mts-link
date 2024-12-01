import { useEffect } from "react";
import AppRoutes from "./AppRoutes";
import useUserStore from "./store/user-store";

function App() {
  const { checkAuth, isAuth } = useUserStore();

  useEffect(() => {
    if (localStorage.getItem("auth_token") === null || isAuth === undefined) {
      checkAuth();
    }
  }, [checkAuth, isAuth]);

  return <AppRoutes />;
}

export default App;
