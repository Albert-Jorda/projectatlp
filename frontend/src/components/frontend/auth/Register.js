
import React, { useState } from "react";
import Navbar from "../../../layouts/frontend/Navbar";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert';
function Register()

{
const history = useHistory();
 const  [ registerInput , setRegister] = useState({
     name:'',
     student_id:'',
     email:'',
     password:'',
     error_list:[],

 });

 const handleInput = (e) => {
     e.persist();
     setRegister({...registerInput, [e.target.name]: e.target.value});
 }

 const registerSubmit = (e) => {
     e.preventDefault();

     const data = {
         name: registerInput.name,
         student_id: registerInput.student_id,
         email: registerInput.email,
         password: registerInput.password,
     }
     axios.get('/sanctum/csrf-cookie').then(response => {
     axios.post(`/api/register`, data).then(res =>{
            if(res.data.status === 200)
            {
                localStorage.setItem('auth_token' ,res.data.token);
                localStorage.setItem('auth_name' ,res.data.username);
                swal("Succes", res.data.message,"success");
                history.push('/login');
            }
            else
            {
                setRegister({... registerInput, error_list: res.data.validation_error});
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
                            <h4>Register</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={registerSubmit}>
                                <div className="form-group mb-3">
                                    <label>Full Name:</label>
                                    <input type ="" name ="name" onChange={handleInput} value = {registerInput.name} className = "form-control"  />
                                    <span>{registerInput.error_list.name}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Student ID:</label>
                                    <input type ="" name ="student_id" onChange={handleInput} value = {registerInput.student_id} className = "form-control" />
                                    <span>{registerInput.error_list.student_id}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Email Address:</label>
                                    <input type =" " name ="email" onChange={handleInput} value = {registerInput.email} className = "form-control"  />
                                    <span>{registerInput.error_list.email}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Password:</label>
                                    <input type ="password" name ="password" onChange={handleInput} value = {registerInput.password} className = "form-control"  />
                                    <span>{registerInput.error_list.password}</span>
                                </div>
                               

                                <div className="form-group mb-3">
                                    <button type="submit"className="btn btn-primary">Register</button>
                                </div>
                                <Link className="nav-link" to="/login">Already have a account? Click here</Link>
                                <Link className="nav-link" to="/register_faculty">Not a Student? Register here</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     

    </div>
    )
}

export default Register;