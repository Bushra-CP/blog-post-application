import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function PageNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0B1120] text-white px-4">
      {/* 404 Text */}
      <h1 className="text-7xl sm:text-8xl font-extrabold text-indigo-500">
        404
      </h1>

      {/* Message */}
      <h2 className="mt-4 text-2xl sm:text-3xl font-semibold text-center">
        Page Not Found
      </h2>

      <p className="mt-2 text-gray-400 text-center max-w-md">
        The page you are looking for doesn’t exist or has been moved.
      </p>

      {/* Button */}
      <Link to="/blogspace" className="mt-6">
        <Button className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 text-lg">
          Go Back Home
        </Button>
      </Link>
    </div>
  );
}

export default PageNotFound;
