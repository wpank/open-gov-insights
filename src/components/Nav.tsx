import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import GrainIcon from '@mui/icons-material/Grain'
import BarChartIcon from '@mui/icons-material/BarChart'
import { Link } from 'react-router-dom'
import HowToVoteIcon from '@mui/icons-material/HowToVote'
import SvgIcon from '@mui/material/SvgIcon'
import HowToRegIcon from '@mui/icons-material/HowToReg'
import SchemaIcon from '@mui/icons-material/Schema'
import Groups3Icon from '@mui/icons-material/Groups3'
import { ReactComponent as Logo } from '../icons/logo.svg'

import { useNavigate } from 'react-router-dom'

const pages = [
  { name: 'Stats', icon: BarChartIcon },
  { name: 'Referenda', icon: HowToVoteIcon },
  { name: 'Voters', icon: HowToRegIcon },
  { name: 'Delegates', icon: Groups3Icon },
  // { name: 'Tracks', icon: SchemaIcon },
]
const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

function ResponsiveAppBar() {
  const navigate = useNavigate()
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  )

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <AppBar
      position="static"
      color="transparent"
      sx={{ backdropFilter: 'blur(20px)' }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <SvgIcon color="primary" style={{ fontSize: 40 }}>
            <Logo />
          </SvgIcon>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/#/"
            sx={{
              ml: 2,
              mr: 4,
              display: { xs: 'none', md: 'flex' },
              // fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              backgroundImage: `linear-gradient(90deg, #E6007A, rgba(109,58,238,1))`,
              backgroundSize: '100%',
              backgroundRepeat: 'repeat',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textDecoration: 'none',
            }}
          >
            Open Gov Insights
          </Typography>

          <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="primary"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
                backgroundColor: 'rgba(0,0,0, 0.25)',
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  component="a"
                  href={`/#/${page.name.toLowerCase()}`}
                  // sx={{
                  //     backgroundColor: 'black',
                  //     backdropFilter: 'blur(1px)',
                  // }}
                >
                  <Typography variant={'h6'} textAlign="center" color="primary">
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/#/"
            sx={{
              // ml: 2,
              // mr: 4,
              // fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              backgroundImage: `linear-gradient(90deg, #E6007A, rgba(109,58,238,1))`,
              backgroundSize: '100%',
              backgroundRepeat: 'repeat',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textDecoration: 'none',
              display: { xs: 'flex', md: 'none' },
            }}
          >
            Open Gov Stats
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                // sx={{ px: 3 }}
                color="primary"
                href={`/#/${page.name.toLowerCase()}`}
                // component={Link}
                startIcon={
                  <page.icon color="primary">
                    <Logo />
                  </page.icon>
                }
              >
                {page.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default ResponsiveAppBar
