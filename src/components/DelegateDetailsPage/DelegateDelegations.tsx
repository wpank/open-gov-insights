import * as React from 'react'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { Box, Chip, Link, ListSubheader, Paper, TextField } from '@mui/material'
import Grid from '@mui/material/Grid'
import { Identicon } from '@polkadot/react-identicon'
import ThumbUpAltTwoToneIcon from '@mui/icons-material/ThumbUpAltTwoTone'
import FaceIcon from '@mui/icons-material/Face'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import ThumbDownAltTwoToneIcon from '@mui/icons-material/ThumbDownAltTwoTone'
import SvgIcon from '@mui/material/SvgIcon'
import { ReactComponent as Logo } from '../../icons/logo.svg'
import { ReactComponent as PolkadotLogo } from '../../icons/polkadot-logo.svg'
import { Remark } from 'react-remark'
import IconButton from '@mui/material/IconButton'
import { ReactComponent as Subscan } from '../../icons/subscan.svg'
import AutoGraphIcon from '@mui/icons-material/AutoGraph'
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'
import Groups3Icon from '@mui/icons-material/Groups3'
import ScoreboardIcon from '@mui/icons-material/Scoreboard'
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied'
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver'
import Diversity3Icon from '@mui/icons-material/Diversity3'
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement'
import ApartmentIcon from '@mui/icons-material/Apartment'
import { Person } from '@mui/icons-material'
import { StyledToggleButton, StyledToggleButtonGroup } from '../Chart'
import AllInclusiveIcon from '@mui/icons-material/AllInclusive'
import List from '@mui/material/List'
import { Suspense, useState } from 'react'
import Loading from '../Loading'
import useMediaQuery from '@mui/material/useMediaQuery'
import { debounce } from 'lodash'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import LockClockIcon from '@mui/icons-material/LockClock'
import ListItem from '@mui/material/ListItem'
import HelpIcon from '@mui/icons-material/Help'
import Tooltip from '@mui/material/Tooltip'
import { useNetwork } from '../../NetworkContext'

interface TrackDelegationProps {
  delegate: string
  delegateCount: number
  delegators: [DelegatorProps]
  totalBalance: number
  track: number
  trackName: string
}

interface DelegatorProps {
  address: string
  balance: number
  conviction: string
  effectiveBalance: number
  identity: string
}

