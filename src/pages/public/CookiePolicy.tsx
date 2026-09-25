import LegalPageLayout from '@/components/LegalPageLayout'
import { openCookieSettings } from '@/components/CookieConsentBanner'

const H2 = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h2 id={id} className="text-xl font-bold text-navy-950 mt-10 mb-3 scroll-mt-24">
    {children}
  </h2>
)
const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-slate-600 leading-relaxed mb-4">{children}</p>
)
const UL = ({ children }: { children: React.ReactNode }) => (
  <ul className="list-disc pl-5 space-y-1.5 text-slate-600 mb-4">{children}</ul>
)
const Table = ({ head, rows }: { head: string[]; rows: string[][] }) => (
  <div className="overflow-x-auto mb-6 rounded-xl border border-black/10">
    <table className="w-full text-sm text-left">
      <thead className="bg-black/5">
        <tr>
          {head.map((h) => (
            <th key={h} className="px-4 py-2.5 font-semibold text-navy-950">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="border-t border-black/5">
            {row.map((cell, j) => (
              <td key={j} className="px-4 py-2.5 text-slate-600 align-top">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

const SECTIONS = [
  { id: 'what-are-cookies', label: 'What Are Cookies' },
  { id: 'types', label: 'Types of Cookies We Use' },
  { id: 'table', label: 'Cookie Details' },
  { id: 'third-party', label: 'Third-Party Cookies' },
  { id: 'consent', label: 'Your Consent Choices' },
  { id: 'managing', label: 'Managing Cookies in Your Browser' },
  { id: 'changes', label: 'Changes to This Policy' },
  { id: 'contact', label: 'Contact' },
]

export default function CookiePolicy() {
  return (
    <LegalPageLayout
      title="Cookie Policy"
      lastUpdated="[Insert publish date]"
      intro="This Cookie Policy explains how OddsBora uses cookies and similar technologies, and the choices available to you, in line with Kenya's Data Protection Act, 2019 and the Data Protection (General) Regulations, 2021, which require that non-essential cookies only be set with your informed, freely-given consent."
      sections={SECTIONS}
    >
      <H2 id="what-are-cookies">What Are Cookies</H2>
      <P>
        Cookies are small text files placed on your device when you visit a website. They allow a site to
        recognize your device, remember information about your visit, and function correctly across page loads.
        We also use similar technologies such as local storage, which behaves like a cookie but is stored directly
        by your browser rather than sent with every request.
      </P>

      <H2 id="types">Types of Cookies We Use</H2>
      <UL>
        <li>
          <strong>Strictly necessary:</strong> required for core functionality such as staying logged in. These
          cannot be switched off without breaking the Service, and do not require consent under the Regulations.
        </li>
        <li>
          <strong>Functional / preference:</strong> remember choices you've made, such as your selected date on the
          Markets page or display preferences.
        </li>
        <li>
          <strong>Analytics (if enabled):</strong> help us understand aggregate usage patterns so we can improve
          the Service. These are only set with your consent.
        </li>
        <li>
          <strong>Marketing (if enabled):</strong> used to measure the effectiveness of any promotional campaigns.
          These are only set with your consent, and OddsBora does not currently use third-party advertising cookies.
        </li>
      </UL>

      <H2 id="table">Cookie Details</H2>
      <P>The table below reflects the cookies currently set by the Service. Update it if this changes.</P>
      <Table
        head={['Name', 'Purpose', 'Type', 'Duration']}
        rows={[
          ['sb-access-token', 'Keeps you signed in to your account (set by Supabase Auth)', 'Strictly necessary', 'Session / short-lived'],
          ['sb-refresh-token', 'Silently renews your session without requiring re-login', 'Strictly necessary', 'Persistent — until logout or expiry'],
          ['[e.g. ob-date-pref]', 'Remembers your last selected date on the Markets page', 'Functional', '[Insert duration]'],
          ['[Insert analytics cookie name, if used]', '[Insert purpose, e.g. aggregate usage analytics]', 'Analytics — requires consent', '[Insert duration]'],
        ]}
      />

      <H2 id="third-party">Third-Party Cookies</H2>
      <P>
        Some cookies may be set by third-party services we rely on to operate the Service, such as our hosting
        provider (Cloudflare) for security and performance purposes. We do not currently use third-party
        advertising networks. If this changes, this policy and our consent mechanism will be updated accordingly.
      </P>

      <H2 id="consent">Your Consent Choices</H2>
      <P>
        On your first visit, you're shown a banner allowing you to accept or decline non-essential cookies
        (functional, analytics, and marketing). You can change your choice at any time using the button below.
      </P>
      <button
        onClick={openCookieSettings}
        className="rounded-full border border-black/10 text-navy-950 text-sm font-semibold px-5 py-2.5 hover:bg-black/5 transition-colors mb-4"
      >
        Manage cookie settings
      </button>

      <H2 id="managing">Managing Cookies in Your Browser</H2>
      <P>
        Most browsers let you block or delete cookies through their settings. Note that blocking strictly necessary
        cookies will prevent you from staying logged in to OddsBora. You can find instructions for common browsers
        via their respective help pages (Chrome, Safari, Firefox, Edge).
      </P>

      <H2 id="changes">Changes to This Policy</H2>
      <P>
        We may update this Cookie Policy as our use of cookies changes. Material changes will be reflected in the
        "Last updated" date above.
      </P>

      <H2 id="contact">Contact</H2>
      <P>
        Questions about our use of cookies can be sent to <strong>[Insert contact email]</strong>.
      </P>
    </LegalPageLayout>
  )
}
