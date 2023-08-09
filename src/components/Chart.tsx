import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  LineController,
  BarController,
  InteractionItem,
} from 'chart.js'
import {
  Bar,
  Chart,
  getDatasetAtEvent,
  getElementAtEvent,
  getElementsAtEvent,
} from 'react-chartjs-2'
import { useEffect, useState } from 'react'
import React, { MouseEvent, useRef } from 'react'
import styled from 'styled-components'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid' // Grid version 1
import Grid2 from '@mui/material/Unstable_Grid2' // Grid version 2
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import PersonIcon from '@mui/icons-material/Person'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import FlakyIcon from '@mui/icons-material/Flaky'
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact'
import PeopleIcon from '@mui/icons-material/People'
import HowToVoteIcon from '@mui/icons-material/HowToVote'
import CircularProgress from '@mui/material/CircularProgress'
import { default as MToolTip } from '@mui/material/Tooltip'
import { Box, Container, Fade } from '@mui/material'
import { ReactComponent as LoadingLogo } from '../icons/logo.svg'
import { useGlitch } from 'react-powerglitch'

import { ColorRing, Vortex } from 'react-loader-spinner'
import Typography from '@mui/material/Typography'
import SvgIcon from '@mui/material/SvgIcon'
import Loading from './Loading'
import { useNetwork } from '../NetworkContext'

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
)

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)`
  color: white;
  & .Mui-selected {
    color: rgba(230, 0, 122, 1);
    background-color: rgba(230, 0, 122, 0);
    border-color: rgba(230, 0, 122, 1);
  }
  //
`

export const StyledToggleButton = styled(ToggleButton)`
  background-color: rgba(230, 0, 122, 0.25);
  border-color: rgba(230, 0, 122, 0.25);
  border-radius: 8px;
  font-size: 8px;
  color: white;
  box-shadow: 0 3px 5px 2px rgba(230, 0, 122, 0.15);
`

export const options = {
  plugins: {
    legend: {
      labels: {
        color: 'rgba(255,255,255,0.9)',
      },
    },
  },
  responsive: true,
  labelColor: 'rgba(255,255,255,0.9)',
  scales: {
    x: {
      stacked: true,
      grid: {
        tickColor: '#FF33AD',
        z: 0,
      },
      border: {
        color: '#FF33AD',
      },
      title: {
        color: '#FF33AD',
      },
      ticks: {
        textStrokeColor: '#FF33AD',
        color: '#FF33AD',
        backdropPadding: 10,
        backdropColor: '#FF33AD',
      },
    },
    y: {
      border: {
        color: '#FF33AD',
      },
      stacked: true,
      title: {
        color: '#FF33AD',
      },
      ticks: {
        color: '#FF33AD',
        textStrokeColor: '#FF33AD',
      },
    },
  },
}

