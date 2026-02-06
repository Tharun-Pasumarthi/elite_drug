import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

export default function Compliance() {
  return (
    <>
      <Header />
      
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-950 dark:to-slate-900 py-12">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Regulatory <span className="text-[#FF8C00] dark:text-orange-400">Compliance</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Our Commitment to Healthcare Standards and Regulations</p>
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12 space-y-8 border border-gray-100 dark:border-slate-700">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">1. Regulatory Overview</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Elite Drug is committed to maintaining the highest standards of compliance with all applicable pharmaceutical laws, regulations, and industry best practices. We operate in full accordance with federal, state, and local regulations governing the sale and distribution of pharmaceutical products, medical devices, and healthcare services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">2. FDA Compliance</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">2.1 Food and Drug Administration (FDA) Regulations</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                We strictly adhere to FDA regulations concerning:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                <li>Drug safety and quality standards</li>
                <li>Proper labeling and packaging requirements</li>
                <li>Adverse event reporting (MedWatch)</li>
                <li>Current Good Manufacturing Practice (cGMP) compliance</li>
                <li>Risk Evaluation and Mitigation Strategies (REMS)</li>
                <li>Drug Supply Chain Security Act (DSCSA) requirements</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-6">2.2 Product Authenticity</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                All medications are sourced from FDA-approved manufacturers and authorized distributors. We maintain comprehensive track-and-trace records to ensure product authenticity and prevent counterfeit drugs from entering our supply chain.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. HIPAA Compliance</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">3.1 Health Insurance Portability and Accountability Act</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                We are fully compliant with HIPAA regulations to protect your protected health information (PHI):
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Privacy Rule compliance for PHI protection</li>
                <li>Security Rule implementation for electronic PHI (ePHI)</li>
                <li>Breach Notification Rule adherence</li>
                <li>Business Associate Agreements with third-party vendors</li>
                <li>Regular risk assessments and audits</li>
                <li>Employee training on HIPAA requirements</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">3.2 Patient Rights</h3>
              <p className="text-gray-700 leading-relaxed">
                Under HIPAA, you have the right to access, amend, and request an accounting of disclosures of your health information. For more details, please see our Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. DEA and Controlled Substances</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">4.1 DEA Registration</h3>
              <p className="text-gray-700 leading-relaxed">
                Elite Drug maintains current Drug Enforcement Administration (DEA) registration for handling controlled substances. We strictly comply with the Controlled Substances Act (CSA) and applicable state laws.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">4.2 Controlled Substance Protocols</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Our controlled substance handling includes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Secure storage and inventory management</li>
                <li>Detailed record-keeping and reporting</li>
                <li>Prescription verification and validation</li>
                <li>Quantity limits in accordance with regulations</li>
                <li>Regular inventory reconciliation</li>
                <li>Theft and loss reporting to DEA</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">4.3 Prescription Drug Monitoring Program (PDMP)</h3>
              <p className="text-gray-700 leading-relaxed">
                We participate in state Prescription Drug Monitoring Programs to help prevent prescription drug abuse and diversion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. State Pharmacy Regulations</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">5.1 Licensing and Accreditation</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Elite Drug maintains:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Valid pharmacy licenses in all states where we operate</li>
                <li>Board of Pharmacy compliance in each jurisdiction</li>
                <li>National Association of Boards of Pharmacy (NABP) accreditation</li>
                <li>VIPPS (Verified Internet Pharmacy Practice Sites) certification</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">5.2 Professional Standards</h3>
              <p className="text-gray-700 leading-relaxed">
                Our licensed pharmacists adhere to state-specific pharmacy practice acts, continuing education requirements, and professional standards of care.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Quality Assurance and Safety</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">6.1 Quality Management System</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                We maintain comprehensive quality assurance programs including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Standard Operating Procedures (SOPs) for all processes</li>
                <li>Regular quality audits and inspections</li>
                <li>Medication error prevention and reporting</li>
                <li>Product recall procedures</li>
                <li>Temperature monitoring for storage and shipping</li>
                <li>Expiration date management</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">6.2 Patient Safety</h3>
              <p className="text-gray-700 leading-relaxed">
                We implement multiple safety checks including drug interaction screening, allergy alerts, duplicate therapy checks, and dose range verification.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Protection and Cybersecurity</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">7.1 Information Security</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                We comply with industry-standard cybersecurity frameworks:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>PCI DSS compliance for payment card data</li>
                <li>NIST Cybersecurity Framework implementation</li>
                <li>Regular penetration testing and vulnerability assessments</li>
                <li>Incident response and disaster recovery plans</li>
                <li>Employee cybersecurity training</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">7.2 Electronic Prescriptions</h3>
              <p className="text-gray-700 leading-relaxed">
                We support EPCS (Electronic Prescriptions for Controlled Substances) in compliance with DEA requirements for two-factor authentication and audit trails.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Environmental and Safety Standards</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">8.1 Environmental Protection</h3>
              <p className="text-gray-700 leading-relaxed">
                We comply with EPA regulations for pharmaceutical waste disposal and environmental protection, including proper handling of hazardous materials.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">8.2 OSHA Compliance</h3>
              <p className="text-gray-700 leading-relaxed">
                We maintain workplace safety standards in accordance with Occupational Safety and Health Administration (OSHA) requirements, including hazard communication, bloodborne pathogens, and emergency preparedness.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Anti-Fraud and Anti-Corruption</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">9.1 Healthcare Fraud Prevention</h3>
              <p className="text-gray-700 leading-relaxed">
                We comply with the False Claims Act, Anti-Kickback Statute, and Stark Law to prevent healthcare fraud and abuse.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">9.2 Corporate Integrity</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Our compliance program includes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Code of Conduct and Ethics</li>
                <li>Compliance Officer and oversight committee</li>
                <li>Anonymous reporting hotline</li>
                <li>Regular compliance training</li>
                <li>Internal auditing and monitoring</li>
                <li>Disciplinary procedures for violations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Accessibility Compliance</h2>
              <p className="text-gray-700 leading-relaxed">
                Our website and services comply with the Americans with Disabilities Act (ADA) and Web Content Accessibility Guidelines (WCAG) 2.1 Level AA to ensure accessibility for all users.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. International Compliance</h2>
              <p className="text-gray-700 leading-relaxed">
                For international operations, we comply with relevant regulations including GDPR (General Data Protection Regulation) for European customers and local pharmaceutical regulations in each jurisdiction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Continuous Improvement</h2>
              <p className="text-gray-700 leading-relaxed">
                We regularly review and update our compliance programs to reflect changes in regulations, industry best practices, and emerging healthcare standards. Our compliance team monitors regulatory developments and implements necessary changes promptly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Reporting Violations</h2>
              <p className="text-gray-700 leading-relaxed">
                If you become aware of any potential compliance violations or have concerns about our practices, please report them immediately to our Compliance Department. We prohibit retaliation against anyone who reports concerns in good faith.
              </p>
            </section>

            <section className="bg-gray-50 dark:bg-slate-800/50 rounded-lg p-6 border-l-4 border-[#FF8C00]">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">14. Compliance Contact Information</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                For compliance-related questions or to report concerns:
              </p>
              <div className="space-y-2 text-gray-700 dark:text-gray-300">
                <p><strong>Elite Drug Compliance Department</strong></p>
                <p>Email: <a href="mailto:info@elitedrug.com" className="text-orange-600 dark:text-orange-400 hover:underline">info@elitedrug.com</a></p>
                <p>WhatsApp: <a href="https://wa.me/919182351261" target="_blank" rel="noopener noreferrer" className="text-orange-600 dark:text-orange-400 hover:underline">+91 9182351261</a></p>
                <p className="text-sm leading-relaxed">Address: #440, 3rd C.K. Nagara, Hosa Road,<br/>Electronic City Post, Bangalore – 560100</p>
              </div>
            </section>

            <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500 mt-8">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Certifications & Accreditations</h3>
              <div className="grid md:grid-cols-2 gap-4 text-gray-700 text-sm">
                <div>
                  <p className="font-semibold">✓ FDA Registered Facility</p>
                  <p className="font-semibold">✓ DEA Licensed</p>
                  <p className="font-semibold">✓ NABP Accredited</p>
                  <p className="font-semibold">✓ VIPPS Certified</p>
                </div>
                <div>
                  <p className="font-semibold">✓ HIPAA Compliant</p>
                  <p className="font-semibold">✓ PCI DSS Certified</p>
                  <p className="font-semibold">✓ ISO 9001 Quality Standards</p>
                  <p className="font-semibold">✓ State Licensed Pharmacy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ScrollToTop />
      <Footer />
    </>
  );
}
