import { AppBar, Box, IconButton, Link, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ROUTE } from '../../types/RouteLinks';
import { MouseEvent, useState } from 'react';
import { ACCESS_TOKEN, LOGGED_IN_USER } from '../../constants';

export default function NavBar() {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleLogOut = () => {
    localStorage.removeItem(ACCESS_TOKEN)
    localStorage.removeItem(LOGGED_IN_USER)
    navigate(ROUTE.Login)
  }
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar disableGutters={false}>
            <Link component={RouterLink} to="/" color="inherit" underline='none' sx={{ flexGrow: 1 }}>
              <Typography fontWeight="bold" >Video Games</Typography>
            </Link>
            <IconButton
              color='inherit'
              size='large'
              onClick={handleClick}
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <AccountCircleIcon></AccountCircleIcon>
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <MenuItem onClick={() => { navigate(ROUTE.Dashboard) }}>Dashboard</MenuItem>
        <MenuItem onClick={ handleLogOut }>Logout</MenuItem>
      </Menu>
    </>
  )
}
