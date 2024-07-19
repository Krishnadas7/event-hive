import { Link } from 'react-router-dom';

function NotFoundPage() {
    console.log('not found page');
    
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-green-300">
      <div className="text-center text-gray-800">
        <h2 className="text-2xl font-bold mb-2">Oops! Page not found.</h2>
        <h1 className="text-9xl font-extrabold mb-4 bg-clip-text text-transparent bg-center bg-cover" style={{ backgroundImage: 'url(bg.jpg)' }}>
          404
        </h1>
        <p className="mb-6">We can't find the page you're looking for.</p>
        <Link to="/" className="bg-red-500 text-white py-2 px-4 rounded-full uppercase text-sm hover:bg-red-600 transition duration-400">
          Go back home
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage