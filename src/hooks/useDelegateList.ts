import { useEffect, useState } from 'react'
import { useNetwork } from '../NetworkContext'

export const useDelegateList = () => {
  const [delegateList, setDelegateList] = useState<any>([])
  const [fetched, setFetched] = useState(false)
  const [loading, setLoading] = useState(false)
  const { network, setNetwork } = useNetwork()
  useEffect(() => {
    fetch(`${network.url}/opengov/delegates`)
      .then((results) => {
        return results.json()
      })
      .then((resultsJSON) => {
        console.log(resultsJSON)
        setLoading(false)
        setFetched(true)
        setDelegateList(resultsJSON)
      })
      .catch((e) => {
        console.log(e)
      })

    setLoading(true)
  }, [network])
  return [delegateList, loading, fetched]
}
