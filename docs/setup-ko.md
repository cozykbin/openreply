# OpenReply 한국어판 설치 안내

이 포크는 직접 운영하는 프로그램입니다. GitHub 포크나 로컬 화면 실행만으로 Instagram에 연결되지는 않습니다.

## 1. 화면부터 확인하기

Node.js 22.12 이상 또는 24 LTS를 설치한 뒤 저장소에서 실행하세요.

```powershell
npm ci
Copy-Item .env.example .env
```

`.env`에서 `NEXTAUTH_SECRET`, `CRON_SECRET`, `WEBHOOK_VERIFY_TOKEN`을 서로 다른 임의의 긴 값으로 바꾸세요. 각 값은 `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`로 만들 수 있습니다. `ENCRYPTION_KEY`도 별도로 만든 64자리 16진수로 바꾸세요.

로컬 주소는 `NEXTAUTH_URL=http://localhost:3000`, DB와 Redis 주소는 `.env.example`의 로컬 기본값을 사용합니다. 이 파일은 Git에 올리지 않습니다. 실제 자격 증명을 채우기 전에는 개발·체험용입니다.

```powershell
npm run db:generate
npm run dev
```

<http://localhost:3000/playground>에서 한국어 키워드와 메시지를 시험할 수 있습니다. 체험 화면은 브라우저 안에서만 동작하므로 PostgreSQL·Redis·Meta 자격 증명 없이도 확인할 수 있습니다. DB URL 설정과 Prisma 클라이언트 생성은 앱 빌드에 필요합니다. 체험 내용은 저장되지 않습니다.

## 2. DB와 로그인 준비

실제 자동화를 저장하려면 Docker Desktop의 Linux 엔진을 켜고 실행하세요.

```powershell
docker compose up -d
npm run db:migrate
```

기존 DB나 Redis가 있다면 `.env`의 연결 주소를 해당 환경에 맞게 바꾸면 됩니다. 로그인 메일은 Resend API 키와 검증한 발신 주소 또는 자체 SMTP의 `EMAIL_SERVER`로 설정합니다. 외부 메일 계정·결제 가입은 설치 명령에 포함되지 않습니다.

혼자 사용할 공개 서버라면 `ALLOWED_EMAILS`에 로그인할 이메일을 지정하세요. 비어 있으면 해당 주소에 접근할 수 있는 누구나 로그인 링크를 요청할 수 있습니다.

## 3. Meta와 Instagram 연결

