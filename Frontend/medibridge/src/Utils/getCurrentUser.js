const getCurrentUser = () => {
    return localStorage.getItem("token");
  };
  
export default getCurrentUser;