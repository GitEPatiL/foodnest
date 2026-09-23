import { Link } from 'react-router-dom'

const UserRegister = () => {
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
              <span className="text-3xl">🍕</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create an account</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Join millions of food lovers on Zomato</p>
          </div>

          {/* Form — fields match userSchema: fullName, email, password */}
          <form className="space-y-5">

            {/* fullName */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-lg">👤</span>
                <input
                  type="text"
                  name="fullName"
                  placeholder="John Doe"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 dark:focus:border-orange-400 transition-all duration-200"
                />
              </div>
            </div>

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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-lg">🔒</span>
                <input
                  type="password"
                  name="password"
                  placeholder="Create a strong password"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 dark:focus:border-orange-400 transition-all duration-200"
                />
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2.5">
              <input
                id="terms"
                type="checkbox"
                className="mt-0.5 w-4 h-4 rounded border-gray-300 dark:border-gray-600 accent-orange-500 cursor-pointer flex-shrink-0"
              />
              <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer select-none leading-relaxed">
                I agree to Zomato's{' '}
                <a href="#" className="text-orange-500 hover:text-orange-600 dark:text-orange-400 font-medium underline">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-orange-500 hover:text-orange-600 dark:text-orange-400 font-medium underline">Privacy Policy</a>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold text-sm shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
            >
              Create Account
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            Already have an account?{' '}
            <Link to="/user/login" className="font-semibold text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300 transition-colors">
              Sign in
            </Link>
          </p>
          <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-3">
            Want to list your restaurant?{' '}
            <Link to="/FoodPartner/register" className="text-orange-400 hover:text-orange-500 underline transition-colors">
              Register as a partner
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default UserRegister
