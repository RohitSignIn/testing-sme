import { GoogleSvg, SalesforceSvg } from "../svgs/Svg";

import OAuthGoogle from "./OAuthGoogle";


function LoginForm() {
    return (
        <form action="#">
            <h1>Login</h1>
            <div className="input-box">
                <input type="text" placeholder="Username" required />
                <i className='bx bxs-user'></i>
            </div>
            <div className="input-box">
                <input type="password" placeholder="Password" required />
                <i className='bx bxs-lock-alt' ></i>
            </div>
            <div className="forgot-link">
                <a href="#">Forgot Password?</a>
            </div>
            <button type="submit" className="btn">Login</button>
            <p>or login with social platforms</p>
            <div className="social-icons">
                {/* <a href="#"><GoogleSvg size={{x: "32px", y: "32px"}} /></a> */}
                <OAuthGoogle />
                {/* <a href="#"><SalesforceSvg size={{x: "32px", y: "32px"}} /></a> */}
            </div>
        </form>
    )
}

export default LoginForm
