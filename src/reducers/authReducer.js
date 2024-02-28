import axios from 'axios';

const initialState = {
    user: null,
    error: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      // Handle your actions here
      default:
        return state;
    }
  };
  
  export default authReducer;
  