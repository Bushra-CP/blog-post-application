import { db } from "@/firebase/firebaseDB";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/useAuth";
import toast from "react-hot-toast";

function BlogDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  interface Blog {
    id: string;
    title: string;
    content: string;
    userId: string;
    createdAt?: Date;
  }

  const [blog, setBlog] = useState<Blog | null>(null);
  const { state } = useAuth();

  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      const docRef = doc(db, "blogs", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data() as Omit<Blog, "id">;

        setBlog({
          id: docSnap.id,
          ...data,
        });
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  //FUNCTION TO HANDLE BLOG DELETE
  const handleDelete = (id: string) => {
    toast((t) => (
      <div className="p-2">
        <p className="text-sm">Are you sure you want to delete?</p>

        <div className="flex gap-2 mt-2">
          <button
            className="bg-red-500 text-white px-3 py-1 rounded"
            onClick={async () => {
              try {
                await deleteDoc(doc(db, "blogs", id));

                toast.dismiss(t.id);
                toast.success("Blog deleted ✅");

                navigate("/blogSpace");
              } catch (error) {
                toast.error(`Failed to delete ❌:${error}`);
              }
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
    <div className="min-h-screen bg-light text-white px-4 py-10 flex justify-center items-start">
      <Card className="w-full max-w-3xl bg-[#111827] border border-gray-800 shadow-lg rounded-2xl">
        {/* Header */}
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-white leading-snug">
            {blog.title}
          </CardTitle>
        </CardHeader>

        {/* Content */}
        <CardContent>
          <p className="text-gray-300 leading-relaxed whitespace-pre-line">
            {blog.content}
          </p>

          {/* Actions */}
          {state.user?.uid == blog.userId ? (
            <div className="flex justify-between items-center mt-8">
              <Button
                variant="ghost"
                onClick={() => navigate("/blogspace")}
                className="text-indigo-400 hover:text-indigo-300"
              >
                ← Back
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
          ) : (
            <div className="flex justify-between items-center mt-8">
              <Button
                variant="ghost"
                onClick={() => navigate("/blogspace")}
                className="text-indigo-400 hover:text-indigo-300"
              >
                ← Back
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default BlogDetails;
