import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { email } = await req.json()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ message: 'Email inválido' }, { status: 400 })
  }

  const apiKey = process.env.MAILCHIMP_API_KEY
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID
  const server = process.env.MAILCHIMP_SERVER // e.g. "us21"

  if (!apiKey || !audienceId || !server) {
    // Mailchimp not configured yet — log and return success so UX works
    console.warn('[newsletter] Mailchimp env vars not set. Email:', email)
    return NextResponse.json({ ok: true })
  }

  const url = `https://${server}.api.mailchimp.com/3.0/lists/${audienceId}/members`

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email_address: email,
      status: 'subscribed',
      tags: ['tramiteshoy'],
    }),
  })

  if (res.status === 400) {
    const data = await res.json()
    if (data.title === 'Member Exists') {
      return NextResponse.json({ message: 'Already subscribed' }, { status: 409 })
    }
    return NextResponse.json({ message: data.detail ?? 'Error' }, { status: 400 })
  }

  if (!res.ok) {
    return NextResponse.json({ message: 'Mailchimp error' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
