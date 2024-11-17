
type User = {
  access_token: string;
  message: string;
}

type LoginState = {
  loading: boolean;
  user: User | null;
}

type LoginAction = | { type: 'LOGIN', payload: User }


export const AuthReducer = (state: LoginState, action: LoginAction) => {
  switch (action.type) {
    case 'LOGIN': {
      return {
        loading: false,
        user: action.payload
      }
    }

    default: {
      return state
    }
  }
}
