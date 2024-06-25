import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signinValidation } from "@/lib/validation";
import Loader from "@/components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useSignInAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";

export default function SigninForm() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { mutateAsync: signInAccount, isPending: isSigningIn } =
    useSignInAccount();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  // 1. Define your form.
  const form = useForm<z.infer<typeof signinValidation>>({
    resolver: zodResolver(signinValidation),
    defaultValues: {
      email: "kkk@gmail.com",
      password: "123456789",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(user: z.infer<typeof signinValidation>) {
    try {
      const session = await signInAccount({
        email: user.email,
        password: user.password,
      });
      if (!session) {
        toast({ title: "Sign in failed" });
      }
      const isLoggedIn = await checkAuthUser();
      if (isLoggedIn) {
        form.reset();
        navigate("/");
      }
       else {
        toast({ title: "signin failed , try again" });
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="" />
        <h2 className="h3-bold md:h2-bold pt-5">Login to your account</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          please enter your details
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3 w-full mt-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="">Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>

                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="">password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>

                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />
          <Button className="bg-primary-500 hover:bg-primary-600" type="submit">
            {isUserLoading || isSigningIn ? (
              <div className="flex-center gap-2">
                <Loader />
                Loading...
              </div>
            ) : (
              "Login"
            )}
          </Button>
          <Button
            className="bg-primary-500 hover:bg-primary-600"
            onClick={() =>
              onSubmit({
                email: "erwinSmith@gm.com",
                password: "12345678",
              })
            }
          >
            {isUserLoading || isSigningIn ? (
              <div className="flex-center gap-2">
                <Loader />
                Loading...
              </div>
            ) : (
              "Login as Erwin Smith"
            )}
          </Button>
          <Button
            className="bg-primary-500 hover:bg-primary-600"
            onClick={() =>
              onSubmit({
                email: "erenYeager@gm.com",
                password: "12345678",
              })
            }
          >
            {isUserLoading || isSigningIn ? (
              <div className="flex-center gap-2">
                <Loader />
                Loading...
              </div>
            ) : (
              "Login as Eren Yeager"
            )}
          </Button>
          <Button
            className="bg-primary-500 hover:bg-primary-600"
            onClick={() =>
              onSubmit({
                email: "leviAckerman@gm.com",
                password: "12345678",
              })
            }
          >
            {isUserLoading || isSigningIn ? (
              <div className="flex-center gap-2">
                <Loader />
                Loading...
              </div>
            ) : (
              "Login as Levi Ackerman"
            )}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2 ">
            Create a new account?
            <Link
              to="/sign-up"
              className="text-primary-500 text-small-semibold ml-1"
            >
              Signup
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
}
