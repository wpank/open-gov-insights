import ListItem from '@mui/material/ListItem'
import {
  Box,
  Chip,
  Fade,
  Link,
  ListItemButton,
  ListSubheader,
  Paper,
  TextField,
} from '@mui/material'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import ListItemText from '@mui/material/ListItemText'
import Grid from '@mui/material/Grid'
import * as React from 'react'
import { Identicon } from '@polkadot/react-identicon'
import ThumbUpAltTwoToneIcon from '@mui/icons-material/ThumbUpAltTwoTone'
import ThumbDownAltTwoToneIcon from '@mui/icons-material/ThumbDownAltTwoTone'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import SchemaIcon from '@mui/icons-material/Schema'
import { Suspense, useEffect, useState } from 'react'
import { useGlitch } from 'react-powerglitch'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import SvgIcon from '@mui/material/SvgIcon'
import { ColorRing } from 'react-loader-spinner'
import { ReactComponent as LoadingLogo } from '../icons/logo.svg'
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'
import Groups3Icon from '@mui/icons-material/Groups3'
import FaceIcon from '@mui/icons-material/Face'
import { ReactComponent as Logo } from '../icons/logo.svg'
import AutoGraphIcon from '@mui/icons-material/AutoGraph'
import Loading from './Loading'
import IconButton from '@mui/material/IconButton'
import { ReactComponent as Subscan } from '../icons/subscan.svg'
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
  identity: string
  voteCount: number
  ayeCount: number
  nayCount: number
  abstainCount: number
  castedCount: number
  delegatedCount: number
  delegationCount: number
  delegationAmount: number
  normalizedScore: number
  score: {
    baseDemocracyScore: number
    totalConsistencyMultiplier: number
    lastConsistencyMultiplier: number
    totalDemocracyScorer: number
    normalizedScore: number
  }
  balance: number
  labels: string[]
}

