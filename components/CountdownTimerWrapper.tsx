import { getPayload } from 'payload'
import config from '@payload-config'
import CountdownTimer from './CountdownTimer'

async function getCountdownData() {
  const payload = await getPayload({ config })
  return payload.findGlobal({ slug: 'homepage' })
}

export default async function CountdownTimerWrapper() {
  const cms = await getCountdownData().catch(() => null)
  const event = cms?.countdownEvent

  // Hide the banner if: CMS says so, no data, or event date is in the past
  if (!event?.showBanner) return null
  if (!event.eventDate) return null
  const eventDate = typeof event.eventDate === 'string'
    ? event.eventDate
    : new Date(event.eventDate).toISOString()
  if (new Date(eventDate).getTime() <= Date.now()) return null

  return (
    <CountdownTimer
      eventName={event.eventName ?? 'Upcoming Event'}
      eventDate={eventDate}
      ctaLabel={event.ctaLabel ?? 'Learn More'}
      ctaLink={event.ctaLink ?? '#events'}
    />
  )
}
