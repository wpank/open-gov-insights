import * as React from 'react'
import { Suspense, useState } from 'react'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { Box, ListSubheader, Paper, TextField } from '@mui/material'
import Grid from '@mui/material/Grid'
import { useParams } from 'react-router-dom'
import { useGlitch } from 'react-powerglitch'
import Loading from '../components/Loading'
import { useDelegateList } from '../hooks/useDelegateList'
import DelegateListItem from '../components/DelegateListPage/DelegateListItem'
import {
  StyledToggleButton,
  StyledToggleButtonGroup,
} from '../components/Chart'

import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied'
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver'
import Diversity3Icon from '@mui/icons-material/Diversity3'
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement'
import AllInclusiveIcon from '@mui/icons-material/AllInclusive'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { debounce } from 'lodash'
import { useNetwork } from '../NetworkContext'

export default function DelegateListPage() {
  const mobile = useMediaQuery('(min-width:600px)')
  const { network, setNetwork } = useNetwork()
  const [q, setQ] = useState('')
  const [filterParam, setFilterParam] = useState('All')

  const [delegateList, loading, fetched] = useDelegateList()
  console.log(delegateList)

  function search(delegates: any) {
    return delegates.filter((delegate: any) => {
      console.log(delegate.labels)
      if (delegate?.labels?.includes(filterParam)) {
        return (
          delegate.identity.toLowerCase().includes(q.toLowerCase()) ||
          delegate.name.toLowerCase().includes(q.toLowerCase()) ||
          delegate.address.toLowerCase().includes(q.toLowerCase())
        )
      } else if (filterParam == 'All') {
        return (
          delegate.identity.toLowerCase().includes(q.toLowerCase()) ||
          delegate.name.toLowerCase().includes(q.toLowerCase()) ||
          delegate.address.toLowerCase().includes(q.toLowerCase())
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
    <>
      {!loading ? (
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
                      {search(delegateList).length}
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
                      Delegates
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
                      {network.name == 'Kusama' ? (
                        <StyledToggleButton value="Society">
                          <Diversity3Icon
                            color="success"
                            sx={{ pr: 1 }}
                            fontSize="small"
                          />
                          Society
                        </StyledToggleButton>
                      ) : null}
                      {network.name == 'Kusama' ? (
                        <StyledToggleButton value="Fellowship">
                          <SelfImprovementIcon
                            color="success"
                            sx={{ pr: 1 }}
                            fontSize="small"
                          />
                          Fellowship
                        </StyledToggleButton>
                      ) : null}
                    </StyledToggleButtonGroup>
                  </Grid>
                </Grid>
              </Box>
            </ListSubheader>
            {search(delegateList).map((delegate: any) => (
              <>
                <Suspense>
                  <DelegateListItem delegate={delegate} />
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
