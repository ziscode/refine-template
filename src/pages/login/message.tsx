import * as React from "react";
import {
    Box,
    Typography,
    Container,
    Card,
    CardContent,
    Alert,
    Link,
} from "@pankod/refine-mui";

import {
    useTranslate,
} from "@pankod/refine-core";

import { useParams } from "react-router-dom";


export const MessagePage: React.FC = () => {

    const params = useParams();
    const isError = params.error === "1";
    const translate = useTranslate();

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
                        <Box minWidth="400px" mt={4}>
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

                                    </Typography>

                                    <Alert severity={isError ? "error" : "success"} style={{ textAlign: "justify" }}>
                                        <p>
                                            {params.message}
                                        </p>
                                    </Alert>

                                    <Link
                                         href="/login"
                                        sx={{
                                            textDecoration: "none",
                                            display: "flex",
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
                                                "pages.login.returnLogin",
                                                "Return to ",
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
                                                "pages.login.signIn",
                                                "Sign in",
                                            )}
                                        </Typography>
                                    </Link>


                                </CardContent>
                            </Card>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </>
    );
};
