import React from 'react'
import { HStack } from '@chakra-ui/react'
import { Tile } from '@opengovsg/design-system-react'
import { useHistory } from 'react-router-dom'
import AppHeader from 'components/AppHeader'
import { ChooseOperationsPageProps } from './types'

export const ChooseOperationsPage = ({
  pathPrefix,
  operations,
}: ChooseOperationsPageProps): JSX.Element => {
  const history = useHistory()

  return (
    <>
      <AppHeader />
      <HStack
        flexWrap="wrap"
        justifyContent="center"
        spacing="8px"
        width="100%"
        maxWidth="100%"
        paddingX="124px"
        paddingY="48px"
        // forced to specify CSS var, Chakra refuses to transform idiomatic value
        background="var(--chakra-colors-neutral-100)"
      >
        {Object.keys(operations).map((key) => (
          <Tile
            onClick={() =>
              history.push(`/${pathPrefix}/${operations[key].path}`)
            }
            variant="complex"
            key={operations[key].title}
            flexBasis="calc(50% - 8px)"
            maxHeight="50%"
          >
            <Tile.Title>{operations[key].title}</Tile.Title>
            <Tile.Subtitle>{operations[key].subtitle}</Tile.Subtitle>
            <Tile.Text>Input Type</Tile.Text>
            {operations[key].expectedParams.map((expectedParam) => (
              <Tile.Text key={expectedParam.title}>
                - {expectedParam.title}
              </Tile.Text>
            ))}
          </Tile>
        ))}
      </HStack>
    </>
  )
}
