import {Badge, Flex, Box} from '@sanity/ui'
import {PreviewProps} from 'sanity'

export const PromotionalPricePreview = (props: PreviewProps) => {
  console.log(props)
  return (
    <Flex align="center">
      <Box flex={1}>{props.renderDefault(props)}</Box>
      <Badge tone="positive">active</Badge>
    </Flex>
  )
}
