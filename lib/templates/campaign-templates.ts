export interface CampaignTemplate {
  slug: string;
  title: string;
  category: string;
  audience: string;
  summary: string;
  goal: string;
  keywords: string[];
  dmMessage: string;
  triggerExample: string;
  privateReplyPreview: string;
  setupMinutes: number;
  outcome: string;
  bestFor: string[];
  playbook: string[];
  metrics: string[];
  accent: "cyan" | "emerald" | "rose" | "amber";
}

export const CAMPAIGN_TEMPLATES: CampaignTemplate[] = [
  {
    slug: "ko-resource-link",
    title: "자료 링크 보내기",
    category: "자료 공유",
    audience: "정보를 공유하는 크리에이터",
    summary: "정보, 자료, 링크 댓글에 가이드나 다운로드 링크를 DM으로 보냅니다.",
    goal: "요청한 자료 전달",
    keywords: ["정보", "자료", "링크"],
    dmMessage: "{username}님, 요청하신 자료 보내드려요! https://example.com/guide",
    triggerExample: "정보 주세요!",
    privateReplyPreview: "하늘님, 요청하신 자료 보내드려요! example.com/guide",
    setupMinutes: 3,
    outcome: "댓글에서 요청한 자료를 바로 전달합니다.",
    bestFor: ["무료 가이드", "체크리스트", "앱·서비스 소개"],
    playbook: ["자료를 소개하는 게시물이나 릴스를 선택하세요.", "댓글에 남길 키워드를 안내하세요.", "예시 URL을 실제 자료 링크로 바꾸세요.", "다른 계정으로 댓글을 남기고 발송 기록을 확인하세요."],
    metrics: ["발송한 DM", "자료 링크 클릭", "실패한 발송"],
    accent: "cyan",
  },
  {
    slug: "ko-product-link",
    title: "상품 정보 보내기",
    category: "상품 안내",
    audience: "쇼핑몰·브랜드 운영자",
    summary: "구매, 상품, 가격 댓글에 상품 페이지를 DM으로 안내합니다.",
    goal: "상품 정보 전달",
    keywords: ["구매", "상품", "가격"],
    dmMessage: "{username}님, 문의하신 상품 정보예요. 옵션과 가격은 여기서 확인해 주세요: https://example.com/product",
    triggerExample: "가격 궁금해요",
    privateReplyPreview: "하늘님, 문의하신 상품 정보예요. example.com/product",
    setupMinutes: 4,
    outcome: "상품 문의와 구매 링크를 연결합니다.",
    bestFor: ["신상품 릴스", "상품 후기", "공동구매 안내"],
    playbook: ["상품이 나오는 게시물을 선택하세요.", "안내할 키워드를 정하세요.", "예시 링크를 실제 상품 페이지로 바꾸세요.", "가격과 옵션 정보가 최신인지 확인하세요."],
    metrics: ["상품 문의", "발송한 DM", "상품 링크 클릭"],
    accent: "rose",
  },
  {
    slug: "ko-event-signup",
    title: "신청 링크 보내기",
    category: "행사·모임",
    audience: "모임·클래스 운영자",
    summary: "신청, 참여, 예약 댓글에 신청 페이지를 DM으로 보냅니다.",
    goal: "신청 페이지 안내",
    keywords: ["신청", "참여", "예약"],
    dmMessage: "{username}님, 관심 가져주셔서 감사해요! 일정과 신청 방법은 여기서 확인하세요: https://example.com/signup",
    triggerExample: "참여 하고 싶어요",
    privateReplyPreview: "하늘님, 일정과 신청 방법을 확인해 주세요. example.com/signup",
    setupMinutes: 3,
    outcome: "관심 있는 사람에게 신청 방법을 전달합니다.",
    bestFor: ["클래스", "오프라인 모임", "온라인 행사"],
    playbook: ["일정과 대상을 게시물에 안내하세요.", "신청 키워드를 정하세요.", "실제 신청 페이지 URL을 입력하세요.", "모집이 끝나면 자동화를 일시 중지하세요."],
    metrics: ["신청 문의", "신청 링크 클릭", "발송한 DM"],
    accent: "emerald",
  },
  {
    slug: "dtc-product-link",
    title: "DTC Product Link Drop",
    category: "Social commerce",
    audience: "DTC brands",
    summary:
      "Turn comments like LINK or SHOP into a private reply with the exact product page, size guide, or launch bundle.",
    goal: "Product link request",
    keywords: ["LINK", "SHOP", "BUY"],
    dmMessage:
      "Hey {username}, here is the product link you asked for: https://yourstore.com/product",
    triggerExample: "LINK please",
    privateReplyPreview:
      "Hey Maya, here is the product link you asked for: yourstore.com/product",
    setupMinutes: 4,
    outcome: "More warm product conversations from high-intent comments.",
    bestFor: ["Product drops", "UGC reels", "Influencer campaigns"],
    playbook: [
      "Pick the reel or post that shows the product clearly.",
      "Use LINK, SHOP, and BUY as the first keywords.",
      "Send a direct product URL with one short benefit line.",
      "Track which product posts create the most sent replies.",
    ],
    metrics: ["Sent replies", "Skipped duplicates", "Product link CTR"],
    accent: "cyan",
  },
  {
    slug: "real-estate-lead-form",
    title: "Real Estate Lead Form",
    category: "Lead generation",
    audience: "Agents and broker teams",
    summary:
      "Send buyers or sellers a valuation form, booking link, or neighborhood guide after they comment on a listing reel.",
    goal: "Lead magnet delivery",
    keywords: ["HOME", "LISTING", "VALUE"],
    dmMessage:
      "Hey {username}, here is the form to get the property details and next available showing slots: https://yourlink.com/home",
    triggerExample: "HOME details",
    privateReplyPreview:
      "Hey Jordan, here is the form to get property details and showing slots.",
    setupMinutes: 5,
    outcome: "Capture listing interest before it gets buried in comments.",
    bestFor: ["Listing reels", "Neighborhood guides", "Seller valuation posts"],
    playbook: [
      "Choose one property or local-market post.",
      "Use keywords that match buyer intent, not generic emojis.",
      "Send a form that asks for contact details and timing.",
      "Follow up manually with qualified leads from the form.",
    ],
    metrics: ["Lead form opens", "DM sends", "Booked showings"],
    accent: "emerald",
  },
  {
    slug: "fitness-plan",
    title: "Fitness Plan Download",
    category: "Creator funnels",
    audience: "Coaches and fitness creators",
    summary:
      "Deliver a workout plan, macro guide, or coaching intake form when followers comment PLAN, FIT, or START.",
    goal: "Lead magnet delivery",
    keywords: ["PLAN", "FIT", "START"],
    dmMessage:
      "Hey {username}, here is the free plan from the reel: https://yourlink.com/fitness-plan",
    triggerExample: "PLAN",
    privateReplyPreview:
      "Hey Sam, here is the free plan from the reel: yourlink.com/fitness-plan",
    setupMinutes: 3,
    outcome: "Move motivated followers into a coaching or email funnel.",
    bestFor: ["Workout reels", "Transformation posts", "Challenge launches"],
    playbook: [
      "Post a reel that shows the result and asks for one keyword.",
      "Keep the DM short and focused on the promised asset.",
      "Add a coaching intake link after the free value.",
      "Review failed and skipped logs after high-traffic reels.",
    ],
    metrics: ["Guide requests", "Challenge signups", "Coaching inquiries"],
    accent: "rose",
  },
  {
    slug: "course-webinar",
    title: "Course Webinar Invite",
    category: "Education",
    audience: "Course sellers",
    summary:
      "Send webinar registration or lesson links to followers who comment WEBINAR, CLASS, or LEARN on educational posts.",
    goal: "Launch waitlist",
    keywords: ["WEBINAR", "CLASS", "LEARN"],
    dmMessage:
      "Hey {username}, here is the free class registration link: https://yourlink.com/webinar",
    triggerExample: "WEBINAR",
    privateReplyPreview:
      "Hey Alex, here is the free class registration link: yourlink.com/webinar",
    setupMinutes: 4,
    outcome: "Convert educational reach into webinar and waitlist registrations.",
    bestFor: ["Course launches", "Mini trainings", "Live workshops"],
    playbook: [
      "Attach the campaign to a proof-heavy educational reel.",
      "Use one primary keyword in the caption and two fallback keywords.",
      "Send the registration link with the date or promise.",
      "Use the sent log to compare organic posts before ad spend.",
    ],
    metrics: ["Registrations", "DM sends", "Show-up rate"],
    accent: "amber",
  },
  {
    slug: "beauty-price-list",
    title: "Beauty Service Price List",
    category: "Local services",
    audience: "Salons, spas, and beauty pros",
    summary:
      "Reply with pricing, booking links, and service menus when people comment PRICE, MENU, or BOOK.",
    goal: "Price or availability reply",
    keywords: ["PRICE", "MENU", "BOOK"],
    dmMessage:
      "Hey {username}, here is our service menu and booking link: https://yourlink.com/booking",
    triggerExample: "PRICE",
    privateReplyPreview:
      "Hey Riley, here is our service menu and booking link.",
    setupMinutes: 4,
    outcome: "Reduce repetitive comment replies and move buyers toward booking.",
    bestFor: ["Before/after reels", "Service menu posts", "Availability posts"],
    playbook: [
      "Choose a post where people already ask about pricing.",
      "Add a booking link with clear service categories.",
      "Keep the DM compliant and avoid medical or exaggerated claims.",
      "Update the link when pricing or availability changes.",
    ],
    metrics: ["Booking link clicks", "DM sends", "New appointments"],
    accent: "rose",
  },
  {
    slug: "restaurant-menu",
    title: "Restaurant Menu And Reservation",
    category: "Hospitality",
    audience: "Restaurants and cafes",
    summary:
      "Send menus, reservation links, or event specials when guests comment MENU, TABLE, or RESERVE.",
    goal: "Product link request",
    keywords: ["MENU", "TABLE", "RESERVE"],
    dmMessage:
      "Hey {username}, here is our menu and reservation link: https://yourlink.com/menu",
    triggerExample: "MENU",
    privateReplyPreview:
      "Hey Taylor, here is our menu and reservation link.",
    setupMinutes: 3,
    outcome: "Turn food reels into reservations and menu views.",
    bestFor: ["Specials", "New menu launches", "Weekend reservation pushes"],
    playbook: [
      "Use a high-appetite food reel with a clear comment prompt.",
      "Send a mobile-friendly menu or booking page.",
      "Mention limited seating only when it is true.",
      "Repeat the template for seasonal specials.",
    ],
    metrics: ["Menu clicks", "Reservations", "Weekend campaign replies"],
    accent: "amber",
  },
  {
    slug: "event-rsvp",
    title: "Event RSVP Campaign",
    category: "Events",
    audience: "Venues, communities, and launch teams",
    summary:
      "Send RSVP forms, calendar links, or ticket pages after someone comments RSVP, TICKET, or JOIN.",
    goal: "Launch waitlist",
    keywords: ["RSVP", "TICKET", "JOIN"],
    dmMessage:
      "Hey {username}, here is the RSVP link with event details: https://yourlink.com/rsvp",
    triggerExample: "RSVP",
    privateReplyPreview:
      "Hey Morgan, here is the RSVP link with event details.",
    setupMinutes: 4,
    outcome: "Convert event attention into measurable RSVPs.",
    bestFor: ["Popups", "Workshops", "Community events"],
    playbook: [
      "Choose the event announcement or recap reel.",
      "Use RSVP as the main keyword and add ticket-oriented fallbacks.",
      "Send one link that includes date, location, and confirmation.",
      "Pause the campaign after the event ends.",
    ],
    metrics: ["RSVPs", "Ticket clicks", "Replies by event post"],
    accent: "emerald",
  },
  {
    slug: "creator-media-kit",
    title: "Creator Media Kit Reply",
    category: "Creator business",
    audience: "Creators and agencies",
    summary:
      "Send a media kit, rate card, or brand inquiry form when brands comment COLLAB, KIT, or RATES.",
    goal: "Agency client campaign",
    keywords: ["COLLAB", "KIT", "RATES"],
    dmMessage:
      "Hey {username}, here is my media kit and partnership form: https://yourlink.com/media-kit",
    triggerExample: "COLLAB",
    privateReplyPreview:
      "Hey Casey, here is my media kit and partnership form.",
    setupMinutes: 4,
    outcome: "Capture brand interest without asking people to search your bio.",
    bestFor: ["Pinned portfolio reels", "Case study posts", "Brand outreach"],
    playbook: [
      "Pin a collaboration post or creator portfolio reel.",
      "Use professional keywords brands naturally comment.",
      "Send a media kit link and one qualification question.",
      "Review DMs weekly and tag qualified opportunities.",
    ],
    metrics: ["Brand inquiries", "Media kit clicks", "Qualified partnership DMs"],
    accent: "cyan",
  },
];

export function getCampaignTemplate(slug: string | null | undefined) {
  if (!slug) return null;
  return CAMPAIGN_TEMPLATES.find((template) => template.slug === slug) ?? null;
}

export function getCampaignTemplateSlugs() {
  return CAMPAIGN_TEMPLATES.map((template) => template.slug);
}
