import LegalPageLayout from '@/components/LegalPageLayout'

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
const Callout = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-2xl border border-signal-yellow/30 bg-signal-yellow/5 p-4 mb-6">
    <p className="text-sm text-navy-950 leading-relaxed">{children}</p>
  </div>
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
  { id: 'acceptance', label: 'Acceptance of Terms' },
  { id: 'eligibility', label: 'Eligibility' },
  { id: 'nature-of-service', label: 'Nature of the Service' },
  { id: 'accounts', label: 'Accounts & Security' },
  { id: 'subscriptions', label: 'Plans, Payments & Refunds' },
  { id: 'acceptable-use', label: 'Acceptable Use' },
  { id: 'ip', label: 'Intellectual Property' },
  { id: 'disclaimers', label: 'Disclaimers' },
  { id: 'affiliates', label: 'Third-Party Links & Affiliates' },
  { id: 'responsible-use', label: 'Responsible Use' },
  { id: 'liability', label: 'Limitation of Liability' },
  { id: 'indemnity', label: 'Indemnification' },
  { id: 'termination', label: 'Termination & Account Deletion' },
  { id: 'privacy', label: 'Data Protection' },
  { id: 'governing-law', label: 'Governing Law & Disputes' },
  { id: 'changes', label: 'Changes to These Terms' },
  { id: 'contact', label: 'Contact' },
]

