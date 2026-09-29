# Blackbird Stripe checkout integration

Updated: 2026-09-29. Status: sandbox payment/email verified; multi-seat fulfillment deployed, next purchase test pending. Live catalog configured; public sales disabled.

## Checkout polish and multiple seats (2026-09-29)

Sandbox product now displays Blackbird Alpha with a concise per-code commercial seat,
12-month preview/stable update and perpetual covered-version description. Price IDs,
regional prices and metadata remain unchanged. Payment Link quantity is enabled for
1–10 seats, confirmed by independent line-item readback. Multi-seat fulfillment deployed
after migration 0005; 52 backend tests pass. One email contains all distinct purchased codes.
Existing single-seat order remains intact. Additional sandbox inventory is ready.

Managed Payments rejects custom_text; no custom submit prose was applied. Branding settings
are not exposed by this account's MCP tools. Remaining Dashboard step: select Incogent sandbox,
open Settings > Branding > Checkout, use the official Incogent logo, dark teal #203c36
background and dark teal #203c36 button on the light payment form, with readable button
text chosen by Stripe. Prefer the editor's preview/contrast checks. Product name/description
updates are confirmed by API; logo/color application and hosted visual review remain pending.
No live catalog or live sales configuration changed in this task.

This records the website's Stripe setup and integration boundary. Blackbird's
`Docs/CommerceFulfillmentPlan.md` remains the licensing execution plan. Its earlier
Creem references have been reconciled with the user's Stripe selection;
its offline-license and refund requirements remain applicable.

## Verified setup

- Installed `stripe@openai-curated` and configured `https://mcp.stripe.com`.
- OAuth succeeded for Incogent sandbox (`acct_1UKlN9LykVJEVOBm`, `livemode=false`)
  and Incogent live (`acct_1UL5y9L5NhSelnQX`, `livemode=true`).
- Called Stripe's implementation planner with Incogent's business description,
  Blackbird's existing licensing architecture, and the requested initial scope.
- Planner guide `iguide_61VUU1QxwV6LxmRK141LykVJEVOBm` accepted the terminal choice
  `managed_payment_links`: Stripe only, browser checkout, digital goods,
  Managed Payments, hosted Payment Link. Acceptance records the integration
  selection, not account eligibility or production approval.
- Initial read-only product listing was empty. Subsequently created the sandbox
  product, one-time price and Managed Payments Payment Link listed below. No
  webhook or financial transaction was created. The live product/price was then
  created for Managed Payments onboarding; no live Payment Link was created.
- The sandbox Payment Link response confirms `managed_payments.enabled=true`,
  automatic tax with Stripe liability, and invoice creation with Stripe as issuer.
  This confirms sandbox configuration, not live eligibility or end-to-end fulfillment.

## Initial alpha offering (confirmed 2026-09-29)

| Setting | Value |
| --- | --- |
| Product | Blackbird Alpha, per seat |
| Price | $149 USD per seat, one-time |
| Updates | 12 calendar months from purchase |
| Continued use | Perpetual for versions covered by the update window |
| Renewals | No automatic renewal or recurring payment |
| SKU | `blackbird-alpha-seat-v1` |
| Sandbox product ID | `blackbird_alpha_seat_v1` |
| Sandbox price ID | `price_1UL6BSLykVJEVOBmmI20E8En` |
| Sandbox Payment Link ID | `plink_1UL6C5LykVJEVOBmC6vzlZH9` |
| Live product ID | `blackbird_alpha_seat_v1` (separate live account) |
| Live price ID | `price_1UL6kIL5NhSelnQXKxUMevSt` |
| Checkout quantity | One seat per purchase initially |
| Tax configuration | Verified in sandbox/live: USD/CAD exclusive; EUR/GBP/AUD inclusive |
| Product tax category | `txcd_10202003`, downloadable software for business use |