export function OpenGovChart({}: {}): JSX.Element {
  const [stats, setStats] = useState([])
  const [chartData, setChartData] = useState({ datasets: [] })
  const chartRef = useRef<ChartJS>(null)

  const [toggle, setToggle] = useState('all')
  const [countToggle, setCountToggle] = useState('amount')
  const { network, setNetwork } = useNetwork()
  const glitch = useGlitch()

  const handleCountChange = (
    event: React.MouseEvent<HTMLElement>,
    toggle: string
  ) => {
    if (toggle !== null) {
      setCountToggle(toggle)
    }
  }

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    toggle: string
  ) => {
    if (toggle !== null) {
      setToggle(toggle)
    }
  }

  const printDatasetAtEvent = (dataset: InteractionItem[]) => {
    if (!dataset.length) return

    const datasetIndex = dataset[0].datasetIndex

    // @ts-ignore
    console.log(data.datasets[datasetIndex].label)
  }
  const printElementAtEvent = (element: InteractionItem[]) => {
    if (!element.length) return

    const { datasetIndex, index } = element[0]
    // @ts-ignore
    console.log(data.labels[index], data.datasets[datasetIndex].data[index])
  }

  const printElementsAtEvent = (elements: InteractionItem[]) => {
    if (!elements.length) return

    console.log(elements.length)
  }

  const onHover = (event: any, chartElement: any) => {
    event.target.style.cursor = chartElement[0] ? 'pointer' : 'default'
  }

  const onClick = (event: MouseEvent<HTMLCanvasElement>) => {
    const { current: chart } = chartRef

    if (!chart) {
      return
    }

    printDatasetAtEvent(getDatasetAtEvent(chart, event))
    printElementAtEvent(getElementAtEvent(chart, event))
    printElementsAtEvent(getElementsAtEvent(chart, event))
  }

  useEffect(() => {
    const labels: string[] = []
    for (const ref of stats) {
      // @ts-ignore
      labels.push(`Ref #${ref.index}`)
    }
    let data: any
    switch (toggle) {
      case 'all':
        data = {
          labels,
          datasets: [
            {
              label: 'All',
              data: stats.map((ref: any) =>
                countToggle === 'amount'
                  ? ref.allVoters.total
                  : ref.allVoters.amount
              ),
              backgroundColor: 'rgb(53, 82, 190, 0.35)',
              borderColor: 'rgb(53, 82, 190, 1)',
              borderWidth: 1,
            },
          ],
          options: {
            interaction: { mode: 'index' },
            onHover: (event: any, chartElement: any) => {
              event.native.target.style.cursor = chartElement[0]
                ? 'pointer'
                : 'default'
            },
          },
        }
        break
      case 'direction':
        data = {
          labels,
          datasets: [
            {
              label: 'Abstain',
              data: stats.map((ref: any) =>
                countToggle === 'amount'
                  ? ref.abstainVoters.total
                  : ref.abstainVoters.amount
              ),
              backgroundColor: 'rgba(169,204,41,0.35)',
              borderColor: 'rgba(211,255,51,1)',
              borderWidth: 1,
              color: 'rgba(255,255,255,0.9)',
            },
            {
              label: 'Aye',
              data: stats.map((ref: any) =>
                countToggle === 'amount'
                  ? ref.ayeVoters.total
                  : ref.ayeVoters.amount
              ),
              backgroundColor: 'rgba(72,204,129,0.35)',
              borderColor: 'rgba(86,243,154,1)',
              borderWidth: 1,
              color: 'rgba(255,255,255,0.9)',
            },
            {
              label: 'Nay',
              data: stats.map((ref: any) =>
                countToggle === 'amount'
                  ? ref.nayVoters.total
                  : ref.nayVoters.amount
              ),
              backgroundColor: 'rgba(230,0,122,0.25)',
              borderColor: 'rgba(230,0,122,1)',
              borderWidth: 1,
              color: 'rgba(255,255,255,0.9)',
            },
          ],
        }
        break
      case 'casting':
        data = {
          labels,
          datasets: [
            {
              label: 'Casting',
              data: stats.map((ref: any) =>
                countToggle === 'amount'
                  ? ref.castingVoters?.total
                  : ref.castingVoters?.amount
              ),
              backgroundColor: 'rgba(68,34,153,0.35)',
              borderColor: 'rgba(109,58,238,1)',
              borderWidth: 1,
            },
            {
              label: 'Delegating',
              data: stats.map((ref: any) =>
                countToggle === 'amount'
                  ? ref.delegatingVoters?.total
                  : ref.delegatingVoters?.amount
              ),
              backgroundColor: 'rgba(230,0,122,0.25)',
              borderColor: 'rgba(230,0,122,1)',
              borderWidth: 1,
            },
          ],
        }
        break
      case 'community':
        data = {
          labels,
          datasets: [
            {
              label: 'Validator',
              data: stats.map((ref: any) =>
                countToggle === 'amount'
                  ? ref?.validatorVoters?.total
                  : ref?.validatorVoters?.amount
              ),
              backgroundColor: 'rgba(230,0,122,0.25)',
              borderColor: 'rgba(230,0,122,1)',
              borderWidth: 1,
            },
            {
              label: 'Nominator',
              data: stats.map((ref: any) =>
                countToggle === 'amount'
                  ? ref.nominatorVoters?.total
                  : ref?.nominatorVoters?.amount
              ),
              backgroundColor: 'rgba(0,148,212,0.35)',
              borderColor: 'rgba(0,178,255,1)',
              borderWidth: 1,
              color: 'rgba(255,255,255,0.9)',
            },
            {
              label: 'Non-Staker',
              data: stats.map((ref: any) =>
                countToggle === 'amount'
                  ? ref.nonStakerVoters?.total
                  : ref.nonStakerVoters?.amount
              ),
              backgroundColor: 'rgba(169,204,41,0.35)',
              borderColor: 'rgba(211,255,51,1)',
              borderWidth: 1,
            },
            {
              label: 'Fellowship',
              data: stats.map((ref: any) =>
                countToggle === 'amount'
                  ? ref.fellowshipVoters?.total
                  : ref.fellowshipVoters?.amount
              ),
              backgroundColor: 'rgba(72,204,129,0.35)',
              borderColor: 'rgba(86,243,154,1)',
              borderWidth: 1,
            },
            {
              label: 'Society',
              data: stats.map((ref: any) =>
                countToggle === 'amount'
                  ? ref.societyVoters?.total
                  : ref.societyVoters?.amount
              ),
              backgroundColor: 'rgba(68,34,153,0.35)',
              borderColor: 'rgba(109,58,238,1)',
              borderWidth: 1,
            },
          ],
        }
        break
    }
    setChartData(data)
  }, [toggle, countToggle, network])

  // @ts-ignore
  useEffect(() => {
    const fetchVotes = () => {
      console.log(`fetching stats...`)
      fetch(`${network.url}/opengov/referenda/stats/`)
        .then((results) => {
          return results.json()
        })
        .then((resultsJSON) => {
          const sorted = resultsJSON.sort((a: any, b: any) => a.index - b.index)
          setStats(sorted)
          const labels: string[] = []

          for (const ref of sorted) {
            labels.push(`Ref #${ref.index}`)
          }
          const data = {
            labels,
            datasets: [
              {
                label: 'All',
                data: sorted.map((ref: any) => ref.allVoters?.total),
                backgroundColor: 'rgb(53, 82, 190, 0.5)',
                borderColor: 'rgb(53, 82, 190, 1)',
                borderWidth: 1,
              },
            ],
          }
          // @ts-ignore
          setChartData(data)
          // glitch.stopGlitch()
        })
        .catch((e) => {
          console.log(e)
        })
    }

    fetchVotes()
  }, [network])

  return (
    <>
      {stats.length > 0 ? (
        <>
          <Grid container spacing={0}>
            <Grid item xs={12} md={2} sx={{ pt: { xs: 2, md: 0 } }}>
              <StyledToggleButtonGroup
                value={countToggle}
                exclusive
                onChange={handleCountChange}
                aria-label="Toggle"
                size="small"
              >
                <StyledToggleButton value="amount">
                  <MToolTip title="The unique amount of people voting" arrow>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <PersonIcon fontSize="small" />
                      Voters
                    </Box>
                  </MToolTip>
                </StyledToggleButton>
                <StyledToggleButton value="total">
                  <MToolTip title="The total amount of tokens voting" arrow>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <AttachMoneyIcon fontSize="small" />
                      Total
                    </Box>
                  </MToolTip>
                </StyledToggleButton>
              </StyledToggleButtonGroup>
            </Grid>
            <Grid item xs={12} md={8} sx={{ pt: { xs: 2, md: 0 } }}>
              <StyledToggleButtonGroup
                value={toggle}
                exclusive
                onChange={handleChange}
                aria-label="Toggle"
                size="small"
              >
                <StyledToggleButton value="all">
                  <HowToVoteIcon fontSize="small" />
                  All Votes
                </StyledToggleButton>
                <StyledToggleButton value="direction">
                  <FlakyIcon fontSize="small" />
                  Vote Direction
                </StyledToggleButton>
                <StyledToggleButton value="casting">
                  <ConnectWithoutContactIcon fontSize="small" />
                  Casting / Delegating
                </StyledToggleButton>
                <StyledToggleButton value="community">
                  <PeopleIcon fontSize="small" />
                  Community
                </StyledToggleButton>
              </StyledToggleButtonGroup>
            </Grid>
          </Grid>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              // width: '100%',
              height: '90vh',
              width: '95vw',
            }}
          >
            <Bar
              // ref={chartRef}
              onClick={onClick}
              options={options}
              data={chartData}
            />
          </Box>
        </>
      ) : (
        <>
          <Loading />
        </>
      )}
    </>
  )
}
