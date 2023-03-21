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
  ListItemButton,
  ListSubheader,
  makeStyles,
  Paper,
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
import g from './vote.gif'
import Tooltip from '@mui/material/Tooltip'
import { Suspense, useEffect, useState } from 'react'
import SvgIcon from '@mui/material/SvgIcon'
import { ColorRing } from 'react-loader-spinner'
import { useGlitch } from 'react-powerglitch'
import { ReactComponent as LoadingLogo } from '../icons/logo.svg'
import SchemaIcon from '@mui/icons-material/Schema'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'
import Loading from './Loading'
import PendingIcon from '@mui/icons-material/Pending'
import CancelIcon from '@mui/icons-material/Cancel'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import HowToVoteIcon from '@mui/icons-material/HowToVote'
import FlakyIcon from '@mui/icons-material/Flaky'
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact'
import PeopleIcon from '@mui/icons-material/People'
import { StyledToggleButton, StyledToggleButtonGroup } from './Chart'
import { debounce } from 'lodash'
import useMediaQuery from "@mui/material/useMediaQuery";

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
  status: string
  voters: number
}

function ReferendumItem(props: { referendum: ReferendumProps }) {
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

  return (
    <ListItem alignItems="flex-start" sx={{ px: {xs: 0, md: 8} }}>
      <ListItemButton
        component="a"
        href={`/#/referenda/${props.referendum.index}`}
        sx={{
          px: 0,
        }}
      >
        <ListItemAvatar>
          <Avatar
            sx={{
              background:
                'linear-gradient(180deg, rgba(109,58,238,0.3),rgba(68,34,153,0.1))',
              width: 54,
              height: 54,
              border: '0.1px solid  rgba(230,0,122,0.6)',
              boxShadow: '0 3px 5px 2px rgba(230,0,122,0.25)',
              mr: {xs: 0,md: 3},
                display: {xs: 'none', md: 'block'}
            }}
            variant="rounded"
            // src={g}
          >
            <Typography variant="h5" sx={{}} color="primary">
              {props.referendum.index}
            </Typography>
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <>
              <Grid
                container
                spacing={0}
                direction="row"
                alignItems={'center'}
                alignContent={'center'}
              >
                <Grid item container xs={12} md={10} justifyContent={'flex-start'}>
                  <Typography
                    variant="h5"
                    sx={{
                      backgroundImage: `linear-gradient(90deg, #E6007A, rgba(109,58,238,1))`,
                      backgroundSize: '100%',
                      backgroundRepeat: 'repeat',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      // paddingRight: '2px',
                    }}
                  >
                    {props.referendum.title
                      ? props.referendum.title
                      : 'No Title'}
                  </Typography>
                </Grid>
                <Grid item container xs={12} md={2} justifyContent={{xs: 'flex-start', md: 'flex-end'}}>
                  {getStatus(props.referendum.status)}
                </Grid>
              </Grid>
            </>
          }
          secondary={
            <React.Fragment>
              <Grid container spacing={0} direction="row">
                <Grid
                  container
                  direction="row"
                  alignItems={'center'}
                  sx={{ px: 1, pb: 2 }}
                >
                  <Identicon
                    theme={'polkadot'}
                    size={20}
                    value={props.referendum.submissionWho}
                  />
                  <Box
                    sx={{
                      fontSize: '10px',
                      py: 0,
                      mx: 1,
                    }}
                    alignItems={'center'}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={
                        {
                          // px: 10,
                          // py: 2,
                        }
                      }
                      color="primary"
                    >
                      {mobile ? props.referendum.submissionIdentity : props.referendum.submissionIdentity}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              <Grid container spacing={0} direction="row">
                <Grid item xs={12} md={6}>
                  <Chip
                    sx={{
                      background:
                        'linear-gradient(90deg, rgba(72,204,129,0.2), rgba(81,229,145,0.4))',
                      border: '1px solid rgba(81,229,145,1)',
                      mr: 1,
                    }}
                    icon={<ThumbUpAltTwoToneIcon color="success" />}
                    label={`${props.referendum.ayes
                      .toLocaleString(undefined, { maximumFractionDigits: 2 })
                      .toLocaleString()} KSM`}
                  />
                  <Chip
                    sx={{
                      mr: 1,
                    }}
                    icon={<ThumbDownAltTwoToneIcon color="primary" />}
                    label={`${props.referendum.nays
                      .toLocaleString(undefined, { maximumFractionDigits: 2 })
                      .toLocaleString()} KSM`}
                  />
                  <Chip
                    sx={{
                      background:
                        'linear-gradient(90deg, rgba(169,204,41,0.1), rgba(190,229,46,0.1))',
                      border: '1px solid rgba(211,255,51,1)',
                    }}
                    icon={
                      <PeopleAltIcon
                        sx={{
                          color: 'rgba(211,255,51,1)',
                        }}
                        htmlColor="rgba(211,255,51,1)"
                      />
                    }
                    label={`${props.referendum.voters} Voters`}
                  />
                </Grid>

                <Grid item container xs={12} md={6} justifyContent={{xs: 'flex-start', md: 'flex-end'}}>
                  <Chip
                    icon={<SchemaIcon color="primary" />}
                    label={`${props.referendum.track}: ${props.referendum.origin}`}
                  />
                </Grid>
              </Grid>
            </React.Fragment>
          }
        />
      </ListItemButton>
    </ListItem>
  )
}

