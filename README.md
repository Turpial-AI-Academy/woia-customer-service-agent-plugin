# woia-customer-service

Generic department orchestrator v0.5.0 implementing the accepted receive → understand → resolve → coordinate → follow-up service method. Core >=0.5.3 is the only hard plugin dependency. [Skill](skills/woia-customer-service/SKILL.md) documents provider composition and authority boundaries.

External-person communication and appointment mutation execute through qualified Communications/Scheduling with authenticated Customer Service-owned work. Other business owners retain facts, procedures, human decisions and outcomes. No industry wrapper, universal router, permanent per-customer root or duplicated provider logic.

The portable plan guard uses current adapter-verified context, returns fail-closed verdicts and never executes effects. [Execution contract](skills/woia-customer-service/references/execution-contract.md) defines its trust boundary; [qualification](skills/woia-customer-service/references/method.md) separates synthetic checks from real-host evidence. Actual external effects, provider qualification and Operator E2E remain NOT_RUN; Production Ready=false.

Maintenance: mise run bootstrap, mise run doctor, mise run test, mise run ci:fast. Commit a clean exact candidate before mise run release:check and Ecosystem plugin:certify-thin. Node/pnpm authoring pins do not become universal consumer requirements. The optional checksum manifest is absent.
