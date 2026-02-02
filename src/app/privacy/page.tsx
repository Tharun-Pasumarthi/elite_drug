import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-950 dark:to-slate-900 py-12">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Privacy <span className="text-[#FF8C00] dark:text-orange-400">Policy</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Last Updated: January 13, 2026</p>
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12 space-y-8 border border-gray-100 dark:border-slate-700">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">1. Introduction</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Elite Drug ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">2.1 Personal Information</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                <li>Register for an account</li>
                <li>Place an order or make a purchase</li>
                <li>Subscribe to our newsletter</li>
                <li>Contact customer support</li>
                <li>Participate in surveys or promotions</li>
              </ul>
              
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                This information may include: name, email address, phone number, delivery address, billing address, date of birth, payment information, prescription details, and health information necessary for order fulfillment.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-6">2.2 Health Information</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                When you order prescription medications, we collect health information including prescriptions, medical conditions, and medication history. This sensitive information is handled in strict accordance with healthcare privacy regulations including HIPAA (Health Insurance Portability and Accountability Act) and other applicable laws.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">2.3 Automatically Collected Information</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                When you visit our website, we automatically collect certain information about your device:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>IP address and location data</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Pages visited and time spent</li>
                <li>Referring website addresses</li>
                <li>Cookies and tracking technologies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Process and fulfill your orders</li>
                <li>Verify prescriptions with healthcare providers</li>
                <li>Communicate with you about orders and services</li>
                <li>Provide customer support</li>
                <li>Send marketing communications (with your consent)</li>
                <li>Improve our website and services</li>
                <li>Prevent fraud and ensure security</li>
                <li>Comply with legal and regulatory requirements</li>
                <li>Maintain medication interaction alerts and safety notifications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Information Sharing and Disclosure</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                We may share your information with:
              </p>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">4.1 Service Providers</h3>
              <p className="text-gray-700 leading-relaxed">
                Third-party vendors who perform services on our behalf, including payment processing, order fulfillment, shipping, data analysis, email delivery, and hosting services.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">4.2 Healthcare Professionals</h3>
              <p className="text-gray-700 leading-relaxed">
                Your prescribing physician or healthcare provider to verify prescriptions and ensure medication safety.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">4.3 Legal Requirements</h3>
              <p className="text-gray-700 leading-relaxed">
                Government agencies, regulatory authorities, or law enforcement when required by law or to protect our rights and safety.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">4.4 Business Transfers</h3>
              <p className="text-gray-700 leading-relaxed">
                In connection with a merger, sale, acquisition, or other business transaction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
              <p className="text-gray-700 leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal information, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mt-3">
                <li>SSL/TLS encryption for data transmission</li>
                <li>Secure servers and encrypted databases</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Restricted access to personal information</li>
                <li>Employee training on data protection</li>
                <li>HIPAA-compliant data handling procedures</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Privacy Rights</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Depending on your location, you may have the following rights:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li><strong>Access:</strong> Request a copy of your personal information</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Receive your data in a portable format</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                <li><strong>Restriction:</strong> Limit how we use your information</li>
                <li><strong>Object:</strong> Object to certain data processing activities</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                To exercise these rights, please contact us at privacy@elitedrug.com
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookies and Tracking Technologies</h2>
              <p className="text-gray-700 leading-relaxed">
                We use cookies and similar tracking technologies to enhance your experience. You can control cookies through your browser settings. Note that disabling cookies may affect website functionality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Third-Party Links</h2>
              <p className="text-gray-700 leading-relaxed">
                Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Children's Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. International Data Transfers</h2>
              <p className="text-gray-700 leading-relaxed">
                Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Data Retention</h2>
              <p className="text-gray-700 leading-relaxed">
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, comply with legal obligations, resolve disputes, and enforce our agreements. Medical and prescription records are retained in accordance with applicable healthcare regulations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Changes to This Privacy Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section className="bg-gray-50 rounded-lg p-6 border-l-4 border-[#FF8C00]">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Elite Drug</strong></p>
                <p>Email: privacy@elitedrug.com</p>
                <p>Phone: +1 (800) 123-4567</p>
                <p>Address: 123 Healthcare Ave, Medical District, State 12345</p>
              </div>
            </section>
          </div>
        </div>
      </div>

      <ScrollToTop />
      <Footer />
    </>
  );
}