export default function ReferendumItemsList() {
  const [referenda, setReferenda] = useState([])
  const [filterParam, setFilterParam] = useState('All')
  const [q, setQ] = useState('')
  const glitch = useGlitch()

  function search(referenda: any) {
    return referenda.filter((r: any) => {
      if (filterParam == 'All') {
        return (
          r.index.toString().includes(q) ||
          r?.title?.toLowerCase().includes(q.toLowerCase()) ||
          r?.submissionIdentity.toLowerCase().includes(q.toLowerCase())
        )
      }
      if (filterParam == 'Finished') {
        return (
          (r?.status != 'Ongoing' && r.index.toString().includes(q)) ||
          r?.title?.toLowerCase().includes(q.toLowerCase()) ||
          r?.submissionIdentity.toLowerCase().includes(q.toLowerCase())
        )
      }
      if (r?.status === filterParam) {
        return (
          r.index.toString().includes(q) ||
          r?.title?.toLowerCase().includes(q.toLowerCase()) ||
          r?.submissionIdentity.toLowerCase().includes(q.toLowerCase())
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
      fetch(`${process.env.REACT_APP_API}/opengov/referenda`)
        .then((results) => {
          return results.json()
        })
        .then((resultsJSON) => {
          console.log(resultsJSON)

          const referenda = resultsJSON.map((ref: any) => {
            return {
              index: ref.index,
              title: ref.title,
              content: ref.content,
              track: ref.track,
              origin: ref.origin,
              submitted: ref.submitted,
              confirmationBlock: ref.confirmationBlock,
              submissionWho: ref.submissionWho,
              submissionIdentity: ref.submissionIdentity,
              ayes: ref.ayes,
              nays: ref.nays,
              support: ref.support,
              status: ref.currentStatus,
              voters: ref.voters,
            }
          })
          console.log(referenda)
          setReferenda(referenda)
        })
        .catch((e) => {
          console.log(e)
        })
    }
    fetchReferenda()
  }, [])

  return (
    <>
      {referenda.length > 0 ? (
        <Paper
          sx={{
            height: { xs: '90vh', md: '85vh' },
            width: {
              xs: '95vw',
              sm: '95vw',
              md: '95vw',
              lg: '75vw',
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
              // minWidth: 300,
              // maxWidth: 960,
              bgcolor: 'background.paper',
              pt: 0,
            }}
          >
            <ListSubheader
              sx={{
                px: 0,
                py: 1,
                width: '100%',
                height: '100%',
                bgcolor:
                  'linear-gradient(90deg, #E6007A, rgba(109,58,238,0.2))',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid rgba(230,0,122, 0.5)',
              }}
            >
              <Grid
                container
                direction="row"
                justifyContent={'center'}
                justifyItems={'center'}
                alignItems={'center'}
                sx={{ px: 8 }}
              >
                <Grid container item xs={12} md={5} alignItems={'center'}>
                  <Typography
                    variant="h6"
                    sx={{
                      px: {xs: 0.25, md: 2},
                      backgroundImage: `linear-gradient(90deg, #E6007A, rgba(109,58,238,1))`,
                      backgroundSize: '100%',
                      backgroundRepeat: 'repeat',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {search(referenda).length}
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
                <Grid container item xs={12} md={2} justifyContent={'center'}>
                  <Typography
                    variant={"h4"}
                    sx={{
                      // px: 10,
                      py: {xs: 2, md: 0},
                      backgroundImage: `linear-gradient(90deg, #E6007A, rgba(109,58,238,1))`,
                      backgroundSize: '100%',
                      backgroundRepeat: 'repeat',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      // bgcolor: 'background.paper',
                    }}
                  >
                    Referenda
                  </Typography>
                </Grid>
                <Grid item xs={12} md={5} sx={{pb: {xs: 2, md: 0}}} container justifyContent={{xs: 'center', md: 'flex-end'}}>
                  <StyledToggleButtonGroup
                    value={filterParam}
                    exclusive
                    onChange={handleChange}
                    aria-label="FilterParam"
                    size="small"
                  >
                    <StyledToggleButton value="All">
                      <HowToVoteIcon
                        color="primary"
                        sx={{ pr: 1 }}
                        fontSize="small"
                      />
                      All
                    </StyledToggleButton>
                    <StyledToggleButton value="Ongoing">
                      <PendingIcon
                        color="info"
                        sx={{ pr: 1 }}
                        fontSize="small"
                      />
                      Ongoing
                    </StyledToggleButton>
                    <StyledToggleButton value="Finished">
                      <CheckCircleIcon
                        color="success"
                        sx={{ pr: 1 }}
                        fontSize="small"
                      />
                      Finished
                    </StyledToggleButton>
                  </StyledToggleButtonGroup>
                </Grid>
              </Grid>
            </ListSubheader>
            {search(referenda).map((referendum: any) => (
              <>
                <Suspense fallback={<Loading />}>
                  <ReferendumItem referendum={referendum} />
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
