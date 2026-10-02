import { useState } from 'react'
import { site, faqs } from '../data/site'
import { useShop } from '../context/ShopContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

import Breadcrumbs from '../components/Breadcrumbs'
import Button from '../components/Button'
import Reveal from '../components/Reveal'
import SectionTitle from '../components/SectionTitle'
import { Icon } from '../components/Icons'

const CHANNELS = [
  { icon: 'mail', label: 'Email support', value: site.email, href: `mailto:${site.email}` },
  {
    icon: 'phone',
    label: 'Phone',
    value: site.phone,
    href: `tel:${site.phone.replace(/[^+\d]/g, '')}`,
  },
  {
    icon: 'support',
    label: 'WhatsApp',
    value: site.whatsapp,
    href: `https://wa.me/${site.whatsapp.replace(/\D/g, '')}`,
  },
  { icon: 'pin', label: 'Warehouse', value: site.address, href: 'https://maps.google.com' },
]

const TOPICS = [
  {
    id: 'shipping',
    icon: 'truck',
    title: 'Shipping',
    copy: 'Orders placed before 4pm are dispatched the same working day. Standard delivery is 2–4 working days and free over $60; express arrives the next working day.',
  },
  {
    id: 'returns',
    icon: 'refresh',
    title: 'Returns & refunds',
    copy: 'Unopened products can be returned within 30 days for a full refund. Anything that arrives damaged or with a broken seal is replaced at our cost within 48 hours.',
  },
  {
    id: 'tracking',
    icon: 'clock',
    title: 'Track your order',
    copy: 'A tracking link is emailed as soon as the parcel leaves the warehouse. More than 24 hours with no update? Send us your order number and we will chase it.',
  },
]

const EMPTY = { name: '', email: '', subject: 'Order question', message: '' }

