import {Grid} from '@sanity/ui'
import {
  ArrayOfPrimitivesFunctions,
  ArrayOfPrimitivesInputProps,
  ArraySchemaType,
  ArrayInputFunctionsProps,
} from 'sanity'

function ArrayFunctions(
  props: ArrayInputFunctionsProps<string | number | boolean, ArraySchemaType>,
) {
  const {value} = props
  return (
    <Grid columns={1} gap={2}>
      {value?.length < 1 && <ArrayOfPrimitivesFunctions {...props} />}
    </Grid>
  )
}

export function CustomInput(props: ArrayOfPrimitivesInputProps) {
  return props.renderDefault({...props, arrayFunctions: ArrayFunctions})
}
