"use client"
import { useRef,useState} from 'react';
import axios from 'axios';
import { useStateContext } from './context/contextProvider';
import { useRouter } from 'next/navigation'


export default function Home() {
    const [error,seterror] = useState("");
    const router = useRouter()
    const emailRef = useRef();
    const passwordRef = useRef();
    const { setUser, setToken } = useStateContext();
    const loginendpoint = process.env.NEXT_PUBLIC_LOGIN_URL;
    const login = (e) => {
        e.preventDefault();
        const payload =
        {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
       
        axios.post(loginendpoint, payload)
            .then(({ data }) => {
              if(data)
              {}
                setUser(data.user);
                setToken(data.token);
                router.push('/dashboard');
            })
            .catch(err => {
              if (err.response && err.response.status === 401) {
                  seterror("Incorrect Login Details");
              } else {
                  seterror("An error occurred. Please try again."); // Generic error message for other errors
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
                                Login To Your Account
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#" onSubmit={login}>
                                <p className='bg-gray-400 font-bold text-center text-white rounded py-1'>{error}</p>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 nodark:text-white">Your email</label>
                                    <input ref={emailRef} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 nodark:bg-gray-700 nodark:border-gray-600 nodark:placeholder-gray-400 nodark:text-white nodark:focus:ring-blue-500 nodark:focus:border-blue-500" 
                                    placeholder="johndoe@sau.edu" required />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 nodark:text-white">Password</label>
                                    <input type="password" ref={passwordRef} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 nodark:bg-gray-700 nodark:border-gray-600 nodark:placeholder-gray-400 nodark:text-white nodark:focus:ring-blue-500 nodark:focus:border-blue-500" required />
                                </div>  
                                <button type="submit" className="w-full text-white bg-gray-800 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Create an account</button>
                                <p className="text-sm font-light text-gray-500 nodark:text-gray-400">
                                    No account?Register <a href="/signup" className="font-medium text-primary-600 hover:underline nodark:text-primary-500">Register here</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}