import * as React from "react";
import { useForm } from "@pankod/refine-react-hook-form";
import {
    Button,
    TextField,
    Link,
    Box,
    Typography,
    Alert
} from "@pankod/refine-mui";

import {
    BaseRecord,
    HttpError,
    useForgotPassword,
    useTranslate,
} from "@pankod/refine-core";

type IForgotForm = {
    email: string;
};

export interface Props {
    goTo: ((v: any) => void)
}

const ForgotPage: React.FC<Props> = ({ goTo }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<BaseRecord, HttpError, IForgotForm>({
        defaultValues: {
            email: "",
        },
    });

    const { mutate: forgotPassword, isLoading } = useForgotPassword<IForgotForm>();
    const translate = useTranslate();
    const [showMessage, setShowMessage] = React.useState(false);
    const [expirationMessage, setExpirationMessage] = React.useState(null);

    const onSubmit = (data: any) => {
        setShowMessage(false);
        
        forgotPassword(data, {
            onSuccess: (v: any) => {
                if (v && v.success === true) {
                    setShowMessage(true);
                    setExpirationMessage(v.expirationMessage);
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
                <Alert severity="success" style={{textAlign:"justify"}}>
                    <p>
                        If an account matching your email exists, then an email was just sent that contains a link that you can use to reset your password.
                        This link will expire in {expirationMessage}.
                    </p>
                    <p>If you don't receive an email please check your spam folder or try again.</p>
                </Alert>
            }

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

export default ForgotPage;