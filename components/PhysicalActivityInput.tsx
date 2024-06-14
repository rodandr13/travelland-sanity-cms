import {Button, Card, Grid, Heading, Stack, Text} from '@sanity/ui'
import {NumberInputProps, set} from 'sanity'
import {MouseEvent, useCallback, useMemo} from 'react'

export const PhysicalActivityInput = (props: NumberInputProps) => {
  const {onChange, schemaType, value} = props
  const {validation = []} = schemaType

  const range = useMemo(() => generateRange(validation as any[]), [validation])
  const handleScore = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      const value = Number(e.currentTarget.value)
      onChange(set(value))
    },
    [onChange],
  )

  const headerClass = {
    lineHeight: 1.5,
    transform: 'none',
  }

  const descriptionClass = {lineHeight: 1.3, marginTop: 4}

  return (
    <Stack space={4}>
      <Stack space={5}>
        <Card>
          <Heading as="h6" size={0} style={headerClass}>
            (1-3) Low (Низкий)
          </Heading>
          <Stack space={2}>
            <Text size={1} as="p" style={descriptionClass}>
              Подходит для всех уровней физической подготовки. Минимальная физическая активность,
              подходящая для людей с ограниченными возможностями или людей, которые предпочитают
              спокойный отдых.
            </Text>
            <Text size={1} as="p" style={descriptionClass}>
              Прогулки по ровным дорожкам, посещение музеев, автобусные экскурсии, короткие пешие
              экскурсии с частыми остановками.
            </Text>
          </Stack>
        </Card>
        <Card>
          <Heading as="h6" size={0} style={headerClass}>
            (4-5) Moderate (Умеренный)
          </Heading>
          <Stack space={2}>
            <Text size={1} as="p" style={descriptionClass}>
              Подходит для людей с базовым уровнем физической подготовки. Активность умеренной
              интенсивности, требующая некоторого усилия, но доступная для большинства людей.
            </Text>
            <Text size={1} as="p" style={descriptionClass}>
              Прогулки по природным тропам с небольшими подъемами, велосипедные экскурсии по ровной
              местности, экскурсии с небольшой продолжительностью ходьбы (1-2 часа).
            </Text>
          </Stack>
        </Card>
        <Card>
          <Heading as="h6" size={0} style={headerClass}>
            (6-8) High (Высокий)
          </Heading>
          <Stack space={2}>
            <Text size={1} as="p" style={descriptionClass}>
              Подходит для людей с хорошей физической подготовкой. Включает активные и
              продолжительные занятия, требующие хорошей выносливости.
            </Text>
            <Text size={1} as="p" style={descriptionClass}>
              Походы в горы средней сложности, длительные велосипедные экскурсии по пересеченной
              местности, экскурсии с длительными пешими прогулками (2-4 часа).
            </Text>
          </Stack>
        </Card>
        <Card>
          <Heading as="h6" size={0} style={headerClass}>
            (9-10) Very High (Очень высокий)
          </Heading>
          <Stack space={2}>
            <Text size={1} as="p" style={descriptionClass}>
              Описание: Подходит для людей с отличной физической подготовкой. Включает интенсивные и
              длительные физические нагрузки, часто в сложных условиях.
            </Text>
            <Text size={1} as="p" style={descriptionClass}>
              Примеры: Скалолазание, походы в горы высокой сложности, многодневные трекинги,
              интенсивные водные виды спорта (например, каякинг по бурной воде).
            </Text>
          </Stack>
        </Card>
      </Stack>
      <Grid columns={range.length} gap={1}>
        {range.map((index) => (
          <Button
            key={index}
            mode={value === index ? 'default' : 'ghost'}
            tone={value === index ? 'primary' : 'default'}
            text={index.toString()}
            value={index}
            onClick={handleScore}
          />
        ))}
      </Grid>
    </Stack>
  )
}

function generateRange(validation: any[]) {
  const [min, max] = validation
    .reduce((acc, {_rules}) => {
      return [...acc, ..._rules]
    }, [])
    .filter((rule: any) => ['max', 'min'].includes(rule.flag))
    .map((rule: any) => rule.constraint)

  let range = []
  for (let i = min; i <= max; i++) {
    range.push(i)
  }

  return range
}
