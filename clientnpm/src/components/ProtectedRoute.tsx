import { ReactNode } from "react";
import  useUserStatus  from "../utils/useUserStatus";
type ProtectedRouteProps = {
  children: ReactNode;
};
function ProtectedRoute({ children }: ProtectedRouteProps) {
  // const { user } = useContext(AuthContext);

  //   const isUserLoggedin = user ? true : false;
  const isUserActive = useUserStatus();
  return (
    <div className="container">
      {isUserActive ? (
        children
      ) : (
        <div className="alertMesage  justityCenter alertMesage flex direction-column ">
          <h1>Log in, Before you dig!</h1>
          <div className="flex justityCenter">
            <a href="/login">
              <button className="generalButton margin1">Login</button>
            </a>{" "}
            <a href="/register">
              <button className="generalButton buttonYellow  margin1">
                Register
              </button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProtectedRoute;
