import { CVPage, generateCVMetadata } from '../cv-page'

export const dynamic = 'force-dynamic'

export default function Page() {
  return <CVPage locale="uk" />
}

export function generateMetadata() {
  return generateCVMetadata('uk')
}
