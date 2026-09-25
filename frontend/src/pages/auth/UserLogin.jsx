import { Link } from 'react-router-dom'

const UserLogin = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center p-4">
      {/* Background blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-orange-400/20 dark:bg-orange-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-red-400/20 dark:bg-red-500/10 blur-3xl" />
      </div>

      <div className="w-full max-w-md">
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 rounded-3xl shadow-2xl shadow-orange-100/50 dark:shadow-black/40 p-8">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 shadow-lg shadow-orange-500/30 mb-4">
              <span className="text-3xl">🍽️</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back!</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Sign in to your FoodNest account</p>
          </div>

          {/* Form — fields match loginUser controller: email, password */}
          <form className="space-y-5">

            {/* email */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-lg">📧</span>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 dark:focus:border-orange-400 transition-all duration-200"
                />
              </div>
            </div>

            {/* password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <a href="#" className="text-xs font-medium text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300 transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-lg">🔒</span>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 dark:focus:border-orange-400 transition-all duration-200"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold text-sm shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
            <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">OR CONTINUE WITH</span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium transition-all duration-200 cursor-pointer"
            >
              <span className="text-lg">🌐</span> Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium transition-all duration-200 cursor-pointer"
            >
              <span className="text-lg">📱</span> Phone
            </button>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            Don't have an account?{' '}
            <Link to="/user/register" className="font-semibold text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300 transition-colors">
              Sign up for free
            </Link>
          </p>
          <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-3">
            Are you a restaurant partner?{' '}
            <Link to="/FoodPartner/login" className="text-orange-400 hover:text-orange-500 underline transition-colors">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default UserLogin
