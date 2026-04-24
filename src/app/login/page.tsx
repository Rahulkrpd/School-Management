"use client"

import React, { useState, useEffect } from "react";
import {
    TextField,
    Button,
    Box,
    IconButton,
    InputAdornment,
    Typography,
    Alert
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { setEmail, setPassword, loginUser } from "../../store/Slice_Features/authSlice";
import { } from "../../store/Slice_Features/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useAppDispatch();                                    // ✅ typed
    const { email, password, loading, error, userData, token } = useAppSelector((state) => state.auth); // ✅ typed
    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }));
    };

    useEffect(() => {
        if (token && userData) {
            router.push("/dashboard");
            console.log("Login successful, navigating to dashboard... ", userData);
        }
    }, [token, userData, router]);

   

const textFieldSx = {
    mb: 2,
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '', // purple.main
        },
        '&:hover fieldset': {
            borderColor: '#a855f7', // purple.light
        },
        '&.Mui-focused fieldset': {
            borderColor: 'purple.main',
            borderWidth: 2,
        },
        backgroundColor: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(5px)',

        '& input:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 1000px rgba(255,255,255,0.1) inset',
            WebkitTextFillColor: 'white',
            transition: 'background-color 5000s ease-in-out 0s',
            borderRadius: 'inherit',
        },
    },

    '& .MuiInputBase-input': {
        color: 'white',
    },
    '& .MuiInputLabel-root': {
        color: 'white',
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: '#a855f7',
    },
};

return (
    <form onSubmit={handleSubmit}>
        <Box
            sx={{
                maxWidth: 400,
                margin: "auto",
                mt: 10,
                p: 4,
                boxShadow: 6,
                borderRadius: 3,
                border: 2,
                borderColor: '#9333ea',
                background: 'linear-gradient(145deg, #2a2a2a 0%, #1e1e1e 100%)',
                backdropFilter: 'blur(10px)',
                color: 'white',
            }}

        >
            <Typography
                variant="h5"
                sx={{
                    color: 'white',
                    mb: 3,
                    fontWeight: 700,
                    textAlign: 'center',
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                }}
            >
                Login
            </Typography>


            <TextField
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => dispatch(setEmail(e.target.value))}
                sx={textFieldSx}
            />

            <TextField
                label="Password"
                name="password"
                autoComplete="current-password"
                type={showPassword ? "text" : "password"}
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => dispatch(setPassword(e.target.value))}
                slotProps={{
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleTogglePassword}
                                    edge="end"
                                    sx={{ color: 'white' }}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }
                }}
                sx={textFieldSx}
            />
            {error && (
                <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                    {error}
                </Alert>
            )}
            <Button
                variant="contained"
                fullWidth
                type="submit"
                sx={{
                    mt: 3,
                    py: 1.5,
                    background: 'linear-gradient(45deg, #9333ea 30%, #8b5cf6 90%)',
                    boxShadow: '0 4px 15px rgba(147, 51, 234, 0.4)',
                    '&:hover': {
                        background: 'linear-gradient(45deg, #8b5cf6 30%, #9333ea 90%)',
                        boxShadow: '0 6px 20px rgba(147, 51, 234, 0.6)',
                        transform: 'translateY(-1px)',
                    },
                    color: 'white',
                    fontWeight: 600,
                    textTransform: 'none',
                    borderRadius: 2,
                }}
            >

                {loading
                    ? <CircularProgress size={22} sx={{ color: 'white' }} />
                    : "Login"
                }
            </Button>
        </Box>
    </form>
);
}