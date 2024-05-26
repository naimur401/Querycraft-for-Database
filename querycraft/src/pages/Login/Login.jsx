
import { useContext, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';

const Login = () => {
    const {signIn} = useContext(AuthContext);
    const [error, setError] = useState()
    const [success, setSuccess] = useState()
    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log({ email, password });
        signIn(email, password)
        .then(result => {
            result.user
            form.reset();
            setSuccess('Successfully login');
            setError('')
        })
        .catch(error =>{
            console.log(error.message);
            setError(error.message);
            setSuccess('')
        })
    }
    return (
        <div className='w-10/12 mx-auto flex justify-center mt-20'>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form className="card-body" onSubmit={handleLogin}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="email" name='email' className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="password" name='password' className="input input-bordered" required />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Login</button>
                    </div>
                    <p className='text-red-500'>{error}</p>
                    <p className='text-green-500'>{success}</p>
                </form>
            </div>
        </div>
    );
};

export default Login;