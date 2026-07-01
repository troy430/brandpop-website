import { OnboardingData, useCases } from "./schema";

export type Industry = OnboardingData["business"]["industry"];
export type UseCase = (typeof useCases)[number];

interface TemplateSet {
  useCaseDescription: string;
  sampleMessage: string;
}

const defaultTemplates: Record<string, TemplateSet> = {
  solar: {
    useCaseDescription:
      "We send personalized SMS messages to homeowners who previously inquired about solar installation or energy savings. Messages include appointment reminders, financing updates, and follow-ups on proposals. All recipients have opted in via our website contact forms, prior purchase agreements, or explicit verbal consent documented in our CRM.",
    sampleMessage:
      "Hi {{FirstName}}, this is {{BusinessName}}. I noticed you were looking into solar last year. We now have $0-down financing and new incentives for {{City}} homeowners. Want a quick 2-minute update? Reply STOP to opt out.",
  },
  roofing: {
    useCaseDescription:
      "We contact homeowners via SMS who have requested roof inspections, insurance claim assistance, or repair estimates. Messages are limited to appointment confirmations, inspection reminders, photo requests, and follow-up on estimates. Recipients opt in through web forms, insurance referrals, or signed work authorizations.",
    sampleMessage:
      "Hi {{FirstName}}, {{BusinessName}} here. Your complimentary roof inspection is scheduled for {{Date}} at {{Time}}. Reply CONFIRM to confirm or RESCHEDULE if you need a different time. Reply STOP to opt out.",
  },
  dental: {
    useCaseDescription:
      "We send appointment reminders, recall notices, treatment follow-ups, and new patient welcome messages to patients who have provided their mobile number and consented to text communications at intake or via our patient portal. Messages may include scheduling links, pre-visit instructions, and post-treatment care tips.",
    sampleMessage:
      "Hi {{FirstName}}, this is {{BusinessName}} reminding you of your appointment on {{Date}} at {{Time}}. Please arrive 10 minutes early. Reply CONFIRM to confirm, CANCEL if you need to reschedule, or STOP to opt out.",
  },
  med_spa: {
    useCaseDescription:
      "We send personalized SMS communications to clients regarding appointment reminders, treatment aftercare, promotional offers for aesthetic services, and membership renewals. Clients opt in during booking, through our website forms, or via signed consent at their first visit. All promotional messages include clear opt-out instructions.",
    sampleMessage:
      "Hi {{FirstName}}, {{BusinessName}} here. Your {{Treatment}} appointment is confirmed for {{Date}} at {{Time}}. Avoid direct sun 24 hours prior. Need to reschedule? Reply here. Reply STOP to opt out.",
  },
  home_services: {
    useCaseDescription:
      "We communicate with customers via SMS for service appointment confirmations, technician arrival notifications, estimate follow-ups, and seasonal maintenance reminders. Customers opt in through our website booking forms, phone intake, or service agreements. Messages are transactional and service-related.",
    sampleMessage:
      "Hi {{FirstName}}, {{BusinessName}} here. Your technician is en route and will arrive within 20 minutes. Reply OK to confirm you're home or CALL if you need to speak with the office. Reply STOP to opt out.",
  },
  legal: {
    useCaseDescription:
      "We send confidential text reminders for consultations, document deadlines, court dates, and case updates to existing and prospective clients. All recipients have provided their mobile number through our intake forms, retainer agreements, or direct consent. We do not share case details via SMS; messages are limited to scheduling and administrative notices.",
    sampleMessage:
      "Hi {{FirstName}}, this is {{BusinessName}}. This is a reminder of your consultation on {{Date}} at {{Time}}. Please bring photo ID and any relevant documents. Reply CONFIRM or CANCEL. Reply STOP to opt out.",
  },
  insurance: {
    useCaseDescription:
      "We send SMS messages to prospects and policyholders for quote follow-ups, policy renewal reminders, claims status updates, and appointment scheduling with agents. Recipients opt in via our website quote forms, policy applications, or by texting a short code. Messages are limited to insurance-related communications.",
    sampleMessage:
      "Hi {{FirstName}}, {{BusinessName}} here. Your customized quote is ready. Want to review coverage options and lock in your rate? I have 10 minutes this afternoon or tomorrow morning. Reply STOP to opt out.",
  },
  fitness: {
    useCaseDescription:
      "We text members and prospects about class schedules, personal training appointments, membership renewals, and special events. Members opt in during enrollment, through our app, or via web forms. Messages include booking links and motivational check-ins.",
    sampleMessage:
      "Hi {{FirstName}}, {{BusinessName}} here. Your training session with {{Trainer}} is tomorrow at {{Time}}. Don't forget your water bottle! Need to reschedule? Tap here: {{Link}}. Reply STOP to opt out.",
  },
  franchise: {
    useCaseDescription:
      "We send SMS communications to franchise prospects, existing franchisees, and corporate partners regarding discovery day invitations, territory updates, operational alerts, and marketing campaign materials. Recipients opt in through franchise inquiry forms, corporate agreements, or event registrations.",
    sampleMessage:
      "Hi {{FirstName}}, {{BusinessName}} here. Thanks for your franchise inquiry. I have availability for a 15-minute territory overview this Thursday or Friday. Which works better? Reply STOP to opt out.",
  },
  ecommerce: {
    useCaseDescription:
      "We send order confirmations, shipping updates, delivery notifications, abandoned cart reminders, and VIP sale alerts to customers who have opted in at checkout or via our website pop-up. All promotional messages include unsubscribe instructions.",
    sampleMessage:
      "Hi {{FirstName}}, {{BusinessName}} here. Your order {{OrderNumber}} has shipped and will arrive {{DeliveryDate}}. Track it here: {{Link}}. Reply HELP for support. Reply STOP to opt out.",
  },
  other: {
    useCaseDescription:
      "We send personalized SMS messages to leads and customers who have opted in via our website forms, purchase agreements, or direct verbal consent. Messages are limited to appointment reminders, service updates, and relevant follow-up communications. All recipients can opt out at any time by replying STOP.",
    sampleMessage:
      "Hi {{FirstName}}, this is {{BusinessName}}. I wanted to personally follow up on your recent inquiry. Do you have 5 minutes for a quick call this afternoon or tomorrow? Reply STOP to opt out.",
  },
};

