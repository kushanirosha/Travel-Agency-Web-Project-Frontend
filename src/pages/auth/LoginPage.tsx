import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaGoogle, FaFacebookF } from 'react-icons/fa'
import { HiEye, HiEyeSlash, HiArrowLeft } from 'react-icons/hi2'
import ApiService from '../../services/ApiService'
import axios from 'axios'

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)
  const [success, setSuccess] = useState("");
  const [error, setError] = useState('')
  const navigate = useNavigate();
  const [values, setValues]= useState({
          email:'',
          password:''

      })
  const images = [
    "https://images.unsplash.com/photo-1539498508910-091b5e859b1d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODJ8fG1hbGRpdmVzfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1601225790137-d22c2733b28b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTExfHxtYWxkaXZlc3xlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1615276422625-ff10c615a849?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE5fHxtYWxkaXZlc3xlbnwwfHwwfHx8MA%3D%3D"
  ]
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
         const userData = await ApiService.login(values);
        if (userData.token && userData.userid) {
            localStorage.setItem('token', userData.token)
            localStorage.setItem('role', userData.role)
            localStorage.setItem('userid', userData.userid)
            navigate('/dashboard')
            setSuccess(userData.data.message);
        }else{
            setError(userData.message)
        }
        
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          console.log(err.response?.data?.message)
          // Axios error
          setError(err.response?.data?.message || "Login failed");
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
    
        setTimeout(() => setError(''), 5000);
      }
    };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url('${image}')`,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-black/20">
          <div className="absolute top-8 left-8 flex items-center">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <img src="/Logo/Logo.png" alt="Logo" className="w-6 h-6" />
            </div>
            <span className="text-white text-xl font-semibold ml-3">Paradise Travels</span>
          </div>

          <div className="absolute bottom-12 left-8 text-white max-w-sm">
            <h1 className="text-3xl font-bold mb-3 leading-tight">
              Welcome Back to Paradise!
            </h1>
            <p className="text-base opacity-90 leading-relaxed">
              Sign in to access your account and continue your journey with us.
            </p>
            
            <div className="flex space-x-2 mt-6">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    index === currentImage ? 'w-6 bg-white' : 'w-2 bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-sm">
          <div className="mb-6">
            <Link 
              to="/"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4"
            >
              <HiArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>

            <div className="flex justify-between items-center mb-6">
              <div className="lg:hidden flex items-center">
                <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                  <img src="/Logo/Logo.png" alt="Logo" className="w-5 h-5" />
                </div>
                <span className="text-gray-900 font-semibold ml-2">Paradise Travels</span>
              </div>
              <Link 
                to="/signup"
                className="text-white px-6 py-2 text-sm font-medium transition hover:opacity-90"
                style={{ backgroundColor: '#0D1144' }}
              >
                Register
              </Link>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Welcome Back to Paradise Travels!
            </h2>
            <p className="text-sm text-gray-600">
              Sign in to your account to continue
            </p>
          </div>

          <form className="space-y-3" onSubmit={handleLogin}>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Your Email
              </label>
              <input
                type="email"
                placeholder="info.madhu78@gmail.com" onChange={e => setValues({...values, email: e.target.value})}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••" onChange={e => setValues({...values, password: e.target.value})}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <HiEyeSlash className="w-4 h-4" />
                  ) : (
                    <HiEye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="remember" className="ml-2 text-xs text-gray-600">
                  Remember Me
                </label>
              </div>
              <Link to="/forgot-password" className="text-xs text-blue-600 hover:underline">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-[#0D1144] text-white py-2 text-sm  font-medium hover:bg-gray-800 transition duration-200"
            >
              Login
            </button>
          </form>

          <div className="flex items-center my-4">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-3 text-xs text-gray-500">Or continue with</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <div className="w-4 h-4 mr-2 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-4 h-4">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </div>
              <span className="text-xs font-medium text-gray-700">Google</span>
            </button>
            <button className="flex items-center justify-center py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <FaFacebookF className="text-blue-600 mr-2 text-sm" />
              <span className="text-xs font-medium text-gray-700">Facebook</span>
            </button>
          </div>

          <p className="text-center text-xs text-gray-600 mt-6">
            Don't have any account?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline font-medium">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage