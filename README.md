# Redeem Community Edition
A platform for digital monetary vouchers, as well as associated 
processes and bookkeeping

## Background

[Redeem](https://redeem.gov.sg) is used by the Singapore Government to 
distribute monies to recipients in a highly-targeted fashion, typically
in the form of digital vouchers to be a spent at a list of merchants. 
The original platform is highly specific to Singapore's context, including
the use of MyInfo, voucher eligibility criteria outlined by government
agencies in Singapore, and settling payouts through Singapore's banks.

Redeem Community Edition (RedeemCE) is derived from the Redeem codebase,
focusing on the creation, redemption and settlement of digital vouchers.
Links to vouchers are distributed to recipients through SMS, with a fallback
using paper printouts.

RedeemCE will be published in parts over time, to account for the time it
takes to repackage Redeem for use in other contexts.

## Overview

RedeemCE is a monorepo managed with Lerna, consisting of several packages:

### Voucher

Provides the interface to allow voucher recipients to view and redeem their
vouchers.
