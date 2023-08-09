import * as React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import {
  Box,
  Chip,
  Fade,
  Icon,
  ListSubheader,
  makeStyles,
  withStyles,
} from '@mui/material'
import Grid from '@mui/material/Grid'
import { Identicon } from '@polkadot/react-identicon'
import ThumbUpAltTwoToneIcon from '@mui/icons-material/ThumbUpAltTwoTone'
import FaceIcon from '@mui/icons-material/Face'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import ThumbDownAltTwoToneIcon from '@mui/icons-material/ThumbDownAltTwoTone'

import Tooltip from '@mui/material/Tooltip'
import { Paper } from '@mui/material'
import { useEffect, useState } from 'react'
import SvgIcon from '@mui/material/SvgIcon'
import { ReactComponent as Logo } from '../icons/logo.svg'
import { useParams } from 'react-router-dom'
import { Remark } from 'react-remark'
import HowToVoteIcon from '@mui/icons-material/HowToVote'
import { ColorRing } from 'react-loader-spinner'
import { useGlitch } from 'react-powerglitch'
import { ReactComponent as LoadingLogo } from '../icons/logo.svg'
import Loading from '../components/Loading'
import PendingIcon from '@mui/icons-material/Pending'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import SchemaIcon from '@mui/icons-material/Schema'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import IconButton from '@mui/material/IconButton'
import { ReactComponent as Subscan } from '../icons/subscan.svg'

interface ReferendumProps {
  index: string
  title: string
  content: string
  track: string
  origin: string
  submitted: number
  confirmationBlock: number | any
  submissionWho: string
  submissionIdentity: string
  ayes: number
  nays: number

  support: number
  currentStatus: string
  voters: number
}

export default function ReferendaDetails(props: { refInfo: ReferendumProps }) {
  const getStatus = (status: string) => {
    switch (true) {
      case status === 'Ongoing':
        return (
          <Chip
            sx={{
              background:
                'linear-gradient(90deg, rgba(0,148,212,0.2), rgba(0,166,237,0.2))',
              border: '1px solid rgba(0,178,255,1)',
              boxShadow: '0 3px 5px 2px rgba(86,243,154,0.25)',
              mr: 2,
            }}
            icon={<PendingIcon sx={{ color: 'rgba(0,148,212,1)' }} />}
            label={status}
          />
        )
      case status === 'Approved':
        return (
          <Chip
            sx={{
              background:
                'linear-gradient(180deg, rgba(72,204,129,0.2),rgba(81,229,145,0.2))',
              border: '0.1px solid  rgba(86,243,154,1)',
              boxShadow: '0 3px 5px 2px rgba(86,243,154,0.25)',
              mr: 2,
            }}
            icon={<CheckCircleIcon color="success" />}
            label={status}
          />
        )
      case status === 'Rejected':
        return (
          <Chip
            sx={{
              mr: 2,
            }}
            icon={<CancelIcon color="primary" />}
            label={status}
          />
        )
      case status === 'Cancelled':
        return (
          <Chip
            sx={{
              mr: 2,
            }}
            icon={<CancelIcon color="primary" />}
            label={status}
          />
        )
      case status === 'TimedOut':
        return (
          <Chip
            sx={{
              mr: 2,
            }}
            icon={<AccessTimeIcon color="primary" />}
            label={status}
          />
        )
    }
  }

  return (
    <Paper
      sx={{
        // height: { xs: '90vh', md: '75vh' },
        width: {
          xs: '95vw',
          sm: '95vw',
          md: '95vw',
          lg: '95vw',
          xl: '75vw',
        },
        maxWidth: '1920px',
        my: 4,
        boxShadow: '0 3px 5px 1px rgba(230,0,122, 0.5)',
        backdropFilter: 'blur(20px)',
        overflow: 'auto',
      }}
      variant="outlined"
      style={{ overflow: 'auto' }}
    >
      <Box
        sx={{
          width: '100%',
          // minWidth: 300,
          // maxWidth: 960,
          bgcolor: 'rgba(28,5,51,0.60)',
        }}
      >
        <Grid
          container
          direction="column"
          justifyContent={'space-between'}
          // alignItems={'center'}
        >
          <Grid
            item
            // justifyContent={'center'}
            // alignItems={'center'}
            // direction="row"
          >
            <Typography
              variant="h5"
              sx={{
                px: 10,
                py: 2,
                backgroundImage: `linear-gradient(90deg, #E6007A, rgba(109,58,238,1))`,
                backgroundSize: '100%',
                backgroundRepeat: 'repeat',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              <HowToVoteIcon sx={{ fontSize: '20px', pr: 2 }} color="primary" />
              Ref {props.refInfo?.index} -{' '}
              {props.refInfo?.title ? props.refInfo?.title : 'No Title'}
            </Typography>
          </Grid>

          <Grid item>
            <Grid
              container
              direction="row"
              alignItems={'center'}
              justifyContent={'center'}
              sx={{ px: 10 }}
            >
              <Identicon
                theme={'polkadot'}
                size={20}
                value={props.refInfo.submissionWho}
              />

              <Typography
                variant="subtitle1"
                sx={{
                  pl: 1,
                  py: 0,
                }}
                color="primary"
              >
                {props.refInfo.submissionIdentity}
              </Typography>
              <IconButton
                href={`https://www.subscan.io/account/${props.refInfo.submissionIdentity}`}
                target="_blank"
                rel="noreferrer"
              >
                <SvgIcon color="primary">
                  <Subscan />
                </SvgIcon>
              </IconButton>
            </Grid>
          </Grid>

          <Grid item sx={{ width: '100%', pb: 2 }}>
            <Grid container direction="row">
              <Grid
                container
                item
                xs={12}
                md={6}
                justifyContent={{ xs: 'center', md: 'center' }}
              >
                <Chip
                  sx={{
                    background:
                      'linear-gradient(90deg, rgba(72,204,129,0.1), rgba(81,229,145,0.3))',
                    border: '1px solid rgba(81,229,145,1)',
                    mr: 1,
                    mt: { xs: 1, md: 0 },
                  }}
                  icon={<ThumbUpAltTwoToneIcon color="success" />}
                  label={`${props.refInfo?.ayes.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })} Aye`}
                />
                <Chip
                  sx={{
                    mr: 1,
                    mt: { xs: 1, md: 0 },
                  }}
                  icon={<ThumbDownAltTwoToneIcon color="primary" />}
                  label={`${props.refInfo?.nays.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })} Nay`}
                />
                <Chip
                  sx={{
                    background:
                      'linear-gradient(90deg, rgba(169,204,41,0.1), rgba(190,229,46,0.1))',
                    border: '1px solid rgba(211,255,51,1)',
                    mr: 0,
                  }}
                  icon={<PeopleAltIcon sx={{ color: 'rgba(211,255,51,1)' }} />}
                  label={`${props.refInfo.voters} Voters`}
                />
              </Grid>
              <Grid
                item
                container
                xs={12}
                md={6}
                justifyContent={{ xs: 'center', md: 'center' }}
              >
                {getStatus(props.refInfo?.currentStatus)}
                <Chip
                  icon={<SchemaIcon color="primary" />}
                  label={props.refInfo?.origin}
                />
              </Grid>
            </Grid>
          </Grid>
          <Divider />
        </Grid>

        <Divider />
        <Typography
          color="primary"
          sx={{
            px: { xs: 4, md: 18 },
            py: 2,
            overflow: 'auto',
            fontSize: 12,
          }}
        >
          <Remark>{props.refInfo?.content}</Remark>
        </Typography>
      </Box>
    </Paper>
  )
}
