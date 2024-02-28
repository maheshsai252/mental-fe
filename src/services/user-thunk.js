import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUser} from './login-service';



export const getUserThunk = createAsyncThunk(
    'user',
    async () => {
        const userData = await getUser();
        console.log(userData);
        return userData;  // This is important to pass the data to the fulfilled callback
      }
)