import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import useUserStore from "@/store/user-store";
import AuthService from "@/services/auth-service";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
    login: z.string().email({ message: "Укажите почту." }),
    password: z
        .string()
        .min(8, { message: "Пароль должен содержать больше восьми символов." }),
});

export default function LoginForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            login: "",
            password: "",
        },
    });
    const navigate = useNavigate();
    const { checkAuth } = useUserStore();

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await AuthService.login(values);

            localStorage.setItem("auth_token", response.data.token);
            checkAuth();
            navigate("/");
        } catch (error) {
            console.error("LoginForm submission error", error);
            toast.error("Ошибка при входе. Проверьте данные.");
        }
    }

    return (
        <div>
            <Card className="w-[500px] max-w-full">
                <CardHeader>
                    <CardTitle>Вход</CardTitle>
                    <CardDescription>
                        Войдите в аккаунт, чтобы пользоваться приложением.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <FormField
                                control={form.control}
                                name="login"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Почта:</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Введите Почту:"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Пароль:</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Введите пароль:"
                                                type="password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={form.formState.isSubmitting}
                            >
                                {form.formState.isSubmitting
                                    ? "Вход..."
                                    : "Вход"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
