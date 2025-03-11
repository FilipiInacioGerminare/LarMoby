import { Link } from "react-router-dom";


function UserConfig(){
    return(
        <div>
            <h2>User Config</h2>
            <p>This is where you can configure your user settings.</p>
            <input type="text" placeholder="Enter your username" />
            <input type="password" placeholder="Enter your password" />
            <button type="submit">Save</button>
            <button type="reset">Reset</button>
            <Link to="/">Back to Home</Link>
        </div>
    )
}

export default UserConfig;