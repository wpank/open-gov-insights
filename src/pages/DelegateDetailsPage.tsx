import * as React from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import { useDelegateDetails } from '../hooks/useDelegateDetails'
import useMediaQuery from '@mui/material/useMediaQuery'
import DelegateDetails from '../components/DelegateDetailsPage/DelegateDetails'
import DelegateDelegations from '../components/DelegateDetailsPage/DelegateDelegations'

export default function DelegateDetailsPage() {
  const { address } = useParams()
  const mobile = useMediaQuery('(min-width:600px)')

  const [delegateDetails, loading, fetched] = useDelegateDetails(address)

  return (
    <>
      {!loading ? (
        <>
          <DelegateDetails delegateDetails={delegateDetails} />
          {delegateDetails?.delegations?.map((delegation: any) => {
            return <DelegateDelegations delegation={delegation} />
          })}
        </>
      ) : (
        <Loading />
      )}
    </>
  )
}
