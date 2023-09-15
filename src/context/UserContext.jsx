import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { getData, postData } from "../api";
import { GET_USERS, POST_USER, PUT_USER } from "../api/url";
import TeleportAutocomplete from "../plugin/autocomplete";

export const UserContext = React.createContext({
  user: {},
  token: null,
  login: () => {},
  signUp: () => {},
  instance: null
});

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [instance, setInstance] = useState(null);
  const loginHandler = () => {
    const tokenLs = localStorage.getItem("token");
    if (tokenLs) {
      setToken(tokenLs);
      const login_date = new Date();
      let user_id;
      let user_token;
      let postValue;
      getData(GET_USERS)
        .then((data) => {
          const userData = data.data;
          if (userData.length > 0) {
            userData.map((element) => {
              if (element.token === tokenLs) {
                // setUser(element.user_id);
                user_id = element.user_id;
                user_token = element.token;
                return (postValue = { user_id, token: user_token, login_date });
              }
            });
            postData(PUT_USER, postValue, user_id)
              .then((data) => {
                // console.log(data);
                setUser(postValue.user_id);
                // setToken(postValue.token);
              })
              .catch((error) => {
                console.log("some server error cannot update data", error);
              });
          } else {
            console.log("again error", userData);
            postNewUserData();
          }
        })
        .catch((error) => {
          console.log("some server error", error);
        });
    } else {
      signUp();
    }
  };
  const signUp = () => {
    const tokenLs = localStorage.getItem("token");
    if (!token && !tokenLs) {
      postNewUserData();
    } else {
      setToken(tokenLs);
    }
  };
  const createNewUser = () => {
    const user_token = uuid();
    const user_id = user_token.slice(0, 8);
    const login_date = new Date();
    const postValue = { user_id, token: user_token, login_date };
    return postValue;
  };
  const postNewUserData = () => {
    const postValue = createNewUser();
    postData(POST_USER, postValue)
      .then((data) => {
        // console.log(data);
        setUser(postValue.user_id);
        setToken(postValue.token);
        localStorage.setItem("token", postValue.token);
      })
      .catch((error) => {
        console.log("some server error need to be addressed");
      });
  };
  useEffect(() => {
   const element = new TeleportAutocomplete({ el: ".my-input" });
   setInstance(element);
  }, []);
  return (
    <UserContext.Provider
      value={{
        user,
        token,
        login: loginHandler,
        signUp,
        instance,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
