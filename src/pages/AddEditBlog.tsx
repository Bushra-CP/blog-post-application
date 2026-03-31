import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  updateDoc,
  type DocumentData,
} from "firebase/firestore";
import { db } from "@/firebase/firebaseDB";
import { useAuth } from "@/context/useAuth";
import toast from "react-hot-toast";

function AddEditBlog() {
  interface FormData {
    title: string;
    content: string;
  }
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useAuth();

  //LOAD BLOG WHEN EDITING
  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        const blogDoc = await getDoc(doc(db, "blogs", id));

        if (blogDoc.exists()) {
          const data = blogDoc.data();

          setValue("title", data.title);
          setValue("content", data.content);
        }
      };
      fetchBlog();
    }
  }, [id, setValue]);

  //ON SUBMITTING ADD/EDIT FORM
  const onSubmit = async (data: FormData) => {
    try {
      if (id) {
        await updateDoc(doc(db, "blogs", id), data as DocumentData);
        toast.success("Blog edited "); 
      } else {
        await addDoc(collection(db, "blogs"), {
          ...data,
          userId: state.user?.uid,
          createdAt: new Date(),
        });
        toast.success("New blog added"); 
      }
      navigate("/blogspace");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="bg-white border border-gray-200 shadow-md">
            <CardHeader>
              <CardTitle className="text-gray-900 text-2xl">
                {id ? "Edit Blog" : "Write a Blog"}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* TITLE */}
              <div className="space-y-2">
                <Label className="text-gray-700">Title</Label>
                <Input
                  placeholder="Enter blog title..."
                  className="border-gray-300"
                  {...register("title", {
                    required: "Title is required",
                    minLength: {
                      value: 3,
                      message: "Minimum 3 characters",
                    },
                  })}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title.message}</p>
                )}
              </div>

              {/* CONTENT */}
              <div className="space-y-2">
                <Label className="text-gray-700">Content</Label>
                <textarea
                  placeholder="Write your blog here..."
                  className="w-full min-h-[220px] p-3 border border-gray-300 rounded-md 
                             focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  {...register("content", {
                    required: "Content is required",
                    minLength: {
                      value: 10,
                      message: "Minimum 10 characters",
                    },
                  })}
                />
                {errors.content && (
                  <p className="text-red-500 text-sm">
                    {errors.content.message}
                  </p>
                )}
              </div>

              {/* ACTIONS */}
              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  className="bg-indigo-500 hover:bg-indigo-600 text-white"
                >
                  {id ? "Update" : "Publish"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}

export default AddEditBlog;