function VoterItem(props: { voter: VoterProps }) {

    const mobile = useMediaQuery('(min-width:600px)')
  const ScoreAvatar = (score: number) => {
    switch (true) {
      case score > 75:
        return (
          <ListItemAvatar>
            <Avatar
              sx={{
                background:
                  'linear-gradient(180deg, rgba(72,204,129,0.2),rgba(81,229,145,0.2))',
                width: {xs: 36, md: 64},
                height: {xs: 36, md: 64},
                border: '0.1px solid  rgba(86,243,154,1)',
                boxShadow: '0 3px 5px 2px rgba(86,243,154,0.25)',
                mr: {xs: 0, md: 2},
              }}
              variant="rounded"
            >
              <Typography variant="h6" sx={{}} color="rgba(86,243,154,1)">
                {score.toFixed(0)}
              </Typography>
            </Avatar>
          </ListItemAvatar>
        )
      case score > 50:
        return (
          <ListItemAvatar>
            <Avatar
              sx={{
                background:
                  'linear-gradient(180deg, rgba(169,204,41,0.05),rgba(190,229,46,0.2))',
                  width: {xs: 36, md: 64},
                  height: {xs: 36, md: 64},
                border: '0.1px solid  rgba(211,255,51,1)',
                boxShadow: '0 3px 5px 2px rgba(211,255,51,0.25)',
                  mr: {xs: 0, md: 2},
              }}
              variant="rounded"
            >
              <Typography variant="h6" sx={{}} color="rgba(211,255,51,1)">
                {score.toFixed(0)}
              </Typography>
            </Avatar>
          </ListItemAvatar>
        )
      case score <= 75:
        return (
          <ListItemAvatar>
            <Avatar
              sx={{
                background:
                  'linear-gradient(180deg, rgba(230,0,122,0.06),rgba(230,0,122,0.2))',
                  width: {xs: 36, md: 64},
                  height: {xs: 36, md: 64},
                border: '0.1px solid  rgba(230,0,122,0.6)',
                boxShadow: '0 3px 5px 2px rgba(230,0,122,0.25)',
                  mr: {xs: 0, md: 2},
              }}
              variant="rounded"
            >
              <Typography variant="h6" sx={{}} color="primary">
                {score.toFixed(0)}
              </Typography>
            </Avatar>
          </ListItemAvatar>
        )
    }
  }

  return (
    <ListItem
      alignItems="flex-start"
      sx={{
        px: { xs: 2, md: 8 },
      }}
    >
      {ScoreAvatar(props.voter.score.normalizedScore)}
      <ListItemText
        sx={{ px: {xs: 0, md: 3} }}
        primary={
          <>
            <Grid container spacing={0} direction="row">
              <Grid
                item
                container
                xs={12}
                justifyContent={{xs: 'center', md: 'flex-start'}}
                alignItems={'center'}
              >
                <Grid item container xs={12} md={9} justifyContent={{xs: 'center', md: 'flex-start'}}>
                  <Link
                    href={`/#/voter/${props.voter.address}`}
                    underline="hover"
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        p: {xs: 0, md: 2},
                        backgroundImage: `linear-gradient(90deg, #E6007A, rgba(109,58,238,1))`,
                        backgroundSize: '100%',
                        backgroundRepeat: 'repeat',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        transition: '0.2s',
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
                      {props.voter.identity}
                    </Typography>
                  </Link>
                </Grid>

                <Grid item container xs={12} md={3} justifyContent={{xs: 'center', md: 'flex-end'}}>
                  {props.voter.labels.map((label) => (
                    <Chip
                      sx={{
                        background:
                          'linear-gradient(90deg, rgba(72,204,129,0.05), rgba(81,229,145,0.2))',
                        border: '1px solid rgba(81,229,145,1)',
                        m: 1,
                      }}
                      icon={<AutoGraphIcon color="success" />}
                      label={label}
                    />
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </>
        }
        secondary={
          <React.Fragment>
            <Divider />
            <Grid
              container
              spacing={0}
              direction="row"
              alignItems={'center'}
              sx={{ py: 2 }}
            >
              <Grid item xs={12} md={8} >
                <Grid
                  item
                  container
                  direction="row"
                  alignItems={'center'}
                  sx={{ pl: 0.0 }}
                  justifyContent={{xs: 'center', md: 'flex-start'}}
                >
                  <Identicon
                    theme={'polkadot'}
                    size={20}
                    value={props.voter.address}
                  />
                  <Box
                    sx={{
                      fontSize: '8px',
                      py: 0,
                      ml: 1,
                    }}
                    alignItems={'center'}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{
                        // pr: 10,
                        fontSize: '10px',
                        // py: 2,
                      }}
                      color="primary"
                    >
                      {mobile ? props.voter.address : props.voter.address?.slice(0,8)}
                    </Typography>
                  </Box>
                  <IconButton
                    href={`https://www.subscan.io/account/${props.voter.address}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <SvgIcon color="primary">
                      <Subscan />
                    </SvgIcon>
                  </IconButton>
                </Grid>
              </Grid>
              <Grid item container xs={12} md={4} justifyContent={{xs: 'center', md: 'flex-end'}}>
                <Chip
                  sx={{
                    background:
                      'linear-gradient(90deg, rgba(72,204,129,0.0), rgba(81,229,145,0.0))',
                    border: '1px solid rgba(230,0,122,0.25)',
                    mr: 0.5,
                  }}
                  icon={
                    <SvgIcon color="primary">
                      <Logo />
                    </SvgIcon>
                  }
                  label={`Balance: ${props.voter.balance.toLocaleString(
                    undefined,
                    { maximumFractionDigits: 2 }
                  )} KSM`}
                />
              </Grid>
            </Grid>

            <Grid
              container
              spacing={0}
              direction="row"
              sx={{
                mb: 2,
              }}
            >
              <Grid container item xs={12} md={2} justifyContent={{xs: 'center', md: 'flex-start'}}>
                <Chip
                  icon={<AutoAwesomeIcon color="success" />}
                  label={`${props.voter.voteCount} Votes`}
                />
              </Grid>
              <Grid item container xs={12} md={5} justifyContent={'center'}>
                <Chip
                  sx={{
                    background:
                      'linear-gradient(90deg, rgba(72,204,129,0.1), rgba(81,229,145,0.3))',
                    border: '1px solid rgba(81,229,145,1)',
                    mr: 0.5,
                  }}
                  icon={<ThumbUpAltTwoToneIcon color="success" />}
                  label={`${props.voter.ayeCount} Aye`}
                />
                <Chip
                  sx={{
                    mr: 0.5,
                  }}
                  icon={<ThumbDownAltTwoToneIcon color="primary" />}
                  label={`${props.voter.nayCount} Nay`}
                />
                {props.voter.abstainCount > 0 && (
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
                    label={`${props.voter.abstainCount} Abstain`}
                  />
                )}
              </Grid>

              <Grid item container xs={12} md={5} justifyContent={{xs: 'center', md: 'flex-end'}}>
                {props.voter.castedCount > 0 && (
                  <Chip
                    sx={{
                      background:
                        'linear-gradient(90deg, rgba(0,148,212,0.2), rgba(0,166,237,0.2))',
                      border: '1px solid rgba(0,178,255,1)',
                      mr: 0.5,
                    }}
                    icon={<FaceIcon color="info" />}
                    label={`${props.voter.castedCount} Casted`}
                  />
                )}
                {props.voter.delegatedCount > 0 && (
                  <Chip
                    sx={{
                      background:
                        'linear-gradient(90deg, rgba(0,148,212,0.2), rgba(0,166,237,0.2))',
                      border: '1px solid rgba(0,178,255,1)',
                      mr: 0,
                    }}
                    icon={<Groups3Icon color={'info'} />}
                    label={`${props.voter.delegatedCount} Delegated`}
                  />
                )}
              </Grid>
            </Grid>

            <Grid container spacing={0} direction="row">
              <Grid item xs={12} md={6}>
                {props.voter.delegationCount > 0 && (
                  <Chip
                    component="a"
                    clickable
                    href={`/#/delegates/${props.voter.address}`}
                    icon={<Groups3Icon color="primary" />}
                    label={`${props.voter.delegationCount} Delegators`}
                    sx={{
                      mr: 1,
                    }}
                  />
                )}
                {props.voter.delegationAmount > 0 && (
                  <Chip
                    component="a"
                    clickable
                    href={`/#/delegates/${props.voter.address}`}
                    icon={
                      <SvgIcon color="primary">
                        <Logo />
                      </SvgIcon>
                    }
                    label={`${props.voter.delegationAmount.toLocaleString(
                      undefined,
                      { maximumFractionDigits: 2 }
                    )} KSM Delegated`}
                  />
                )}
              </Grid>
              <Grid item container xs={12} md={6} justifyContent={{xs: 'center', md: 'flex-end'}}>
                <Chip
                  sx={{
                    background:
                      'linear-gradient(90deg, rgba(72,204,129,0.05), rgba(81,229,145,0.2))',
                    border: '1px solid rgba(81,229,145,1)',
                    mr: 0,
                      mt: {xs: 1, md: 0}
                  }}
                  icon={<AutoGraphIcon color="success" />}
                  label={`${(
                    ((props.voter?.score?.lastConsistencyMultiplier - 1) /
                      1.5) *
                    100
                  ).toFixed(0)}% Recent Voting Consistency`}
                />
              </Grid>
            </Grid>
          </React.Fragment>
        }
      />
      {/*</ListItemButton>*/}
    </ListItem>
  )
}

export default function VoterItemsList() {
  const [voters, setVoters] = useState([])
  const mobile = useMediaQuery('(min-width:600px)')

  const [q, setQ] = useState('')
  const [filterParam, setFilterParam] = useState('All')

  const glitch = useGlitch()

  function search(voters: any) {
    return voters.filter((voter: any) => {
      if (voter?.labels?.includes(filterParam)) {
        return (
          voter.identity.toLowerCase().includes(q.toLowerCase()) ||
          // voter.name.toLowerCase().includes(q.toLowerCase()) ||
          voter.address.toLowerCase().includes(q.toLowerCase())
        )
      } else if (filterParam == 'All') {
        return (
          voter.identity.toLowerCase().includes(q.toLowerCase()) ||
          // voter.name.toLowerCase().includes(q.toLowerCase()) ||
          voter.address.toLowerCase().includes(q.toLowerCase())
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
    const fetchReferenda = () => {
      fetch(`${process.env.REACT_APP_API}/opengov/voters`)
        .then((results) => {
          return results.json()
        })
        .then((resultsJSON) => {
          console.log(resultsJSON)

          const voters = resultsJSON.map((voter: any) => {
            return {
              address: voter.address,
              identity: voter.identity,
              voteCount: voter.voteCount,
              ayeCount: voter.ayeCount,
              nayCount: voter.nayCount,
              abstainCount: voter.abstainCount,
              castedCount: voter.castedCount,
              delegatedCount: voter.delegatedCount,
              delegationCount: voter.delegationCount,
              delegationAmount: voter.delegationAmount,
              normalizedScore: voter.normalizedScore,
              score: voter.score,
              balance: voter.votingBalance,
              labels: voter.labels,
            }
          })
          setVoters(voters)
        })
        .catch((e) => {
          console.log(e)
        })
    }
    fetchReferenda()
  }, [])

  return (
    <>
      {voters.length > 0 ? (
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
              // minWidth: 1000,
              // maxWidth: 1060,
              bgcolor: 'background.paper',
              mt: 0,
              pt: 0,
            }}
          >
            <ListSubheader
              sx={{
                // px: 0,
                mt: 0,
                // py: 0,
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
                  // maxWidth: 1060,
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
                      {search(voters).length}
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
                        py: 2,
                        backgroundImage: `linear-gradient(90deg, #E6007A, rgba(109,58,238,1))`,
                        backgroundSize: '100%',
                        backgroundRepeat: 'repeat',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      Voters
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={5}>
                    <StyledToggleButtonGroup
                      value={filterParam}
                      exclusive
                      onChange={handleChange}
                      aria-label="FilterParam"
                      size="small"
                      orientation={`${mobile ? `horizontal` : `vertical`}`}
                    >
                      <StyledToggleButton value="All">
                        <AllInclusiveIcon
                          color="success"
                          sx={{ pr: 1 }}
                          fontSize="medium"
                        />
                        All
                      </StyledToggleButton>
                      <StyledToggleButton value="Validator">
                        <SensorOccupiedIcon
                          color="success"
                          sx={{ pr: 1 }}
                          fontSize="small"
                        />
                        Validator
                      </StyledToggleButton>
                      <StyledToggleButton value="Nominator">
                        <RecordVoiceOverIcon
                          color="success"
                          sx={{ pr: 1 }}
                          fontSize="small"
                        />
                        Nominator
                      </StyledToggleButton>
                      <StyledToggleButton value="Society">
                        <Diversity3Icon
                          color="success"
                          sx={{ pr: 1 }}
                          fontSize="small"
                        />
                        Society
                      </StyledToggleButton>
                      <StyledToggleButton value="Fellowship">
                        <SelfImprovementIcon
                          color="success"
                          sx={{ pr: 1 }}
                          fontSize="small"
                        />
                        Fellowship
                      </StyledToggleButton>
                    </StyledToggleButtonGroup>
                  </Grid>
                </Grid>
              </Box>
            </ListSubheader>
            {search(voters).map((voter: any) => (
              <>
                <Suspense>
                  <VoterItem voter={voter} />
                </Suspense>

                <Divider />
              </>
            ))}
          </List>
        </Paper>
      ) : (
        <Loading />
      )}
    </>
  )
}
