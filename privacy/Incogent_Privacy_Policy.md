# Incogent Privacy Policy

**Effective Date: September 5, 2026**

This Privacy Policy explains how Incogent LLC ("Incogent," "we," "us," or "our") collects, uses, discloses, and protects personal information in connection with websites, software, products, and services that link to this Privacy Policy, including Blackbird (collectively, the "Services").

Incogent is a Virginia limited liability company located at 705 N Argonne Ave, Sterling, Virginia 20164, United States.

## 1. Scope

This Privacy Policy applies to Incogent Services that link to it. It does not govern third-party websites, storefronts, payment services, platforms, or content, even when they are linked to or embedded in our Services. Those third parties have their own privacy practices.

If a separate notice is presented for a particular Service or interaction, that notice supplements this Privacy Policy. If the two conflict, the more specific notice controls for that interaction.

## 2. Information We Collect

The information we collect depends on how you interact with the Services.

### 2.1 Information You Provide

We may collect:

- **Contact information**, such as your name, email address, organization, and the contents of messages you send us.
- **Purchase and fulfillment information**, such as your email address, order identifier, product, license type, transaction status, and information needed to deliver or recover a license. Payment card and similar payment information is ordinarily collected directly by the payment processor or storefront, rather than by Incogent.
- **Account information**, if accounts are offered in the future, such as your email address, display name, authentication identifiers, organization membership, licenses associated with the account, and account security and login records.
- **License information**, such as a license identifier, license type, eligibility or entitlement information, permitted versions or update period, issue date, expiration date where applicable, and records needed to issue, validate, fulfill, or recover a license.
- **Support and diagnostic information**, such as correspondence, screenshots, logs, system details, scripts, configurations, project information, or other materials included in feedback you choose to submit. Blackbird adds technical information and, for issue reports opened from a run, a removable diagnostic log as described in Section 3.5. These reports are transmitted only when you submit the form; this flow does not automatically upload crash reports.
- **Newsletter information**, if we offer an optional mailing list, such as your email address, consent record, and subscription preferences.
- **Contribution information**, if you submit scripts, configurations, feedback, or other material for possible distribution or inclusion in a Service.

Please do not submit secrets, access credentials, personal information about other people, or other information that is unnecessary for us to address your request.

### 2.2 Information Collected Automatically Through Websites

When you visit an Incogent website, we and the providers that operate or protect the website may automatically receive limited technical information, including:

- Internet Protocol address;
- browser, device, and operating-system information;
- requested page or resource, referring page, date, and time;
- approximate region derived from an IP address;
- security, error, performance, and network-event information; and
- interactions with website features or embedded content, where applicable.

We use Cloudflare services for functions that may include website analytics, security, bot detection, and form protection. Incogent websites may be hosted through GitHub Pages. The operators of these services process technical information under their own terms and privacy notices.

### 2.3 Information From Other Sources

We may receive information from payment processors, authorized resellers, storefronts, authentication providers, distribution platforms, and other service providers. This may include contact details, order and transaction records, account identifiers, fraud or security signals, and license-fulfillment information. The information available to us depends on the provider and the choices you make through that provider.

## 3. Blackbird Privacy and Optional Basic Usage Reports

Blackbird runs commands and scripts on your own system. Optional basic usage reporting is off by default. Declining it does not limit Blackbird's functionality or licensing.

### 3.1 Information We Do Not Automatically Collect

Basic usage reporting does not send command or execution history, script or Action names, script contents, arguments, paths, project files, file changes, output, error messages, stack traces, or crash reports. It does not collect feature-by-feature activity, Action categories, installed packages, hardware details, operating-system details, exact app versions, or a persistent user, device, or installation identifier.

This does not prevent local processing needed to carry out your instructions or processing of material you deliberately send for support or feedback.

### 3.2 Optional Daily Summaries

If you explicitly enable basic usage reporting, Blackbird keeps small daily counts of:

- app sessions started;
- Action executions that succeeded, failed, or were cancelled; and
- failed app-update download attempts.

