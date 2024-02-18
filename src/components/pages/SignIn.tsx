import { useState } from 'react'
import { supabase } from '../../supabaseClient'
import InputField from '../atoms/InputField'
import Stack from '@mui/material/Stack';
import Button from '../atoms/Button';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from '@tanstack/react-router';

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');

  const handleLogin = async (event: any) => {
    event.preventDefault()

    setLoading(true)
    
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      alert(error.message)
    }

    setLoading(false)
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
      <Card sx={{width: '100%', maxWidth: 400, p: 8}}>
        <Typography variant='h4' sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          Iniciar Sesión
        </Typography>
        <Stack spacing={3}>
          <InputField id='email' label='Email' variant='standard' type="email"/>
          <InputField id='password' label='Contraseña' variant='standard' type='password'/>
          <Typography variant='body1'>
            <Link to='/'>Se te olvido tu contraseña?</Link>
          </Typography>
          <Button onClick={handleLogin}>Iniciar Sesión</Button>
          <Typography variant='body1'>
            No tienes una cuenta? <Link to='/signup'>Crea una cuenta</Link>
          </Typography>
        </Stack>
      </Card>
    </Box>
  )
}