import * as React from "react";
import { useForm } from "@pankod/refine-react-hook-form";
import {
    Box,
    Typography,
    Container,
    Card,
    CardContent,
    TextField,
    Button,
    Link,
    Alert,
} from "@pankod/refine-mui";

import {
    BaseRecord,
    HttpError,
    useUpdatePassword,
    useTranslate,
} from "@pankod/refine-core";

import { useParams } from "react-router-dom";

type IResetForm = {
    token: string;
    newPassword: string;
    repeatePassword: string;
};

export const ResetPage: React.FC = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<BaseRecord, HttpError, IResetForm>({
        defaultValues: {
            token: "",
            newPassword: "12345678",
            repeatePassword: "12345678"
        },
    });

    const params = useParams();
    const { mutate: updatePassword, isLoading } = useUpdatePassword<IResetForm>();
    const translate = useTranslate();
    const [showMessage, setShowMessage] = React.useState(false);

    console.log(params.token)

    const onSubmit = (data: any) => {
        data.token = params.token;
        updatePassword(data, {
            onSuccess: (v: any) => {
                if (v && v.success === true) {
                    setShowMessage(true);
                }
            }
        });
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
                        <Box maxWidth="400px" mt={4}>
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
                                            {translate(
                                                "pages.login.reset_password",
                                                "Reset password",
                                            )}
                                        </Box>
                                    </Typography>

                                    <Box
                                        component="form"
                                        onSubmit={handleSubmit(onSubmit)}
                                    >

                                        {
                                            showMessage &&
                                            <Alert severity="success" style={{ textAlign: "justify" }}>
                                                <p>
                                                    Your password has been successfully reset. Return to login page to authenticate.
                                                </p>                                                
                                            </Alert>
                                        }

                                        <TextField
                                            {...register("newPassword", {
                                                required: true,
                                                min: 8
                                            })}
                                            id="newPassword"
                                            margin="normal"
                                            fullWidth
                                            name="newPassword"
                                            label={translate(
                                                "pages.login.password.newPassword",
                                                "New password",
                                            )}
                                            helperText={
                                                errors?.newPassword?.message
                                            }
                                            type="password"
                                            placeholder="●●●●●●●●"
                                            autoComplete="current-password"
                                        />
                                        <TextField
                                            {...register("repeatePassword", {
                                                required: true,
                                                min: 8
                                            })}
                                            id="repeatePassword"
                                            margin="normal"
                                            fullWidth
                                            name="repeatePassword"
                                            label={translate(
                                                "pages.login.password.repeatePassword",
                                                "Repeat password",
                                            )}
                                            helperText={
                                                errors?.repeatePassword?.message
                                            }
                                            type="password"
                                            placeholder="●●●●●●●●"
                                            autoComplete="current-password"
                                        />

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
                                                "pages.login.send",
                                                "Send",
                                            )}
                                        </Button>
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
                                                    color: "text.repeatePasswordary",
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
                                    </Box>

                                </CardContent>
                            </Card>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </>
    );
};
