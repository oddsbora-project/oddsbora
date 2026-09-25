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

const SECTIONS = [
  { id: 'acceptance', label: 'Acceptance of Terms' },
  { id: 'eligibility', label: 'Eligibility' },
  { id: 'nature-of-service', label: 'Nature of the Service' },
  { id: 'accounts', label: 'Accounts & Security' },
  { id: 'subscriptions', label: 'Subscriptions & Payments' },
  { id: 'acceptable-use', label: 'Acceptable Use' },
  { id: 'ip', label: 'Intellectual Property' },
  { id: 'disclaimers', label: 'Disclaimers' },
  { id: 'responsible-use', label: 'Responsible Use' },
  { id: 'liability', label: 'Limitation of Liability' },
  { id: 'indemnity', label: 'Indemnification' },
  { id: 'termination', label: 'Termination' },
  { id: 'privacy', label: 'Data Protection' },
  { id: 'governing-law', label: 'Governing Law & Disputes' },
  { id: 'changes', label: 'Changes to These Terms' },
  { id: 'contact', label: 'Contact' },
]

export default function TermsOfService() {
  return (
    <LegalPageLayout
      title="Terms of Service"
      lastUpdated="[Insert publish date]"
      intro="These Terms of Service ('Terms') govern your access to and use of OddsBora (the 'Service'). By creating an account or using the Service, you agree to be bound by these Terms. Please read them carefully."
      sections={SECTIONS}
    >
      <H2 id="acceptance">1. Acceptance of Terms</H2>
      <P>
        By accessing or using OddsBora, you confirm that you have read, understood, and agree to these Terms and
        our Privacy Policy. If you do not agree, please do not use the Service.
      </P>

      <H2 id="eligibility">2. Eligibility</H2>
      <P>
        You must be at least <strong>18 years old</strong> to create an account or use the Service. By registering,
        you represent and warrant that you meet this requirement. We may request proof of age and may suspend or
        terminate accounts where we reasonably believe this requirement is not met.
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

      <H2 id="subscriptions">5. Subscriptions & Payments</H2>
      <P>
        Certain features of the Service may be offered under a paid subscription. Where applicable: [Insert pricing,
        billing cycle, renewal, refund, and cancellation terms once your subscription/payment provider is finalized].
        Payment card details are processed by our third-party payment processor and are not stored on our servers.
      </P>

      <H2 id="acceptable-use">6. Acceptable Use</H2>
      <P>You agree not to:</P>
      <UL>
        <li>Use the Service for any unlawful purpose or in violation of any applicable law, including gambling laws in your jurisdiction;</li>
        <li>Attempt to gain unauthorized access to the Service, other accounts, or our systems;</li>
        <li>Scrape, reverse-engineer, or resell content from the Service without our prior written consent;</li>
        <li>Interfere with or disrupt the integrity or performance of the Service;</li>
        <li>Use the Service if you are located in a jurisdiction where access to sports-odds-related information is prohibited by local law.</li>
      </UL>

      <H2 id="ip">7. Intellectual Property</H2>
      <P>
        All content, branding, model outputs, design, and software comprising the Service are owned by OddsBora or
        its licensors and are protected by applicable intellectual property laws. You are granted a limited,
        non-exclusive, non-transferable license to access and use the Service for personal, non-commercial purposes.
      </P>

      <H2 id="disclaimers">8. Disclaimers</H2>
      <P>
        THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE", WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR
        IMPLIED, INCLUDING WARRANTIES OF ACCURACY, MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR
        NON-INFRINGEMENT. WE DO NOT GUARANTEE THAT MODEL PREDICTIONS WILL BE ACCURATE OR THAT ANY OUTCOME WILL
        OCCUR AS SUGGESTED BY THE SERVICE.
      </P>

      <H2 id="responsible-use">9. Responsible Use</H2>
      <P>
        OddsBora exists to help people read sporting markets more clearly, not to encourage wagering. If you choose
        to act on information from third-party betting operators, you do so entirely at your own discretion and
        risk. If gambling is affecting you or someone you know negatively, please seek support — see our{' '}
        <a href="/responsible-use" className="text-signal-green font-semibold hover:underline">
          Responsible Use
        </a>{' '}
        page for resources.
      </P>

      <H2 id="liability">10. Limitation of Liability</H2>
      <P>
        TO THE MAXIMUM EXTENT PERMITTED BY LAW, ODDSBORA AND ITS OFFICERS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE
        FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA, OR
        GOODWILL, ARISING FROM YOUR USE OF THE SERVICE OR RELIANCE ON ANY CONTENT PROVIDED THROUGH IT, INCLUDING ANY
        LOSSES INCURRED THROUGH THIRD-PARTY BETTING ACTIVITY UNDERTAKEN AFTER VIEWING SERVICE CONTENT.
      </P>

      <H2 id="indemnity">11. Indemnification</H2>
      <P>
        You agree to indemnify and hold harmless OddsBora from any claims, damages, or expenses arising from your
        violation of these Terms or misuse of the Service.
      </P>

      <H2 id="termination">12. Termination</H2>
      <P>
        We may suspend or terminate your access to the Service at any time, with or without notice, for conduct
        that violates these Terms or is harmful to other users, us, or third parties. You may stop using the
        Service and delete your account at any time via your account settings or by contacting us.
      </P>

      <H2 id="privacy">13. Data Protection</H2>
      <P>
        Our collection and use of personal data is governed by our{' '}
        <a href="/privacy-policy" className="text-signal-green font-semibold hover:underline">
          Privacy Policy
        </a>
        , which is incorporated into these Terms by reference, and which is prepared with reference to Kenya's Data
        Protection Act, 2019.
      </P>

      <H2 id="governing-law">14. Governing Law & Dispute Resolution</H2>
      <P>
        These Terms are governed by the laws of the Republic of Kenya. Any dispute arising from these Terms or your
        use of the Service shall be subject to the exclusive jurisdiction of the courts of Kenya, unless the
        parties agree in writing to resolve the dispute through arbitration in accordance with the Arbitration Act
        (Cap. 49 of the Laws of Kenya).
      </P>

      <H2 id="changes">15. Changes to These Terms</H2>
      <P>
        We may revise these Terms from time to time. Continued use of the Service after changes take effect
        constitutes acceptance of the revised Terms. Material changes will be highlighted via the Service or by
        email.
      </P>

      <H2 id="contact">16. Contact</H2>
      <P>
        Questions about these Terms can be sent to <strong>[Insert contact email]</strong>.
      </P>
    </LegalPageLayout>
  )
}
