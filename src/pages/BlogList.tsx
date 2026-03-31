import { Button } from "@/components/ui/button";
import { db } from "@/firebase/firebaseDB";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function BlogList() {
  const navigate = useNavigate();

  interface Blog {
    id: string;
    title: string;
    content: string;
    createdAt?: Date;
  }

  const [blogs, setBlogs] = useState<Blog[]>([]);

  //FETCH BLOGS FROM FIREBASE
  useEffect(() => {
    const fetchBlogs = async () => {
      const q = query(
        collection(db, "blogs"),
        orderBy("createdAt", "desc"), // latest first
      );

      const getBlogs = await getDocs(q);

      const blogData: Blog[] = getBlogs.docs.map((doc) => {
        const data = doc.data() as Omit<Blog, "id">;

        return {
          id: doc.id,
          ...data,
        };
      });
      setBlogs(blogData);
    };
    fetchBlogs();
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-white">
      <h1 className="text-3xl font-bold mb-8">All Blogs</h1>

      <div className="space-y-5">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="p-5 rounded-xl border border-gray-800 
                       bg-[#111827] 
                       hover:border-indigo-500 
                       hover:shadow-md 
                       transition-all duration-300"
          >
            <h2 className="text-xl font-semibold hover:text-indigo-400 cursor-pointer transition">
              {blog.title}
            </h2>

            <p className="text-gray-400 mt-2 line-clamp-2">{blog.content}</p>

            <div className="flex items-center justify-end mt-4">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => navigate(`/blog/${blog.id}`)}
              >
                Read more →
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogList;
