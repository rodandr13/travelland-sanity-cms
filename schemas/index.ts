import excursion from './excursion'
import country from './country'
import city from './city'
import meetingPlaces from './meetingPlace'
import whatsIncluded from './whatsIncluded'
import surcharges from './surcharges'
import schedule from './schedule'
import {weekdaysSelectorType} from './weekdaysSelectorType'
import {timeValueType} from './duration/timeValueType'
import {categoryType} from './categoryType'
import {durationType} from './duration/durationType'
import {startTimeType} from './startTimeType'

export const schemaTypes = [
  excursion,
  country,
  city,
  meetingPlaces,
  whatsIncluded,
  surcharges,
  schedule,
  weekdaysSelectorType,
  timeValueType,
  categoryType,
  durationType,
  startTimeType,
]
