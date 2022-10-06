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
    Alert,
} from "@pankod/refine-mui";

import {
    BaseRecord,
    HttpError,
    useRegister,
    useTranslate,
} from "@pankod/refine-core";

type IRegisterForm = {
    name: string,
    email: string;
    password: string;
};

export interface Props {
    goTo: ((v: any) => void)
}

const RegisterPage: React.FC<Props> = ({ goTo }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<BaseRecord, HttpError, IRegisterForm>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const { mutate: registerHook, isLoading } = useRegister<IRegisterForm>();
    const translate = useTranslate();
    const [showMessage, setShowMessage] = React.useState(false);

    const onSubmit = (data: any) => {
        registerHook(data, {
            onSuccess: (v: any) => {
                if (v && v.success === true) {
                    setShowMessage(true);
                }
            }
        });
    }
    
    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
        >

            {
                showMessage &&
                <Alert severity="success" style={{ textAlign: "justify" }}>
                    <p>
                        Your registration was successful and a confirmation email was sent to your inbox.
                    </p>
                </Alert>
            }

            <TextField
                {...register("name", {
                    required: true,
                })}
                id="name"
                margin="normal"
                fullWidth
                label={translate(
                    "pages.login.name",
                    "Name",
                )}
                name="name"
                autoComplete="name"
                autoFocus
            />
            <TextField
                {...register("email", {
                    required: true,
                })}
                id="email"
                margin="normal"
                fullWidth
                label={translate(
                    "pages.login.email",
                    "Email",
                )}
                name="email"
                autoComplete="email"
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
                    "pages.login.send",
                    "Send",
                )}
            </Button>
            <Link
                href="#"
                sx={{
                    textDecoration: "none",
                    display: "flex",
                }}
                onClick={() => {
                    goTo('login');
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
        </Box>
    );
};

export default RegisterPage;