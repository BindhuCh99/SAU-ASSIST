"use client"
import { useRef,useState} from 'react';
import { axiosClient } from '../axiosClient';
import axios from 'axios';
import { useStateContext } from '../context/contextProvider';
import { useRouter } from 'next/navigation'


export default function Signup() {
    const nameRef = useRef();
    const [error,seterror] = useState("");
    const router = useRouter()
    const emailRef = useRef();
    const passwordRef = useRef();
    const { setUser, setToken } = useStateContext();
    const registerendpoint = process.env.NEXT_PUBLIC_REGISTER_URL;
    const register = (e) => {
        e.preventDefault();
        const payload =
        {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
       
        axios.post(registerendpoint, payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
                router.push('/dashboard');
            })
            .catch(err => {
                if (err.response && err.response.status === 422) {
                    const errors = err.response.data.errors;
                    if (errors && errors.email && errors.email.includes("The email has already been taken.")) {
                        seterror("Email has already been taken")
                        // Handle the case where the email is already taken
                    } else {
                        seterror("Password Must be 8 characters")
                    }
                } else if (err.response) {
                } else {
                    console.log(err.message); // Log non-HTTP errors (e.g., network issues)
                }
            });
    }
    return (
        <div className=" className={`flex min-h-screen flex-col items-center justify-between p-5 ${inter.className}`}">
            <section>
                <div className="flex flex-col items-center justify-center px-6  mx-auto md:h-screen lg:py-0">
                    <a href="https://web.saumag.edu/" className="flex items-center mb-2 mt-2 text-2xl font-semibold text-gray-900 nodark:text-white">
                        <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                        SAU ASSISTU
                    </a>
                    <div className="w-full bg-white rounded-lg shadow nodark:border md:mt-0 sm:max-w-md xl:p-0 nodark:bg-gray-800 nodark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl nodark:text-white">
                                Create and account
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#" onSubmit={register}>
                                <p className='bg-gray-400 font-bold text-center text-white rounded py-1'>{error}</p>
                                <div>
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 nodark:text-white">UserName</label>
                                    <input type="text" name="text" ref={nameRef} id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 nodark:bg-gray-700 nodark:border-gray-600 nodark:placeholder-gray-400 nodark:text-white nodark:focus:ring-blue-500 nodark:focus:border-blue-500" 
                                    placeholder="John Doe" 
                                    autoComplete='off'
                                    required />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 nodark:text-white">Your email</label>
                                    <input ref={emailRef} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 nodark:bg-gray-700 nodark:border-gray-600 nodark:placeholder-gray-400 nodark:text-white nodark:focus:ring-blue-500 nodark:focus:border-blue-500" 
                                    placeholder="johndoe@sau.edu" required />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 nodark:text-white">Password</label>
                                    <input type="password" ref={passwordRef} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 nodark:bg-gray-700 nodark:border-gray-600 nodark:placeholder-gray-400 nodark:text-white nodark:focus:ring-blue-500 nodark:focus:border-blue-500" required />
                                </div>
                                <div>
                                    <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 nodark:text-white">Confirm password</label>
                                    <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 nodark:bg-gray-700 nodark:border-gray-600 nodark:placeholder-gray-400 nodark:text-white nodark:focus:ring-blue-500 nodark:focus:border-blue-500" required />
                                </div>
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 nodark:bg-gray-700 nodark:border-gray-600 nodark:focus:ring-primary-600 nodark:ring-offset-gray-800" required />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="terms" className="font-light text-gray-500 nodark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline nodark:text-primary-500" href="#">Terms and Conditions</a></label>
                                    </div>
                                </div>
                                <button type="submit" className="w-full text-white bg-gray-800 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Create an account</button>
                                <p className="text-sm font-light text-gray-500 nodark:text-gray-400">
                                    Already have an account? <a href="/" className="font-medium text-primary-600 hover:underline nodark:text-primary-500">Login here</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}