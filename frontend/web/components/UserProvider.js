import axios from 'axios';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Fragment, useEffect, useMemo, useReducer, useState } from 'react';

import UserContext, { defaultState } from '../utils/userContext';
import webRoutes from '../utils/webRoutes';

/**
 * Reducer to help manage global state.
 */
const UserReducer = (initialState, action) => {
  switch (action.type) {
    case 'login':
      return {
        ...initialState,
        isAuthenticated: true,
      };

    case 'logout':
      return {
        ...initialState,
        isAuthenticated: false,
      };

    case 'fail':
      return {
        ...initialState,
        isAuthenticated: false,
      };

    default:
      throw new Error(
        `Reducer does not support the action type '${action.type}'!`
      );
  }
};

/**
 * Provider function to help provide the values for the Context.
 */
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, defaultState);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  /**
   * First things first, when first time loading a component, authenticate a user quickly.
   */
  useEffect(async () => {
    await axios
      .post('/api/checkAuth', { key: 'check_auth_key' })
      .then((res) => {
        console.log(res);
        setLoading(false);
        if (res.data.status === 'success') {
          dispatch({ type: 'login' });
          if (
            router.route === webRoutes.login ||
            router.route === webRoutes.register
          ) {
            return router.replace(webRoutes.homepage);
          }
          return;
        }

        return dispatch({ type: 'fail' });
      })
      .catch(() => dispatch({ type: 'fail' }));
  }, []);

  /**
   * Memorize the states to prevent unnecessary re-renders.
   */
  const value = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch]
  );

  /**
   * Return a new provider.
   */
  return (
    <Fragment>
      {!loading && (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
      )}
    </Fragment>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;
