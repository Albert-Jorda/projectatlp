import React, {useState} from "react";
import Navbar from "../../../layouts/frontend/Navbar";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert';
function Logins()
{
    const history = useHistory();
    const [loginInput, setLogin] = useState({
        email:'',
        password:'',
        error_list:[],
    });
    const handleInput = (e) =>{
        e.persist();
        setLogin({...loginInput, [e.target.name]: e.target.value});
    }

    const loginSubmit = (e) =>{
        e.preventDefault();
    
        const data ={
            email: loginInput.email,
            password:loginInput.password,
        }
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/admin_login`, data).then(res =>{
                if(res.data.status === 200)
                {
                    localStorage.setItem('auth_token' ,res.data.token);
                    localStorage.setItem('auth_name' ,res.data.username);
                    swal("Succes", res.data.message,"success");
                    history.push('/admin/viewFaculty');
                }
                else
                {
                    setLogin({... loginInput, error_list: res.data.validation_error});
                }
         });
        });
    }
    return(
        <div>
            
            <Navbar />
            <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h4>Administrator Login</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={loginSubmit}>
                                <div className="form-group mb-3">
                                    <label>Email Address:</label>
                                    <input type =" " name ="email"  onChange={handleInput} value = {loginInput.email} className = "form-control"  />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Password:</label>
                                    <input type ="password" name ="password" onChange={handleInput} value = {loginInput.password} className = "form-control"  />
                                </div>
                                

                                <div className="form-group mb-3">
                                    <button type="submit"className="btn btn-primary">Login</button>
                                </div>
                                <Link className="nav-link" to="/login">Not a Administrator? Click here</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
         

        </div>
    )
}

export default Logins;