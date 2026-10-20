export type FollowStatus = boolean | null;

export function followGateDecision(status: FollowStatus) {
  return status === true ? "confirmed" : status === false ? "not-following" : "unavailable";
}

export const FOLLOW_GATE_DEFAULTS = {
  openingDmEnabled: true,
  openingDmMessage: "팔로우 확인을 위해 아래 버튼을 눌러주세요. 팔로우가 확인되면 요청하신 자료를 보내드려요.",
  openingDmButtonLabel: "팔로우 확인 🙌",
  requireFollow: true,
  followPromptMessage: "아직 팔로우가 확인되지 않았어요. 계정을 팔로우한 뒤 아래 버튼을 다시 눌러주세요.",
  followPromptButtonLabel: "팔로우 완료했어요 🙌",
  linkButtonLabel: "🔗",
} as const;

export const FOLLOW_STATUS_UNAVAILABLE_MESSAGE =
  "지금은 팔로우 여부를 확인할 수 없어요. 링크는 아직 보내지 않았습니다. 잠시 후 아래 버튼을 눌러 다시 확인해주세요.";
