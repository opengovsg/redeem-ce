export const CORP_SITE_HOSTNAME = process.env.REACT_APP_CORP_SITE_HOSTNAME

export default {
  ABOUT: `https://${CORP_SITE_HOSTNAME}`,
  CONTACT: `mailto:feedback@${CORP_SITE_HOSTNAME}`,
  FAQ: `https://${CORP_SITE_HOSTNAME}/faq.html`,
  TOU: `https://${CORP_SITE_HOSTNAME}/terms-of-use.html`,
  PRIVACY_POLICY: `https://${CORP_SITE_HOSTNAME}/privacy.html`,
}
