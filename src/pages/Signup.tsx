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

interface SignupFormData {
  email: string;
  password: string;
}

function Signup() {
  const { signup } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>();

  const navigate = useNavigate();

  const onSubmit = async (data: SignupFormData) => {
    try {
      // console.log(data.email, data.password);
      await signup(data.email, data.password);
      toast.success("Signup successful");
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
          <CardTitle className="text-gray-900">Create an account</CardTitle>

          <CardDescription className="text-gray-500">
            Enter your details to signup
          </CardDescription>

          <CardAction>
            <Button
              variant="link"
              className="text-indigo-500 hover:text-indigo-600"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </CardAction>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <div className="flex flex-col gap-6">
              {/* Email */}
              <div className="grid gap-2">
                <Label>Email</Label>
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
                <Label>Password</Label>
                <Input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Minimum 6 characters",
                    },
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
            <Button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white"
            >
              Sign Up
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

export default Signup;
