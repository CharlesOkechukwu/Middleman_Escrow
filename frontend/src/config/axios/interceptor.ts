import Authorization from "@/lib/authorization";


const authorization = new Authorization()

// add bearer token to request header
const addTokenInterceptor = (config: any) => {
  const token = authorization.token()
  if (token) {
    config.headers.Authorization = token
  }
  return config;
}


export {
  addTokenInterceptor
}