export function getIndustryTemplates(industry: Industry): TemplateSet {
  return defaultTemplates[industry] ?? defaultTemplates.other;
}

export function fillTemplate(
  template: string,
  business: OnboardingData["business"],
  contacts: OnboardingData["contacts"]
): string {
  const primaryName = contacts?.primary?.name || "";
  const firstName = primaryName.split(" ")[0] || "there";

  return template
    .replace(/\{\{FirstName\}\}/g, firstName)
    .replace(/\{\{BusinessName\}\}/g, business.legalName || business.dbaName || "Our Company")
    .replace(/\{\{City\}\}/g, business.address?.city || "your area")
    .replace(/\{\{Date\}\}/g, "[Date]")
    .replace(/\{\{Time\}\}/g, "[Time]")
    .replace(/\{\{Treatment\}\}/g, "[Treatment]")
    .replace(/\{\{Trainer\}\}/g, "[Trainer]")
    .replace(/\{\{Link\}\}/g, business.website || "#")
    .replace(/\{\{OrderNumber\}\}/g, "[Order Number]")
    .replace(/\{\{DeliveryDate\}\}/g, "[Delivery Date]");
}

export function generatePrivacyPolicy(business: OnboardingData["business"]): string {
  const name = business.legalName || business.dbaName || "This Business";
  const website = business.website || "our website";
  const address = business.address
    ? `${business.address.street}, ${business.address.city}, ${business.address.state} ${business.address.zip}`
    : "";

  return `# Privacy Policy

**Effective Date:** ${new Date().toLocaleDateString()}

## 1. Introduction

${name} ("we," "us," or "our") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit ${website} or communicate with us via SMS.

## 2. Information We Collect

We may collect personal information that you voluntarily provide to us, including but not limited to:
- Name, email address, and phone number
- Mailing address
- Information you provide via forms, surveys, or correspondence

## 3. How We Use Your Information

We use the information we collect to:
- Provide and manage our services
- Communicate with you, including via SMS for appointment reminders, service updates, and promotional offers (only with your consent)
- Process transactions and send related information
- Improve our website and customer experience

## 4. SMS Communications

When you provide your mobile number and opt in, you consent to receive text messages from us. Message and data rates may apply. You can opt out at any time by replying **STOP** to any message. For help, reply **HELP**.

## 5. Sharing Your Information

We do not sell or rent your personal information. We may share information with trusted service providers who assist us in operating our business, provided they agree to keep your information confidential.

## 6. Security

We implement reasonable security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.

## 7. Your Rights

You may request access to, correction of, or deletion of your personal information by contacting us using the information below.

## 8. Contact Us

If you have questions about this Privacy Policy, please contact us:

${name}
${address ? `Address: ${address}\n` : ""}Website: ${website}
`;
}

