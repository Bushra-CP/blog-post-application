import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/useAuth";

function Navbar() {
  const { state, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/blogspace");
  };

  return (
    <nav
      className="sticky top-0 z-50 border-b border-gray-800
                 bg-[#0B1120]/80 backdrop-blur-md"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link to={"/blogspace"}>
          <h1 className="text-xl font-bold tracking-tight text-white">
            BlogSpace
          </h1>
        </Link>

        {/* Actions */}
        {state.user?.uid ? (
          //IF USER IS LOGED IN
          <div className="flex items-center gap-2">
            <p className="text-foreground leading-relaxed">
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
                className="border-indigo-500 text-indigo-400 
                         hover:bg-indigo-500 hover:text-white transition"
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
          </div>
        ) : (
          //IF USER IS NOT LOGED IN
          <div className="flex items-center gap-2">
            <Link to="/addBlog">
              <Button
                variant="outline"
                className="border-indigo-500 text-indigo-400 
                         hover:bg-indigo-500 hover:text-white transition"
              >
                New Post
              </Button>
            </Link>

            <Link to="/login">
              <Button className="bg-indigo-500 hover:bg-indigo-600 text-white">
                Login
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
