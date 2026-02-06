import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

export default function TermsOfService() {
  return (
    <>
      <Header />
      
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-950 dark:to-slate-900 py-12">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Terms of <span className="text-[#FF8C00] dark:text-orange-400">Service</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Last Updated: January 13, 2026</p>
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12 space-y-8 border border-gray-100 dark:border-slate-700">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                These Terms of Service constitute a legally binding agreement between you and Elite Drug ("Company," "we," "us," or "our") concerning your access to and use of our website and pharmaceutical services. By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of these terms, you may not access our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">2. Eligibility and Account Registration</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">2.1 Age Requirement</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                You must be at least 18 years of age to use our services. By using our services, you represent and warrant that you meet this age requirement.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-4">2.2 Account Accuracy</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                You agree to provide accurate, current, and complete information during registration and to update such information to maintain its accuracy. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-4">2.3 Account Security</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                You must immediately notify us of any unauthorized use of your account or any other breach of security. We will not be liable for any loss or damage arising from your failure to comply with this security obligation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">3. Prescription Medications</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">3.1 Valid Prescription Required</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                Prescription medications require a valid prescription from a licensed healthcare provider. We reserve the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                <li>Verify prescriptions with your healthcare provider</li>
                <li>Refuse to fill prescriptions that appear invalid or fraudulent</li>
                <li>Limit quantities based on prescription guidelines</li>
                <li>Request additional documentation as needed</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-4">3.2 Prescription Transfers</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We may transfer prescriptions to and from other pharmacies as permitted by law and with appropriate authorization.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-4">3.3 Medication Counseling</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Our licensed pharmacists are available to answer questions about your medications. However, our services do not replace professional medical advice, diagnosis, or treatment from your healthcare provider.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">4. Orders and Payments</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">4.1 Order Acceptance</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order for any reason, including but not limited to product availability, errors in pricing or product information, or suspected fraud.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-4">4.2 Pricing</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Prices are subject to change without notice. We strive to provide accurate pricing information, but errors may occur. If we discover an error in pricing, we will notify you and give you the option to cancel your order or pay the correct price.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-4">4.3 Payment Methods</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We accept various payment methods as displayed on our website. Payment must be received before order fulfillment. You authorize us to charge your payment method for the total amount of your order, including applicable taxes and shipping fees.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-4">4.4 Insurance Claims</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                If you use insurance, we will submit claims on your behalf. You are responsible for any copayments, deductibles, or amounts not covered by your insurance.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">5. Shipping and Delivery</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">5.1 Delivery Times</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Estimated delivery times are provided in good faith but are not guaranteed. We are not responsible for delays caused by shipping carriers, weather, or other circumstances beyond our control.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-4">5.2 Shipping Address</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                You are responsible for providing an accurate shipping address. We may require signature confirmation for controlled substances or high-value orders.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-4">5.3 Temperature-Sensitive Medications</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Some medications require special handling and expedited shipping. Additional fees may apply.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">6. Returns and Refunds</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">6.1 Return Policy</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                Due to safety and regulatory requirements, we cannot accept returns of:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                <li>Prescription medications</li>
                <li>Opened or used products</li>
                <li>Temperature-sensitive medications</li>
                <li>Controlled substances</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-4">6.2 Damaged or Incorrect Orders</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                If you receive a damaged or incorrect order, contact us within 48 hours of delivery. We will arrange for a replacement or refund as appropriate.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-4">6.3 Refund Processing</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Approved refunds will be processed to the original payment method within 7-10 business days.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">7. Intellectual Property Rights</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                All content on our website, including text, graphics, logos, images, and software, is the property of Elite Drug or its licensors and is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without our express written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">8. Prohibited Uses</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                You agree not to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                <li>Use our services for any unlawful purpose</li>
                <li>Provide false or misleading information</li>
                <li>Submit fraudulent prescriptions</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with the proper functioning of our website</li>
                <li>Resell or distribute medications obtained through our services</li>
                <li>Use automated systems to access our website without permission</li>
                <li>Violate any applicable laws or regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">9. Disclaimer of Warranties</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT OUR SERVICES WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE. WE DO NOT WARRANT THE ACCURACY OR COMPLETENESS OF INFORMATION PROVIDED ON OUR WEBSITE.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">10. Limitation of Liability</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, ELITE DRUG SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR USE, ARISING OUT OF OR IN CONNECTION WITH OUR SERVICES. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT PAID BY YOU FOR THE SPECIFIC PRODUCT OR SERVICE GIVING RISE TO THE CLAIM.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">11. Indemnification</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                You agree to indemnify, defend, and hold harmless Elite Drug and its officers, directors, employees, and agents from any claims, liabilities, damages, losses, and expenses arising out of your use of our services, violation of these Terms, or violation of any rights of another party.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">12. Governing Law and Dispute Resolution</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Elite Drug operates, without regard to conflict of law principles. Any disputes arising from these Terms or your use of our services shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">13. Modifications to Terms</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We reserve the right to modify these Terms at any time. We will notify you of material changes by posting the updated Terms on our website and updating the "Last Updated" date. Your continued use of our services after such modifications constitutes acceptance of the updated Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">14. Severability</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">15. Entire Agreement</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                These Terms, together with our Privacy Policy and any other legal notices published by us, constitute the entire agreement between you and Elite Drug concerning your use of our services.
              </p>
            </section>

            <section className="bg-gray-50 dark:bg-slate-800/50 rounded-lg p-6 border-l-4 border-[#FF8C00]">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">16. Contact Information</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                If you have questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2 text-gray-700 dark:text-gray-300">
                <p><strong>Elite Drug</strong></p>
                <p>Email: <a href="mailto:info@elitedrug.com" className="text-orange-600 dark:text-orange-400 hover:underline">info@elitedrug.com</a></p>
                <p>WhatsApp: <a href="https://wa.me/919182351261" target="_blank" rel="noopener noreferrer" className="text-orange-600 dark:text-orange-400 hover:underline">+91 9182351261</a></p>
                <p className="text-sm leading-relaxed">Address: #440, 3rd C.K. Nagara, Hosa Road,<br/>Electronic City Post, Bangalore – 560100</p>
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
