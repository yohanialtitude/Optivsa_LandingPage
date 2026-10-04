import React from 'react';
import { Seo } from '../components/Seo';
import { LegalLayout, LegalSection } from '../components/LegalLayout';

const SECTIONS: LegalSection[] = [
{
  heading: 'Interpretation and Definitions',
  paragraphs: [
  'The words whose initial letters are capitalized have meanings defined under the following conditions. The following definitions have the same meaning regardless of whether they appear in singular or plural.',
  'For these Terms, Affiliate means an entity that controls, is controlled by, or is under common control with a party, where control means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority. Country/State refers to Sri Lanka. Company, We, Us or Our means Optivsa, 17, Lotus Garden Road, Nugegoda, Sri Lanka.',
  'Device means any device that can access the Service, such as a computer, cell phone or digital tablet. Service refers to the Website. Website refers to Optivsa.net, accessible from https://optivsa.net/. You means the individual accessing or using the Service, or the company or other legal entity on whose behalf that individual is accessing or using the Service.',
  'Terms and Conditions, also called Terms, means these Terms and Conditions and any documents expressly incorporated by reference. They govern access to and use of the Service and form the entire agreement between You and the Company regarding the Service.',
  'Third-Party Social Media Service means any service or content, including data, information, products or services, provided by a third party and displayed, included, made available or linked through the Service.']
},
{
  heading: 'Acknowledgment',
  paragraphs: [
  'These Terms and Conditions govern use of the Service and constitute the agreement between You and the Company. They set out the rights and obligations of all users regarding use of the Service.',
  'Access to and use of the Service is conditioned on acceptance of and compliance with these Terms. They apply to all visitors, users and others who access or use the Service.',
  'By accessing or using the Service You agree to be bound by these Terms. If You disagree with any part of them, You may not access the Service.',
  'You represent that You are over the age of 18. The Company does not permit anyone under 18 to use the Service.',
  'Access to and use of the Service is also subject to Our Privacy Policy, which describes how We collect, use and disclose personal information.']
},
{
  heading: 'Links to Other Websites',
  paragraphs: [
  'Our Service may contain links to third-party websites or services that are not owned or controlled by the Company.',
  'The Company has no control over and assumes no responsibility for the content, privacy policies or practices of third-party websites or services. You agree that the Company is not responsible or liable for any damage or loss caused or alleged to be caused by use of or reliance on content, goods or services available through those websites or services.',
  'We strongly advise You to read the terms and conditions and privacy policies of any third-party websites or services that You visit.',
  'The Service may display or link to content or services provided by a Third-Party Social Media Service. Such a service is not owned or controlled by the Company, and the Company does not endorse or assume responsibility for it. Your use of any Third-Party Social Media Service is governed by that service terms and privacy policies.']
},
{
  heading: 'Termination',
  paragraphs: [
  'We may terminate or suspend Your access immediately, without prior notice or liability, for any reason, including if You breach these Terms and Conditions.',
  'Upon termination, Your right to use the Service will cease immediately.']
},
{
  heading: 'Limitation of Liability',
  paragraphs: [
  'Notwithstanding any damages You might incur, the entire liability of the Company and its suppliers under any provision of these Terms, and Your exclusive remedy, is limited to the amount actually paid by You through the Service or 100 USD if You have not purchased anything through the Service.',
  'To the maximum extent permitted by applicable law, the Company and its suppliers shall not be liable for special, incidental, indirect or consequential damages, including loss of profits, loss of data, business interruption, personal injury or loss of privacy arising from use of or inability to use the Service, third-party software or hardware, or any provision of these Terms, even if advised of the possibility of such damages.',
  'Some states do not allow exclusion of implied warranties or limitation of liability for incidental or consequential damages. In those states, each party liability is limited to the greatest extent permitted by law.']
},
{
  heading: 'As Is and As Available Disclaimer',
  paragraphs: [
  'The Service is provided to You AS IS and AS AVAILABLE, with all faults and defects and without warranty of any kind. To the maximum extent permitted by law, the Company, its Affiliates, licensors and service providers disclaim all express, implied, statutory and other warranties, including merchantability, fitness for a particular purpose, title and non-infringement.',
  'The Company provides no warranty that the Service will meet Your requirements, achieve intended results, work with other software, applications, systems or services, operate without interruption, meet performance or reliability standards, be error free, or have all errors corrected.',
  'The Company and its providers make no representation or warranty about operation or availability, included information or products, uninterrupted or error-free service, accuracy or currency of content, or the absence of viruses, scripts, trojan horses, worms, malware, timebombs or other harmful components.',
  'Some jurisdictions do not allow exclusion of certain warranties or limitations on statutory consumer rights. Where those rules apply, the exclusions and limitations in this section apply to the greatest extent enforceable.']
},
{
  heading: 'Governing Law',
  paragraphs: [
  'The laws of Sri Lanka, excluding conflict of law rules, govern these Terms and Your use of the Service. Your use of the Application may also be subject to other local, state, national or international laws.']
},
{
  heading: 'Dispute Resolution',
  paragraphs: [
  'If You have a concern or dispute about the Service, You agree to first try to resolve it informally by contacting the Company.']
},
{
  heading: 'European Union Users',
  paragraphs: [
  'If You are a European Union consumer, You will benefit from any mandatory provisions of the law of the country in which You are resident.']
},
{
  heading: 'United States Legal Compliance',
  paragraphs: [
  'You represent and warrant that You are not located in a country subject to a United States government embargo or designated by the United States government as a terrorist-supporting country, and that You are not listed on any United States government list of prohibited or restricted parties.']
},
{
  heading: 'Severability and Waiver',
  paragraphs: [
  'If any provision of these Terms is held to be unenforceable or invalid, it will be changed and interpreted to accomplish its objectives to the greatest extent possible under applicable law, and the remaining provisions will continue in full force and effect.',
  'Except as provided herein, failure to exercise a right or require performance of an obligation does not affect a party ability to exercise that right or require performance later. Waiver of a breach does not constitute waiver of a subsequent breach.']
},
{
  heading: 'Translation Interpretation',
  paragraphs: [
  'These Terms and Conditions may have been translated if We have made them available to You on Our Service. You agree that the original English text will prevail in the case of a dispute.']
},
{
  heading: 'Changes to These Terms and Conditions',
  paragraphs: [
  'We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material, We will make reasonable efforts to provide at least 30 days notice before new terms take effect. What constitutes a material change will be determined at Our sole discretion.',
  'By continuing to access or use Our Service after revisions become effective, You agree to be bound by the revised Terms. If You do not agree with the new Terms in whole or in part, please stop using the Service.']
},
{
  heading: 'Contact Us',
  paragraphs: ['If You have questions about these Terms and Conditions, You can contact Us:'],
  list: [
  'By email: contact@optivsa.net',
  'By visiting Our Website: https://optivsa.net/',
  'By phone: +94 11 275 6384']
}];


export function TermsAndConditions() {
  return (
    <>
      <Seo
        title="Terms & Conditions | Optivsa"
        description="Terms and Conditions governing access to and use of the Optivsa Service, including liability, warranties, disputes and contact information."
        path="/terms" />
      
      <LegalLayout
        eyebrow="Terms & Conditions"
        title="TERMS OF USE FOR THE OPTIVSA WEBSITE."
        updated="September 09, 2026"
        intro="Please read these Terms and Conditions carefully before using Our Service."
        sections={SECTIONS}
        counterpartLabel="Read the Privacy Policy"
        counterpartTo="/privacy" />
      
    </>);

}