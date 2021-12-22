import './login.scss'

export default function Login() {
    const {
        REACT_APP_CLIENT_ID,
        REACT_APP_AUTHORIZE_URL,
        REACT_APP_REDIRECT_URL
      } = process.env;

    return (
        <div className="gradient-background">
            <h1 id="main-title">Discoverfy</h1>
            <h4 id="description">Find new music based on what you're already listening to</h4>
            <div className="centre-btn">
                <a href={`${REACT_APP_AUTHORIZE_URL}?client_id=${REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${REACT_APP_REDIRECT_URL}&scope=%20user-read-email%20user-read-private%20user-read-recently-played%20user-top-read`}>
                    <button id="login-btn">Login with Spotify</button>
                </a>
                    
            </div>
        </div>
    )
}