Through basic usage reporting, an Action outcome contributes only to a count. We do not receive which Action or custom script ran, what it did, or why it failed through that reporting. Voluntarily submitted issue reports are different, as described in Section 3.5.

Each summary also contains its UTC calendar date, release channel (stable or prerelease), schema and consent-notice versions, and a random identifier specific to that summary. Retried copies use the same identifier so they are not counted twice. It is not reused to identify you across days. Reports contain no account email, license identifier, or persistent installation identifier.

We combine reports into daily totals to estimate reporting activity and understand overall reliability. These figures are not a precise count of people, and we do not use them to track an individual's activity across days or build advertising profiles.

### 3.3 Your Choice and Device Resources

You can turn reporting off in Blackbird's settings at any time. Turning it off stops further observation and delivery and deletes unsent local analytics state. A request already sent may still be processed. We do not reconstruct earlier activity when you opt in.

Blackbird creates at most one summary per application data directory per UTC day. Completed summaries are sent asynchronously while Blackbird is already running. Analytics does not launch a separate process, wake the computer, or make startup, Action execution, or shutdown wait for a network response.

Each upload is limited to 2 KiB. The local queue is limited to 30 summaries and 64 KiB, and summaries expire 30 days after the start of their reporting day. There are at most three upload attempts per UTC day across the entire queue, including retries. Reports may be delayed or lost; completeness is less important than keeping collection lightweight.

### 3.4 Processing, Retention, and Withdrawal