export const getScore = (score: any) => {
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
          icon={<ScoreboardIcon sx={{ pr: 1, color: 'rgba(211,255,51,1)' }} />}
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

export const getLabelChip = (label: string) => {
  switch (true) {
    case label == 'Validator':
      return (
        // <Tooltip title={`Voted ${voteDirection}`}>
        <Chip
          sx={{ mx: 1 }}
          icon={<SensorOccupiedIcon color="success" />}
          label={label}
        />
        // </Tooltip>
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

const getOrganizationChip = (isOrganization: boolean) => {
  switch (true) {
    case isOrganization == true:
      return (
        // <Tooltip title={`Voted ${voteDirection}`}>
        <Chip
          sx={{ mx: 1 }}
          icon={<ApartmentIcon color="info" />}
          label={'Organization'}
        />
        // </Tooltip>
      )
    case isOrganization === false || !isOrganization:
      return (
        // <Tooltip title={`Voted ${voteDirection}`}>
        <Chip
          sx={{ mx: 1 }}
          icon={<Person color="info" />}
          label={'Individual'}
        />
        // </Tooltip>
      )
  }
}

const getDelegateDetailsAvatar = (delegate: any) => {
  switch (true) {
    case !!delegate.image:
      return (
        // <Tooltip title={`Voted ${voteDirection}`}>
        <Avatar
          src={delegate.image}
          sx={{
            background:
              'linear-gradient(180deg, rgba(72,204,129,0.2),rgba(81,229,145,0.2))',
            width: 64,
            height: 64,
            border: '0.1px solid  rgba(86,243,154,1)',
            boxShadow: '0 3px 5px 2px rgba(86,243,154,0.25)',
            mr: 2,
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
            width: 64,
            height: 64,
            border: '0.1px solid  rgba(230,0,122,0.6)',
            boxShadow: '0 3px 5px 2px rgba(230,0,122,0.3)',
            mr: 2,
          }}
        >
          <Identicon theme={'polkadot'} size={60} value={delegate.address} />
        </Avatar>
        // </Tooltip>
      )
  }
}

export default function DelegateDelegations(props: {
  delegation: TrackDelegationProps
}) {
  const mobile = useMediaQuery('(min-width:600px)')
  const { network, setNetwork } = useNetwork()
  const [q, setQ] = useState('')
  const [filterParam, setFilterParam] = useState('All')

  function search(delegations: any) {
    return delegations?.filter((delegate: any) => {
      // if (delegate?.labels?.includes(filterParam)) {
      //     return (
      //         delegate.identity.toLowerCase().includes(q.toLowerCase()) ||
      //         delegate.name.toLowerCase().includes(q.toLowerCase()) ||
      //         delegate.address.toLowerCase().includes(q.toLowerCase())
      //     )
      // } else if (filterParam == 'All') {
      //     return (
      //         delegate.identity.toLowerCase().includes(q.toLowerCase()) ||
      //         delegate.name.toLowerCase().includes(q.toLowerCase()) ||
      //         delegate.address.toLowerCase().includes(q.toLowerCase())
      //     )
      // }
      return true
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
        maxHeight: { xs: '80vh', md: '40vh' },
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
          bgcolor: 'background.paper',
        }}
      >
        <Grid container direction="column" justifyContent={'space-between'}>
          {/*    <Grid*/}
          {/*        container*/}
          {/*        spacing={0}*/}
          {/*        direction="row"*/}
          {/*        alignItems={'center'}*/}
          {/*        justifyContent={'center'}*/}
          {/*        sx={{ pb: 2, pt: 2 }}*/}
          {/*    >*/}
          {/*        <Grid*/}
          {/*            item*/}
          {/*            container*/}
          {/*            xs={12}*/}
          {/*            md={5}*/}
          {/*            justifyContent={'center'}*/}
          {/*            alignContent={'center'}*/}
          {/*            alignItems={'center'}*/}
          {/*        >*/}
          {/*            <Typography*/}
          {/*                variant="h6"*/}
          {/*                sx={{*/}
          {/*                    px: 2,*/}
          {/*                    backgroundImage: `linear-gradient(90deg, #E6007A, rgba(109,58,238,1))`,*/}
          {/*                    backgroundSize: '100%',*/}
          {/*                    backgroundRepeat: 'repeat',*/}
          {/*                    backgroundClip: 'text',*/}
          {/*                    WebkitBackgroundClip: 'text',*/}
          {/*                    WebkitTextFillColor: 'transparent',*/}
          {/*                }}*/}
          {/*            >*/}
          {/*                /!*{search(delegateList).length}*!/*/}
          {/*            </Typography>*/}
          {/*            <TextField*/}
          {/*                type="string"*/}
          {/*                id="outlined-controlled"*/}
          {/*                label="Search"*/}
          {/*                InputProps={{*/}
          {/*                    type: 'string',*/}
          {/*                    style: { width: '200px' },*/}
          {/*                }}*/}
          {/*                // onChange={handleInputChange}*/}
          {/*            />*/}
          {/*        </Grid>*/}
          {/*        <Grid item xs={12} md={2}>*/}
          {/*            <Typography*/}
          {/*                variant="h5"*/}
          {/*                sx={{*/}
          {/*                    py: 2,*/}
          {/*                    backgroundImage: `linear-gradient(90deg, #E6007A, rgba(109,58,238,1))`,*/}
          {/*                    backgroundSize: '100%',*/}
          {/*                    backgroundRepeat: 'repeat',*/}
          {/*                    backgroundClip: 'text',*/}
          {/*                    WebkitBackgroundClip: 'text',*/}
          {/*                    WebkitTextFillColor: 'transparent',*/}
          {/*                }}*/}
          {/*            >*/}
          {/*                Track {props.delegation.track}: {props.delegation.trackName} Delegations {props.delegation?.delegators?.length}*/}
          {/*            </Typography>*/}
          {/*        </Grid>*/}
          {/*        <Grid item xs={12} md={5}>*/}
          {/*            <StyledToggleButtonGroup*/}
          {/*                // value={filterParam}*/}
          {/*                exclusive*/}
          {/*                // onChange={handleChange}*/}
          {/*                aria-label="FilterParam"*/}
          {/*                size="small"*/}
          {/*                // orientation={`${mobile ? `horizontal` : `vertical`}`}*/}
          {/*            >*/}
          {/*                <StyledToggleButton value="All">*/}
          {/*                    <AllInclusiveIcon*/}
          {/*                        color="success"*/}
          {/*                        sx={{ pr: 1 }}*/}
          {/*                        fontSize="medium"*/}
          {/*                    />*/}
          {/*                    All*/}
          {/*                </StyledToggleButton>*/}
          {/*                <StyledToggleButton value="Validator">*/}
          {/*                    <SensorOccupiedIcon*/}
          {/*                        color="success"*/}
          {/*                        sx={{ pr: 1 }}*/}
          {/*                        fontSize="small"*/}
          {/*                    />*/}
          {/*                    Validator*/}
          {/*                </StyledToggleButton>*/}
          {/*                <StyledToggleButton value="Nominator">*/}
          {/*                    <RecordVoiceOverIcon*/}
          {/*                        color="success"*/}
          {/*                        sx={{ pr: 1 }}*/}
          {/*                        fontSize="small"*/}
          {/*                    />*/}
          {/*                    Nominator*/}
          {/*                </StyledToggleButton>*/}
          {/*                <StyledToggleButton value="Society">*/}
          {/*                    <Diversity3Icon*/}
          {/*                        color="success"*/}
          {/*                        sx={{ pr: 1 }}*/}
          {/*                        fontSize="small"*/}
          {/*                    />*/}
          {/*                    Society*/}
          {/*                </StyledToggleButton>*/}
          {/*                <StyledToggleButton value="Fellowship">*/}
          {/*                    <SelfImprovementIcon*/}
          {/*                        color="success"*/}
          {/*                        sx={{ pr: 1 }}*/}
          {/*                        fontSize="small"*/}
          {/*                    />*/}
          {/*                    Fellowship*/}
          {/*                </StyledToggleButton>*/}
          {/*            </StyledToggleButtonGroup>*/}
          {/*        </Grid>*/}
          {/*    </Grid>*/}

          <Divider />

          <List
            sx={{
              width: '100%',
              // minWidth: 960,
              // maxWidth: 960,
              bgcolor: 'background.paper',
              pt: 0,
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
                    md={4}
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
                      {props.delegation.delegators?.length}
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
                      title={`The total amount of ${network.symbol}, including conviction`}
                    >
                      <Box display="flex" alignItems={'center'}>
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
                          {props.delegation.delegators
                            .reduce((a, b) => {
                              return a + b.effectiveBalance
                            }, 0)
                            .toLocaleString(undefined, {
                              maximumFractionDigits: 2,
                            })}{' '}
                          {network.symbol}
                        </Typography>
                        <HelpIcon sx={{ color: 'rgba(109,58,238,1)' }} />
                      </Box>
                    </Tooltip>
                  </Grid>
                  <Grid
                    item
                    container
                    xs={12}
                    md={4}
                    justifyContent={'center'}
                    alignItems={'center'}
                  >
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
                      Track {props.delegation.track}
                    </Typography>
                    <Typography
                      variant="h5"
                      color={'primary'}
                      sx={{
                        ml: 4,
                        border: '1px solid rgba(109,58,238, 0.2)',
                        borderRadius: '8px',
                        boxShadow: '0 3px 5px 2px rgba(109,58,238, 0.2)',
                        p: 1,
                      }}
                    >
                      {props.delegation.trackName}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    {/*  <StyledToggleButtonGroup*/}
                    {/*    value={filterParam}*/}
                    {/*    exclusive*/}
                    {/*    onChange={handleChange}*/}
                    {/*    aria-label="FilterParam"*/}
                    {/*    size="small"*/}
                    {/*    // orientation={`${mobile ? `horizontal` : `vertical`}`}*/}
                    {/*      sx={{display: {xs: 'none', md: 'flex'}}}*/}
                    {/*  >*/}
                    {/*    <StyledToggleButton value="All">*/}
                    {/*      <AllInclusiveIcon*/}
                    {/*        color="info"*/}
                    {/*        sx={{ pr: 0.5 }}*/}
                    {/*        fontSize="medium"*/}
                    {/*      />*/}
                    {/*      All*/}
                    {/*    </StyledToggleButton>*/}
                    {/*    <StyledToggleButton value="Aye">*/}
                    {/*      <LockClockIcon color="info" sx={{ pr: 1 }} />*/}
                    {/*      None*/}
                    {/*    </StyledToggleButton>*/}
                    {/*    <StyledToggleButton value="Nay">*/}
                    {/*      <LockClockIcon color="info" sx={{ pr: 1 }} />*/}
                    {/*      1x*/}
                    {/*    </StyledToggleButton>*/}
                    {/*    <StyledToggleButton value="Abstain">*/}
                    {/*      <LockClockIcon color="info" sx={{ pr: 1 }} />*/}
                    {/*      2x*/}
                    {/*    </StyledToggleButton>*/}
                    {/*    <StyledToggleButton value="Abstain">*/}
                    {/*      <LockClockIcon color="info" sx={{ pr: 1 }} />*/}
                    {/*      3x*/}
                    {/*    </StyledToggleButton>*/}
                    {/*    <StyledToggleButton value="Abstain">*/}
                    {/*      <LockClockIcon color="info" sx={{ pr: 1 }} />*/}
                    {/*      4x*/}
                    {/*    </StyledToggleButton>*/}
                    {/*    <StyledToggleButton value="Abstain">*/}
                    {/*      <LockClockIcon color="info" sx={{ pr: 1 }} />*/}
                    {/*      5x*/}
                    {/*    </StyledToggleButton>*/}
                    {/*    <StyledToggleButton value="Abstain">*/}
                    {/*      <LockClockIcon color="info" sx={{ pr: 1 }} />*/}
                    {/*      6x*/}
                    {/*    </StyledToggleButton>*/}
                    {/*  </StyledToggleButtonGroup>*/}
                  </Grid>
                </Grid>
              </Box>
              <Divider />
            </ListSubheader>

            {props.delegation?.delegators?.map((delegation: any) => (
              <>
                <ListItem
                  alignItems="flex-start"
                  sx={{ px: { xs: 0, md: 8 }, py: 2 }}
                >
                  <ListItemAvatar>
                    <Identicon
                      theme={'polkadot'}
                      size={48}
                      value={delegation.address}
                    />
                  </ListItemAvatar>
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
                          <Grid
                            item
                            container
                            xs={12}
                            alignItems={'center'}
                            justifyContent={'flex-start'}
                          >
                            <Link
                              href={`/#/voter/${delegation.address}`}
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
                                {mobile
                                  ? delegation.identity
                                  : delegation.identity.slice(0, 10)}
                              </Typography>
                            </Link>
                            <IconButton
                              href={`https://www.subscan.io/account/${delegation.address}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <SvgIcon color="primary">
                                <Subscan />
                              </SvgIcon>
                            </IconButton>
                          </Grid>
                        </Grid>
                      </>
                    }
                    secondary={
                      <React.Fragment>
                        {/*<Grid container spacing={0} direction="row" sx={{ pb: 1 }}>*/}
                        {/*    <Grid item xs={2}>*/}
                        {/*        <Chip*/}
                        {/*            icon={*/}
                        {/*                <SvgIcon color="primary">*/}
                        {/*                    <Logo />*/}
                        {/*                </SvgIcon>*/}
                        {/*            }*/}
                        {/*            label={`Voting Balance: ${delegation.balance} KSM`}*/}
                        {/*        />*/}
                        {/*    </Grid>*/}
                        {/*    <Grid item xs={3}>*/}
                        {/*        <Chip*/}
                        {/*            icon={*/}
                        {/*                <SvgIcon color="primary">*/}
                        {/*                    <Logo />*/}
                        {/*                </SvgIcon>*/}
                        {/*            }*/}
                        {/*            label={`Effective Balance: ${delegation.effectiveBalance} KSM`}*/}
                        {/*        />*/}
                        {/*    </Grid>*/}
                        {/*    <Grid item xs={2}>*/}
                        {/*        <Chip*/}
                        {/*            sx={{*/}
                        {/*                background:*/}
                        {/*                    'linear-gradient(90deg, rgba(0,148,212,0.2), rgba(0,166,237,0.2))',*/}
                        {/*                border: '1px solid rgba(0,178,255,1)',*/}
                        {/*                boxShadow: '0 3px 5px 2px rgba(86,243,154,0.25)',*/}
                        {/*            }}*/}
                        {/*            icon={<LockClockIcon color="info" />}*/}
                        {/*            label={delegation.conviction}*/}
                        {/*        />*/}
                        {/*    </Grid>*/}
                        {/*</Grid>*/}
                        {/*<Grid container spacing={0} direction="row">*/}
                        {/*    <Grid item xs={8}>*/}
                        {/*        /!*{props.vote.delegatedBalance > 0 && (*!/*/}
                        {/*        /!*    <Chip*!/*/}
                        {/*        /!*        icon={*!/*/}
                        {/*        /!*            <SvgIcon color="primary">*!/*/}
                        {/*        /!*                <Logo />*!/*/}
                        {/*        /!*            </SvgIcon>*!/*/}
                        {/*        /!*        }*!/*/}
                        {/*        /!*        label={*!/*/}
                        {/*        /!*            <>*!/*/}
                        {/*        /!*                {props.vote.delegatedBalance.toLocaleString(undefined, {*!/*/}
                        {/*        /!*                    maximumFractionDigits: 2,*!/*/}
                        {/*        /!*                })}{' '}*!/*/}
                        {/*        /!*                KSM Delegated*!/*/}
                        {/*        /!*            </>*!/*/}
                        {/*        /!*        }*!/*/}
                        {/*        /!*    />*!/*/}
                        {/*        /!*)}*!/*/}
                        {/*    </Grid>*/}
                        {/*</Grid>*/}
                        <Grid
                          container
                          spacing={1}
                          direction="row"
                          justifyContent={{ xs: 'center', md: 'flex-start' }}
                          justifyItems={'center'}
                          alignItems={'center'}
                        >
                          <Grid item xs={12} md={3}>
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
                              label={`Voting Balance: ${delegation.balance.toLocaleString(
                                undefined,
                                {
                                  maximumFractionDigits: 2,
                                }
                              )} ${network.symbol}`}
                            />
                          </Grid>
                          <Grid item xs={12} md={3}>
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
                              label={`Effective Balance: ${delegation.effectiveBalance.toLocaleString(
                                undefined,
                                {
                                  maximumFractionDigits: 2,
                                }
                              )} ${network.symbol}`}
                            />
                          </Grid>
                          <Grid item container xs={12} md={2}>
                            <Chip
                              sx={{
                                background:
                                  'linear-gradient(90deg, rgba(0,148,212,0.2), rgba(0,166,237,0.2))',
                                border: '1px solid rgba(0,178,255,1)',
                                boxShadow:
                                  '0 3px 5px 2px rgba(86,243,154,0.25)',
                              }}
                              icon={<LockClockIcon color="info" />}
                              label={delegation.conviction}
                            />
                          </Grid>
                        </Grid>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider />
              </>
            ))}
          </List>
        </Grid>
      </Box>
    </Paper>
  )
}
