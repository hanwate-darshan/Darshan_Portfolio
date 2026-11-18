'use client'

import { useSyncExternalStore, useCallback } from 'react'
import defaultPortfolioData from '@/data/portfolio.json'
import type { PortfolioData } from '@/lib/portfolio-types'

let currentStore: PortfolioData = defaultPortfolioData as PortfolioData
let hasFetchedInitial = false
const listeners = new Set<() => void>()

function emitChange() {
  for (const listener of listeners) {
    listener()
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  if (!hasFetchedInitial && typeof window !== 'undefined') {
    hasFetchedInitial = true
    fetch('/api/portfolio')
      .then((res) => (res.ok ? res.json() : null))
      .then((data: PortfolioData | null) => {
        if (data && data.personal) {
          currentStore = data
          emitChange()
        }
      })
      .catch(() => {})
  }
  return () => {
    listeners.delete(listener)
  }
}

function getSnapshot(): PortfolioData {
  return currentStore
}

function getServerSnapshot(): PortfolioData {
  return defaultPortfolioData as PortfolioData
}

export function usePortfolio() {
  const portfolio = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const updatePortfolio = useCallback(async (newData: PortfolioData) => {
    currentStore = newData
    emitChange()

    const response = await fetch('/api/portfolio', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData),
    })

    if (!response.ok) {
      throw new Error('Failed to save portfolio data')
    }
    const result = await response.json()
    if (result?.data) {
      currentStore = result.data
      emitChange()
    }
  }, [])

  return {
    portfolio,
    isLoading: false,
    error: null,
    updatePortfolio,
  }
}
