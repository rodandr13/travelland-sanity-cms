import React, {useCallback} from 'react'
import {Grid, Checkbox, Flex, Box, Text} from '@sanity/ui'
import {ArrayOfObjectsInputProps, set} from 'sanity'
import {randomKey} from '@sanity/util/content'

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

interface Day {
  _key: string
  name: string
}

export function WeekdaysInput(props: ArrayOfObjectsInputProps) {
  const {onChange} = props
  const typedValue = props.value as Day[]

  const handleChange = useCallback(
    (dayName: string) => {
      const dayExists = typedValue?.some((day) => day.name === dayName)
      const newValue = dayExists
        ? typedValue.filter((day) => day.name !== dayName)
        : [...(typedValue || []), {name: dayName, _key: randomKey(), _type: 'day'}]
      onChange(set(newValue))
    },
    [onChange, typedValue],
  )

  return (
    <>
      <Grid columns={daysOfWeek.length} gap={1}>
        {daysOfWeek.map((dayName) => (
          <Flex key={dayName} align="center" gap={[1]}>
            <Checkbox
              checked={!!typedValue?.some((day) => day.name === dayName)}
              onChange={() => handleChange(dayName)}
              id={dayName}
            />
            <Box flex={1} paddingLeft={1}>
              <Text>
                <label htmlFor={dayName}>{dayName.slice(0, 3)}</label>
              </Text>
            </Box>
          </Flex>
        ))}
      </Grid>
      {props.renderDefault(props)}
    </>
  )
}
