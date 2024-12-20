import {defineType} from 'sanity'

export const timeValueType = defineType({
  name: 'timeValue',
  title: 'Время',
  type: 'string',
  options: {
    list: ALLOWED_TIMES(),
  },
})

export function ALLOWED_TIMES() {
  const times = []
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 30) {
      times.push(`${h.toString()}:${m.toString().padStart(2, '0')}`)
    }
  }
  return times
}