[Sandbox checkout preview](https://buy.stripe.com/test_8x214o3OB2bf4eWfVk2VG00).
This link uses a hosted confirmation explaining that sandbox fulfillment is being
tested and asking the operator to check the configured test inbox after about five
minutes. It is not linked from the public shop. Paid sandbox events now queue fulfillment.
Change to the Incogent success URL after that page and fulfillment are verified.

Product, Price, Payment Link and generated PaymentIntent metadata identify the
offering, with Payment Link metadata copied by Stripe to Checkout Sessions.
The returned price was read back: `unit_amount=14900`, `currency=usd`,
`type=one_time`, `recurring=null`, `livemode=false`, `tax_behavior=exclusive`.

For future price increases, create a new Price and update the current purchase link.
Keep historical price-to-entitlement mappings for reconciliation and in-flight
payments; every purchase retains its original amount and entitlement snapshot.
Do not infer lifetime updates, a renewal price, or a perpetual price guarantee.

### Regional pricing decision (2026-09-29)

The user approved setting prices appropriate to each region rather than requiring
one globally identical amount. Keep the US offering at $149 USD per seat before
applicable sales tax. The user selected the following natural retail prices over
exact exchange-rate parity; these supersede the earlier CAD 215, GBP 135 and AUD 235
suggestions. All amounts are one-time, per seat:

| Market | Currency | Approved amount | Tax behavior |
| --- | --- | --- | --- |
| US | USD | 149 | Exclusive: plus applicable tax |
| Canada | CAD | 219 | Exclusive: plus applicable tax |
| Euro area | EUR | 159 | Inclusive of applicable VAT |
| UK | GBP | 139 | Inclusive of applicable VAT |
| Australia | AUD | 239 | Inclusive of applicable GST |

These amounts were configured and independently read back in sandbox and live on
2026-09-29. Connector access is working again. Added `currency_options` to existing
prices `price_1UL6BSLykVJEVOBmmI20E8En` (sandbox) and
`price_1UL6kIL5NhSelnQXKxUMevSt` (live), preserving their IDs, USD amount,
product association and entitlement metadata. Readback confirmed USD 14900,
CAD 21900, EUR 15900, GBP 13900 and AUD 23900 minor units, the tax behaviors above,
active status, `type=one_time`, and `recurring=null` in both environments. Present
tax-inclusive consumer prices where required and tax-exclusive prices where
appropriate. Regional amounts need not be direct currency conversions of $149.
All regional prices grant the same per-seat license and update coverage.

Stripe's Automatic default selects exclusive
behavior for USD/CAD and inclusive behavior for other currencies, not by buyer
jurisdiction. This does not replace regional website price presentation. Existing
explicitly exclusive prices do not inherit a changed account default. These five
currency options now have explicit tax behavior; no account default was changed.
Before launch, verify hosted
checkout currency selection (including European buyers paying in USD), and match
the website's displayed amounts and tax labels to the checkout. Do not assume
Automatic alone resolves every jurisdiction's consumer price requirements.

The user requests the website pricing update after Stripe is working. Keep the
public shop coming soon until hosted checkout and fulfillment are validated;
catalog readback alone is not a successful payment or license-delivery test.

Reference: [Stripe tax behavior](https://docs.stripe.com/tax/products-prices-tax-codes-tax-behavior).

The user explicitly chose to keep offline signing. Prepare separate batches for
UTC purchase dates, signing `updatesThrough` as the purchase date plus 12 calendar
months, with February 29 clamped to February 28 in a non-leap year. The existing
license evaluator includes releases on that cutoff date. Use no `expiresAt` and
no `maximumVersion` cap. Keep the actual signing time as `issuedAt`.
Choose the pool using confirmed payment success time, never webhook processing,
batch generation or redemption time. Missing dated inventory leaves fulfillment
pending for replenishment instead of shortening or silently extending the grant.
The user confirmed both preview and stable release coverage. Issue commercial
licenses allowing both channels. Online signing remains deferred.

Live account access is verified. Its initial product listing was empty; created
Blackbird Alpha per seat with preview/stable coverage, the agreed perpetual-use
and 12-month-update terms, business-use downloaded-software tax code, and a
one-time $149 USD price with tax added. Live price readback confirms 14900 USD
cents, no recurring interval, and `livemode=true`. Managed Payments onboarding
still needs the user's product review and remaining Dashboard steps. Successful
catalog creation does not verify payment/payout readiness or Managed Payments activation.

The user confirmed that the existing Resend integration was inherited from the
forked website and has not been configured for Incogent. They will set up Resend
next. The `updates.incogent.io` sender in configuration is not evidence of domain
verification. Use a separate sending-only credential for fulfillment, a monitored
Reply-To mailbox, and encrypted Worker secrets after Incogent setup is complete.

## Chosen scope and draft design

Use a one-time Managed Payments Payment Link on Stripe's default hosted domain.
The generated Blackbird shop links to it. The success page supplies the existing
download link and explains email fulfillment without claiming an email has already
been delivered. Browser navigation never authorizes fulfillment.

Managed Payments handles purchase invoices and receipts. Do not add a separate
invoice-creation workflow or unsupported `invoice_creation` parameters. Incogent
delivers the Blackbird code, download link, and activation instructions separately.
Subscriptions, customer accounts, embedded checkout, and custom checkout domains
are outside the initial scope.

The backend verifies Stripe signatures over raw request bytes, retrieves trusted
session/line-item data, checks paid status and configured account/environment,
product, price, quantity and SKU mapping, then persists the purchase. Handle
`checkout.session.completed` and `checkout.session.async_payment_succeeded`;
an unpaid completed session must not consume inventory. Record asynchronous
failure without overwriting a later confirmed payment or terminal refund state.

Deduplicate Stripe events and purchase assignments separately. Database-enforced
uniqueness and atomic allocation must prevent concurrent orders from receiving the
same code. Keep product/tier metadata for traceability; the server's allowlisted
offering map determines entitlement. Persist actual amounts, tax and currencies;
do not compare a display-price string to determine fulfillment.

Reuse Blackbird's offline issuer and existing code/token format. The private commerce
batch import retains recoverable delivery codes in access-controlled D1 alongside
the existing bearer tokens; protect exports as credentials. Keep order/license assignment durable and email delivery
independently retryable. Never mark an event processed before its work is durably
recorded. A durable pending job is required before acknowledging deferred work;
background execution alone is not a retry guarantee.

Use the existing Resend integration pattern if sender/domain configuration is
available. Record message references and use provider idempotency where supported;
handle ambiguous send outcomes without allocating replacement licenses. Provide
authenticated support lookup, resend and reconciliation. Keep codes and tokens out
of URLs and logs. Inventory exhaustion retains paid orders for recovery, triggers
an owner-visible failure, and pauses further sales where practical.

Refund/dispute events must reconcile with current payment state even when delivered
before purchase events. Preserve Blackbird's planned unredeemed-code exclusion and
updater-only revocation; installed licenses remain usable offline. The updater gate
is app work and remains unimplemented, not silently deferred by the Stripe choice.

## Next implementation inputs and sequence

1. Amount/currency, per-seat purchase, update window and offline signing are
   confirmed, including preview and stable release coverage. Sandbox offering and
   Managed Payments link are configured. Regional amounts are approved above;
   configured and read back in both accounts. Validate hosted currency selection
   and tax presentation before launch.
2. The order/inventory/delivery schema, webhook, allocation, retries and financial
   holds are implemented and deployed in sandbox alongside licensing code.
3. Dated signed sandbox inventory and runtime credentials are configured.
4. The sandbox webhook and API/email secrets are installed. Maintain secrets
   through local secret configuration, never chat or Git.
   MCP OAuth is tooling access, not the Worker's runtime API credential.
5. Test successful payment through email and redemption, invalid signatures,
   duplicate/concurrent/out-of-order events, unpaid sessions, closed checkout
   windows, inventory exhaustion, ambiguous email failures, refunds/disputes and
   reconciliation. Sandbox inventory and delivery recipients stay isolated.
6. Add generated website purchase/success pages, complete applicable site checks
   and EULA synchronization, configure live credentials and approved commercial
   inventory, then enable purchases after end-to-end validation.

## Sandbox fulfillment implementation (2026-09-29)

The existing Blackbird license Worker now has a signed-webhook inbox, trusted Stripe
purchase verification, atomic dated allocation, durable email retries, and refund/dispute
holds enforced by redemption. A dedicated sandbox Worker and D1 database are deployed;
production licensing and the public website have not changed. Resend integration is
implemented and the user has saved its sending key and sender/test-recipient settings;
binding types and address formats are verified. User confirmed inbox receipt; D1 confirms
one processed event, one assigned license and one accepted email.
The Stripe runtime API key is
configured as an encrypted Worker secret; account and sandbox price access are verified.
Dated sandbox inventory is imported for September 29/30 UTC, two codes per date with
the corresponding twelve-month cutoffs. The existing offline issuer used its signing
key locally; no key, token or code was printed or committed. Sandbox purchase and email
are verified; activation testing remains next. Production inventory was not changed.

Endpoint: `https://license-sandbox.incogent.io/v1/stripe/webhook`.
Stripe webhook: `we_1UL7cTLykVJEVOBmRM0srh3R`; signing secret installed directly in
Cloudflare. API/event version `2026-08-26.dahlia`. Sandbox D1 ID:
`2aae66b7-1b6e-444c-aa45-50fa6704f745`. Deployment and support instructions:
`E:/GitHub/Blackbird/LicenseServer/blackbird-license-api/COMMERCE.md`.

Automated Worker tests cover duplicate events, concurrent assignments, inventory exhaustion,
email failure, raw signature checks and financial holds. Deployed smoke checks reject unsigned
requests (400) and acknowledge a signed ignored event (200). A subsequent sandbox purchase
and inbox delivery are verified. Branded HTML/plain-text email and immediate fulfillment
after webhook persistence are deployed, retaining five-minute recovery. All 48 backend tests
pass; desktop and 390px mobile previews were reviewed. The next purchase checks new-template
inbox appearance and actual immediate timing. Updater revocation, failure notifications,
broader reconciliation, live configuration, and the website launch remain outstanding.

The public shop remains coming soon. Existing unrelated working-tree changes were left intact.

## Stripe references

- [Managed Payments Payment Links](https://docs.stripe.com/payments/managed-payments/use-payment-links)
- [Eligibility](https://docs.stripe.com/payments/managed-payments/eligibility)
- [Checkout fulfillment](https://docs.stripe.com/checkout/fulfillment)
- [Stripe MCP](https://docs.stripe.com/mcp)
