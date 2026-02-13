import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin, useRegister } from "@/hooks/use-auth";
import { z } from "zod";
import { insertUserSchema } from "@shared/schema";
import { useLocation } from "wouter";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ShieldCheck, QrCode } from "lucide-react";

// Login Schema
const loginSchema = z.object({
  username: z.string().min(1, "Username/Email is required"),
  password: z.string().min(1, "Password is required"),
});

export default function AuthPage() {
  const [, setLocation] = useLocation();
  const loginMutation = useLogin();
  const registerMutation = useRegister();

  // Login Form
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  // Register Form
  const registerForm = useForm<z.infer<typeof insertUserSchema>>({
    resolver: zodResolver(insertUserSchema),
    defaultValues: { username: "", password: "", name: "", whatsapp: "" },
  });

  function onLogin(data: z.infer<typeof loginSchema>) {
    loginMutation.mutate(data, {
      onSuccess: () => setLocation("/"),
    });
  }

  function onRegister(data: z.infer<typeof insertUserSchema>) {
    registerMutation.mutate(data, {
      onSuccess: () => setLocation("/"),
    });
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Hero */}
      <div className="hidden lg:flex flex-col justify-between bg-primary p-12 text-primary-foreground relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-8">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
              <QrCode className="h-8 w-8 text-white" />
            </div>
            <span className="font-display font-bold text-2xl tracking-tight">FindMyStuff</span>
          </div>
          <h1 className="font-display font-bold text-5xl leading-tight max-w-lg mb-6">
            Never lose what matters most.
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-md">
            Create QR codes for your valuables. If lost, finders can easily contact you via WhatsApp without seeing your number.
          </p>
        </div>

        {/* Decorative Circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/10 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/10 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/20 rounded-full animate-pulse" />

        <div className="relative z-10 flex items-center gap-4 text-sm text-primary-foreground/60">
          <ShieldCheck className="w-5 h-5" />
          <span>Secure. Private. Instant.</span>
        </div>
      </div>

      {/* Right Side - Auth Forms */}
      <div className="flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md animate-in fade-in-up">
          
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <QrCode className="h-8 w-8 text-primary" />
            <span className="font-display font-bold text-2xl">FindMyStuff</span>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 h-12">
              <TabsTrigger value="login" className="text-base">Login</TabsTrigger>
              <TabsTrigger value="register" className="text-base">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card className="border-border/50 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-display">Welcome Back</CardTitle>
                  <CardDescription>Enter your credentials to access your dashboard.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                      <FormField
                        control={loginForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="hello@example.com" {...field} className="h-11" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} className="h-11" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button 
                        type="submit" 
                        className="w-full h-11 text-base mt-2" 
                        disabled={loginMutation.isPending}
                      >
                        {loginMutation.isPending ? "Logging in..." : "Login"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="register">
              <Card className="border-border/50 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-display">Create Account</CardTitle>
                  <CardDescription>Get started with free item tracking today.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...registerForm}>
                    <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-4">
                      <FormField
                        control={registerForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} className="h-11" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="hello@example.com" {...field} className="h-11" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="whatsapp"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>WhatsApp Number</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="1234567890 (Country code included)" 
                                {...field} 
                                className="h-11" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} className="h-11" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button 
                        type="submit" 
                        className="w-full h-11 text-base mt-2" 
                        disabled={registerMutation.isPending}
                      >
                        {registerMutation.isPending ? "Creating account..." : "Create Account"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
