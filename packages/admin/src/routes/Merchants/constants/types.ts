import React from 'react'

export type ReactComponent = React.FunctionComponent<
  React.SVGProps<SVGSVGElement> & { title?: string }
>

export interface ExpectedParam {
  title: string
  description: string
}

export interface Operation {
  title: string
  subtitle: string
  expectedParams: ExpectedParam[]
  path: string
  verboseTitle: string
  csv?: string[][]
}
