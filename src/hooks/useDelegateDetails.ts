import { useEffect, useState } from 'react'
import { useNetwork } from '../NetworkContext'

export const useDelegateDetails = (address: any) => {
  const [delegateDetails, setDelegateDetails] = useState<any>([])
  const [fetched, setFetched] = useState(false)
  const [loading, setLoading] = useState(false)
  const { network, setNetwork } = useNetwork()

  useEffect(() => {
    fetch(`${network.url}/opengov/delegates/${address}`)
      .then((results) => {
        return results.json()
      })
      .then((resultsJSON) => {
        console.log(resultsJSON)
        setLoading(false)
        setFetched(true)
        setDelegateDetails(resultsJSON)
      })
      .catch((e) => {
        console.log(e)
      })

    setLoading(true)
  }, [network])
  return [delegateDetails, loading, fetched]
}
