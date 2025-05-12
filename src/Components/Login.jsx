import { Link } from "react-router-dom"
import { BookOpen, User, Shield } from "lucide-react"

function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-indigo-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex items-center">
          <Link to="/" className="flex items-center">
            <BookOpen className="h-8 w-8 text-purple-600" />
            <h1 className="ml-2 text-2xl font-bold text-gray-800">UniReg</h1>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-10 bg-purple-600 text-white flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-6">Welcome to UniReg</h2>
              <p className="mb-8">
                Choose your login type to access the university registration platform. Students can register for
                courses, while administrators can manage registrations.
              </p>
              <div className="bg-purple-500 p-4 rounded-lg">
                <p className="text-sm font-medium">Need help?</p>
                <p className="text-sm">Contact support at support@unireg.edu</p>
              </div>
            </div>
            <div className="p-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Select Login Type</h2>

              <div className="space-y-6">
                <Link
                  to="/student-login"
                  className="w-full p-4 bg-white border-2 border-purple-200 rounded-lg hover:border-purple-600 transition-colors flex items-center"
                >
                  <div className="bg-purple-100 p-3 rounded-full">
                    <User className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-800">Student Login</h3>
                    <p className="text-sm text-gray-600">Register for courses and manage your schedule</p>
                  </div>
                </Link>

                <Link
                  to="/admin-login"
                  className="w-full p-4 bg-white border-2 border-purple-200 rounded-lg hover:border-purple-600 transition-colors flex items-center"
                >
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Shield className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-800">Admin Login</h3>
                    <p className="text-sm text-gray-600">Manage student registrations and courses</p>
                  </div>
                </Link>
              </div>

              <div className="mt-10 text-center">
                <Link to="/" className="text-purple-600 hover:text-purple-800 transition-colors">
                  Return to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-4 shadow-inner">
        <div className="container mx-auto px-6 text-center text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} UniReg. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default LoginPage
