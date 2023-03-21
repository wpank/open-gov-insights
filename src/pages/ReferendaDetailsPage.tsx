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
import { ReactComponent as Logo } from './logo.svg'
import { useParams } from 'react-router-dom'
import { Remark } from 'react-remark'
import HowToVoteIcon from '@mui/icons-material/HowToVote'
import { ColorRing } from 'react-loader-spinner'
import { useGlitch } from 'react-powerglitch'
import { ReactComponent as LoadingLogo } from './logo.svg'
import Loading from '../components/Loading'

export default function ReferendaDetailsPage() {
  const [refInfo, setRefInfo] = useState<any>()
  const [votes, setVotes] = useState([])
  const { referendumIndex } = useParams()
  const glitch = useGlitch()

  useEffect(() => {
    const fetchVotes = () => {
      fetch(
        `https://kusama.w3f.community/opengov/votes/referendum/${referendumIndex}`
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
      fetch(`https://kusama.w3f.community/opengov/referenda/${referendumIndex}`)
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

  return <></>
}
