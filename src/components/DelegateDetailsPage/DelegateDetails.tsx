import * as React from 'react'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { Box, Chip, Paper } from '@mui/material'
import Grid from '@mui/material/Grid'
import { Identicon } from '@polkadot/react-identicon'
import ThumbUpAltTwoToneIcon from '@mui/icons-material/ThumbUpAltTwoTone'
import FaceIcon from '@mui/icons-material/Face'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import ThumbDownAltTwoToneIcon from '@mui/icons-material/ThumbDownAltTwoTone'
import SvgIcon from '@mui/material/SvgIcon'
import { ReactComponent as Logo } from '../../icons/logo.svg'
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
import Tooltip from '@mui/material/Tooltip'
import useMediaQuery from "@mui/material/useMediaQuery";

interface DelegateDetailsProps {
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

export const getScore = (score: any) => {
  const tooltipText =
    'The delegate score is a comparative score between delegates. It is a factor of how much consistency the voter has, compared to other delegates.'
  switch (true) {
    case score > 75:
      return (
        <Tooltip
          sx={{ m: 8 }}
          title={
            <>
              <Typography color="inherit">Line one</Typography>
              <br />
              <Typography color="inherit">Line two</Typography>
            </>
          }
        >
          <Chip
            sx={{
              background:
                'linear-gradient(180deg, rgba(72,204,129,0.2),rgba(81,229,145,0.2))',
              border: '1px solid rgba(81,229,145,1)',
              boxShadow: '0 3px 5px 2px rgba(86,243,154,0.25)',
              mr: 1,
            }}
            icon={<ScoreboardIcon color="success" />}
            label={`Delegate Score: ${score.toFixed(0)} / 100`}
          />
        </Tooltip>
      )
    case score > 50:
      return (
        <Tooltip title={tooltipText}>
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
            label={`Delegate Score: ${score.toFixed(0)} / 100`}
          />
        </Tooltip>
      )
    case score <= 75:
      return (
        <Tooltip title={tooltipText}>
          <Chip
            sx={{
              background:
                'linear-gradient(180deg, rgba(230,0,122,0.06),rgba(230,0,122,0.2))',
              border: '0.1px solid  rgba(230,0,122,0.6)',
              boxShadow: '0 3px 5px 2px rgba(230,0,122,0.25)',
              mr: 1,
            }}
            icon={<ScoreboardIcon color={'primary'} />}
            label={`Delegate Score: ${score.toFixed(0)} / 100`}
          />
        </Tooltip>
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

export default function DelegateDetails(props: { delegateDetails: any }) {
    const mobile = useMediaQuery('(min-width:600px)')
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
          <Grid
            item
            container
            direction={'row'}
            alignItems={'center'}
            sx={{ px:{xs: 0, md:  18}, pt: 4 }}
          >
            <Grid
              item
              container
              alignItems={'center'}
              justifyContent={'flex-start'}
              xs={12} md={8}
            >
              {getDelegateDetailsAvatar(props.delegateDetails)}
              <Typography
                variant="h5"
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
                {props.delegateDetails?.identity
                  ? props.delegateDetails?.identity
                  : props.delegateDetails?.address}
              </Typography>
            </Grid>
            <Grid item container xs={12} md={4} justifyContent={{xs: 'center', md: 'flex-end'}}>
              {props.delegateDetails?.labels?.map((label: string) =>
                getLabelChip(label)
              )}
              {getOrganizationChip(props.delegateDetails.isOrganization)}
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction={'row'}
            alignItems={'center'}
            alignContent={'center'}
            sx={{ px: {xs: 0, md: 18}, py: 2 }}
          >
            <Grid
              container
              alignItems={'center'}
              alignContent={'center'}
              justifyContent={{xs: 'center', md: 'flex-start'}}
              xs={12} md={6}
            >
              <Typography variant="subtitle1" color={'primary'}>
                {props.delegateDetails?.shortDescription
                  ? props.delegateDetails?.shortDescription
                  : ''}
              </Typography>
            </Grid>
            <Grid container item xs={12} md={3} justifyContent={{xs: 'center', md: 'flex-end'}}>
              {getScore(props.delegateDetails?.score?.normalizedScore)}
            </Grid>
                <Grid container item xs={12} md={3} justifyContent={{xs: 'center', md: 'flex-end'}}>
              <Chip
                sx={{
                  background:
                    'linear-gradient(90deg, rgba(72,204,129,0.05), rgba(81,229,145,0.2))',
                  border: '1px solid rgba(81,229,145,1)',
                  mr: 0,
                }}
                icon={<AutoGraphIcon color="success" />}
                label={`${(
                  ((props.delegateDetails?.score?.lastConsistencyMultiplier -
                    1) /
                    1.5) *
                  100
                ).toFixed(0)}% Recent Voting Consistency`}
              />
            </Grid>
          </Grid>

          <Grid
            sx={{ px: {xs: 0, md: 18} }}
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
                xs={12} md={8}
                alignItems={'center'}
                alignContent={'center'}
                justifyContent={{xs: 'center', md: 'flex-start'}}
              >
                <Identicon
                  theme={'polkadot'}
                  size={28}
                  value={props.delegateDetails?.address}
                />
                <Typography
                  variant="subtitle1"
                  sx={{
                    pl: 1,
                    fontSize: '14px',
                  }}
                  color="primary"
                >
                    {mobile ? props.delegateDetails?.address : props.delegateDetails?.address?.slice(0,8)}
                </Typography>
                <IconButton
                  href={`https://www.subscan.io/account/${props.delegateDetails?.address}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <SvgIcon color="primary">
                    <Subscan />
                  </SvgIcon>
                </IconButton>
              </Grid>
              <Grid item container xs={12}  md={4} justifyContent={{xs: 'center', md: 'flex-end'}}>
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
                  label={`Voting Balance: ${props.delegateDetails?.votingBalance?.toLocaleString(
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
              my: 2,
              px: {xs: 0, md: 18},
            }}
          >
            <Grid
              item
              container
              xs={12} md={3}
              justifyContent={{xs: "center", md: "flex-start"}}
              alignItems="center"
            >
              <Chip
                component="a"
                clickable
                href={`/#/voter/${props.delegateDetails.address}`}
                icon={<AutoAwesomeIcon color="success" />}
                label={`${props.delegateDetails?.voteCount} Votes`}
              />
            </Grid>
            <Grid item xs={12} md={5} justifyContent={{xs: 'center', md: 'flex-start'}}>
              <Chip
                component="a"
                clickable
                href={`/#/voter/${props.delegateDetails.address}`}
                sx={{
                  background:
                    'linear-gradient(90deg, rgba(72,204,129,0.1), rgba(81,229,145,0.3))',
                  border: '1px solid rgba(81,229,145,1)',
                  mr: 1,
                }}
                icon={<ThumbUpAltTwoToneIcon color="success" />}
                label={`${props.delegateDetails?.ayeCount} Aye Votes`}
              />
              <Chip
                component="a"
                clickable
                href={`/#/voter/${props.delegateDetails.address}`}
                sx={{
                  mr: 1,
                }}
                icon={<ThumbDownAltTwoToneIcon color="primary" />}
                label={`${props.delegateDetails?.nayCount} Nay Votes`}
              />
              {props.delegateDetails?.abstainCount > 0 && (
                <Chip
                  component="a"
                  clickable
                  href={`/#/voter/${props.delegateDetails.address}`}
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
                  label={`${props.delegateDetails?.abstainCount} Abstain Votes`}
                />
              )}
            </Grid>

            <Grid item xs={12} md={3}container justifyContent={{xs: 'center', md: 'flex-end'}}>
              {props.delegateDetails?.castedCount > 0 && (
                <Chip
                  component="a"
                  clickable
                  href={`/#/voter/${props.delegateDetails.address}`}
                  sx={{
                    background:
                      'linear-gradient(90deg, rgba(0,148,212,0.2), rgba(0,166,237,0.2))',
                    border: '1px solid rgba(0,178,255,1)',
                    mr: 0.5,
                  }}
                  icon={<FaceIcon color="info" />}
                  label={`${props.delegateDetails?.castedCount} Casted Votes`}
                />
              )}
              {props.delegateDetails?.delegatedCount > 0 && (
                <Chip
                  component="a"
                  clickable
                  href={`/#/voter/${props.delegateDetails.address}`}
                  sx={{
                    background:
                      'linear-gradient(90deg, rgba(0,148,212,0.2), rgba(0,166,237,0.2))',
                    border: '1px solid rgba(0,178,255,1)',
                    mr: 0,
                  }}
                  icon={<Groups3Icon color={'info'} />}
                  label={`${props.delegateDetails?.delegatedCount} Delegated Votes`}
                />
              )}
            </Grid>
          </Grid>

          {props.delegateDetails?.longDescription ? (
            <Grid item>
              <Divider />
              <Grid
                  width={'100wh'}
                container
                direction="row"
                alignItems={'center'}
                justifyContent={'center'}
                sx={{ px: {xs: 0, md: 18}, py: 2, mb: 2 }}
              >
                <Typography variant="subtitle1" color={'primary'}>
                  <Remark>
                    {props.delegateDetails?.longDescription
                      ? props.delegateDetails?.longDescription
                      : ''}
                  </Remark>
                </Typography>
              </Grid>
            </Grid>
          ) : (
            <></>
          )}
        </Grid>
      </Box>
    </Paper>
  )
}
