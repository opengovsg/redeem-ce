import React from 'react'
import {useTranslation} from 'react-i18next'
import {useSearchParams} from 'react-router-dom'

import {DEFAULT_LOCALE, SUPPORTED_LOCALES} from 'constants/translation'
import {BiChevronDown, BiChevronUp, BiGlobe} from 'react-icons/bi'
import {changeLanguage} from 'helpers/i18n'
import {
  Button,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useMultiStyleConfig,
} from '@chakra-ui/react'
import {DDAction} from 'constants/datadog'

interface LanguageSelectorProps {
  color?: 'dark' | 'light' | 'primary'
  isInteractionDisabled?: boolean
}

const LanguageSelector = ({
  color = 'dark',
  isInteractionDisabled = false,
}: LanguageSelectorProps) => {
  const {i18n} = useTranslation('header')
  // Get selected locale information (label). If it is not found, then
  // default locale (en) will be assumed to be selected.
  const selectedLocale =
    SUPPORTED_LOCALES.find(
      // Get base language from locale
      (locale) => locale.code === i18n?.language?.substring(0, 2), // en-US -> en
    ) || DEFAULT_LOCALE
  const [, setSearchParams] = useSearchParams()

  // Interaction disabled style will be light color
  const styles = useMultiStyleConfig('LanguageSelector', {
    variant: isInteractionDisabled ? 'light' : color,
  })

  return (
    <Menu
      autoSelect={false}
      id='language-selector-container'
      matchWidth={true}
      offset={[0, 0]}
    >
      {({isOpen}) => (
        <>
          <MenuButton
            as={Button}
            sx={styles.button}
            data-dd-action-name={DDAction.CHANGE_LANGUAGE_BUTTON}
            isActive={isOpen}
          >
            <HStack justify='space-between'>
              <HStack spacing='8px'>
                <Icon as={BiGlobe} sx={styles.icon}></Icon>
                <Text
                  textStyle='subhead1'
                  id={'language-select-dropdown-button'}
                >
                  {selectedLocale.label}
                </Text>
              </HStack>
              <Icon
                as={isOpen ? BiChevronUp : BiChevronDown}
                sx={styles.icon}
              ></Icon>
            </HStack>
          </MenuButton>
          <MenuList sx={styles.dropdown} rootProps={{width: '100%'}}>
            {SUPPORTED_LOCALES.map((locale) => (
              <MenuItem
                textStyle='subhead1'
                justifyContent='center'
                aria-label={locale.code}
                backgroundColor={
                  selectedLocale.code === locale.code ? 'neutral.200' : 'none'
                }
                isFocusable={false}
                key={locale.code}
                onClick={() => changeLanguage(locale.code, setSearchParams)}
              >
                {locale.label}
              </MenuItem>
            ))}
          </MenuList>
        </>
      )}
    </Menu>
  )
}

export default LanguageSelector