export default function TermsOfService() {
  return (
    <LegalPageLayout
      title="Terms of Service"
      lastUpdated="28 September 2026"
      intro="These Terms of Service ('Terms') govern your access to and use of OddsBora (the 'Service'). The Service is operated by OddsBora Enterprises, a sole proprietorship in Kenya ('OddsBora', 'we', 'us'). By creating an account or using the Service, you agree to be bound by these Terms. Please read them carefully."
      sections={SECTIONS}
    >
      <H2 id="acceptance">1. Acceptance of Terms</H2>
      <P>
        By accessing or using OddsBora, you confirm that you have read, understood, and agree to these Terms and
        our Privacy Policy. If you do not agree, please do not use the Service.
      </P>

      <H2 id="eligibility">2. Eligibility</H2>
      <P>To use the Service you must:</P>
      <UL>
        <li>be at least <strong>18 years old</strong>; and</li>
        <li>be located in <strong>Kenya</strong> when you use the Service.</li>
      </UL>
      <P>
        By registering, you represent and warrant that you meet both requirements. We may ask for proof of age or
        location and may suspend or terminate accounts where we reasonably believe either requirement is not met.
      </P>

      <H2 id="nature-of-service">3. Nature of the Service</H2>
      <Callout>
        OddsBora is an analytics and information platform. <strong>We are not a bookmaker, betting operator, or
        gambling exchange</strong>, we do not accept wagers, and we do not facilitate betting transactions of any
        kind. We present statistical probability models alongside publicly available market odds for
        informational and educational purposes only.
      </Callout>
      <P>
        Model probabilities, "edge" indicators, confidence labels, and related content are outputs of a statistical
        model and are provided <strong>"as is"</strong>, without any guarantee of accuracy or outcome. Past
        performance of the model is not indicative of future results. Nothing on the Service constitutes financial,
        investment, or gambling advice, and no content should be construed as a recommendation to place a bet or
        wager with any third party.
      </P>

      <H2 id="accounts">4. Accounts & Security</H2>
      <UL>
        <li>You are responsible for maintaining the confidentiality of your password and for all activity under your account.</li>
        <li>You must provide accurate registration information and keep it up to date.</li>
        <li>You must notify us promptly of any unauthorized use of your account.</li>
        <li>We reserve the right to suspend or terminate accounts that violate these Terms.</li>
      </UL>

      <H2 id="subscriptions">5. Plans, Payments & Refunds</H2>
      <P>The Service is offered under the following plans:</P>
      <Table
        head={['Plan', 'Price', 'Access period']}
        rows={[
          ['Free', 'KES 0', 'Ongoing, with limited features'],
          ['Weekly', 'KES 60', '7 days from purchase'],
          ['Monthly', 'KES 200', '30 days from purchase'],
        ]}
      />
      <UL>
        <li>
          <strong>Payment methods.</strong> Payments are made in Kenyan Shillings (KES) through M-Pesa or SmartPay
          wallet. Payments are processed by those third-party providers, whose own terms apply. We do not store
          your M-Pesa PIN or wallet credentials.
        </li>
        <li>
          <strong>Access period.</strong> A paid plan gives you access to paid features for the period you have
          paid for. When that period ends, your account returns to the Free plan unless you purchase again.
        </li>
        <li>
          <strong>Free plan.</strong> Features included in the Free plan are limited and may change from time to
          time.
        </li>
        <li>
          <strong>Price changes.</strong> We may change plan prices. Changes apply only to purchases made after
          the change takes effect, and we will give at least 14 days' notice.
        </li>
      </UL>
      <Callout>
        <strong>No refunds.</strong> OddsBora is a pay-as-you-use service. All payments are final and
        non-refundable. This includes situations where you stop using the Service, close or delete your account, or
        are otherwise unable to use a paid plan before its period ends. There is no cancellation process for a
        period you have already paid for, and cancelling or deleting your account does not entitle you to a refund
        of any unused time. This does not limit any right to a refund that applies by law and cannot be excluded.
      </Callout>

      <H2 id="acceptable-use">6. Acceptable Use</H2>
      <P>You agree not to:</P>
      <UL>
        <li>Use the Service for any unlawful purpose or in violation of any law that applies to you, including gambling laws;</li>
        <li>Use the Service from outside Kenya or misrepresent your location;</li>
        <li>Attempt to gain unauthorized access to the Service, other accounts, or our systems;</li>
        <li>Scrape, reverse-engineer, or resell content from the Service without our prior written consent;</li>
        <li>Share your paid access with other people or resell it;</li>
        <li>Interfere with or disrupt the integrity or performance of the Service.</li>
      </UL>

      <H2 id="ip">7. Intellectual Property</H2>
      <P>
        All content, branding, model outputs, design, and software comprising the Service are owned by OddsBora
        Enterprises or its licensors and are protected by applicable intellectual property laws. You are granted a
        limited, non-exclusive, non-transferable license to access and use the Service for personal,
        non-commercial purposes.
      </P>

      <H2 id="disclaimers">8. Disclaimers</H2>
      <P>
        THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE", WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR
        IMPLIED, INCLUDING WARRANTIES OF ACCURACY, MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR
        NON-INFRINGEMENT. WE DO NOT GUARANTEE THAT MODEL PREDICTIONS WILL BE ACCURATE OR THAT ANY OUTCOME WILL
        OCCUR AS SUGGESTED BY THE SERVICE.
      </P>

      <H2 id="affiliates">9. Third-Party Links & Affiliates</H2>
      <P>
        The Service may contain links to third-party websites, including licensed betting operators. We do not
        operate, control, or endorse those third parties, and we are not responsible for their content, products,
        or practices. Your dealings with them are solely between you and them, under their terms.
      </P>
      <P>
        <strong>Affiliate disclosure.</strong> We may earn a commission when you register with or use a third-party
        operator through a link on the Service. Where we do, we will clearly label the link as an affiliate link.
        Model outputs are generated independently of any commercial relationship we have with a third party.
      </P>

      <H2 id="responsible-use">10. Responsible Use</H2>
      <P>
        OddsBora exists to help people read sporting markets more clearly, not to encourage wagering. If you choose
        to act on information from third-party betting operators, you do so entirely at your own discretion and
        risk. If gambling is affecting you or someone you know negatively, please seek support. See our{' '}
        <a href="/responsible-use" className="text-signal-green font-semibold hover:underline">
          Responsible Use
        </a>{' '}
        page for resources.
      </P>

      <H2 id="liability">11. Limitation of Liability</H2>
      <P>
        TO THE MAXIMUM EXTENT PERMITTED BY LAW, ODDSBORA ENTERPRISES AND ITS OWNER, EMPLOYEES, AND AGENTS SHALL NOT
        BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS,
        DATA, OR GOODWILL, ARISING FROM YOUR USE OF THE SERVICE OR RELIANCE ON ANY CONTENT PROVIDED THROUGH IT,
        INCLUDING ANY LOSSES INCURRED THROUGH THIRD-PARTY BETTING ACTIVITY UNDERTAKEN AFTER VIEWING SERVICE
        CONTENT.
      </P>
      <P>
        OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING FROM OR RELATED TO THE SERVICE SHALL NOT EXCEED THE TOTAL
        AMOUNT YOU PAID TO US FOR THE SERVICE IN THE 12 MONTHS BEFORE THE EVENT GIVING RISE TO THE CLAIM. THIS LIMIT
        IS NOT A REFUND ENTITLEMENT AND DOES NOT CHANGE THE NO-REFUND TERMS IN SECTION 5. NOTHING IN THESE TERMS
        EXCLUDES OR LIMITS LIABILITY THAT CANNOT BE EXCLUDED OR LIMITED UNDER THE LAWS OF KENYA.
      </P>

      <H2 id="indemnity">12. Indemnification</H2>
      <P>
        You agree to indemnify and hold harmless OddsBora Enterprises from any claims, damages, or expenses arising
        from your violation of these Terms or misuse of the Service.
      </P>

      <H2 id="termination">13. Termination & Account Deletion</H2>
      <P>
        We may suspend or terminate your access to the Service at any time, with or without notice, for conduct
        that violates these Terms or is harmful to other users, us, or third parties.
      </P>
      <P>
        <strong>You can delete your account yourself at any time.</strong> Go to Profile in the app and choose
        "Delete my account". For your security, we email a verification code to the address on your account, and
        the deletion completes once you enter that code. Deletion is permanent: your profile, favorites,
        notifications, preferences, and subscription record are removed, as described in our Privacy Policy.
        Deleting your account does not entitle you to a refund (see Section 5).
      </P>

      <H2 id="privacy">14. Data Protection</H2>
      <P>
        Our collection and use of personal data is governed by our{' '}
        <a href="/privacy-policy" className="text-signal-green font-semibold hover:underline">
          Privacy Policy
        </a>
        , which is incorporated into these Terms by reference, and which is prepared with reference to Kenya's Data
        Protection Act, 2019.
      </P>

      <H2 id="governing-law">15. Governing Law & Dispute Resolution</H2>
      <P>
        These Terms are governed by the laws of the Republic of Kenya. Any dispute arising from these Terms or your
        use of the Service shall be subject to the exclusive jurisdiction of the courts of Kenya, unless the
        parties agree in writing to resolve the dispute through arbitration in accordance with the Arbitration Act
        (Cap. 49 of the Laws of Kenya).
      </P>

      <H2 id="changes">16. Changes to These Terms</H2>
      <P>
        We may revise these Terms from time to time. For material changes we will give you at least{' '}
        <strong>14 days' notice</strong> through the Service or by email before the changes take effect. If you
        continue to use the Service after the changes take effect, you accept the revised Terms. If you do not
        agree to them, you should stop using the Service and may delete your account.
      </P>

      <H2 id="contact">17. Contact</H2>
      <P>
        OddsBora Enterprises is a sole proprietorship in Kenya. The business operates remotely and does not
        maintain a public physical address. Questions about these Terms can be sent to{' '}
        <strong>terms@oddsbora.com</strong>.
      </P>
    </LegalPageLayout>
  )
}
