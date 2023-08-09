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
  Link,
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
import { Suspense, useEffect, useState } from 'react'
import SvgIcon from '@mui/material/SvgIcon'
// import { ReactComponent as Logo } from './logo.svg'
import { useParams } from 'react-router-dom'
import { Remark } from 'react-remark'
import HowToVoteIcon from '@mui/icons-material/HowToVote'
import { ColorRing } from 'react-loader-spinner'
import { useGlitch } from 'react-powerglitch'
// import { ReactComponent as LoadingLogo } from './logo.svg'

import PendingIcon from '@mui/icons-material/Pending'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import IconButton from '@mui/material/IconButton'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import SchemaIcon from '@mui/icons-material/Schema'
// import { ReactComponent as Subscan } from './subscan.svg'
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'
import Groups3Icon from '@mui/icons-material/Groups3'
import AutoGraphIcon from '@mui/icons-material/AutoGraph'
import LockClockIcon from '@mui/icons-material/LockClock'

import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied'
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver'
import Diversity3Icon from '@mui/icons-material/Diversity3'
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement'
import { ReactComponent as Subscan } from '../../icons/subscan.svg'
import { ReactComponent as Logo } from '../../icons/logo.svg'
import { ReactComponent as PolkadotLogo } from '../../icons/polkadot-logo.svg'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useNetwork } from '../../NetworkContext'

interface DelegateListItemProps {
  abstainCount: number
  address: string
  ayeCount: number
  castedCount: number
  delegatedCount: number
  delegationAmount: number
  delegationCount: number
  identity: string
  image: string
  isOrganization: boolean
  labels: [string]
  longDescription: string
  name: string
  nayCount: string
  score: {
    baseDemocracyScore: number
    lastConsistencyMultiplier: number
    normalizedScore: number
    totalConsistencyMultiplier: number
    totalDemocracyScore: number
  }
  shortDescription: string
  voteCount: number
  votingBalance: number
}

export const getDelegateAvatar = (delegate: any) => {
  switch (true) {
    case !!delegate.image:
      return (
        // <Tooltip title={`Voted ${voteDirection}`}>
        <Avatar
          src={delegate.image}
          sx={{
            background:
              'linear-gradient(180deg, rgba(72,204,129,0.2),rgba(81,229,145,0.2))',
            width: { xs: 32, md: 78 },
            height: { xs: 32, md: 78 },
            border: '0.1px solid  rgba(86,243,154,1)',
            boxShadow: '0 3px 5px 2px rgba(86,243,154,0.25)',
            mr: 2,
            ml: { xs: 0, md: 8 },
          }}
        />
        // </Tooltip>
      )
    case !!delegate.address:
      return (
        // <Tooltip title={`Voted ${voteDirection}`}>
        <Avatar
          sx={{
            background:
              'linear-gradient(180deg, rgba(230,0,122,0.06),rgba(230,0,122,0.2))',
            width: { xs: 32, md: 78 },
            height: { xs: 32, md: 78 },
            border: '0.1px solid  rgba(230,0,122,0.6)',
            boxShadow: '0 3px 5px 2px rgba(230,0,122,0.3)',
            mr: 2,
            ml: { xs: 0, md: 8 },
          }}
        >
          <Identicon theme={'polkadot'} size={60} value={delegate.address} />
        </Avatar>
        // </Tooltip>
      )
  }
}

const getLabelChip = (label: string) => {
  switch (true) {
    case label == 'Validator':
      return (
        <Chip
          sx={{ mx: 1 }}
          icon={<SensorOccupiedIcon color="success" />}
          label={label}
        />
      )
    case label === 'Nominator':
      return (
        // <Tooltip title={`Voted ${voteDirection}`}>
        <Chip
          sx={{ mx: 1 }}
          icon={<RecordVoiceOverIcon color="success" />}
          label={label}
        />
        // </Tooltip>
      )
    case label === 'Society':
      return (
        // <Tooltip title={`Voted ${voteDirection}`}>
        <Chip
          sx={{ mx: 1 }}
          icon={<Diversity3Icon color="success" />}
          label={label}
        />
        // </Tooltip>
      )
    case label === 'Fellowship':
      return (
        // <Tooltip title={`Voted ${voteDirection}`}>
        <Chip
          sx={{ mx: 1 }}
          icon={<SelfImprovementIcon color="success" />}
          label={label}
        />
        // </Tooltip>
      )
  }
}

