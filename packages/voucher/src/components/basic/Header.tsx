import React from 'react'
import {Helmet} from 'react-helmet-async'

interface HeaderProps {
  campaignDescription: string
  campaignTitle: string
}

const Header = ({campaignDescription, campaignTitle}: HeaderProps) => {
  return (
    <Helmet>
      <title>{`Redeem - ${campaignTitle}`}</title>
      <meta name='description' content={campaignDescription} />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <meta property='og:title' content={`Redeem - ${campaignTitle}`} />
      <meta property='og:description' content={campaignDescription} />
      <meta property='og:url' content={`${window.location.href}`} />
    </Helmet>
  )
}

export default Header
