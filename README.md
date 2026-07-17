# Varcheck

Varcheck is a pass-through AML compliance utility for high-value real estate transactions, built to solve a narrow 2026 problem: new FINTRAC rules require verified ID and beneficial-ownership data down to the 25% threshold, but full compliance suites get blocked by brokerage IT review and unrepresented buyers refuse to hand identity documents to an adversarial listing agent's phone.

Varcheck lets an agent generate a single-use secure link mid-viewing via SMS or WhatsApp with no login or app. The buyer opens it in an isolated mobile browser vault and captures documents through the device camera. The system runs a static completeness check and emails an audit-ready PDF straight to the broker, then purges all raw identity records within 24 hours.

## Key Value Propositions

- **For Brokerages**: Removes FINTRAC regulatory exposure.
- **For IT Operations**: Removes the IT-approval bottleneck since there is no integration to review.
- **For Buyers**: Removes the trust bottleneck, as sensitive documents never sit with or pass through the individual agent's device.

## Business & GTM Model

Varcheck works as a business through a two-tier subscription sold bottom-up from a free single-transaction use by individual agents:
1. **Standard Tier ($180/mo)**: Validates up to 50 transaction loops.
2. **Velocity Tier ($450/mo)**: Unlimited transaction loops with real-time registry integration and compliance officer review.

This model closes its value loop in about 360 seconds, expanding organically into brokerage-wide enterprise accounts and generating built-in virality as each transaction exposes new buyers and their counsel to the product.

## Tech Stack & Architecture

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Styling**: Vanilla CSS Modules (Fluid CSS variables, tokens, and animations)
- **Database & Event Tracking**: Supabase
- **Identity & Authentication**: Clerk Identity Provider
- **Local Dev Server**: running on `http://localhost:3002`

## Getting Started

First, install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```
