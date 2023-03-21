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
import Loading from './Loading'
import SchemaIcon from '@mui/icons-material/Schema'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PendingIcon from '@mui/icons-material/Pending'
import CancelIcon from '@mui/icons-material/Cancel'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import ReferendaDetails from './ReferendaDetails'
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'
import LockClockIcon from '@mui/icons-material/LockClock'
import Groups3Icon from '@mui/icons-material/Groups3'
import { ReactComponent as Subscan } from '../icons/subscan.svg'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { StyledToggleButton, StyledToggleButtonGroup } from './Chart'
import AllInclusiveIcon from '@mui/icons-material/AllInclusive'
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied'
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver'
import Diversity3Icon from '@mui/icons-material/Diversity3'
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement'
import useMediaQuery from '@mui/material/useMediaQuery'
import { debounce } from 'lodash'
import HelpIcon from '@mui/icons-material/Help'

interface VoteItemProps {
  address: string
  identity: string
  conviction: string
  voteAmount: number
  voteDirection: string
  casting: string
  delegatingTo: string
  delegatingToIdentity: string
  referendumIndex: number
  delegatedBalance: number
}

const getConvictionBalance = (conviction: string, amount: number) => {
  switch (true) {
    case conviction === 'None':
      return amount * 0.1
    case conviction === 'Locked1x':
      return amount
    case conviction === 'Locked2x':
      return amount * 2
    case conviction === 'Locked3x':
      return amount * 3
    case conviction === 'Locked4x':
      return amount * 4
    case conviction === 'Locked5x':
      return amount * 5
    case conviction === 'Locked6x':
      return amount * 6
  }
}

