'use client';

import React from 'react';
import { useState } from 'react';
import { Box, Button, TextField, Typography, InputAdornment, IconButton, Grow } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '@/core/context/AuthProvider';
import { redirect } from 'next/navigation';

export default function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const darkTheme = createTheme({ palette: { mode: 'dark' } });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ username, password });
    redirect('/');
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        position="relative"
        minHeight="100vh"
        width="100vw"
        overflow="hidden"
      >
        {/* Vídeo de fundo */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'fixed',
            inset: 0,
            width: '100vw',
            height: '100vh',
            objectFit: 'cover',
            zIndex: 0,
          }}
        >
          <source
            src="/background.mp4"
            type="video/mp4"
          />
        </video>

        {/* MÁSCARA (acima do vídeo, atrás do form) */}
        <Box
          sx={{
            position: 'fixed',
            inset: 0,
            zIndex: 1,
            background: 'linear-gradient(180deg, rgba(5,10,20,.75) 0%, rgba(5,10,20,.85) 100%)',
            backdropFilter: 'blur(2px)',
          }}
        />

        {/* WRAPPER CENTRALIZADOR (form acima da máscara) */}
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
          {/* FORM */}
          <Grow
            in
            timeout={700}
          >
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                p: 4,
                bgcolor: 'rgba(20,24,34,0.9)',
                borderRadius: 4,
                boxShadow: '0 0 14px 4px #11e8ff66',
                width: '100%',
                maxWidth: 520,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                alignItems: 'stretch',
              }}
            >
              <Typography
                variant="h5"
                color="#11e8ff"
                fontWeight={600}
                textAlign="center"
                mb={1}
              >
                Login
              </Typography>

              <TextField
                variant="outlined"
                size="small"
                label="Usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                required
                slotProps={{
                  htmlInput: { maxLength: 40 },
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle sx={{ color: '#11e8ff' }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TextField
                variant="outlined"
                size="small"
                label="Senha"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
                slotProps={{
                  htmlInput: { maxLength: 30 },
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle sx={{ color: '#11e8ff' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          edge="end"
                          sx={{ color: '#11e8ff' }}
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
                variant="contained"
                sx={{
                  width: '50%',
                  mx: 'auto',
                  mt: 1,
                  bgcolor: '#0aa7c2',
                  color: '#fff',
                  fontWeight: 600,
                  boxShadow: '0 0 8px #0aa7c277',
                  '&:hover': { bgcolor: '#088ca3' },
                }}
              >
                Entrar
              </Button>
            </Box>
          </Grow>
        </Box>
      </Box>

      {/* Autofill fix */}
      <style
        jsx
        global
      >{`
        input:-webkit-autofill,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 1000px #121721 inset !important;
          -webkit-text-fill-color: #fff !important;
          transition: background-color 5000s ease-in-out 0s;
          border-radius: 0 !important; /* remove o raio interno */
        }
      `}</style>
    </ThemeProvider>
  );
}
