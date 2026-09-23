import { Link } from 'react-router-dom'

const FoodPartnerLogin = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center p-4">
      {/* Background blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-emerald-400/20 dark:bg-emerald-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-teal-400/20 dark:bg-teal-500/10 blur-3xl" />
      </div>

      <div className="w-full max-w-md">
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 rounded-3xl shadow-2xl shadow-emerald-100/50 dark:shadow-black/40 p-8">

          {/* Partner Badge */}
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider border border-emerald-200 dark:border-emerald-800">
              🏪 Restaurant Partner Portal
            </span>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/30 mb-4">
              <span className="text-3xl">🍴</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Partner Login</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Access your restaurant dashboard</p>
          </div>

          {/* Form — fields match loginFoodPartner controller: email, password */}
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
                  placeholder="restaurant@example.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 dark:focus:border-emerald-400 transition-all duration-200"
                />
              </div>
            </div>

            {/* password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <a href="#" className="text-xs font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-lg">🔒</span>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 dark:focus:border-emerald-400 transition-all duration-200"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold text-sm shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
            >
              Sign In to Dashboard
            </button>
          </form>

          {/* Info box */}
          <div className="mt-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/50">
            <div className="flex gap-3">
              <span className="text-xl flex-shrink-0">💡</span>
              <p className="text-xs text-emerald-700 dark:text-emerald-400 leading-relaxed">
                Use the credentials created during your restaurant registration. Need help?{' '}
                <a href="#" className="font-semibold underline hover:text-emerald-600">Contact partner support</a>.
              </p>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            New restaurant partner?{' '}
            <Link to="/FoodPartner/register" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors">
              Register your restaurant
            </Link>
          </p>
          <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-3">
            Looking for the customer app?{' '}
            <Link to="/user/login" className="text-emerald-500 hover:text-emerald-600 underline transition-colors">
              Login as user
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default FoodPartnerLogin
