import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans">
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 flex items-center justify-center min-h-[80vh] overflow-hidden">
        {/* Background Decorative Blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute -top-[10%] -right-[5%] w-96 h-96 bg-orange-400/20 blur-3xl rounded-full"></div>
          <div className="absolute top-[20%] -left-[10%] w-72 h-72 bg-red-400/20 blur-3xl rounded-full"></div>
        </div>

        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="flex-1 text-center md:text-left z-10">
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
              Satisfy Your Cravings with <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">FoodNest</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto md:mx-0">
              Discover the best food and drinks in your city. Fast delivery, hot and fresh, right to your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/user/login" className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-1 transition-all duration-300 text-center">
                Order Now
              </Link>
              <Link to="/FoodPartner/register" className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-full shadow-md border border-gray-100 dark:border-gray-700 hover:-translate-y-1 transition-all duration-300 text-center">
                List Your Restaurant
              </Link>
            </div>
          </div>
          
          {/* Image/Illustration Placeholder */}
          <div className="flex-1 flex justify-center z-10 relative">
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-400 to-red-500 rounded-full opacity-20 blur-2xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop" 
                alt="Delicious Food" 
                className="w-full h-full object-cover rounded-full shadow-2xl border-4 border-white dark:border-gray-800 z-10 relative"
              />
              {/* Floating Badge */}
              <div className="absolute top-10 -left-8 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl flex items-center gap-3">
                <span className="text-3xl">🛵</span>
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">Fast Delivery</p>
                  <p className="text-xs text-gray-500">Under 30 mins</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">Get your favorite food delivered in three simple steps.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: "🍔", title: "Choose Your Meal", desc: "Browse through hundreds of menus to find the food you like." },
              { icon: "💳", title: "Easy Payment", desc: "Pay fast and securely with your preferred payment method." },
              { icon: "🏃‍♂️", title: "Fast Delivery", desc: "Your food is prepared and delivered right to your home." }
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group cursor-default">
                <div className="w-24 h-24 bg-orange-50 dark:bg-gray-800 rounded-3xl flex items-center justify-center text-5xl mb-6 shadow-sm group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-300">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;