import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/useAuth";
import { db } from "@/firebase/firebaseDB";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function BlogList() {
  const navigate = useNavigate();

  const { state } = useAuth();

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
      try {
        const q = query(
          collection(db, "blogs"),
          where("userId", "==", state.user?.uid),
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
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogs();
  }, [state.user]);

  //FUNCTION TO HANDLE BLOG DELETE
  const handleDelete = (id: string) => {
    toast((t) => (
      <div className="p-2">
        <p className="text-sm">Are you sure you want to delete?</p>

        <div className="flex gap-2 mt-2">
          <button
            className="bg-red-500 text-white px-3 py-1 rounded"
            onClick={async () => {
              await deleteDoc(doc(db, "blogs", id));

              setBlogs((prev) => prev.filter((blog) => blog.id !== id));

              toast.dismiss(t.id);
              toast.success("Blog deleted ✅");
            }}
          >
            Yes
          </button>

          <button
            className="bg-gray-300 px-3 py-1 rounded"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-white">
      <h1 className="text-3xl font-bold mb-8">All Blogs</h1>

      <div className="space-y-5">
        {blogs.length ? (
          blogs.map((blog) => (
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

              <div className="flex justify-between items-center mt-8">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => navigate(`/blog/${blog.id}`)}
                >
                  Read more →
                </Button>
                <div>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(blog.id)}
                    className="border-gray-700 text-gray-300 hover:bg-gray-800 me-5"
                  >
                    Delete
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/editBlog/${blog.id}`)}
                    className="border-gray-700 text-gray-300 hover:bg-gray-800"
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>
            <p className="text-foreground leading-relaxed text-center">
              No Blogs
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogList;
