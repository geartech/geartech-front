'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Box, Button, TextField, Typography, InputAdornment, IconButton, Grow, Divider } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AccountCircle, Visibility, VisibilityOff, LockOutlined } from '@mui/icons-material';
import { useAuth } from '@/core/context/AuthProvider';
import { redirect } from 'next/navigation';

export default function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const darkTheme = createTheme({
    palette: { mode: 'dark' },
    typography: {
      fontFamily: '"Inter","Segoe UI","Roboto",sans-serif',
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ username, password });
    redirect('/');
  };

  const inputBg = 'rgba(20,25,38,0.85)';
  const iconColor = 'rgba(160,175,200,0.6)';

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        position="relative"
        minHeight="100vh"
        width="100vw"
        overflow="hidden"
      >
        {/* Vídeo */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'fixed',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        >
          <source
            src="/background.mp4"
            type="video/mp4"
          />
        </video>

        {/* Máscara */}
        <Box
          sx={{
            position: 'fixed',
            inset: 0,
            zIndex: 1,
            background: 'linear-gradient(180deg, rgba(5,10,20,0.55), rgba(5,10,20,0.7))',
            backdropFilter: 'blur(2px)',
          }}
        />

        {/* Conteúdo */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            minHeight: '100vh',
            display: 'grid',
            placeItems: 'center',
            p: 2,
          }}
        >
          <Grow
            in
            timeout={600}
          >
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                p: 4,
                bgcolor: 'rgba(12,16,26,0.92)',
                borderRadius: 3,
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                width: '100%',
                maxWidth: 750,
                display: 'flex',
                flexDirection: 'row',
                gap: 4,
                alignItems: 'center',
              }}
            >
              {/* Logo */}
              <Box
                sx={{
                  flex: '0 0 auto',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    width: 285,
                    height: 285,
                    borderRadius: '50%',
                    bgcolor: '#1f303a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                  }}
                >
                  <Image
                    src="/agentic.png"
                    alt="Logo"
                    width={200}
                    height={200}
                    style={{ objectFit: 'contain' }}
                  />
                </Box>
              </Box>

              {/* Form Content */}
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2.5,
                  minWidth: 280,
                }}
              >
                <Typography
                  variant="h5"
                  textAlign="center"
                  sx={{ color: 'rgba(230,235,245,0.95)' }}
                >
                  [ PROVA DE CONCEITO ]
                  <br /> Do Escopo à CRUDs funcionais.
                </Typography>

                <Typography
                  variant="body2"
                  textAlign="center"
                  sx={{ color: 'rgba(160,170,190,0.8)', mt: -1 }}
                >
                  Backend, frontend, testes e documentação automáticos.
                </Typography>

                <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

                {/* Inputs e Button Container */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2.5,
                    maxWidth: 280,
                    margin: '0 auto',
                  }}
                >
                  {/* Usuário */}
                  <TextField
                    variant="outlined"
                    size="small"
                    label="Usuário"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        background: inputBg,
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(160,170,190,0.7)',
                      },
                    }}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle sx={{ color: iconColor }} />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />

                  {/* Senha */}
                  <TextField
                    variant="outlined"
                    size="small"
                    label="Senha"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        background: inputBg,
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(160,170,190,0.7)',
                      },
                    }}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockOutlined sx={{ color: iconColor }} />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword((v) => !v)}
                              edge="end"
                              sx={{ color: iconColor }}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                  />

                  <Button
                    type="submit"
                    size="small"
                    variant="contained"
                    sx={{
                      mt: 1,
                      py: 0.3,
                      borderRadius: 2,
                      bgcolor: '#1f6fa5',
                      boxShadow: '0 0 0 1px rgba(80,160,220,0.25)',
                      fontWeight: 500,
                      fontSize: 20,
                      textTransform: 'none',
                      '&:hover': {
                        bgcolor: '#2a86c7',
                      },
                    }}
                  >
                    Entrar
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grow>
        </Box>
      </Box>

      {/* 🔥 ÚNICO FIX NECESSÁRIO */}
      <style
        jsx
        global
      >{`
        input:-webkit-autofill,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 1000px rgba(20, 25, 38, 1) inset !important;
          -webkit-text-fill-color: #e0e5f0 !important;
          transition: background-color 5000s ease-in-out 0s;
          border-radius: 0 !important;
        }
      `}</style>
    </ThemeProvider>
  );
}
