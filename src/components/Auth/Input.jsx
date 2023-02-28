import React from 'react'
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export const Input = ({half, name, handleChange, type, label, autoFocus, handleShowPassword}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
        <TextField
            name={name}
            onChange={handleChange}
            variant='outlined'
            required
            fullWidth
            label={label}
            autoFocus={autoFocus}
            type={type}
            InputProps={name === 'password' ? {
                endAdornment: (
                    <InputAdornment position='end'>
                        <IconButton onClick={handleShowPassword}>
                            {type === "password" ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                        </IconButton>
                    </InputAdornment>
                )
            }: null} 
        />
    </Grid>
  )
}