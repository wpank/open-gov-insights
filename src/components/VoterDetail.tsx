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
  TextField,
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
import IconButton from '@mui/material/IconButton'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import SchemaIcon from '@mui/icons-material/Schema'
import { ReactComponent as Subscan } from '../icons/subscan.svg'
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'
import Groups3Icon from '@mui/icons-material/Groups3'
import AutoGraphIcon from '@mui/icons-material/AutoGraph'
import LockClockIcon from '@mui/icons-material/LockClock'
import ScoreboardIcon from '@mui/icons-material/Scoreboard'
import { Person } from '@mui/icons-material'
import { StyledToggleButton, StyledToggleButtonGroup } from './Chart'
import AllInclusiveIcon from '@mui/icons-material/AllInclusive'
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied'
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver'
import Diversity3Icon from '@mui/icons-material/Diversity3'
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement'
import useMediaQuery from '@mui/material/useMediaQuery'
import { debounce } from 'lodash'
interface VoterProps {
  address: string
  identity: {
    name: string
    address: string
    verified: boolean
    subIdentities: any
    display: string
  }
  totalVotes: number
  balance: number
  voteCount: number
  ayeCount: number
  nayCount: number
  abstainCount: number
  castedVotes: number
  delegatedVotes: number
  votes: any
  delegationCount: number
  delegationBalance: number
  score: any
}

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
          icon={<PendingIcon color={'info'} />}
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

