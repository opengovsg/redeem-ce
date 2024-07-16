import React from 'react'
import PropTypes from 'prop-types'
import { Flex } from '@chakra-ui/react'
import _ from 'lodash'

import { LANGUAGE_DISPLAY } from 'services/localisation/i18n'

import ListButton from './ListButton'

const LanguageList = ({ selectedLang, setSelectedLang }) => (
  <Flex
    flexDir='column'
    borderBottom='1px solid #EEEEEE'
  >
    {_.keys(LANGUAGE_DISPLAY).map((key) => (
      <ListButton
        key={key}
        text={_.get(LANGUAGE_DISPLAY, key)}
        isActive={key === selectedLang}
        onClick={() => setSelectedLang(key)}
      />
    ))}
  </Flex>
)

LanguageList.propTypes = {
  selectedLang: PropTypes.string,
  setSelectedLang: PropTypes.func,
}

export default LanguageList
