import React from 'react';
import { Seo } from '../components/Seo';
import { LegalLayout, LegalSection } from '../components/LegalLayout';

const SECTIONS: LegalSection[] = [
{
  heading: 'Interpretation and Definitions',
  paragraphs: [
  'The words whose initial letters are capitalized have meanings defined under the following conditions. The following definitions have the same meaning regardless of whether they appear in singular or plural.',
  'For the purposes of this Privacy Policy, Account means a unique account created for You to access Our Service or parts of Our Service. Affiliate means an entity that controls, is controlled by, or is under common control with a party, where control means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.',
  'Company, referred to as the Company, We, Us or Our, means Optivsa, 17, Lotus Garden Road, Nugegoda, Sri Lanka. Cookies are small files placed on Your computer, mobile device or other device by a website, containing details of Your browsing history on that website. Country/State refers to Sri Lanka.',
  'Device means any device that can access the Service, such as a computer, cell phone or digital tablet. Personal Data, or Personal Information, is any information that relates to an identified or identifiable individual. We use Personal Data and Personal Information interchangeably unless a law uses a specific term.',
  'Service refers to the Website. Service Provider means any natural or legal person who processes data on behalf of the Company to facilitate the Service, provide the Service, perform related services or assist in analyzing how the Service is used. Usage Data refers to data collected automatically from use of the Service or its infrastructure. User means any individual who accesses or uses the Service.',
  'Website refers to optivsa.net, accessible from https://optivsa.net/. You means the individual accessing or using the Service, or the company or other legal entity on whose behalf that individual is accessing or using the Service, as applicable.']
},
{
  heading: 'Types of Data Collected',
  paragraphs: [
  'While using Our Service, We may ask You to provide certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include the following:'],
  list: ['Email address', 'First name and last name', 'Usage Data collected automatically when using the Service, including IP address, browser type and version, pages visited, time and date of visits, time spent on pages, unique device identifiers and other diagnostic data.', 'When You access the Service through a mobile device, the type of mobile device, unique device ID, mobile IP address, operating system, mobile browser and other diagnostic data.']
},
{
  heading: 'Tracking Technologies and Cookies',
  paragraphs: [
  'We use tracking technologies such as cookies to track activity and improve Our Service. A cookie is a small file placed on Your Device. You can instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent. If You do not accept Cookies, You may not be able to use some parts of Our Service.',
  'Certain sections of Our Service may contain small electronic files known as web beacons, clear gifs, pixel tags or single-pixel gifs. These permit the Company to count users, record the popularity of a section and verify system and server integrity.',
  'Cookies can be Persistent or Session Cookies. Persistent Cookies remain on Your personal computer or mobile device when You go offline, while Session Cookies are deleted when You close Your web browser.',
  'Where required by law, We use non-essential Cookies only with Your consent. You can withdraw or change Your consent using Our cookie preferences tool, if available, or through Your browser or device settings. Withdrawing consent does not affect the lawfulness of processing based on consent before its withdrawal.'],
  list: [
  'Necessary / Essential Cookies: Session Cookies administered by Us and essential to provide services available through the Website, enable features, authenticate users and prevent fraudulent use of accounts.',
  'Cookies Policy / Notice Acceptance Cookies: Persistent Cookies administered by Us to identify whether users have accepted the use of cookies and record consent choices.',
  'Functionality Cookies: Persistent Cookies administered by Us to remember choices such as account login details or language preferences and provide a more personal experience.']
},
{
  heading: 'Use of Your Personal Data',
  paragraphs: ['The Company may use Personal Data for the following purposes:'],
  list: [
  'To provide and maintain Our Service, including monitoring usage of Our Service.',
  'To manage Your Account and registration as a user of the Service. The Personal Data You provide can give You access to different functionalities available to You as a registered user.',
  'For the performance of a contract, including development, compliance and undertaking of a purchase contract for products, items or services You have purchased or any other contract with Us through the Service.',
  'To contact You by email, telephone calls, SMS or equivalent electronic communication regarding updates, informative communications, functionalities, products, contracted services and necessary security updates.',
  'To provide news, special offers and general information about goods, services and events similar to those You have already purchased or inquired about. We send marketing communications only where permitted by applicable law and You may opt out or withdraw consent at any time.',
  'To manage Your requests and attend to requests made to Us.',
  'For business transfers, including evaluating or conducting a merger, divestiture, restructuring, reorganization, dissolution or other sale or transfer of some or all of Our assets.',
  'For other purposes such as data analysis, identifying usage trends, determining promotional campaign effectiveness, and evaluating and improving Our Service, products, services, marketing and Your experience.']
},
{
  heading: 'Sharing Your Personal Data',
  paragraphs: ['We may share Your Personal Data in the following situations:'],
  list: [
  'With Service Providers to monitor and analyze use of Our Service and to contact You.',
  'For business transfers in connection with negotiations of or completion of a merger, sale of Company assets, financing or acquisition of all or part of Our business.',
  'With Affiliates, including Our parent company, subsidiaries, joint venture partners and other companies under common control, provided those affiliates honor this Privacy Policy.',
  'With other users when Our Service offers public areas and You share Personal Data or interact in those areas. Such information may be viewed by all users and publicly distributed outside the Service.',
  'With Your consent for any other purpose.']
},
{
  heading: 'Text Messages Privacy Notice',
  paragraphs: [
  'You have the option to receive text or SMS messages from Us. If You opt in, We collect and store information provided in connection with text messaging, such as Your phone number, date and method of consent, and message delivery and read information.',
  'No mobile information will be shared with or sold to third parties or affiliates for marketing or promotional purposes. Phone numbers and consent records are never shared except with Service Providers that technically need to handle them to deliver texts.',
  'Consent to receive SMS is not a condition of any purchase or use of Our Service. If You consent, messages may relate to customer care, account notifications, delivery updates, authentication messages, security alerts, and marketing or promotional offers.',
  'Reply STOP to opt out. Reply HELP for support. Message and data rates may apply. Messaging frequency may vary. Carriers are not liable for delayed or undelivered messages.']
},
{
  heading: 'Retention of Your Personal Data',
  paragraphs: [
  'The Company will retain Your Personal Data only for as long as necessary for the purposes set out in this Privacy Policy. We will retain and use it as necessary to comply with legal obligations, resolve disputes and enforce legal agreements and policies.',
  'Where possible, We apply shorter retention periods or reduce identifiability by deleting, aggregating or anonymizing data. Retention periods are maximum periods and We may delete or anonymize data sooner when it is no longer needed. Different categories of Personal Data may have different periods based on purpose and legal obligations.'],
  list: [
  'User Accounts: retained for the duration of Your Account relationship plus up to 24 months after account closure.',
  'Support tickets and correspondence: up to 24 months from ticket closure.',
  'Chat transcripts: up to 24 months for quality assurance and staff training.',
  'Website analytics data, including cookies, IP addresses and device identifiers: up to 24 months from collection.',
  'Server logs, including IP addresses and access times: up to 24 months for security monitoring and troubleshooting.',
  'Personal Data may be retained longer where necessary for security, fraud prevention, legal compliance, legal claims, an explicit request, or technical limitations in backup systems.',
  'When retention periods expire, Personal Data is removed from active systems, residual encrypted backup copies are retained only for a limited scheduled period, or data is anonymized into statistical information that cannot be linked back to You.']
},
{
  heading: 'Transfer of Your Personal Data',
  paragraphs: [
  'Your information, including Personal Data, is processed at the Company operating offices and other places where parties involved in processing are located. This means information may be transferred to and maintained on computers outside Your state, province, country or other governmental jurisdiction where data protection laws may differ.',
  'Where required by applicable law, We ensure international transfers are subject to appropriate safeguards and supplementary measures where relevant. The Company takes reasonably necessary steps to ensure Your data is treated securely and in accordance with this Privacy Policy.']
},
{
  heading: 'Delete Your Personal Data',
  paragraphs: [
  'You have the right to delete or request that We assist in deleting the Personal Data We have collected about You.',
  'Our Service may give You the ability to delete certain information from within the Service. You may update, amend or delete Your information by signing in to Your Account, if You have one, and visiting account settings. You may also contact Us to request access to, correction of, or deletion of Personal Data You have provided.',
  'We may need to retain certain information when We have a legal obligation or lawful basis to do so.']
},
{
  heading: 'Disclosure of Your Personal Data',
  paragraphs: [
  'If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.',
  'Under certain circumstances, the Company may disclose Your Personal Data if required by law or in response to valid requests by public authorities such as a court or government agency.',
  'The Company may disclose Your Personal Data in the good-faith belief that this is necessary to comply with a legal obligation, protect and defend the rights or property of the Company, prevent or investigate possible wrongdoing, protect the personal safety of Users or the public, or protect against legal liability.']
},
{
  heading: 'Security of Your Personal Data',
  paragraphs: [
  'The security of Your Personal Data is important to Us, but no method of transmission over the Internet or electronic storage is 100% secure. While We strive to use commercially reasonable means to protect Your Personal Data, We cannot guarantee its absolute security.']
},
{
  heading: "Children's and Minors' Privacy",
  paragraphs: [
  'The Service is not directed to and We do not knowingly collect Personal Information from anyone under the age of 16.',
  'If You are a parent or guardian and believe Your child has provided Personal Information, please contact Us. If We become aware that We have collected such information from anyone under 16, We will take steps to remove it from Our servers as soon as reasonably possible.',
  'Some countries and states set a higher age for consent. Where We rely on consent and applicable law sets an age higher than 16, We may require consent from that User parent or guardian.']
},
{
  heading: 'Links to Other Websites',
  paragraphs: [
  'Our Service may contain links to other websites not operated by Us. If You click a third-party link, You will be directed to that third party site. We strongly advise You to review the Privacy Policy of every site You visit.',
  'We have no control over and assume no responsibility for the content, privacy policies or practices of third-party sites or services.']
},
{
  heading: 'Changes to this Privacy Policy',
  paragraphs: [
  'We may update Our Privacy Policy from time to time by posting the new Privacy Policy on this page.',
  'We will let You know by email or a prominent notice on Our Service before a change becomes effective and update the Last updated date at the top of this Privacy Policy.',
  'You are advised to review this Privacy Policy periodically. Changes are effective when posted on this page.']
},
{
  heading: 'Contact Us',
  paragraphs: ['If You have questions about this Privacy Policy, You can contact Us:'],
  list: [
  'By email: contact@optivsa.net',
  'By visiting Our Website: https://optivsa.net/',
  'By phone: +94 11 275 6384']
}];


export function PrivacyPolicy() {
  return (
    <>
      <Seo
        title="Privacy Policy | Optivsa"
        description="Optivsa Privacy Policy covering personal data, cookies, usage data, retention, security, international transfers and privacy rights."
        path="/privacy" />
      
      <LegalLayout
        eyebrow="Privacy Policy"
        title="HOW WE HANDLE INFORMATION."
        updated="September 09, 2026"
        intro="This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service, and tells You about Your privacy rights and how the law protects You. We use Your Personal Data to provide and improve the Service and, where required by applicable law, only where We have a valid legal basis to do so, including Your consent where consent is required. "
        sections={SECTIONS}
        counterpartLabel="Read the Terms & Conditions"
        counterpartTo="/terms" />
      
    </>);

}