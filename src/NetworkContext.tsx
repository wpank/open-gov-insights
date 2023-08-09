import { createContext, useContext, useState, ReactNode } from 'react'

interface NetworkContextProps {
  network: {
    name: string
    symbol: string
    url: string
  }
  setNetwork: React.Dispatch<
    React.SetStateAction<{ name: string; symbol: string; url: string }>
  >
}

const NetworkContext = createContext<NetworkContextProps | undefined>(undefined)

export function NetworkProvider({ children }: { children: ReactNode }) {
  const [network, setNetwork] = useState<{
    name: string
    symbol: string
    url: string
  }>({
    name: 'Polkadot',
    symbol: 'DOT',
    url: 'https://polkadot-staging.w3f.community',
  })

  return (
    <NetworkContext.Provider value={{ network, setNetwork }}>
      {children}
    </NetworkContext.Provider>
  )
}

export function useNetwork() {
  const context = useContext(NetworkContext)
  if (!context) {
    throw new Error('useNetwork must be used within a NetworkProvider')
  }
  return context
}
