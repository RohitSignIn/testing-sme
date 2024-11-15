import { GoogleSvg, SalesforceSvg } from "../svgs/Svg"
import OAuthGoogle from "./OAuthGoogle"

function RegisterForm() {
    return (
        <div>
            <form action="#">
                <h1>Registration</h1>
                <div className="input-box">
                    <input type="text" placeholder="Username" required />
                    <i className='bx bxs-user'></i>
                </div>
                <div className="input-box">
                    <input type="email" placeholder="Email" required />
                    <i className='bx bxs-envelope' ></i>
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Password" required />
                    <i className='bx bxs-lock-alt' ></i>
                </div>
                <button type="submit" className="btn">Register</button>
                <p>or register with social platforms</p>
                <div className="social-icons">
                    <OAuthGoogle />
                </div>
            </form>
        </div>
    )
}

export default RegisterForm
