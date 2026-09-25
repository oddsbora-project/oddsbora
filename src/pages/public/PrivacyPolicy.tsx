import LegalPageLayout from '@/components/LegalPageLayout'

// Small local helpers so the content below stays readable.
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
  { id: 'introduction', label: 'Introduction' },
  { id: 'who-we-are', label: 'Who We Are' },
  { id: 'data-we-collect', label: 'Data We Collect' },
  { id: 'how-we-use-data', label: 'How We Use Your Data' },
  { id: 'cookies', label: 'Cookies & Tracking' },
  { id: 'sharing', label: 'How We Share Data' },
  { id: 'transfers', label: 'International Transfers' },
  { id: 'retention', label: 'Data Retention' },
  { id: 'security', label: 'Data Security' },
  { id: 'your-rights', label: 'Your Rights' },
  { id: 'automated-decisions', label: 'Automated Processing' },
  { id: 'children', label: "Children's Privacy" },
  { id: 'changes', label: 'Changes to This Policy' },
  { id: 'contact', label: 'Contact & Complaints' },
]

export default function PrivacyPolicy() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      lastUpdated="[Insert publish date]"
      intro="This Privacy Policy explains how OddsBora ('we', 'us', 'our') collects, uses, discloses, and protects personal data belonging to users of our website and services (the 'Service'), in accordance with Kenya's Data Protection Act, 2019 ('the Act'), the Data Protection (General) Regulations, 2021, and guidance issued by the Office of the Data Protection Commissioner ('ODPC')."
      sections={SECTIONS}
    >
      <H2 id="introduction">Introduction</H2>
      <P>
        OddsBora is an AI-powered sports intelligence platform that provides probability models, market analysis,
        and informational commentary on sporting fixtures. We are not a bookmaker and do not accept wagers.
        Because we process personal data of individuals in Kenya, and may process data of individuals outside
        Kenya who use our Service, we are committed to handling that data lawfully, fairly, and transparently, in
        line with the data protection principles set out in Section 25 of the Act.
      </P>

      <H2 id="who-we-are">Who We Are (Data Controller)</H2>
      <P>
        For the purposes of the Act, OddsBora acts as the <strong>data controller</strong> of personal data
        collected through the Service.
      </P>
      <UL>
        <li><strong>Legal / trading name:</strong> [Insert registered company name]</li>
        <li><strong>Registered address:</strong> [Insert physical/postal address]</li>
        <li><strong>ODPC registration number:</strong> [Insert once registered with the ODPC, per Section 18 of the Act]</li>
        <li><strong>Data Protection contact / Data Protection Officer:</strong> [Insert name/email]</li>
      </UL>
      <P>
        Under Section 18 of the Act, data controllers processing personal data (other than for purely personal or
        household purposes) are generally required to register with the ODPC. If OddsBora processes personal data
        at a scale that falls within the registration thresholds set by the Commissioner, this registration must be
        completed before, or promptly after, this policy is published.
      </P>

      <H2 id="data-we-collect">Data We Collect</H2>
      <P>We collect the following categories of personal data, depending on how you use the Service:</P>
      <Table
        head={['Category', 'Examples']}
        rows={[
          ['Account data', 'Full name, email address, password (stored as a salted hash, never in plain text), username'],
          ['Profile & preference data', 'Country, favorite teams/leagues, notification preferences, subscription tier'],
          ['Usage data', 'Pages viewed, matches favorited, features used, device/browser type, approximate location inferred from IP address'],
          ['Communications data', 'Support requests, correspondence with us, audit logs of admin actions (for staff accounts only)'],
          ['Payment data (if applicable)', 'Subscription/billing status. Card details are processed directly by our payment processor and are not stored on our own servers.'],
          ['Cookies & similar technologies', 'See our Cookie Policy for full details.'],
        ]}
      />
      <P>
        We do <strong>not</strong> intentionally collect special categories of personal data (e.g. health, biometric,
        religious, or political data) as defined in Section 2 of the Act, and you should not submit such data to us.
      </P>

      <H2 id="how-we-use-data">How We Use Your Data</H2>
      <P>
        Section 30 of the Act requires that every instance of processing rest on a valid lawful basis. We rely on
        the following:
      </P>
      <Table
        head={['Purpose', 'Lawful Basis (Section 30)']}
        rows={[
          ['Creating and managing your account', 'Performance of a contract with you'],
          ['Providing model predictions, signals, and the Markets page', 'Performance of a contract with you'],
          ['Sending transactional emails (password resets, account notices)', 'Performance of a contract with you / legitimate interest'],
          ['Sending optional marketing or product updates', 'Consent — you may withdraw this at any time'],
          ['Improving the Service and understanding usage patterns', 'Legitimate interest, balanced against your rights'],
          ['Detecting fraud, abuse, or breaches of our Terms of Service', 'Legitimate interest / legal obligation'],
          ['Complying with tax, financial, or regulatory record-keeping', 'Legal obligation'],
        ]}
      />

      <H2 id="cookies">Cookies & Tracking</H2>
      <P>
        We use cookies and similar technologies to keep you logged in, remember preferences, and (where you consent)
        understand how the Service is used. Full details, including a list of the specific cookies we set and how
        to manage them, are set out in our{' '}
        <a href="/cookie-policy" className="text-signal-green font-semibold hover:underline">
          Cookie Policy
        </a>
        .
      </P>

      <H2 id="sharing">How We Share Data</H2>
      <P>We do not sell your personal data. We share data only with:</P>
      <UL>
        <li>
          <strong>Service providers (data processors)</strong> who host or process data on our behalf under
          contract, currently including Supabase (database, authentication) and Cloudflare (hosting, content
          delivery). These providers are contractually restricted from using your data for their own purposes.
        </li>
        <li><strong>Sports-data and odds providers</strong>, to the extent needed to generate match and market content — this does not typically involve your personal data.</li>
        <li><strong>Payment processors</strong>, if you subscribe to a paid tier.</li>
        <li><strong>Regulators or law enforcement</strong>, where we are legally compelled to disclose data.</li>
        <li><strong>A successor entity</strong>, in the event of a merger, acquisition, or sale of assets, subject to equivalent privacy protections.</li>
      </UL>

      <H2 id="transfers">International Data Transfers</H2>
      <P>
        Some of our service providers process data outside Kenya. Sections 48–51 of the Act restrict the transfer
        of personal data outside Kenya unless the destination country has adequate data protection safeguards, the
        transfer is subject to appropriate contractual safeguards (such as standard contractual clauses), or you
        have given your explicit consent to the transfer.
      </P>
      <P>
        [Insert specific detail here once confirmed: e.g. "Our database infrastructure is hosted with Supabase in
        the [region] region. We rely on [contractual safeguards / your consent at registration] as the basis for
        this transfer, consistent with Sections 48–51 of the Act."] This section should be finalized with input
        from your infrastructure and legal teams before publishing.
      </P>

      <H2 id="retention">Data Retention</H2>
      <P>
        We retain personal data only for as long as necessary to fulfil the purposes described in this policy,
        after which it is deleted or anonymized, unless a longer retention period is required by law (for example,
        financial record-keeping obligations).
      </P>
      <UL>
        <li><strong>Active accounts:</strong> retained for as long as the account exists.</li>
        <li><strong>Deleted/inactive accounts:</strong> personal data is deleted within [Insert period, e.g. 30–90 days] of account deletion, except where retention is required by law.</li>
        <li><strong>Audit and security logs:</strong> retained for [Insert period] to support fraud prevention and security investigations.</li>
      </UL>

      <H2 id="security">Data Security</H2>
      <P>
        In line with Section 41 of the Act, we implement technical and organizational measures appropriate to the
        risk, including encryption of data in transit (HTTPS/TLS), hashed password storage, role-based access
        controls restricting administrative access, and Row Level Security on our database so that users can only
        access data they are authorized to see.
      </P>
      <P>
        In the event of a personal data breach likely to result in risk to your rights and freedoms, we will notify
        the ODPC within 72 hours of becoming aware of the breach, and will notify affected individuals without
        undue delay, as required by Section 43 of the Act.
      </P>

      <H2 id="your-rights">Your Rights Under the Data Protection Act</H2>
      <P>Section 26 of the Act gives you the following rights over your personal data:</P>
      <UL>
        <li><strong>Right to be informed</strong> of the use to which your personal data is to be put.</li>
        <li><strong>Right of access</strong> to the personal data we hold about you.</li>
        <li><strong>Right to correction</strong> of inaccurate or misleading data.</li>
        <li><strong>Right to erasure</strong> of false or unlawfully obtained data, or data we no longer have a lawful basis to hold.</li>
        <li><strong>Right to object</strong> to processing of your data, including for direct marketing.</li>
        <li><strong>Right to data portability</strong>, where technically feasible.</li>
        <li><strong>Right to withdraw consent</strong> at any time, where processing is based on consent, without affecting processing carried out before withdrawal.</li>
      </UL>
      <P>
        To exercise any of these rights, contact us using the details in the "Contact & Complaints" section below.
        We will respond within a reasonable timeframe consistent with the Act and its Regulations.
      </P>

      <H2 id="automated-decisions">Automated Processing & Profiling</H2>
      <P>
        Our Service uses an automated model to generate probability estimates and signals for sporting fixtures.
        This automated processing is applied to <em>match and market data</em>, not to make legal or similarly
        significant decisions about you as an individual. Where we personalize content shown to you (for example,
        favorites or notification preferences), this is based on your own explicit settings, and Section 35 of the
        Act's protections around solely automated decision-making with legal effect do not apply, as no such
        decisions are made about individual users.
      </P>

      <H2 id="children">Children's Privacy</H2>
      <P>
        The Service is intended for individuals aged 18 and above. We do not knowingly collect personal data from
        anyone under 18. If we become aware that we have inadvertently collected data from a minor, we will delete
        it promptly. If you believe a minor has provided us with personal data, please contact us immediately.
      </P>

      <H2 id="changes">Changes to This Policy</H2>
      <P>
        We may update this Privacy Policy from time to time to reflect changes in our practices or legal
        requirements. Material changes will be notified to you via the Service or by email, and the "Last updated"
        date at the top of this page will be revised accordingly.
      </P>

      <H2 id="contact">Contact & Complaints</H2>
      <P>
        If you have questions about this Privacy Policy or wish to exercise your rights, contact us at:{' '}
        <strong>[Insert contact email]</strong>.
      </P>
      <P>
        If you are not satisfied with our response, you have the right to lodge a complaint with the Office of the
        Data Protection Commissioner:
      </P>
      <UL>
        <li>Office of the Data Protection Commissioner, Kenya</li>
        <li>Website: odpc.go.ke</li>
        <li>[Insert current ODPC physical address / phone / email, as published on odpc.go.ke, at time of publishing]</li>
      </UL>
    </LegalPageLayout>
  )
}
