import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/useAuth";

function Navbar() {
  const { state, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/blogspace");
    setOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-800 bg-[#0B1120]/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link to="/blogspace">
          <h1 className="text-xl font-bold tracking-tight text-white">
            BlogSpace
          </h1>
        </Link>

        {/* Hamburger Button */}
        <button
          className="sm:hidden text-white text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-3">
          {state.user?.uid ? (
            <>
              <p className="text-sm truncate max-w-[150px]">
                {state.user.email}
              </p>

              <Link to="/myBlogs">
                <Button size="sm" variant="secondary">
                  My Blogs
                </Button>
              </Link>

              <Link to="/addBlog">
                <Button
                  variant="outline"
                  className="border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white"
                >
                  New Post
                </Button>
              </Link>

              <Button
                className="bg-indigo-500 hover:bg-indigo-600 text-white"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/addBlog">
                <Button
                  variant="outline"
                  className="border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white"
                >
                  New Post
                </Button>
              </Link>

              <Link to="/login">
                <Button className="bg-indigo-500 hover:bg-indigo-600 text-white">
                  Login
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="sm:hidden px-4 pb-4 flex flex-col gap-3 border-t border-gray-800">
          {state.user?.uid ? (
            <>
              <p className="text-sm break-all">{state.user.email}</p>

              <Link to="/myBlogs" onClick={() => setOpen(false)}>
                <Button variant="secondary" className="w-full">
                  My Blogs
                </Button>
              </Link>

              <Link to="/addBlog" onClick={() => setOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white"
                >
                  New Post
                </Button>
              </Link>

              <Button
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/addBlog" onClick={() => setOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white"
                >
                  New Post
                </Button>
              </Link>

              <Link to="/login" onClick={() => setOpen(false)}>
                <Button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white">
                  Login
                </Button>
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
