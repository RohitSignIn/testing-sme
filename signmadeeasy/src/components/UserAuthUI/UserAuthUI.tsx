import { useEffect, useRef, useState } from "react";
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"

import "./styles/style.css"
import { useNavigate } from "react-router-dom";

function UserAuthUI({ pg }: { pg: string }) {
  const navigate = useNavigate();
  const elementRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    console.log(pg, 'iuyf')
    if(pg === 'login') {
      elementRef.current?.classList.add('active')
      setTimeout(() => {
        console.log('innnnnnnnnnn Login', pg)
        elementRef.current?.classList.remove('active')
      }, 0)
    } else {
      console.log('innnnnnnnnnn Register', pg)
      setTimeout(() => {
        elementRef.current?.classList.add('active')
      }, 0)
    }
  }, [])
  
  // const [activeToggle, setActiveToggle] = useState<string>('');
  // const [page, setPage] = useState<string>('');

  //   console.log(pg)
  // const [page, setPage] = useState(pg || 'login');
  function handleToggleForm(val: string) {
    console.log(pg, 'gvsdtg')
    navigate(`/${val}`);
    // setPage((prev) => prev === "login" ? "register" : "login")
  }

  // function handleActiveTransition() {
  //   return 
  // }

  // useEffect(() => {
  //   if(page === 'register'){
  //     setActiveToggle('active')
  //   } else {
  //     setActiveToggle('')
  //   }
  // }, [page])

  // useEffect(() => {
  //   setPage(pg);
  // }, [pg])

  return (
    <div className="main-container-l">
      <div ref={elementRef} className={`container-l`}>
        <div className={`form-box login`}>
          <LoginForm />
        </div>

        <div className={`form-box register`}>
          <RegisterForm />
        </div>

        <div className="toggle-box">
          <div className="toggle-panel toggle-left">
            <h1>Sign Made Easy</h1>
            <p>Don't have an account?</p>
            <button className="btn register-btn" onClick={() => handleToggleForm("register")}>Register</button>
          </div>

          <div className="toggle-panel toggle-right">
            <h1>Welcome Back!</h1>
            <p>Already have an account?</p>
            <button className="btn login-btn" onClick={() => handleToggleForm("login")}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserAuthUI
