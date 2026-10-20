# OpenReply 한국어판

Instagram 댓글에 키워드를 남기면 링크를 DM으로 보내는, 직접 운영하는 오픈소스 도구입니다.
[diwenne/openreply](https://github.com/diwenne/openreply)를 기반으로 만든 한국어 포크입니다.

## 우리 버전에서 바뀐 점

- 한국어를 기본 화면 언어로 제공합니다. 로그인, 자동화 편집, 수신함, 발송 기록, 설정과 보고서를 번역했습니다. 영어·번체 중국어·브라질 포르투갈어도 선택할 수 있습니다.
- 한국어 첫 화면과 **로그인 없는 체험 화면 `/playground`**을 추가했습니다. 체험 화면은 실제 발송 엔진의 키워드 판정을 사용하며, DM을 발송하거나 설정을 저장하지 않습니다.
- 자료 링크, 상품 정보, 행사 신청용 한국어 템플릿 3개를 추가했습니다. 템플릿 선택 후 로그인하면 새 자동화에 이름·키워드·메시지가 채워집니다.
- 자동화 편집기에 **단어 일치 / 포함 일치** 선택을 추가했습니다. `정보주세요`처럼 붙여 쓰는 댓글은 포함 일치를 선택하세요. 포함 일치는 `개인정보`처럼 원하지 않는 단어에도 반응할 수 있습니다.

## 실행

Node.js 22.12 이상(또는 24 LTS), PostgreSQL, Redis가 필요합니다.

```powershell
npm ci
Copy-Item .env.example .env
# .env 값을 채웁니다. 아래 한국어 설치 안내를 참고하세요.
docker compose up -d
npm run db:generate
npm run db:migrate
npm run dev
```

다른 터미널에서 발송 워커를 실행합니다.

```powershell
npm run worker
```

- 첫 화면: <http://localhost:3000>
- 체험: <http://localhost:3000/playground>
- 실제 계정 연결: <http://localhost:3000/login>

**[한국어 설치 안내](docs/setup-ko.md)** · [원본 설치 안내](docs/setup.md) · [원본 README](README.upstream.md)

체험 화면에는 실제 Instagram 연결이 필요하지 않습니다. 실제 발송에는 Meta 앱 설정, Instagram 프로페셔널 계정, 로그인 이메일 발송 설정, 공개 HTTPS 주소와 실행 중인 DB·Redis·워커가 필요합니다. 개발·표준 접근 권한으로 모든 일반 사용자의 댓글과 DM이 동작한다고 가정하지 말고, 실제 사용할 계정과 권한 범위를 Meta 앱 대시보드에서 확인하세요.

소프트웨어 자체의 월 발송 건수 제한은 없습니다. Meta 권한, 발송 정책과 속도 제한은 적용됩니다. 호스팅과 선택한 외부 서비스 비용은 별도입니다. 유료 연결 서비스 Zernio는 선택 사항이며, 내 Meta 앱으로 직접 연결할 수 있습니다.

## 검증

```powershell
npm run db:generate
npm run typecheck
npm run lint
npm test
npm run build
```

실제 PostgreSQL을 쓰는 테스트는 `TEST_DATABASE_URL`을 지정해야 실행됩니다. 체험 화면과 단위 테스트 통과는 실제 Instagram 발송 성공을 뜻하지 않습니다.

## 원본과 라이선스

원본: [diwenne/openreply](https://github.com/diwenne/openreply)

한국어판: [cozykbin/openreply](https://github.com/cozykbin/openreply)

원본 작성자 Anish Raj, Diwen Huang의 저작권과 MIT 라이선스를 유지합니다. [LICENSE](LICENSE)를 확인하세요. 원본의 영문 공개 페이지·법률 안내와 인증 이메일은 이 버전에서도 일부 영어로 제공됩니다.
