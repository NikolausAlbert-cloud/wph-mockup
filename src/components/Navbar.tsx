export const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-white text-lg font-bold">MyApp</a>
        <div>
          <a href="/auth/register" className="text-white px-4">Sign Up</a>
          <a href="/auth/login" className="text-white px-4">Sign In</a>
        </div>
      </div>
    </nav>
  )
}