function VoteItem(props: { vote: VoteItemProps }) {

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
    <ListItem alignItems="flex-start" sx={{
        px: {xs: 0, md: 8}, py: 2 }}>
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
            >
              <Grid item container xs={8} md={9} alignItems={'center'}>
                <Identicon
                  theme={'polkadot'}
                  size={20}
                  value={props.vote.address}
                />
                <Link
                  href={`/#/voter/${props.vote?.address}`}
                  underline="hover"
                >
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
                      transition: '0.4s',
                      '&:hover': {
                        mb: 0.5,
                        WebkitTextFillColor: 'rgba(109,58,238,0.3)',
                      },
                    }}
                  >
                    {mobile ? props.vote.identity : props.vote.identity.slice(0,8)}
                  </Typography>
                </Link>
                <IconButton
                  href={`https://www.subscan.io/account/${props.vote.address}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <SvgIcon color="primary">
                    <Subscan />
                  </SvgIcon>
                </IconButton>
              </Grid>
              <Grid item container xs={4} md={3} justifyContent={'flex-end'}>
                <Typography
                  variant="h5"
                  sx={{
                    backgroundImage: `linear-gradient(90deg, #E6007A, rgba(109,58,238,1))`,
                    backgroundSize: '100%',
                    backgroundRepeat: 'repeat',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    paddingRight: '20px',
                  }}
                >
                  Ref {props.vote.referendumIndex}
                </Typography>
              </Grid>
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
                      {props.vote.voteAmount.toLocaleString(undefined, {
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
                    boxShadow: '0 3px 5px 2px rgba(86,243,154,0.1)',
                  }}
                  icon={<LockClockIcon color="info" />}
                  label={props.vote.conviction}
                />
              </Grid>

              <Grid item xs={12} md={8} container justifyContent={{xs: 'flex-start', md: 'flex-end'}} sx={{pt: {xs: 1, md: 0}}}>
                <Chip
                  sx={{
                    boxShadow: '0 3px 5px 2px rgba(230,0,122,0.15)',
                    border: '1px solid rgba(230,0,122,0.75)',
                    background:
                      'linear-gradient(90deg, rgba(230,0,122,0.15), rgba(109,58,238,0.15))',
                  }}
                  icon={
                    props.vote.casting == 'Casting' ? (
                      <FaceIcon color="primary" />
                    ) : (
                      <Groups3Icon color="primary" />
                    )
                  }
                  label={
                    props.vote.delegatingTo ? (
                      <>
                        <Grid container alignItems={'center'}>
                          <Typography sx={{ pr: 1 }} variant="subtitle2">
                            Delegating
                          </Typography>
                          <Identicon
                            theme={'polkadot'}
                            size={16}
                            value={props.vote.delegatingTo}
                          />
                          <Link
                            href={`/#/delegates/${props.vote?.delegatingTo}`}
                            underline="hover"
                          >
                            <Typography
                              sx={{
                                pl: 1,
                                transition: '0.4s',
                                '&:hover': {
                                  mb: 0.25,
                                  WebkitTextFillColor: 'rgba(109,58,238,0.8)',
                                },
                              }}
                              variant="subtitle2"
                              color="primary"
                            >
                              {mobile ? props.vote.delegatingToIdentity : props.vote.delegatingToIdentity.slice(0,8)}
                            </Typography>
                          </Link>
                          <IconButton
                            href={`https://www.subscan.io/account/${props.vote.delegatingTo}`}
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
                      props.vote.casting
                    )
                  }
                />
              </Grid>
            </Grid>
            <Grid container spacing={0} direction="row">
              <Grid item xs={8}>
                {props.vote.delegatedBalance > 0 && (
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
                        {props.vote.delegatedBalance.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })}{' '}
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

export default function VoteItemsList() {
  const [refInfo, setRefInfo] = useState<any>()
  const [votes, setVotes] = useState([])
  const { referendumIndex } = useParams()

  const mobile = useMediaQuery('(min-width:600px)')
  const [filterParam, setFilterParam] = useState('All')
  const [q, setQ] = useState('')

  function search(votes: any) {
    return votes.filter((vote: any) => {
      if (vote?.voteDirection == filterParam) {
        return (
          vote?.identity?.toLowerCase().includes(q.toLowerCase()) ||
          vote?.address?.toLowerCase().includes(q.toLowerCase()) ||
          vote?.delegatingToIdentity?.toLowerCase().includes(q.toLowerCase()) ||
          vote.delegatingTo?.toLowerCase().includes(q.toLowerCase())
        )
      } else if (filterParam == 'All') {
        return (
          vote.identity?.toLowerCase().includes(q.toLowerCase()) ||
          vote.address?.toLowerCase().includes(q.toLowerCase()) ||
          vote.delegatingToIdentity?.toLowerCase().includes(q.toLowerCase()) ||
          vote.delegatingTo?.toLowerCase().includes(q.toLowerCase())
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

  useEffect(() => {
    const fetchVotes = () => {
      fetch(
        `${process.env.REACT_APP_API}/opengov/votes/referendum/${referendumIndex}`
      )
        .then((results) => {
          return results.json()
        })
        .then((resultsJSON) => {
          console.log(resultsJSON)
          const votes = resultsJSON.map((vote: any) => {
            return {
              address: vote.address,
              identity: vote.identity,
              conviction: vote.conviction,
              voteAmount:
                vote.balance.aye + vote.balance.nay + vote.balance.abstain,
              voteDirection: vote.voteDirection,
              casting: vote.voteType,
              delegatingTo: vote.delegatedTo,
              delegatingToIdentity: vote.delegatingToIdentity,
              delegatedBalance: vote.delegatedConvictionBalance,
              referendumIndex: vote.referendumIndex,
            }
          })
          const sorted = votes.sort(
            (a: any, b: any) => b.voteAmount - a.voteAmount
          )
          setVotes(sorted)
        })
        .catch((e) => {
          console.log(e)
        })
    }

    const fetchRefInfo = () => {
      fetch(`${process.env.REACT_APP_API}/opengov/referenda/${referendumIndex}`)
        .then((results) => {
          return results.json()
        })
        .then((resultsJSON) => {
          console.log(resultsJSON)
          setRefInfo(resultsJSON)
        })
        .catch((e) => {
          console.log(e)
        })
    }
    fetchRefInfo()
    fetchVotes()
  }, [])

  return (
    <>
      {votes.length > 0 && refInfo ? (
        <>
          <ReferendaDetails refInfo={refInfo} />

          <Paper
            sx={{
              height: { xs: '90vh', md: '75vh' },
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
                  bgcolor:
                    'linear-gradient(90deg, #E6007A, rgba(109,58,238,0.2))',
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
                    sx={{ pb: 2, pt: 2 }}
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
                        {search(votes).length}
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
                      <Tooltip
                        title={'The total amount of KSM, including conviction'}
                      >
                        <Box display="flex">
                          <Typography
                            variant="h6"
                            sx={{
                              pl: 2,
                              pr: 0.5,
                              backgroundImage: `linear-gradient(90deg, #E6007A, rgba(109,58,238,1))`,
                              backgroundSize: '100%',
                              backgroundRepeat: 'repeat',
                              backgroundClip: 'text',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                            }}
                          >
                            {search(votes)
                              ?.reduce((a: any, b: any) => {
                                //@ts-ignore
                                return (
                                  a +
                                  getConvictionBalance(
                                    b.conviction,
                                    b.voteAmount
                                  )
                                )
                              }, 0)
                              .toLocaleString(undefined, {
                                maximumFractionDigits: 2,
                              })}{' '}
                            KSM
                          </Typography>
                          <HelpIcon sx={{ color: 'rgba(109,58,238,1)' }} />
                        </Box>
                      </Tooltip>
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <Typography
                        variant="h5"
                        sx={{
                          py: 2,
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
                            fontSize="small"
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
                        {/*<StyledToggleButton value="Fellowship">*/}
                        {/*    <SelfImprovementIcon*/}
                        {/*        color="success"*/}
                        {/*        sx={{ pr: 1 }}*/}
                        {/*        fontSize="small"*/}
                        {/*    />*/}
                        {/*    Fellowship*/}
                        {/*</StyledToggleButton>*/}
                      </StyledToggleButtonGroup>
                    </Grid>
                  </Grid>
                </Box>
                <Divider />
              </ListSubheader>

              {search(votes).map((vote: any) => (
                <>
                  <Suspense fallback={<Loading />}>
                    <VoteItem vote={vote} />
                  </Suspense>
                  <Divider />
                </>
              ))}
            </List>
          </Paper>
        </>
      ) : (
        <>
          <Loading />
        </>
      )}
    </>
  )
}
