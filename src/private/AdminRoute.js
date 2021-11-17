import { Redirect, Route } from "react-router-dom"
import useAuth from "../hooks/useAuth"

function AdminRoute({ children, ...rest }) {
    const {admin, isLoading} = useAuth();
    if(isLoading){
        return (
            <div>Loading.....</div>
        )
    }
    return (
      <Route
        {...rest}
        render={({location})=>
            admin ? ( 
                children 
                ) 
                :
                (
                    <Redirect
                    to={{
                        pathname:'/login',
                        state: { from: location }
                    }}
                    />
                )
        }
      />
    );
  }
export default AdminRoute;