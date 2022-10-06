import * as React from "react";
import {
    Box,
    Typography,
    Container,
    Card,
    CardContent,
} from "@pankod/refine-mui";

import {
    useTranslate,
    useRouterContext
} from "@pankod/refine-core";

import { useParams } from "react-router-dom";

type ILoginForm = {
    username: string;
    password: string;
    remember?: boolean;
};

import AuthPage from './auth';
import RegisterPage from './register';
import ForgotPage from './forgot';

export const LoginPage: React.FC = (props) => {

    const params = useParams();
    console.log(params)


    const translate = useTranslate();
    const [type, setType] = React.useState('login');

    const goTo = (v: any) => {
        setType(v);
    }

    return (
        <>
            <Box
                component="div"
                sx={{
                    background:
                        "radial-gradient(50% 50% at 50% 50%,rgba(255, 255, 255, 0) 0%,rgba(0, 0, 0, 0.5) 100%),url('images/login-bg.png')",
                    backgroundSize: "cover",
                }}
            >
                <Container
                    component="main"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        height: "100vh",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Box
                            sx={{
                                width: { xs: 200, lg: "auto" },
                            }}
                        >
                            <img
                                src="/images/fine-foods-login.svg"
                                alt="fineFoods Logo"
                                style={{ width: "100%" }}
                            />
                        </Box>
                        <Box maxWidth={type === 'forgot' ? '510px' : '400px'} mt={4}>
                            <Card sx={{ padding: 1 }}>
                                <CardContent>
                                    <Typography
                                        variant="h4"
                                        align="center"
                                        sx={{
                                            fontWeight: "700",
                                            color: "text.primary",
                                        }}
                                    >
                                        <Box
                                            component="span"
                                            color="primary.main"
                                        >
                                            {
                                                type === 'login' &&
                                                translate(
                                                    "pages.login.signin",
                                                    "Sign in",
                                                )
                                            }

                                            {
                                                type === 'register' &&
                                                translate(
                                                    "pages.login.register",
                                                    "Register",
                                                )
                                            }

                                            {
                                                type === 'forgot' &&
                                                translate(
                                                    "pages.login.forgot_password",
                                                    "Forgot password?",
                                                )
                                            }
                                        </Box>
                                    </Typography>

                                    {
                                        type === 'login' &&
                                        <AuthPage goTo={goTo} />
                                    }

                                    {
                                        type === 'register' &&
                                        <RegisterPage goTo={goTo} />
                                    }

                                    {
                                        type === 'forgot' &&
                                        <ForgotPage goTo={goTo} />
                                    }

                                </CardContent>
                            </Card>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </>
    );
};
