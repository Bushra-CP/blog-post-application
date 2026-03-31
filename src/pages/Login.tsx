import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/useAuth";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface FormData {
  email: string;
  password: string;
}

function LoginSignup() {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      // console.log(data.email, data.password);
      await login(data.email, data.password);
      toast.success("Login successful 🎉"); // ✅ toast
      navigate("/blogspace");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-sm bg-white border border-gray-200 shadow-md">
        <CardHeader>
          <CardTitle className="text-gray-900">Login to your account</CardTitle>

          <CardDescription className="text-gray-500">
            Enter your email below to login
          </CardDescription>

          <CardAction>
            <Button
              variant="link"
              className="text-indigo-500 hover:text-indigo-600"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Button>
          </CardAction>
        </CardHeader>

        {/* ✅ IMPORTANT: form should wrap everything */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <div className="flex flex-col gap-6">
              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is required",
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex-col gap-2">
            {/* ✅ Submit button */}
            <Button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white"
            >
              Login
            </Button>
            <Link to="/blogspace">
              <p className="text-muted-foreground leading-relaxed underline cursor-pointer">
                Blogspace
              </p>
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default LoginSignup;
