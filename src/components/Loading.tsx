import { useEffect, useState } from 'react'
import { useGlitch } from 'react-powerglitch'
import { Box, Fade, ListSubheader, Paper } from '@mui/material'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import SvgIcon from '@mui/material/SvgIcon'
import Grid from '@mui/material/Grid'
import { ColorRing } from 'react-loader-spinner'
import * as React from 'react'
import { ReactComponent as LoadingLogo } from '../icons/logo.svg'
import { ReactComponent as PolkadotLoadingLogo } from '../icons/polkadot-logo.svg'
import { useNetwork } from '../NetworkContext'

export default function Loading() {
  const glitch = useGlitch()
  const { network, setNetwork } = useNetwork()

  return (
    <>
      <Fade in={true} appear={true}>
        <div>
          {true && (
            <div>
              <span ref={glitch.ref}>
                <SvgIcon color="primary" style={{ fontSize: 240 }}>
                  {network.name == 'Polkadot' ? (
                    <PolkadotLoadingLogo />
                  ) : (
                    <LoadingLogo />
                  )}
                </SvgIcon>
              </span>
            </div>
          )}
          <Grid container spacing={0}>
            <Grid item container xs={12} justifyContent={'center'}>
              <Typography
                variant="h2"
                sx={{
                  // px: 10,
                  py: 0,
                  backgroundImage: `linear-gradient(90deg, #E6007A, rgba(109,58,238,1))`,
                  backgroundSize: '100%',
                  backgroundRepeat: 'repeat',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  bgcolor: 'background.paper',
                }}
              >
                Loading
              </Typography>
              <span ref={glitch.ref}>
                <ColorRing
                  visible={true}
                  height="60"
                  width="60"
                  ariaLabel="blocks-loading"
                  wrapperStyle={{}}
                  wrapperClass="blocks-wrapper"
                  colors={[
                    '#E6007A',
                    'rgba(230,0,122,0.65)',
                    'rgba(230,0,122,0.65)',
                    'rgba(230,0,122,0.55)',
                    'rgba(230,0,122,0.35)',
                  ]}
                />
              </span>
            </Grid>
          </Grid>
        </div>
      </Fade>
    </>
  )
}
