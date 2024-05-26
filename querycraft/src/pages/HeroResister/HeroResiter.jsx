import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";

const HeroResiter = () => {
  const { createUser } = useContext(AuthContext);
  const [success, setSuccess] = useState();
  const [error, setError] = useState()
  const handleRegister = e => {
    e.preventDefault();
    console.log('form submitted');
    const email = e.target.email.value;
    const name = e.target.name.value;
    const password = e.target.password.value;
    console.log(name, email, password);


    createUser(email, password)
      .then(result => {
        const loggedUser = result.user;
        console.log(loggedUser);
        // form.reset();
        setSuccess('Successfully register');
        setError('');
        fetch('http://localhost:5000/user', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({name, email})
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
      })
      .catch(e => {
        console.log(e.message);
        setError(e.message);
        setSuccess('')
      })
  }
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Resiter now!</h1>
          <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <form onSubmit={handleRegister}>
            <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" placeholder="name" className="input input-bordered" name="name" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="email" className="input input-bordered" name="email" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="password" name="password" className="input input-bordered" required />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <p className="text-green-500">{success}</p>
              <p className="text-red-400">{error}</p>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroResiter;