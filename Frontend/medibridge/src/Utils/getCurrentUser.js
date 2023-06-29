const getCurrentUser = () => {
    return localStorage.getItem("userData");
  };
  
export default getCurrentUser;