/** Contact page: form, direct channels, support topics and FAQs. */
export function Contact() {
  const { pushToast } = useShop()
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})

  useDocumentTitle('Contact Us')

  const update = (key) => (event) => {
    setForm((current) => ({ ...current, [key]: event.target.value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const next = {}
    if (!form.name.trim()) next.name = 'Please tell us your name.'
    if (!form.email.trim()) next.email = 'We need an email to reply to.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'That email does not look right.'
    if (form.message.trim().length < 10) next.message = 'A little more detail helps us help you.'

    setErrors(next)
    if (Object.keys(next).length) return

    setForm(EMPTY)
    pushToast('Message sent — we usually reply within one working day.')
  }

  return (
    <div className="bg-white">
      <div className="border-b border-ink-100 bg-ink-50/70">
        <div className="container-page py-8 lg:py-10">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Contact' }]} />
          <h1 className="mt-4 text-2xl font-extrabold text-ink-900 sm:text-3xl">Contact Us</h1>
          <p className="mt-2 max-w-xl text-[0.94rem] text-ink-500">
            Product advice, order changes or a problem with a delivery — real people answer this,
            seven days a week.
          </p>
        </div>
      </div>

      <div className="container-page grid gap-8 py-10 lg:grid-cols-[1.35fr_1fr] lg:gap-12 lg:py-14">
        {/* Form */}
        <section>
          <SectionTitle
            eyebrow="Send a message"
            title="Drop us a line"
            description="Include an order number if you have one and we can answer in a single reply."
          />

          <form
            onSubmit={handleSubmit}
            noValidate
            className="mt-8 rounded-2xl border border-ink-100 bg-white p-6 shadow-card sm:p-7"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-[0.76rem] font-bold uppercase tracking-[0.12em] text-ink-500"
                >
                  Your name
                </label>
                <input
                  id="name"
                  value={form.name}
                  onChange={update('name')}
                  className={`field ${errors.name ? 'border-rose-400' : ''}`}
                  placeholder="Jordan Blake"
                />
                {errors.name ? (
                  <p className="mt-1.5 text-[0.78rem] text-rose-600">{errors.name}</p>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-[0.76rem] font-bold uppercase tracking-[0.12em] text-ink-500"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={update('email')}
                  className={`field ${errors.email ? 'border-rose-400' : ''}`}
                  placeholder="you@example.com"
                />
                {errors.email ? (
                  <p className="mt-1.5 text-[0.78rem] text-rose-600">{errors.email}</p>
                ) : null}
              </div>
            </div>

            <div className="mt-5">
              <label
                htmlFor="subject"
                className="mb-2 block text-[0.76rem] font-bold uppercase tracking-[0.12em] text-ink-500"
              >
                What is this about?
              </label>
              <select id="subject" value={form.subject} onChange={update('subject')} className="field">
                <option>Order question</option>
                <option>Product advice</option>
                <option>Delivery or return</option>
                <option>Wholesale enquiry</option>
                <option>Something else</option>
              </select>
            </div>

            <div className="mt-5">
              <label
                htmlFor="message"
                className="mb-2 block text-[0.76rem] font-bold uppercase tracking-[0.12em] text-ink-500"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                value={form.message}
                onChange={update('message')}
                className={`field resize-y ${errors.message ? 'border-rose-400' : ''}`}
                placeholder="Tell us what you need — include an order number if you have one."
              />
              {errors.message ? (
                <p className="mt-1.5 text-[0.78rem] text-rose-600">{errors.message}</p>
              ) : null}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Button type="submit" size="lg" iconRight={<Icon name="arrowRight" size={17} />}>
                Send message
              </Button>
              <p className="text-[0.8rem] text-ink-400">Average reply time: under 4 hours.</p>
            </div>
          </form>
        </section>

        {/* Channels + hours */}
        <aside className="lg:sticky lg:top-32 lg:self-start">
          <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-card">
            <h2 className="font-display text-lg font-bold text-ink-900">Reach us directly</h2>

            <ul className="mt-5 space-y-3">
              {CHANNELS.map((channel) => (
                <li key={channel.label}>
                  <a
                    href={channel.href}
                    target={channel.href.startsWith('http') ? '_blank' : undefined}
                    rel={channel.href.startsWith('http') ? 'noreferrer' : undefined}
                    className="flex items-start gap-3 rounded-xl border border-ink-100 p-3.5 transition hover:border-brand-200 hover:bg-brand-50/40"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700">
                      <Icon name={channel.icon} size={17} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.7rem] font-bold uppercase tracking-[0.12em] text-ink-400">
                        {channel.label}
                      </span>
                      <span className="mt-0.5 block break-words text-[0.88rem] font-semibold text-ink-900">
                        {channel.value}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-xl bg-ink-50 p-4">
              <h3 className="flex items-center gap-2 text-[0.8rem] font-bold uppercase tracking-[0.1em] text-ink-600">
                <Icon name="clock" size={15} className="text-brand-600" />
                Opening hours
              </h3>
              <dl className="mt-3 space-y-2 text-[0.86rem]">
                {site.hours.map((row) => (
                  <div key={row.day} className="flex items-center justify-between gap-3">
                    <dt className="text-ink-500">{row.day}</dt>
                    <dd className="font-semibold text-ink-900">{row.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </aside>
      </div>

      {/* Support topics */}
      <section className="border-t border-ink-100 bg-ink-50/70 py-14 lg:py-20">
        <div className="container-page">
          <SectionTitle
            eyebrow="Before you write"
            title="The three things people ask about"
          />

          <div className="mt-8 grid gap-4 sm:gap-5 md:grid-cols-3">
            {TOPICS.map((topic) => (
              <Reveal key={topic.id} id={topic.id}>
                <article className="flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-6 shadow-card">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-700">
                    <Icon name={topic.icon} size={20} />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-ink-900">{topic.title}</h3>
                  <p className="mt-2 text-[0.88rem] leading-relaxed text-ink-500">{topic.copy}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-white py-14 lg:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionTitle
            eyebrow="FAQ"
            title="Quick answers"
            description="Everything else is covered here — and if not, the form above is the fastest route to a human."
          />

          <div className="space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-ink-100 bg-white px-5 transition open:border-brand-200 open:shadow-card"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[0.95rem] font-semibold text-ink-900 [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <Icon
                    name="chevronDown"
                    size={17}
                    className="shrink-0 text-ink-400 transition group-open:rotate-180"
                  />
                </summary>
                <p className="border-t border-ink-100 pt-4 pb-5 text-[0.89rem] leading-relaxed text-ink-500">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