Cloudflare operates our reporting endpoint and database. Like other network services, it receives connection information, including an IP address, when handling a request. Its network and security processing is distinct from the usage totals described here. Our analytics code does not add IP addresses or request-header information to the analytics database, and Worker request logging is disabled. This is not a promise that the hosting provider processes no technical information. See [Cloudflare's privacy policy](https://www.cloudflare.com/policies/privacy/).

The service processes each summary in memory and merges its counts into daily aggregate records rather than keeping the original report. It stores a hash of the random summary identifier for duplicate prevention, expiring 45 days after receipt. Daily aggregate and ingestion-health records are scheduled for removal after 365 days. Cleanup runs daily, so deletion is not instantaneous at the expiry boundary and may be delayed during a service outage.

The database provider's recovery history may temporarily retain earlier database states after deletion. Our current Workers Free database recovery window is seven days. Restored data must undergo the same expiry cleanup before analytics service resumes.

Dashboard views and exports with fewer than five contributing summaries for a metric are withheld. This threshold does not prevent the backend from temporarily storing lower-volume aggregate cells, and is not a guarantee of anonymity.

Because we do not keep an individual account or device link to merged totals, we generally cannot locate or subtract your contribution from those totals after receipt. Turning reporting off prevents future reporting but does not undo prior aggregation. Contact us with privacy questions; do not send additional identifying information solely to identify an analytics contribution.

The specific retention limits in this section apply to basic usage reporting even where the general retention table below permits longer retention for other categories.

### 3.5 Feedback and Bug Reports You Submit

Sending feedback or a bug report is voluntary. When you submit the form, Blackbird sends the report directly to Discord through a webhook for our review, not through our analytics endpoint.

Every submission includes your feedback text, any related links you supply, Blackbird version and release channel, operating-system description, and submission timestamp. It also includes any optional name, email address, or Discord handle you enter and any attached files, including their filenames.

An issue report opened from a run additionally includes the Action name, outcome, project, source, runner, start and end times, and exit code. The run's diagnostic log is attached by default. You can remove it before submitting. Oversized logs are reduced to their most recent section rather than being fully attached.

Attachment contents are not automatically redacted. Logs, screenshots, videos, and other files may contain paths, usernames, project information, secrets, or other sensitive information. Review the information and attachments before sending; remove material you do not want to disclose. Do not include passwords, license keys, or unnecessary personal information. These reports are not anonymous merely because contact fields are optional. This feedback flow does not automatically upload crash reports.

We use reports to review feedback, investigate problems, improve Blackbird, and respond where contact information is supplied. Reports are delivered to a private Discord destination whose access is currently limited to Incogent's owner. This does not exclude processing by Discord as the service provider. Discord receives the report contents and connection information and processes information under its [privacy policy](https://discord.com/privacy).

To request deletion of a report or other information you supplied, email [legal@incogent.io](mailto:legal@incogent.io). Provide enough information to help us locate it, such as its approximate submission date and any contact information you included. Do not resend sensitive attachments solely to identify a report. We will delete data we can identify as yours from systems and copies under our control, subject to the limited legal and security exceptions in Section 14. You do not need to wait for a bug to be resolved to request deletion. Provider-held copies are also subject to Discord's retention practices.

We retain reports while actively investigating the reported issue and delete the original reports and attachments, including downloaded copies under our control, within 90 days after confirming resolution unless a documented continuing need justifies retention. We review unresolved reports quarterly and delete information no longer needed, including reports for abandoned investigations. We may retain a non-identifying summary of the bug and fix instead of the original report. These periods do not prevent earlier deletion on request as described above; provider-held copies follow the provider's own retention practices.

### 3.6 License Redemption

When you redeem a code, Blackbird sends the redemption code and a random redemption-attempt identifier to license.incogent.io. The attempt identifier is reused for retries of that redemption; it is not a device identifier. The service returns a signed license and records the redemption timestamp and attempt identifier against the hashed code.

The redemption payload does not include a hardware fingerprint, Windows username, email address, or usage history. Installed-license verification, full-license imports, and the local trial operate offline; there is no periodic license-server check. Hosting infrastructure still receives ordinary connection information when you redeem a code.

### 3.7 Updates and Action Network Connections

Blackbird uses Velopack to check its public GitHub release repository and download updates. Checks may occur automatically according to your update settings or when you request a manual check. GitHub and its download infrastructure receive requests for release information and files; Blackbird receives release metadata and update packages. This process does not upload project files or Action logs. See [GitHub's privacy statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement).

Actions and their tools can communicate with devices or services configured for those Actions, such as using SSH for SteamOS installation or retrieving logs from a device. These are operational transfers, not usage analytics sent to Incogent. Installed or custom packages may introduce other network behavior. Review the Actions, tools, packages, and destination services you choose to use.

For network requests, receiving infrastructure sees the connecting public IP address and ordinary request metadata; a proxy or VPN can change which public address is visible. This is distinct from Blackbird explicitly adding identifying fields to a request payload.

Turning off basic usage reporting does not disable feedback you submit, license redemption, update checks or downloads, or network activity performed by Actions and their tools. Those functions have their own purposes and controls.

## 4. How We Use Information

We may use personal information to:

- operate, secure, troubleshoot, and improve the Services and websites;
- process orders and issue, maintain, validate, and recover licenses;
- create and administer accounts, if accounts are offered;
- respond to questions, support requests, data-rights requests, and feedback;
- send transaction, security, license, account, and service communications;
- send an optional newsletter or other promotional communication only where you have requested or consented to it;
- detect, investigate, and prevent fraud, abuse, attacks, license misuse, and other harmful activity;
- comply with law, enforce our agreements, and establish, exercise, or defend legal claims;
- evaluate or distribute material you choose to contribute; and
- create aggregated or de-identified information that does not reasonably identify you.

## 5. Legal Bases for Processing

Where applicable law requires a legal basis, we process personal information as necessary:

- to perform a contract with you or take steps you request before entering one, including purchase, delivery, licensing, and account administration;
- for our legitimate interests, including operating and securing the Services, communicating with users, preventing fraud, maintaining business records, and improving our products, provided those interests are not overridden by your rights;
- with your consent, including optional Blackbird basic usage reporting, an optional newsletter, or certain nonessential technologies; and
- to comply with legal obligations and protect legal rights.

You may withdraw consent at any time. Withdrawal does not affect processing that occurred before withdrawal or processing supported by another lawful basis.

## 6. How We Disclose Information

We may disclose personal information:

- to vendors that provide hosting, security, analytics, communications, customer support, authentication, payment, storefront, order-fulfillment, and license-delivery services;
- to payment processors, resellers, or distribution platforms involved in a transaction you request;
- to professional advisers, such as attorneys, accountants, auditors, and insurers;
- when reasonably necessary to comply with law or legal process, protect a person or the public, investigate wrongdoing, secure the Services, or protect Incogent's rights and property;
- in connection with a merger, financing, acquisition, reorganization, bankruptcy, sale of assets, or similar business transaction, subject to appropriate confidentiality protections; or
- with your direction or consent.

Service providers may use information only to perform services for us or as otherwise permitted by their own direct relationship with you and applicable law.

**Incogent does not sell personal information. We do not share personal information for cross-context behavioral advertising, use it for targeted advertising, or place third-party advertisements in the Services.**

## 7. Website Storage, Analytics, and Embedded Content

Incogent aims to keep website data collection limited.

- A website may store a local preference, such as light or dark theme, in your browser. A preference stored only in local storage is not transmitted to Incogent merely because it is saved.
- We may use cookies or similar technologies that are reasonably necessary for security, forms, authentication, account sessions, purchases, fraud prevention, or other requested functionality.
- We may use Cloudflare Web Analytics or similar limited first-party operational analytics. We do not use analytics information to serve advertising or build advertising profiles.
- Pages may automatically load third-party media, fonts, community features, or widgets, including content from providers such as YouTube, Spotify, Discord, or Google. When a page loads that content, your browser connects directly to the provider. The provider may receive technical information such as your IP address, browser details, the referring page, and interactions with the content, and may use cookies or local storage under its own privacy policy.

Browser settings may allow you to block or delete cookies and site data. Blocking technologies that are necessary for a requested feature may prevent that feature from working. Because we do not sell personal information or conduct targeted advertising, we do not currently treat browser-based opt-out signals as requests to opt out of a sale or targeted advertising where no such processing occurs. We will honor legally recognized signals if our practices change in a way that requires it.

## 8. Third-Party Services and Links

The Services may link to or work with third-party services. A third party may collect information directly from you when you use its site, make a payment, sign in through it, view embedded content, or otherwise interact with its features. Incogent does not control and is not responsible for the third party's independent privacy practices.

The identity of payment processors, storefronts, resellers, authentication providers, and similar partners may vary. Relevant provider terms and privacy notices will ordinarily be presented at the point where you use that provider.

## 9. Accounts and License Records

Blackbird does not currently require an Incogent account. We may offer accounts in the future to simplify license delivery, use on multiple computers, organization administration, and license recovery.

Licenses may also function offline. Deleting your Incogent account or associated recovery information does not revoke an already issued offline license, but it may permanently limit or eliminate our ability to identify, restore, replace, or recover that license for you. We will explain this consequence before completing a deletion request where reasonably practicable.

## 10. Communications

We may send transactional messages about purchases, licenses, accounts, security, support, or material changes to a Service. These messages are not promotional subscriptions and may be necessary to provide a requested Service.

If we offer a newsletter or promotional mailing list, participation will be optional. You may unsubscribe using the link in the message or by contacting us. Unsubscribing from promotional messages does not prevent necessary transactional communications.

## 11. Retention

We retain personal information only for as long as reasonably necessary for the purposes described in this Privacy Policy, including legal, accounting, security, fraud-prevention, and dispute-resolution needs. Our general retention periods are:

| Category | General retention period |
| --- | --- |
| Account information | Until account deletion, then removed from active systems within a reasonable period; residual backups may remain for up to 90 days |
| License-fulfillment and recovery records | For as long as the license or recovery service remains valid or useful, unless you request deletion and no legal exception applies |
| Website and security logs | Ordinarily up to 90 days, but longer when reasonably necessary to investigate abuse, an incident, or a legal claim |
| In-app feedback and issue reports, including attached diagnostics | While actively investigating; original reports and attachments deleted within 90 days after confirmed resolution unless a documented continuing need remains. Unresolved reports reviewed quarterly and unneeded information deleted; earlier deletion may be requested under Sections 3.5 and 14. |
| Other voluntarily supplied crash or diagnostic data | Ordinarily up to 90 days after the related support matter is closed |
| Other support and general correspondence | Ordinarily up to two years after the matter is closed |
| Newsletter records | Until you unsubscribe or we discontinue the list, with limited suppression records retained to honor your choice |
| Transaction and accounting records | For the period required by tax, accounting, anti-fraud, and other applicable laws |
| Optional Blackbird basic usage reporting | The specific local, duplicate-prevention, aggregate, and recovery-history limits in Section 3.4 apply; local queue limits are in Section 3.3 |
| Other de-identified information | Indefinitely, provided it is not reasonably re-identifiable |

We may shorten these periods when information is no longer needed or retain information longer when required by law, reasonably necessary for security or a legal claim, or requested by you.

## 12. Security

We use reasonable administrative, technical, and organizational safeguards appropriate to the nature of the information we process. No method of transmission, storage, or security is completely reliable, and we cannot guarantee absolute security.

You are responsible for protecting your devices, account credentials, license files, recovery codes, and copies of information you choose to submit.

## 13. International Processing and Transfers

Incogent is based in the United States. If you access the Services from another country, your information may be processed in the United States and in other countries where our service providers operate. Those countries may have privacy laws different from those where you live.

Where required, we use legally recognized safeguards for international transfers, which may include contractual protections or transfer mechanisms maintained by our service providers. You may contact us for more information about safeguards applicable to your information.

## 14. Your Privacy Rights

Incogent offers users, regardless of location, the ability to request that we:

- confirm whether we process their personal information and provide access to it;
- correct inaccurate personal information;
- delete personal information;
- provide a portable copy of personal information they provided to us; and
- honor applicable rights to object, restrict processing, withdraw consent, or appeal our response.

To request deletion or exercise another privacy right, email [legal@incogent.io](mailto:legal@incogent.io). Please describe the request and the information or Service involved. We will delete information we can identify as yours from systems and copies under our control, subject to the exceptions below. You do not need an Incogent account to make a request. We may ask for information reasonably necessary to locate the data and verify your identity and authority, but please do not send passwords, license keys, or unnecessary sensitive information. An authorized agent may make a request where permitted by law, but we may require proof of authority and identity verification.

We cannot generally identify or separate an individual's contribution from the merged basic usage totals described in Section 3.4. We will not collect new persistent identifiers merely to make those totals identifiable. Turning off basic usage reporting deletes unsent local analytics state and stops future reporting. For other data we can locate, including identifiable feedback, the deletion process above applies. Deleting copies under our control does not guarantee immediate removal from a provider's independent logs or recovery systems.

We generally aim to respond within 30 days and will follow any different deadline required by applicable law. We will not discriminate against you for exercising a privacy right.

Some information may be exempt from a request or may need to be retained to complete a transaction, comply with law, prevent fraud, protect security, maintain records of a request, or establish or defend legal claims. If we deny or limit a request, we will explain why where required. You may appeal by replying to our decision or emailing **legal@incogent.io** with "Privacy Appeal" in the subject line.

You may also complain to the privacy or data-protection authority where you live. We encourage you to contact us first so we can try to resolve the concern.

## 15. Children's Privacy

The Services are not directed to children under 13, and we do not knowingly collect personal information from children under 13. Blackbird licenses are intended for adults who have reached the age of legal majority and can enter a binding agreement. If you believe a child has provided personal information to us, contact us so we can investigate and delete it where appropriate.

## 16. Changes to This Privacy Policy

We may update this Privacy Policy as our Services, providers, and legal obligations change. We will post the updated policy and revise the Effective Date. If a change materially affects how we use personal information already collected, we will provide additional notice or request consent when required by applicable law.

## 17. Language

Translations may be provided for convenience. The English version is the controlling version to the extent permitted by applicable law.

## 18. Contact Us

Questions, concerns, and privacy requests may be sent to:

**Incogent LLC**  
705 N Argonne Ave  
Sterling, Virginia 20164  
United States  
**Email:** legal@incogent.io  
**Privacy Policy:** https://www.incogent.io/privacy