function VoteItem(props: { vote: any }) {
    const mobile = useMediaQuery('(min-width:600px)')

  const getVoteAvatar = (voteDirection: string) => {
    switch (true) {
      case voteDirection === 'Aye':
        return (
          <Tooltip title={`Voted ${voteDirection}`}>
            <Avatar
              sx={{
                background:
                  'linear-gradient(180deg, rgba(72,204,129,0.2),rgba(81,229,145,0.2))',
                width: {xs: 24, md: 48},
                height: {xs: 24, md: 48},
                border: '0.1px solid  rgba(86,243,154,1)',
                boxShadow: '0 3px 5px 2px rgba(86,243,154,0.25)',
                mr: {xs: 0, md: 2},
              }}
              variant="rounded"
            >
              <ThumbUpAltTwoToneIcon color="success" />
            </Avatar>
          </Tooltip>
        )
      case voteDirection === 'Nay':
        return (
          <Tooltip title={`Voted ${voteDirection}`}>
            <Avatar
              sx={{
                background:
                  'linear-gradient(180deg, rgba(230,0,122,0.06),rgba(230,0,122,0.2))',
                  width: {xs: 24, md: 48},
                  height: {xs: 24, md: 48},
                border: '0.1px solid  rgba(230,0,122,0.6)',
                boxShadow: '0 3px 5px 2px rgba(230,0,122,0.25)',
                  mr: {xs: 0, md: 2},
              }}
              variant="rounded"
            >
              <ThumbDownAltTwoToneIcon color="primary" />
            </Avatar>
          </Tooltip>
        )
      case voteDirection === 'Abstain':
        return (
          <Tooltip title={`Voted ${voteDirection}`}>
            <Avatar
              sx={{
                background:
                  'linear-gradient(90deg, rgba(169,204,41,0.1), rgba(190,229,46,0.1))',
                border: '1px solid rgba(211,255,51,1)',
                  width: {xs: 24, md: 48},
                  height: {xs: 24, md: 48},
                boxShadow: '0 3px 5px 2px rgba(211,255,51,0.25)',
                  mr: {xs: 0, md: 2},
              }}
              variant="rounded"
            >
              <HealthAndSafetyIcon sx={{ color: 'rgba(211,255,51,1)' }} />
            </Avatar>
          </Tooltip>
        )
    }
  }

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>{getVoteAvatar(props.vote.voteDirection)}</ListItemAvatar>
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
                xs={12} md={10}
                justifyContent={'flex-start'}
                alignItems={'center'}
              >
                <Link
                  href={`/#/referenda/${props.vote?.referendumIndex}`}
                  underline="hover"
                >
                  <Typography
                    variant="h5"
                    sx={{
                      backgroundImage: `linear-gradient(90deg, #E6007A, rgba(109,58,238,1))`,
                      backgroundSize: '100%',
                      backgroundRepeat: 'repeat',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      pr: 2,
                      transition: '0.4s',
                      '&:hover': {
                        mb: 0.5,
                        WebkitTextFillColor: 'rgba(109,58,238,0.3)',
                      },
                    }}
                  >
                    Ref {props.vote?.referendumIndex} - {props.vote?.title}
                  </Typography>
                </Link>
              </Grid>
              <Grid
                item
                container
                xs={12} md={2}
                justifyContent={{xs: 'center', md: 'flex-start'}}
                alignItems={'center'}
              >
                {getStatus(props.vote?.status)}
              </Grid>
            </Grid>
            <Divider />
            <Grid
              container
              spacing={0}
              direction="row"
              justifyContent={{xs: 'center', md: 'flex-start'}}
              justifyItems={'center'}
              alignItems={'center'}
            >
              <Grid item container xs={12} alignItems={'center'} sx={{ mt: 2 }}>
                <Identicon
                  theme={'polkadot'}
                  size={20}
                  value={props.vote?.address}
                />
                <Typography
                  variant="h6"
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
                  {mobile ? props.vote?.address : props.vote.address.slice(0,8)}
                </Typography>
                <IconButton
                  href={`https://www.subscan.io/account/${props.vote?.address}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <SvgIcon color="primary">
                    <Subscan />
                  </SvgIcon>
                </IconButton>
              </Grid>
              {/*<Grid item container xs={3} justifyContent={'flex-end'}>*/}
              {/*    <Typography*/}
              {/*        variant="h5"*/}
              {/*        sx={{*/}
              {/*            backgroundImage: `linear-gradient(90deg, #E6007A, rgba(109,58,238,1))`,*/}
              {/*            backgroundSize: '100%',*/}
              {/*            backgroundRepeat: 'repeat',*/}
              {/*            backgroundClip: 'text',*/}
              {/*            WebkitBackgroundClip: 'text',*/}
              {/*            WebkitTextFillColor: 'transparent',*/}
              {/*            paddingRight: '20px',*/}
              {/*        }}*/}
              {/*    >*/}
              {/*        Ref {props.vote?.referendumIndex}*/}
              {/*    </Typography>*/}
              {/*</Grid>*/}
            </Grid>
          </>
        }
        secondary={
          <React.Fragment>
            <Grid container spacing={0} direction="row" sx={{ pb: 1 }}>
              <Grid item xs={6} md={2}>
                <Chip
                  icon={
                    <SvgIcon color="primary">
                      <Logo />
                    </SvgIcon>
                  }
                  label={
                    <>
                      {props.vote?.voteAmount?.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}{' '}
                      KSM
                    </>
                  }
                />
              </Grid>
              <Grid item xs={6} md={2}>
                <Chip
                  sx={{
                    background:
                      'linear-gradient(90deg, rgba(0,148,212,0.2), rgba(0,166,237,0.2))',
                    border: '1px solid rgba(0,178,255,1)',
                    boxShadow: '0 3px 5px 2px rgba(86,243,154,0.25)',
                  }}
                  icon={<LockClockIcon color="info" />}
                  label={props.vote?.conviction}
                />
              </Grid>

              <Grid item xs={12} md={8} sx={{pt: {xs:1, md: 0}}}>
                <Chip
                  sx={{
                    boxShadow: '0 3px 5px 2px rgba(230,0,122,0.15)',
                    border: '1px solid rgba(230,0,122,0.75)',
                    background:
                      'linear-gradient(90deg, rgba(230,0,122,0.15), rgba(109,58,238,0.15))',
                  }}
                  icon={
                    props.vote?.voteType == 'Casting' ? (
                      <FaceIcon color="primary" />
                    ) : (
                      <Groups3Icon color="primary" />
                    )
                  }
                  label={
                    props.vote.delegatedTo ? (
                      <>
                        <Grid container alignItems={'center'}>
                          <Typography sx={{ pr: 0 }} variant="subtitle2">
                            Delegating
                          </Typography>
                          <Identicon
                            theme={'polkadot'}
                            size={16}
                            value={props.vote?.delegatingTo}
                          />
                          <Link
                            href={`/#/delegates/${props.vote?.delegatedTo}`}
                            underline="hover"
                          >
                            <Typography
                              sx={{ pl: 0 }}
                              variant="subtitle2"
                              color="primary"
                            >
                              {mobile ? (props.vote?.delegatingToIdentity
                                ? props.vote?.delegatingToIdentity
                                : props.vote?.delegatingTo) : (props.vote?.delegatingToIdentity
                                  ? props.vote?.delegatingToIdentity
                                  : props.vote?.delegatingTo).slice(0,16)}
                            </Typography>
                          </Link>
                          <IconButton
                            href={`https://www.subscan.io/account/${props.vote?.delegatingTo}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <SvgIcon color="primary">
                              <Subscan />
                            </SvgIcon>
                          </IconButton>
                        </Grid>
                      </>
                    ) : (
                      props.vote?.voteType
                    )
                  }
                />
              </Grid>
            </Grid>
            <Grid container spacing={0} direction="row">
              <Grid item xs={8}>
                {props.vote?.delegatedBalance > 0 && (
                  <Chip
                    component="a"
                    clickable
                    href={`/#/delegates/${props.vote.address}`}
                    icon={
                      <SvgIcon color="primary">
                        <Logo />
                      </SvgIcon>
                    }
                    label={
                      <>
                        {props.vote?.delegatedBalance.toLocaleString(
                          undefined,
                          { maximumFractionDigits: 2 }
                        )}{' '}
                        KSM Delegated
                      </>
                    }
                  />
                )}
              </Grid>
            </Grid>
          </React.Fragment>
        }
      />
    </ListItem>
  )
}

function VoterList(props: { voter: VoterProps }) {
  const mobile = useMediaQuery('(min-width:600px)')

  const [q, setQ] = useState('')
  const [filterParam, setFilterParam] = useState('All')

  function search(votes: any) {
    return votes.filter((vote: any) => {
      // if (delegate?.labels?.includes(filterParam)) {
      //     return (
      //         delegate.identity.toLowerCase().includes(q.toLowerCase()) ||
      //         delegate.name.toLowerCase().includes(q.toLowerCase()) ||
      //         delegate.address.toLowerCase().includes(q.toLowerCase())
      //     )
      if (filterParam == 'All') {
        return (
          vote?.title?.toLowerCase().includes(q.toLowerCase()) ||
          vote?.index?.toLowerCase().includes(q.toLowerCase()) ||
          vote?.address?.toLowerCase().includes(q.toLowerCase())
        )
      } else {
        return (
          vote.voteDirection.toLowerCase() == filterParam.toLowerCase() &&
          (vote?.title?.toLowerCase().includes(q.toLowerCase()) ||
            vote?.index?.toLowerCase().includes(q.toLowerCase()) ||
            vote?.address?.toLowerCase().includes(q.toLowerCase()))
        )
      }
    })
  }

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    filterParam: string
  ) => {
    if (filterParam !== null) {
      setFilterParam(filterParam)
    }
  }

  const debouncedSearch = debounce(async (q) => {
    setQ(q)
  }, 300)

  async function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    debouncedSearch(e.target.value)
  }

  return (
    <Paper
      sx={{
        width: {
          xs: '95vw',
          sm: '95vw',
          md: '95vw',
          lg: '95vw',
          xl: '75vw',
        },
        maxWidth: '1920px',
        maxHeight: {xs: '90vh', md: '60vh'},
        my: 4,
        boxShadow: '0 3px 5px 1px rgba(230,0,122, 0.5)',
        backdropFilter: 'blur(20px)',
        overflow: 'auto',
      }}
      variant="outlined"
      style={{ overflow: 'auto' }}
    >
      <List
        sx={{
          width: '100%',
          // minWidth: 960,
          // maxWidth: 960,
          bgcolor: 'background.paper',
          pt: 0,
          px: 0,
        }}
      >
        <ListSubheader
          sx={{
            px: 0,
            width: '100%',
            height: '100%',
            bgcolor: 'linear-gradient(90deg, #E6007A, rgba(109,58,238,0.2))',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(230,0,122, 0.5)',
          }}
        >
          <Box
            sx={{
              width: '100%',
              // minWidth: 300,
              // maxWidth: 960,
              bgcolor: 'rgba(28,5,51,0.20)',
            }}
          >
            <Grid
              container
              spacing={0}
              direction="row"
              alignItems={'center'}
              justifyContent={'center'}
              sx={{ pb: {xs: 0.5, md: 2}, pt: {xs: 0.5, md: 2} }}
            >
              <Grid
                item
                container
                xs={12}
                md={5}
                justifyContent={'center'}
                alignContent={'center'}
                alignItems={'center'}
              >
                <Typography
                  variant="h6"
                  sx={{
                    px: 2,
                    backgroundImage: `linear-gradient(90deg, #E6007A, rgba(109,58,238,1))`,
                    backgroundSize: '100%',
                    backgroundRepeat: 'repeat',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {search(props.voter.votes).length}
                </Typography>
                <TextField
                  type="string"
                  id="outlined-controlled"
                  label="Search"
                  InputProps={{
                    type: 'string',
                    style: { width: '200px' },
                  }}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <Typography
                  variant="h5"
                  sx={{
                    py: {xs: 0.5, md: 2},
                    backgroundImage: `linear-gradient(90deg, #E6007A, rgba(109,58,238,1))`,
                    backgroundSize: '100%',
                    backgroundRepeat: 'repeat',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Votes
                </Typography>
              </Grid>
              <Grid item xs={12} md={5}>
                <StyledToggleButtonGroup
                  value={filterParam}
                  exclusive
                  onChange={handleChange}
                  aria-label="FilterParam"
                  size="small"
                  // orientation={`${mobile ? `horizontal` : `vertical`}`}
                >
                  <StyledToggleButton value="All">
                    <AllInclusiveIcon
                      color="info"
                      sx={{ pr: 1 }}
                      fontSize="medium"
                    />
                    All
                  </StyledToggleButton>
                  <StyledToggleButton value="Aye">
                    <ThumbUpAltTwoToneIcon
                      color="success"
                      sx={{ pr: 1 }}
                      fontSize="medium"
                    />
                    Aye
                  </StyledToggleButton>
                  <StyledToggleButton value="Nay">
                    <ThumbDownAltTwoToneIcon
                      color="primary"
                      sx={{ pr: 1 }}
                      fontSize="small"
                    />
                    Nay
                  </StyledToggleButton>
                  <StyledToggleButton value="Abstain">
                    <HealthAndSafetyIcon
                      sx={{ pr: 1, color: 'rgba(211,255,51,1)' }}
                      fontSize="small"
                    />
                    Abstain
                  </StyledToggleButton>
                </StyledToggleButtonGroup>
              </Grid>
            </Grid>
          </Box>
          <Divider />
        </ListSubheader>

        {
          // @ts-ignore
          search(props.voter?.votes).map((vote: any) => (
            <>
              <Suspense fallback={<Loading />}>
                <VoteItem vote={vote} />
              </Suspense>
              <Divider />
            </>
          ))
        }
      </List>
    </Paper>
  )
}

function VoterDetails(props: { voter: VoterProps }) {
    const mobile = useMediaQuery('(min-width:600px)')
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

  const getScore = (score: any) => {
    // return <p>hello</p>
    switch (true) {
      case score > 75:
        return (
          <Chip
            sx={{
              background:
                'linear-gradient(180deg, rgba(72,204,129,0.2),rgba(81,229,145,0.2))',
              border: '1px solid rgba(81,229,145,1)',
              boxShadow: '0 3px 5px 2px rgba(86,243,154,0.25)',
              mr: 1,
            }}
            icon={<ScoreboardIcon color="success" />}
            label={`Gov Score: ${score.toFixed(0)} / 100`}
          />
        )
      case score > 50:
        return (
          <Chip
            sx={{
              background:
                'linear-gradient(180deg, rgba(169,204,41,0.05),rgba(190,229,46,0.2))',
              border: '0.1px solid  rgba(211,255,51,1)',
              boxShadow: '0 3px 5px 2px rgba(211,255,51,0.25)',
              mr: 1,
            }}
            icon={
              <ScoreboardIcon sx={{ pr: 1, color: 'rgba(211,255,51,1)' }} />
            }
            label={`Gov Score: ${score.toFixed(0)} / 100`}
          />
        )
      case score <= 75:
        return (
          <Chip
            sx={{
              background:
                'linear-gradient(180deg, rgba(230,0,122,0.06),rgba(230,0,122,0.2))',
              border: '0.1px solid  rgba(230,0,122,0.6)',
              boxShadow: '0 3px 5px 2px rgba(230,0,122,0.25)',
              mr: 1,
            }}
            icon={<ScoreboardIcon color={'primary'} />}
            label={`Gov Score: ${score.toFixed(0)} / 100`}
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
          // minWidth: 960,
          // maxWidth: 1060,
          bgcolor: 'background.paper',
          mt: 0,
          pt: 0,
        }}
      >
        <Grid container direction="column" justifyContent={'space-between'}>
          <Grid item>
            <Grid
              container
              direction="row"
              alignItems={'center'}
              justifyContent={'center'}
              sx={{ px: {xs: 0, md: 10}, py: 2 }}
            >
              <Person fontSize={'large'} color={'primary'} />
              <Typography
                variant="h4"
                sx={{
                  px: 1,
                  py: 2,
                  backgroundImage: `linear-gradient(90deg, #E6007A, rgba(109,58,238,1))`,
                  backgroundSize: '100%',
                  backgroundRepeat: 'repeat',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {mobile ? (props.voter?.identity?.name
                  ? props.voter?.identity.name
                  : props.voter.address) : (props.voter?.identity?.name
                    ? props.voter?.identity.name
                    : props.voter.address).slice(0,16)}
              </Typography>
            </Grid>
          </Grid>
          <Divider />

          <Grid
            sx={{ my: 2, px: {xs: 0, md: 8} }}
            container
            direction="column"
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Grid
              item
              container
              direction="row"
              alignItems={'center'}
              justifyContent={'center'}
            >
              <Grid
                item
                container
                xs={12}
                md={8}
                alignItems={'center'}
                alignContent={'center'}
                justifyContent={{xs: 'center', md: 'flex-start'}}
              >
                <Identicon
                  theme={'polkadot'}
                  size={28}
                  value={props.voter?.address}
                />
                <Typography
                  variant="subtitle1"
                  sx={{
                    pl: 1,
                    fontSize: '14px',
                  }}
                  color="primary"
                >
                  {mobile ? props.voter?.address : props.voter?.address.slice(0,8)}
                </Typography>
                <IconButton
                  href={`https://www.subscan.io/account/${props.voter?.address}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <SvgIcon color="primary">
                    <Subscan />
                  </SvgIcon>
                </IconButton>
              </Grid>
              <Grid item container xs={12} md={4} justifyContent={{xs: 'center', md: 'flex-end'}}>
                <Chip
                  sx={{
                    background:
                      'linear-gradient(90deg, rgba(72,204,129,0.0), rgba(81,229,145,0.0))',
                    border: '1px solid rgba(230,0,122,0.25)',
                  }}
                  icon={
                    <SvgIcon color="primary">
                      <Logo />
                    </SvgIcon>
                  }
                  label={`Voting Balance: ${props.voter?.balance?.toLocaleString(
                    undefined,
                    { maximumFractionDigits: 2 }
                  )} KSM`}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={0}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              mb: 2,
              px: {xs: 0, md: 8},
            }}
          >
            <Grid
              item
              container
              xs={12} md={3}
              justifyContent={{ xs: "center", md: "flex-start"}}
              alignItems="center"
            >
              <Chip
                icon={<AutoAwesomeIcon color="success" />}
                label={`${props.voter?.voteCount} Votes`}
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <Chip
                sx={{
                  background:
                    'linear-gradient(90deg, rgba(72,204,129,0.1), rgba(81,229,145,0.3))',
                  border: '1px solid rgba(81,229,145,1)',
                  mr: 1,
                }}
                icon={<ThumbUpAltTwoToneIcon color="success" />}
                label={`${props.voter?.ayeCount} Aye Votes`}
              />
              <Chip
                sx={{
                  mr: 1,
                }}
                icon={<ThumbDownAltTwoToneIcon color="primary" />}
                label={`${props.voter?.nayCount} Nay Votes`}
              />
              {props.voter?.abstainCount > 0 && (
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
                  label={`${props.voter?.abstainCount} Abstain Votes`}
                />
              )}
            </Grid>

            <Grid item xs={12} md={3} container justifyContent={{xs: 'center', md: 'flex-end'}}>
              {props.voter?.castedVotes > 0 && (
                <Chip
                  sx={{
                    background:
                      'linear-gradient(90deg, rgba(0,148,212,0.2), rgba(0,166,237,0.2))',
                    border: '1px solid rgba(0,178,255,1)',
                    mr: 0.5,
                  }}
                  icon={<FaceIcon color="info" />}
                  label={`${props.voter?.castedVotes} Casted Votes`}
                />
              )}
              {props.voter?.delegatedVotes > 0 && (
                <Chip
                  sx={{
                    background:
                      'linear-gradient(90deg, rgba(0,148,212,0.2), rgba(0,166,237,0.2))',
                    border: '1px solid rgba(0,178,255,1)',
                    mr: 0,
                  }}
                  icon={<Groups3Icon color={'info'} />}
                  label={`${props.voter?.delegatedVotes} Delegated Votes`}
                />
              )}
            </Grid>
          </Grid>

          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ mb: 2 }}
            px={{xs: 0, md: 8}}
          >
            <Grid item container xs={12} md={6} justifyContent={{xs: 'center', md: 'flex-start'}}>
              {props.voter?.delegationCount > 0 && (
                <Chip
                  component="a"
                  clickable
                  href={`/#/delegates/${props.voter.address}`}
                  icon={<Groups3Icon color="primary" />}
                  label={`${props.voter?.delegationCount} Delegators`}
                  sx={{
                    mr: 1,
                  }}
                />
              )}
              {props.voter?.delegationBalance > 0 && (
                <Chip
                  component="a"
                  clickable
                  href={`/#/delegates/${props.voter.address}`}
                  icon={
                    <SvgIcon color="primary">
                      <Logo />
                    </SvgIcon>
                  }
                  label={`${props.voter?.delegationBalance?.toLocaleString(
                    undefined,
                    { maximumFractionDigits: 2 }
                  )} KSM Delegated`}
                />
              )}
            </Grid>
            <Grid container item xs={12} md={6} justifyContent={{xs: 'center', md: 'flex-end'}}>
              <>{getScore(props.voter.score.normalizedScore)}</>

              <Chip
                sx={{
                  background:
                    'linear-gradient(90deg, rgba(72,204,129,0.05), rgba(81,229,145,0.2))',
                  border: '1px solid rgba(81,229,145,1)',
                  mr: 0,
                }}
                icon={<AutoGraphIcon color="success" />}
                label={`${(
                  ((props.voter?.score?.lastConsistencyMultiplier - 1) / 1.5) *
                  100
                ).toFixed(0)}% Recent Voting Consistency`}
              />
            </Grid>
          </Grid>

          <Divider />
        </Grid>
      </Box>
    </Paper>
  )
}

export default function VoterDetail() {
  const [refInfo, setRefInfo] = useState<any>()
  const [voter, setVoter] = useState<any>()
  const { address } = useParams()
  const glitch = useGlitch()

  useEffect(() => {
    const fetchVoter = () => {
      fetch(`${process.env.REACT_APP_API}/opengov/voter/${address}`)
        .then((results) => {
          return results.json()
        })
        .then((resultsJSON) => {
          console.log(resultsJSON)
          const voter = {
            address: address,
            identity: resultsJSON.identity,
            voteCount: resultsJSON.totalVotes,
            balance: resultsJSON.balance,
            ayeCount: resultsJSON.ayeCount,
            nayCount: resultsJSON.nayCount,
            abstainCount: resultsJSON.abstainCount,
            castedVotes: resultsJSON.castedVotes,
            delegatedVotes: resultsJSON.delegatedCount,
            votes: resultsJSON.votes.map((vote: any) => {
              return {
                ...vote,
                voteAmount:
                  vote.balance.aye + vote.balance.nay + vote.balance.abstain,
              }
            }),
            delegationCount: resultsJSON.delegationCount,
            delegationBalance: resultsJSON.delegationAmount,
            score: resultsJSON.score,
          }

          setVoter(voter)
          console.log(voter)
        })
        .catch((e) => {
          console.log(e)
        })
    }

    fetchVoter()
  }, [])

  return (
    <>
      {voter ? (
        <>
          <VoterDetails voter={voter} />

          <VoterList voter={voter} />
        </>
      ) : (
        <Loading />
      )}
    </>
  )
}
