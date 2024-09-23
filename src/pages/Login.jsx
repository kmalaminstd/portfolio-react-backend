import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../config/firebase.config"
import { useNavigate } from "react-router-dom"


function Login() {
    const [data, setData] = useState({username: '', password: ''})
    const navigate = useNavigate()

    const handleForm = e =>{
        e.preventDefault()

        if(data.username && data.password){
            signInWithEmailAndPassword(auth, data.username, data.password)
                .then(userCredential => {
                    const user = userCredential.user
                    navigate('/')
                    console.log(user);
                })
                .catch(err =>{
                    alert('Login failed')
                    console.log(err.message);
                    console.log(err.code);
                })
        }else{
            alert('Something went wrong')
        }
        
    }

    const handleValue = e =>{
        setData({
            ...data,
            [e.target.name] : e.target.value
        })
    }

  return (
    <>
        <div className="login_form_page">
            <div className="login_form">
                <h3>Admin Login</h3>
                <form action="" onSubmit={handleForm}>
                    <input type="text" name="username" placeholder="User Id" value={data.username} onChange={handleValue} />
                    <input type="password" name="password" placeholder="Password" value={data.password} onChange={handleValue} />
                    <button>Login</button>
                </form>
            </div>
        </div>
    </>
  )
}

export default Login