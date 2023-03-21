import { useEffect, useState } from 'react'

export const useDelegateDetails = (address: any) => {
  const [delegateDetails, setDelegateDetails] = useState<any>([])
  const [fetched, setFetched] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/opengov/delegates/${address}`)
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
  }, [])
  return [delegateDetails, loading, fetched]
}
