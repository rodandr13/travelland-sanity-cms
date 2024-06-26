import {Badge, Flex, Box, Text} from '@sanity/ui'
import {PreviewProps} from 'sanity'
import {format} from 'date-fns'

type CastPreviewProps = PreviewProps & {
  dateFrom?: string
  dateTo?: string
}

type BadgeProps = {
  children: string
  tone: 'default' | 'positive' | 'critical' | 'primary' | 'caution' | undefined
}

export const StatusBadgePreview = (props: PreviewProps) => {
  const castProps = props as CastPreviewProps
  const {dateFrom, dateTo} = castProps

  let subtitle = (
    <Text size={1} style={{lineHeight: '2.2', color: '#6a6e7d'}}>
      No dates provided
    </Text>
  )
  let badgeProps: BadgeProps = {children: 'No status', tone: 'default'}

  if (dateFrom && dateTo) {
    const newDateFrom = new Date(dateFrom)
    const newDateTo = new Date(dateTo)
    subtitle = (
      <Text size={1} style={{lineHeight: '2.2', color: '#6a6e7d'}}>
        {format(newDateFrom, 'dd.MM.yyyy')} — {format(newDateTo, 'dd.MM.yyyy')}
      </Text>
    )
    const today = new Date()
    const isActive = today < newDateTo
    badgeProps = isActive
      ? {children: 'Active', tone: 'positive'}
      : {children: 'Expired', tone: 'critical'}
  }

  return (
    <Flex align="center" paddingRight={3}>
      <Box flex={1}>{props.renderDefault({...props, subtitle})}</Box>
      <Badge tone={badgeProps.tone}>{badgeProps.children}</Badge>
    </Flex>
  )
}
