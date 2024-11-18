// import Authorization from "@/lib/authorization";


// const authorization = new Authorization()

// add bearer token to request header
const addTokenInterceptor = (config: any) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.warn("Token is missing, Authorization header not added.");
  }
  return config;
}


export {
  addTokenInterceptor
}