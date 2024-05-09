import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Button, Input, Logo } from "./index.js"
import { useForm } from 'react-hook-form'
import { useDispatch } from "react-redux"


function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()

    const signup = async (data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentuser()
                if (userData) dispatch(login(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <div className='flex items-center justify-center'>
            <div className={`w-full mx-auto max-w-lg bg-gray-100 rounded-xl border border-black/10`}>
                <div className='mb-2 flex justify-center'>
                    <span className='w-full inline-block max-w-[100px]'>
                        <Logo width='100%' />
                    </span>
                </div>
                <h2 className='text-center text-2xl font-bold leading-tight'>
                    Sign Up to create your account
                </h2>
                <p className='mt-2 text-center text-base text-black/60'>
                    Already have an account?&nbsp;
                    <Link to="/login" className='font-medium text-primary transition-all duration-200 hover:underline'>
                        Sign In
                    </Link>
                </p>
                {
                    error && <p className=' text-red-600 mt-8 text-center'>
                        {error}
                    </p>
                }
                <form onSubmit={handleSubmit(signup)}>
                    <div className='space-y-5'>
                        <Input
                            label="Full Name: "
                            placeholder="Enter your full name"
                            {...register("name",{
                                required:true
                            })}
                        />

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
                            Sign Up
                        </Button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Signup