export function generatePrivacyPolicyHtml(business: OnboardingData["business"]): string {
  const name = business.legalName || business.dbaName || "This Business";
  const website = business.website || "our website";
  const address = business.address
    ? `${business.address.street}, ${business.address.city}, ${business.address.state} ${business.address.zip}`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Privacy Policy — ${name}</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; max-width: 720px; margin: 40px auto; padding: 0 20px; color: #1a1a1a; }
    h1 { font-size: 1.75rem; margin-bottom: 0.5rem; }
    h2 { font-size: 1.25rem; margin-top: 1.5rem; margin-bottom: 0.5rem; }
    p { margin-bottom: 1rem; }
  </style>
</head>
<body>
  <h1>Privacy Policy</h1>
  <p><strong>Effective Date:</strong> ${new Date().toLocaleDateString()}</p>

  <h2>1. Introduction</h2>
  <p>${name} ("we," "us," or "our") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit ${website} or communicate with us via SMS.</p>

  <h2>2. Information We Collect</h2>
  <p>We may collect personal information that you voluntarily provide to us, including but not limited to:</p>
  <ul>
    <li>Name, email address, and phone number</li>
    <li>Mailing address</li>
    <li>Information you provide via forms, surveys, or correspondence</li>
  </ul>

  <h2>3. How We Use Your Information</h2>
  <p>We use the information we collect to:</p>
  <ul>
    <li>Provide and manage our services</li>
    <li>Communicate with you, including via SMS for appointment reminders, service updates, and promotional offers (only with your consent)</li>
    <li>Process transactions and send related information</li>
    <li>Improve our website and customer experience</li>
  </ul>

  <h2>4. SMS Communications</h2>
  <p>When you provide your mobile number and opt in, you consent to receive text messages from us. Message and data rates may apply. You can opt out at any time by replying <strong>STOP</strong> to any message. For help, reply <strong>HELP</strong>.</p>

  <h2>5. Sharing Your Information</h2>
  <p>We do not sell or rent your personal information. We may share information with trusted service providers who assist us in operating our business, provided they agree to keep your information confidential.</p>

  <h2>6. Security</h2>
  <p>We implement reasonable security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.</p>

  <h2>7. Your Rights</h2>
  <p>You may request access to, correction of, or deletion of your personal information by contacting us using the information below.</p>

  <h2>8. Contact Us</h2>
  <p>If you have questions about this Privacy Policy, please contact us:</p>
  <p>
    <strong>${name}</strong><br>
    ${address ? `Address: ${address}<br>` : ""}
    Website: ${website}
  </p>
</body>
</html>`;
}

export const optInFormTypes = [
  { value: "web_form", label: "Website Embed Form" },
  { value: "written_consent", label: "Written Consent (Printable)" },
] as const;

export type OptInFormType = (typeof optInFormTypes)[number]["value"];

export function generateWebFormHtml(business: OnboardingData["business"]): string {
  const name = business.legalName || business.dbaName || "Our Business";

  return `<!-- ${name} — SMS Opt-In Form -->
<!-- Copy and paste this into your website where you want the form to appear -->
<style>
  .bp-optin-form { font-family: system-ui, -apple-system, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px; background: #ffffff; }
  .bp-optin-form h3 { margin: 0 0 8px; font-size: 1.25rem; font-weight: 600; color: #111827; }
  .bp-optin-form p { margin: 0 0 16px; font-size: 0.875rem; color: #6b7280; line-height: 1.5; }
  .bp-optin-form label { display: block; margin-bottom: 4px; font-size: 0.875rem; font-weight: 500; color: #374151; }
  .bp-optin-form input[type="text"], .bp-optin-form input[type="tel"], .bp-optin-form input[type="email"] { width: 100%; padding: 10px 12px; margin-bottom: 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 0.875rem; box-sizing: border-box; }
  .bp-optin-form input:focus { outline: none; border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.1); }
  .bp-optin-form .bp-consent { display: flex; align-items: flex-start; gap: 8px; margin: 12px 0; }
  .bp-optin-form .bp-consent input { margin-top: 2px; }
  .bp-optin-form .bp-consent label { margin: 0; font-weight: 400; color: #4b5563; font-size: 0.8125rem; }
  .bp-optin-form button { width: 100%; padding: 12px; background: #111827; color: #fff; border: none; border-radius: 8px; font-size: 0.9375rem; font-weight: 600; cursor: pointer; }
  .bp-optin-form button:hover { background: #374151; }
  .bp-optin-form .bp-disclaimer { margin-top: 12px; font-size: 0.75rem; color: #9ca3af; text-align: center; }
</style>
<form class="bp-optin-form" action="/thank-you" method="POST">
  <h3>Get Updates by Text</h3>
  <p>Enter your info below to receive appointment reminders, exclusive offers, and important updates from ${name}.</p>

  <label for="bp-name">Full Name</label>
  <input type="text" id="bp-name" name="name" placeholder="John Smith" required>

  <label for="bp-phone">Mobile Number</label>
  <input type="tel" id="bp-phone" name="phone" placeholder="(555) 123-4567" required>

  <label for="bp-email">Email Address (optional)</label>
  <input type="email" id="bp-email" name="email" placeholder="john@example.com">

  <div class="bp-consent">
    <input type="checkbox" id="bp-consent" name="sms_consent" required>
    <label for="bp-consent">I agree to receive automated promotional and transactional text messages from ${name} at the phone number provided. Consent is not a condition of purchase. Message and data rates may apply. Reply STOP to opt out at any time.</label>
  </div>

  <button type="submit">Subscribe</button>
  <p class="bp-disclaimer">By subscribing, you agree to our <a href="/privacy-policy">Privacy Policy</a> and <a href="/terms">Terms of Service</a>.</p>
</form>`;
}

export function generateWrittenConsentText(business: OnboardingData["business"]): string {
  const name = business.legalName || business.dbaName || "Our Business";
  const address = business.address
    ? `${business.address.street}, ${business.address.city}, ${business.address.state} ${business.address.zip}`
    : "";

  return `WRITTEN CONSENT FOR SMS COMMUNICATIONS

Business Name: ${name}
${address ? `Business Address: ${address}\n` : ""}Date: _______________

I, _________________________________________, hereby consent to receive text messages (SMS/MMS) from ${name} at the mobile phone number I have provided below.

Mobile Phone Number: ________________________________

I understand that:
1. Messages may include appointment reminders, service updates, promotional offers, and other business-related communications.
2. Message frequency may vary. Message and data rates may apply.
3. I can opt out at any time by replying "STOP" to any message.
4. I can request help by replying "HELP" to any message.
5. Carriers are not liable for delayed or undelivered messages.

I confirm that I am the owner or authorized user of the mobile phone number provided and that I am at least 18 years of age.

_________________________________________
Signature

_________________________________________
Printed Name

_________________________________________
Date

---
For office use only:
Consent obtained by: ________________________________
Date entered into system: ________________________________
`;
}
