import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Text } from '@chakra-ui/react'

// replaces [[varname]] in templated text with variables and bolds them
const TemplatedText = ({ style, children, variables }) => {
  const [dividedText, setDividedText] = useState()
  const [sortedVariables, setSortedVariables] = useState()

  // calculate templated text
  useEffect(() => {
    // find all text around templated text
    setDividedText(children.split(/\[\[.*?\]\]/g))

    // best effort matching from variables to template variables in order
    setSortedVariables(
      Array.from(children.matchAll(/\[\[(.*?)\]\]/g), (m) => m[1]).map(
        (varName) => variables[varName] ?? 'undefined',
      ),
    )
  }, [children, variables])

  return (
    <Text {...style}>
      {dividedText?.map(
        (text, i) =>
          // prepend the formatted text in bold as long as it's not the
          // first piece of text.
          (i !== 0 && <b key={text}>{sortedVariables[i - 1]}</b>) || text,
      )}
    </Text>
  )
}

TemplatedText.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.any),
    PropTypes.arrayOf(PropTypes.object),
  ]),
  children: PropTypes.string,
  variables: PropTypes.objectOf(PropTypes.string),
}

export default TemplatedText
