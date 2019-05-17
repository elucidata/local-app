import * as fetch from '../util/http.js'
import { logger } from '../util/logger.js'
import { observable } from '../util/observables.js'

const log = logger('store/example')

export let eventsAreLoading = observable(false)
export let eventList = observable([])

export async function loadEvents(date) {
  eventsAreLoading.set(true)
  try {
    log("Loading events for", { date })

    // GET DATA FROM JSON-SERVER
    let events = await fetch.get(`/api/events?date=${date}&_sort=timestamp&_order=asc`)

    log("Results:", { events })

    eventList.set(events)
  }
  catch (err) {
    eventsAreLoading.set(false)
    throw err
  }
  eventsAreLoading.set(false)
  return eventList
}



export async function createEvent({ type, date, time, timestamp = Date.now(), notes = "" }) {
  if (!type) throw new Error("Invalid event type.")

  const result = await fetch.post('/api/events', {
    type, date, time, timestamp, notes
  })

  log('Create result:', { result })

  return result
}
