# woia-customer-service

Generic department orchestrator v0.5.7 implementing the accepted receive → understand → resolve → coordinate → follow-up service method. Core >=0.5.7 is the only hard plugin dependency. [Skill](skills/woia-customer-service/SKILL.md) documents provider composition and authority boundaries.

External-person communication and appointment mutation execute through qualified Communications/Scheduling with authenticated Customer Service-owned work. Other business owners retain facts, procedures, human decisions and outcomes. No industry wrapper, universal router, permanent per-customer root or duplicated provider logic.

The portable plan guard uses current adapter-verified context, returns fail-closed verdicts and never executes effects. [Execution contract](skills/woia-customer-service/references/execution-contract.md) defines its trust boundary; [qualification](skills/woia-customer-service/references/method.md) separates synthetic checks from real-host evidence. Actual external effects, provider qualification and Operator E2E remain NOT_RUN; Production Ready=false.

Maintenance: validate a clean exact candidate through WOIA Ecosystem `plugin:certify-thin`; repositories with local tooling also expose `ci:fast` and `release:check`.

## Maintenance

Edit only this canonical repository. Keep `plugin.json`, `package.json` and `dev.woia/manifest.json` versions aligned. From the canonical WOIA Ecosystem repository, run `mise run plugin:certify-thin --repo <absolute-plugin-repository>`, then use its release preparation/publication tasks. Install and update consumers from immutable published artifacts; keep Project personalization in overlays.