export default function DelegateListItem(props: {
  delegate: DelegateListItemProps
}) {
  const { network, setNetwork } = useNetwork()
  const mobile = useMediaQuery('(min-width:600px)')
  return (
    <ListItem
      alignItems="flex-start"
      sx={{
        px: { xs: 0, md: 8 },
        pl: { xs: 1, md: 0 },
        py: 2,
      }}
    >
      <ListItemAvatar>{getDelegateAvatar(props.delegate)}</ListItemAvatar>
      <ListItemText
        primary={
          <>
            <Grid
              container
              spacing={0}
              direction="row"
              justifyContent={'center'}
              justifyItems={'center'}
              alignItems={'center'}
              sx={{ pb: 2 }}
            >
              <Grid
                item
                container
                xs={12}
                md={4}
                justifyContent={{ xs: 'center', md: 'flex-start' }}
                alignItems={'center'}
              >
                <Link
                  href={`/#/delegates/${props.delegate.address}`}
                  underline="hover"
                >
                  <Typography
                    variant="h5"
                    sx={{
                      p: 2,
                      backgroundImage: `linear-gradient(90deg, #E6007A, rgba(109,58,238,1))`,
                      backgroundSize: '100%',
                      backgroundRepeat: 'repeat',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      transition: '0.4s',
                      border: '1px solid rgba(109,58,238,0.0)',
                      '&:hover': {
                        // mb: 0.5,
                        WebkitTextFillColor: 'rgba(109,58,238,0.3)',
                        border: '1px solid rgba(109,58,238,0.4)',
                        borderRadius: '8px',
                        boxShadow: '0 3px 5px 2px rgba(109,58,238,0.2)',
                      },
                    }}
                  >
                    {mobile
                      ? props.delegate?.name
                        ? props.delegate?.name
                        : props.delegate?.identity
                      : (props.delegate?.name
                          ? props.delegate?.name
                          : props.delegate?.identity
                        ).slice(0, 16)}
                  </Typography>
                </Link>
              </Grid>
              <Grid
                item
                container
                xs={8}
                md={4}
                justifyItems={'center'}
                justifyContent={{ xs: 'center', md: 'flex-start' }}
                alignItems={'center'}
                alignContent={'center'}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    backgroundImage: `linear-gradient(90deg, #E6007A, #E6007A)`,
                    backgroundSize: '100%',
                    backgroundRepeat: 'repeat',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {props.delegate?.shortDescription}
                </Typography>
              </Grid>
              <Grid
                item
                container
                xs={12}
                md={4}
                justifyContent={{ xs: 'center', md: 'flex-end' }}
                alignItems={'center'}
                alignContent={'center'}
              >
                {props.delegate.labels.map((label) => getLabelChip(label))}
              </Grid>
            </Grid>
            <Divider />

            <Grid
              container
              spacing={0}
              direction="row"
              justifyContent={'flex-start'}
              justifyItems={'center'}
              alignItems={'center'}
            >
              <Grid
                item
                container
                xs={12}
                md={8}
                alignItems={'center'}
                sx={{ mt: 2 }}
                justifyContent={{ xs: 'center', md: 'flex-start' }}
              >
                <Identicon
                  theme={'polkadot'}
                  size={20}
                  value={props.delegate.address}
                />
                <Typography
                  variant="subtitle1"
                  sx={{
                    ml: 1,
                    backgroundImage: `linear-gradient(90deg, #E6007A, rgba(109,58,238,1))`,
                    backgroundSize: '100%',
                    backgroundRepeat: 'repeat',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {mobile
                    ? props.delegate.address
                    : props.delegate.address.slice(0, 5)}
                </Typography>
                <IconButton
                  href={`https://www.subscan.io/account/${props.delegate.address}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <SvgIcon color="primary">{<Subscan />}</SvgIcon>
                </IconButton>
              </Grid>

              <Grid
                item
                container
                xs={12}
                md={4}
                justifyContent={{ xs: 'center', md: 'flex-end' }}
              >
                <Chip
                  sx={{
                    background:
                      'linear-gradient(90deg, rgba(72,204,129,0.0), rgba(81,229,145,0.0))',
                    border: '1px solid rgba(230,0,122,0.25)',
                    mr: 0.5,
                  }}
                  icon={
                    <SvgIcon color="primary">
                      {network.name == 'Polkadot' ? <PolkadotLogo /> : <Logo />}
                    </SvgIcon>
                  }
                  label={`Voting Balance: ${props.delegate.votingBalance.toLocaleString(
                    undefined,
                    { maximumFractionDigits: 2 }
                  )} ${network.symbol}`}
                />
              </Grid>
            </Grid>
          </>
        }
        secondary={
          <React.Fragment>
            <Grid
              container
              spacing={0}
              direction="row"
              sx={{
                mb: 2,
              }}
            >
              <Grid
                container
                item
                xs={12}
                md={3}
                justifyContent={{ xs: 'center', md: 'flex-start' }}
              >
                <Chip
                  icon={<AutoAwesomeIcon color="success" />}
                  label={`${props.delegate.voteCount} Votes`}
                />
              </Grid>
              <Grid
                item
                container
                xs={12}
                md={6}
                justifyContent={{ xs: 'center', md: 'flex-end' }}
              >
                <Chip
                  sx={{
                    background:
                      'linear-gradient(90deg, rgba(72,204,129,0.1), rgba(81,229,145,0.3))',
                    border: '1px solid rgba(81,229,145,1)',
                    mr: 0.5,
                  }}
                  icon={<ThumbUpAltTwoToneIcon color="success" />}
                  label={`${props.delegate.ayeCount} Aye`}
                />
                <Chip
                  sx={{
                    mr: 0.5,
                  }}
                  icon={<ThumbDownAltTwoToneIcon color="primary" />}
                  label={`${props.delegate.nayCount} Nay`}
                />
                {props.delegate.abstainCount > 0 && (
                  <Chip
                    sx={{
                      background:
                        'linear-gradient(90deg, rgba(169,204,41,0.1), rgba(190,229,46,0.1))',
                      border: '1px solid rgba(211,255,51,1)',
                      mr: 0,
                    }}
                    icon={
                      <HealthAndSafetyIcon
                        sx={{
                          color: 'rgba(211,255,51,1)',
                        }}
                        htmlColor="rgba(211,255,51,1)"
                      />
                    }
                    label={`${props.delegate.abstainCount} Abstain`}
                  />
                )}
              </Grid>

              <Grid
                item
                container
                xs={12}
                md={3}
                justifyContent={{ xs: 'center', md: 'flex-end' }}
              >
                {props.delegate.castedCount > 0 && (
                  <Chip
                    sx={{
                      background:
                        'linear-gradient(90deg, rgba(0,148,212,0.2), rgba(0,166,237,0.2))',
                      border: '1px solid rgba(0,178,255,1)',
                      mr: 0.5,
                    }}
                    icon={<FaceIcon color="info" />}
                    label={`${props.delegate.castedCount} Casted`}
                  />
                )}
                {props.delegate.delegatedCount > 0 && (
                  <Chip
                    sx={{
                      background:
                        'linear-gradient(90deg, rgba(0,148,212,0.2), rgba(0,166,237,0.2))',
                      border: '1px solid rgba(0,178,255,1)',
                      mr: 0,
                    }}
                    icon={<Groups3Icon color={'info'} />}
                    label={`${props.delegate.delegatedCount} Delegated`}
                  />
                )}
              </Grid>
            </Grid>

            <Grid container spacing={0} direction="row">
              <Grid item xs={12} md={6}>
                {props.delegate.delegationCount > 0 && (
                  <Chip
                    icon={<Groups3Icon color="primary" />}
                    label={`${props.delegate.delegationCount} Delegators`}
                    sx={{
                      mr: 1,
                    }}
                  />
                )}
                {props.delegate.delegationAmount > 0 && (
                  <Chip
                    icon={
                      <SvgIcon color="primary">
                        {network.name == 'Polkadot' ? (
                          <PolkadotLogo />
                        ) : (
                          <Logo />
                        )}
                      </SvgIcon>
                    }
                    label={`${props.delegate.delegationAmount.toLocaleString(
                      undefined,
                      { maximumFractionDigits: 2 }
                    )} ${network.symbol} Delegated`}
                  />
                )}
              </Grid>
              <Grid
                item
                container
                xs={12}
                md={6}
                justifyContent={{ xs: 'center', md: 'flex-end' }}
              >
                <Chip
                  sx={{
                    background:
                      'linear-gradient(90deg, rgba(72,204,129,0.05), rgba(81,229,145,0.2))',
                    border: '1px solid rgba(81,229,145,1)',
                    mr: 0,
                  }}
                  icon={<AutoGraphIcon color="success" />}
                  label={`${(
                    ((props.delegate?.score?.lastConsistencyMultiplier - 1) /
                      1.5) *
                    100
                  ).toFixed(0)}% Recent Voting Consistency`}
                />
              </Grid>
            </Grid>
          </React.Fragment>
        }
      />
    </ListItem>
  )
}
