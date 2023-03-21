import { useEffect, useState } from 'react'

export const useDelegateList = () => {
  const [delegateList, setDelegateList] = useState<any>([])
  const [fetched, setFetched] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/opengov/delegates`)
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
  }, [])
  return [delegateList, loading, fetched]
}
