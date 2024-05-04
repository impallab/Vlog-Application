import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from "../store/authSlice"
import { Button, Input, Logo } from "./index"
import { useDispatch } from "react-redux"
import authService from "../appwrite/auth"
import { useForm } from 'react-hook-form'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")
    const login = async (data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = authService.getCurrentuser()
                if (userData) dispatch(authLogin(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <div
            className='w-full flex items-center justify-center'>
            <div className={`w-full mx-auto max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className='mb-2 flex justify-center'>
                    <span className='w-full inline-block max-w-[100px]'>
                        <Logo width='100%' />
                    </span>
                </div>
                <h2 className='text-center text-2xl font-bold leading-tight'>
                    Sign in
                </h2>
                <p className='mt-2 text-center text-base text-black/60'>
                    Don&apos;t have an account?&nbsp;
                    <Link to="signup" className='font-medium text-primary transition-all duration-200 hover:underline'>
                        Sign Up
                    </Link>
                </p>
                {
                    error && <p className=' text-red-500 text-center'>{error}</p>
                }
                <form className='mt-8' onSubmit={handleSubmit(login)}>
                    <div className='space-y-5'>
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Enter a valid email"
                                }
                            })}
                        />

                        <Input
                            label="Password: "
                            placeholder="Enter your password"
                            type="password"
                            {...register("password", {
                                required: true,
                                minLength: 8, // Minimum length of the password
                                validate: {
                                    // Custom validation function for password strength
                                    strongPassword: value => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value) || "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
                                }
                            })}
                        />
                        <Button
                            className="w-full"
                            type="submit"
                        >
                            Sign in
                        </Button>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login