원본의 [Meta 앱 상세 설정](setup.md#the-meta-app)을 함께 확인하세요. 앱 대시보드의 현재 메뉴와 권한 상태를 기준으로 설정합니다.

1. Instagram을 비즈니스 또는 크리에이터 계정으로 준비합니다.
2. Meta 개발자 앱에서 Instagram API with Instagram Login을 설정합니다.
3. 앱의 Instagram ID·시크릿과 Facebook 앱 시크릿을 각각 `INSTAGRAM_APP_ID`, `INSTAGRAM_APP_SECRET`, `FACEBOOK_APP_SECRET`에 입력합니다. 두 시크릿이 같은 값이라고 가정하지 마세요.
4. 서버를 공개 HTTPS 주소로 준비하고 `NEXTAUTH_URL`을 그 주소로 변경합니다. Meta 리디렉션 URI에는 `https://내주소/api/instagram/callback`을 등록합니다.
5. Webhook 콜백 `https://내주소/api/webhook`과 `.env`의 `WEBHOOK_VERIFY_TOKEN`을 등록합니다. Meta 앱에서 `comments`, `messages`, `messaging_postbacks`, `messaging_seen`을 구독합니다. 특히 팔로우 확인 버튼 클릭은 `messaging_postbacks`가 필요하며 `messages`만으로는 받을 수 없습니다. 연결할 때 각 Instagram 계정에도 이 네 필드를 자동 구독합니다. 기존 연결은 Meta 앱의 필드 설정을 완료한 뒤 다시 연결하세요. [Meta 필드·권한 문서](https://developers.facebook.com/documentation/instagram-platform/webhooks/fields)를 기준으로 확인합니다.
6. `/settings`에서 **내 Meta 앱으로 연결**을 선택해 계정을 연결합니다. 앱이 요청하는 권한은 `lib/meta/oauth.ts`에서 확인할 수 있습니다.

테스트 계정·앱 역할·표준 접근 권한에서 성공한 것과 일반 사용자의 댓글에 운영할 수 있는 것은 다를 수 있습니다. 사용할 계정과 각 권한의 접근 수준, 앱 공개·검수 조건을 Meta 대시보드에서 확인하고 일반 사용자 계정의 댓글로 검증하세요. 코드 수정만으로 Meta 권한을 대신할 수 없습니다.

유료 연결 제공업체 Zernio는 선택 사항입니다. 무료 소프트웨어를 직접 운영하는 경로에서는 내 Meta 앱을 사용합니다.

## 4. 발송 워커 실행

웹앱과 별도 터미널에서 실행하세요.

```powershell
npm run worker
```

웹앱·DB·Redis·워커가 모두 실행되어야 댓글을 처리합니다. 운영 환경에서는 웹앱에 `npm run build` 후 `npm start`를 사용하고, 워커도 계속 실행되도록 프로세스를 관리하세요. 토큰 갱신과 다음 릴스 연결 등의 예약 작업은 [원본 운영 안내](setup.md)를 따릅니다.

## 5. 첫 자동화

1. 팔로우 확인 후 자료 공유 / 상품 정보 / 신청 링크 템플릿 중 하나를 고릅니다. 자료 공유는 첫 DM의 **팔로우 확인 🙌** 버튼부터 시작합니다. 다른 템플릿에서 같은 구성이 필요하면 **팔로우 확인 흐름 적용**을 누르세요.
2. 연결한 Instagram 계정과 게시물을 선택합니다.
3. 예시 `example.com` 링크를 실제 주소로 바꿉니다.
4. **단어 일치**는 `정보`, `정보 주세요`에 반응합니다. **포함 일치**는 `정보요`, `정보주세요`에도 반응하지만 `개인정보`에도 반응할 수 있으니 키워드를 신중하게 고르세요.
5. 저장 후 다른 Instagram 계정에서 새 댓글을 남깁니다.
6. 실제 DM 수신과 DM 발송 기록을 함께 확인합니다. 재시도 테스트에는 새 댓글을 사용하세요.

소프트웨어 자체의 월 요금제 한도는 없습니다. Meta 발송 허용 시간과 속도 제한은 계속 적용됩니다. 서버·DB·메일 등 사용 중인 외부 서비스의 비용은 별도입니다.

## 확인 범위

`npm run typecheck`, `npm run lint`, `npm test`, `npm run build`로 코드 상태를 확인합니다. 실제 DB 통합 테스트는 `TEST_DATABASE_URL`이 필요합니다. 자동 테스트 통과만으로 실제 계정의 Meta 권한·로그인 메일·DM 수신까지 검증되지는 않습니다.

원본 저작권과 MIT 라이선스는 [LICENSE](../LICENSE)에 유지되어 있습니다.


## 팔로우 확인 후 자료 공유

댓글 조건을 통과하면 먼저 확인 버튼을 포함한 첫 DM을 보냅니다. 버튼을 누르면 `is_user_follow_business` 결과를 조회합니다.

- 팔로우 확인 성공: 설정한 자료 메시지와 링크 버튼을 전달합니다.
- 미팔로우: 팔로우 후 다시 누를 수 있는 안내와 버튼을 전달합니다. 처음 확인 이후의 재확인에는 Instagram 반영 지연을 고려해 20초·40초 지연 재조회가 적용될 수 있습니다.
- 조회 실패·권한 부족·상태 불명: 링크를 보내지 않고 잠시 후 다시 확인하도록 안내합니다.
- DM 읽음 알림만 받은 경우: 자료 링크를 자동 공개하지 않습니다.

`/playground`의 팔로우 상태는 체험용 모의 값입니다. 실제 워커는 Meta 또는 선택한 연결 제공업체가 반환한 값을 사용합니다. 버튼 클릭 자체를 팔로우 완료의 증거로 삼지 않습니다.
