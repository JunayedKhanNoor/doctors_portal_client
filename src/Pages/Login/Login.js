import React, { useEffect, useRef } from "react";
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword, useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useForm } from "react-hook-form";
import Loading from "../Shared/Loading";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { async } from "@firebase/util";

const Login = () => {
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
  const [sendPasswordResetEmail, sending, resetError] = useSendPasswordResetEmail(auth);
  const location = useLocation();
  const navigate = useNavigate();
  let from = location.state?.from?.pathname || "/";
  const emailRef = useRef('');

  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm();
  let signInError;

  useEffect(() => {
    if (user || gUser) {
      console.log(user || gUser);
      navigate(from, { replace: true });
    }
  }, [user, gUser,from,navigate]);

  if (loading || gLoading || sending) {
    return <Loading></Loading>;
  }
  if (error || gError) {
    signInError = <p className="text-red-500 text-sm">{error?.message || gError?.message}</p>;
  }

  const handleReset = async(emailValue) =>{
    const email = emailValue;
    console.log(email);
    if (email) {
      sendPasswordResetEmail(email);
      alert("Reset Password email sent");
    }else{
      alert("Please give your email");
    }
  }

  const onSubmit = (data) => {
    console.log(data);
    signInWithEmailAndPassword(data.email, data.password);
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card w-full md:max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-center text-2xl font-bold">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                ref={emailRef}
                placeholder="Your Email"
                className="input input-bordered w-full"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is Required",
                  },
                  pattern: {
                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                    message: "Provide a valid Email",
                  },
                })}
              />
              <label className="label">
                {errors.email?.type === "required" && (
                  <span className="label-text-alt text-red-500">{errors.email.message}</span>
                )}
                {errors.email?.type === "pattern" && (
                  <span className="label-text-alt text-red-500">{errors.email.message}</span>
                )}
              </label>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered w-full"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is Required",
                  },
                  minLength: {
                    value: 6,
                    message: "Must be 6 characters or longer",
                  },
                })}
              />
              <label className="label">
                {errors.password?.type === "required" && (
                  <span className="label-text-alt text-red-500">{errors.password.message}</span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="label-text-alt text-red-500">{errors.password.message}</span>
                )}
              </label>
              <p className="text-sm p-2 hover:text-secondary" role='button' onClick={()=>{
                const emailValue = getValues("email");
                handleReset(emailValue);
              }}>Forgot password?</p>
            </div>
            {signInError}
            <input className="btn w-full text-white" type="submit" value="Login" />
          </form>
          <p className="text-sm text-center">
            New to Doctors Portal?{" "}
            <Link className="text-secondary" to="/signup">
              {" "}
              Create New Account
            </Link>
          </p>
          <div className="divider">OR</div>
          <button onClick={() => signInWithGoogle()} className="btn btn-outline uppercase">
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
