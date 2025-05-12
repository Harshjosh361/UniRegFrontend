import { Link } from "react-router-dom";
import logo from "../assets/dsce.jpeg";
import { BookOpen, Users, CheckCircle, Clock, ArrowRight, Shield, GraduationCap } from "lucide-react";

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 group">
            <BookOpen className="h-8 w-8 text-purple-600 group-hover:scale-110 transition-transform" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">UniReg</h1>
          </Link>
          <div className="flex items-center space-x-4">
            <Link
              to="/student-login"
              className="px-4 py-2 text-purple-600 hover:text-purple-700 font-medium transition-colors"
            >
              Student Login
            </Link>
            <Link
              to="/admin-login"
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Admin Login
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 md:py-28">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Streamline Your
              </span>
              <br />
              <span className="text-gray-800">Academic Journey</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Experience a seamless registration process with our modern platform. 
              Designed for both students and administrators to make academic management effortless.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/student-login"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg text-lg font-medium inline-flex items-center justify-center group"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/student/register"
                className="px-8 py-4 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-all duration-200 text-lg font-medium inline-flex items-center justify-center"
              >
                Create Account
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl opacity-20 blur-2xl"></div>
              <img
                src={logo}
                alt="University Registration"
                className="relative rounded-2xl shadow-2xl transform hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Everything You Need for
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"> Academic Success</span>
            </h2>
            <p className="text-xl text-gray-600">
              Our platform combines powerful features with an intuitive interface to make your academic journey smoother.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <div className="bg-purple-100 p-4 rounded-xl w-16 h-16 flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Dual Login System</h3>
              <p className="text-gray-600 leading-relaxed">
                Secure, role-based access for both students and administrators with customized dashboards for each user type.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <div className="bg-purple-100 p-4 rounded-xl w-16 h-16 flex items-center justify-center mb-6">
                <CheckCircle className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Smart Subject Selection</h3>
              <p className="text-gray-600 leading-relaxed">
                Intuitive interface for browsing and selecting subjects with real-time availability updates and conflict checking.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <div className="bg-purple-100 p-4 rounded-xl w-16 h-16 flex items-center justify-center mb-6">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Real-time Management</h3>
              <p className="text-gray-600 leading-relaxed">
                Live updates and comprehensive tools for administrators to efficiently manage and monitor student registrations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 text-purple-100">
              Join thousands of students and administrators who are already using UniReg
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/student-login"
                className="px-8 py-4 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-all duration-200 text-lg font-medium inline-flex items-center justify-center group"
              >
                <GraduationCap className="mr-2 h-5 w-5" />
                Student Login
              </Link>
              <Link
                to="/admin-login"
                className="px-8 py-4 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-all duration-200 text-lg font-medium inline-flex items-center justify-center group"
              >
                <Shield className="mr-2 h-5 w-5" />
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-6 w-6 text-purple-400" />
                <span className="text-xl font-bold">UniReg</span>
              </div>
              <p className="text-gray-400">
                Simplifying university registration for the modern academic world.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">Email: support@unireg.edu</li>
                <li className="text-gray-400">Phone: +1 (555) 123-4567</li>
                <li className="text-gray-400">Address: 123 University Ave</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            &copy; {new Date().getFullYear()} UniReg. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
