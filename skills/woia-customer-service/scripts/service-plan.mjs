import { createHash } from 'node:crypto';
const digest = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');
const text = value => typeof value === 'string' && value.trim().length > 0;
/** Pure plan check. All verification context must come from trusted current adapters, not model input. */
export function evaluateServicePlan(plan, context) {
  const blocked = reason => ({result:'BLOCKED', reason, executed:false});
  if (!plan || !context) return blocked('MISSING_CONTEXT');
  if (typeof plan !== 'object' || Array.isArray(plan) || Object.keys(plan).some(k=>!['action','operation_id','purpose','organization_id','resource_version','recipient','payload'].includes(k)) || !plan.payload || typeof plan.payload !== 'object' || Array.isArray(plan.payload)) return blocked('INVALID_PLAN');
  if (!['external-send','appointment-create','appointment-reschedule','appointment-cancel'].includes(plan.action)) return blocked('UNSUPPORTED_ACTION');
  if (!text(plan.operation_id) || !text(plan.purpose) || !text(plan.resource_version) || !text(context.actor_id)) return blocked('MISSING_IDENTITY');
  if (context.authenticated !== true || context.work_department !== 'customer-service') return blocked('CUSTOMER_SERVICE_ONLY');
  if (!text(plan.organization_id) || context.organization_id !== plan.organization_id || plan.recipient?.organization_id !== plan.organization_id) return blocked('ORGANIZATION_SCOPE');
  if (!text(plan.recipient?.id) || plan.recipient.classification !== 'external-person' || context.recipient_verified !== true) return blocked('RECIPIENT_UNKNOWN');
  if (!Array.isArray(context.sources) || !context.sources.length || context.sources.some(s=> !text(s?.ref)||!text(s?.version)||s.accepted!==true||s.current!==true||s.authorized!==true||s.conflict!==false)) return blocked('SOURCE_AUTHORITY_UNKNOWN');
  if (context.human_takeover !== false || context.new_reply !== false) return blocked('AUTOMATION_SUPERSEDED');
  if (context.previous_effect === 'UNKNOWN') return blocked('RECONCILE_BEFORE_RETRY');
  if (context.previous_effect !== 'NOT_SUBMITTED') return blocked('EFFECT_ALREADY_SUBMITTED_OR_UNKNOWN');
  if (context.binding_qualified !== true) return blocked('PROVIDER_UNQUALIFIED');
  const a=context.authority;
  if (!a || a.current!==true || a.revoked!==false || a.actor_id!==context.actor_id || a.department!=='customer-service' || a.operation_id!==plan.operation_id || a.action!==plan.action || a.recipient_id!==plan.recipient.id || a.organization_id!==plan.organization_id || a.purpose!==plan.purpose || a.resource_version!==plan.resource_version || a.payload_sha256!==digest(plan.payload)) return blocked('EXACT_AUTHORITY_REQUIRED');
  if (plan.action !== 'external-send' && context.notification_mode !== 'disabled') return blocked('COMPOUND_NOTIFICATION_BYPASS');
  if (context.business_intent !== 'approved-operational' || context.owner_policy_current !== true) return blocked('OWNER_AUTHORITY_NOT_TRANSFERRED');
  return {result:'ELIGIBLE_PLAN', executed:false, provider:plan.action==='external-send'?'woia-communications':'woia-scheduling', action:plan.action==='external-send'?'communication.external.send':`appointment.${plan.action.slice(12)}`, operation_id:plan.operation_id};
}
export {digest as payloadDigest};
