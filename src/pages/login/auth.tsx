import * as React from "react";
import { useForm } from "@pankod/refine-react-hook-form";
import {
    Button,
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
    Box,
    Typography,
} from "@pankod/refine-mui";

import {
    BaseRecord,
    HttpError,
    useLogin,
    useTranslate,
} from "@pankod/refine-core";

type ILoginForm = {
    username: string;
    password: string;
};

export interface Props {
    goTo: ((v: any) => void)
}

const AuthPage: React.FC<Props> = ({goTo}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<BaseRecord, HttpError, ILoginForm>({
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const { mutate: login, isLoading } = useLogin<ILoginForm>();
    const translate = useTranslate();

    return (
        <Box
            component="form"
            onSubmit={handleSubmit((data) => {
                login(data);
            })}
        >
            <TextField
                {...register("username", {
                    required: true,
                })}
                id="username"
                margin="normal"
                fullWidth
                label={translate(
                    "pages.login.username",
                    "Username",
                )}
                name="username"
                autoComplete="username"
                autoFocus
            />
            <TextField
                {...register("password", {
                    required: true,
                })}
                id="password"
                margin="normal"
                fullWidth
                name="password"
                label={translate(
                    "pages.login.password",
                    "Password",
                )}
                helperText={
                    errors?.password?.message
                }
                type="password"
                placeholder="●●●●●●●●"
                autoComplete="current-password"
            />
            <Box
                component="div"
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Box/>
                <Link
                    href="#"
                    sx={{
                        color: "text.secondary",
                        textDecoration: "none",
                    }}
                    onClick={()=> {
                        goTo('forgot');
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "12px",
                        }}
                    >
                        {translate(
                            "pages.login.forgotPassword",
                            "Forgot?",
                        )}
                    </Typography>
                </Link>
            </Box>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                    my: "8px",
                    color: "white",
                }}
                disabled={isLoading}
            >
                {translate(
                    "pages.login.signin",
                    "Sign in",
                )}
            </Button>
            <Link
                href="#"
                sx={{
                    textDecoration: "none",
                    display: "flex",
                }}
                onClick={()=> {
                    goTo('register');
                }}
            >
                <Typography
                    sx={{
                        fontSize: "12px",
                        letterSpacing: "-0.04px",
                        lineHeight: "38px",
                        color: "text.secondary",
                    }}
                >
                    {translate(
                        "pages.login.noAccount",
                        "Don’t have an account? ",
                    )}{" "}
                </Typography>
                <Typography
                    sx={{
                        fontWeight: "700",
                        fontSize: "12px",
                        letterSpacing: "-0.04px",
                        lineHeight: "38px",
                        color: "primary.main",
                        marginLeft: "2px",
                    }}
                >
                    {translate(
                        "pages.login.signup",
                        " Sign up",
                    )}
                </Typography>
            </Link>
        </Box>
    );
};

export default AuthPage;