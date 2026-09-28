# 사주 보기: AI용 안내

이 저장소는 사주 사이트(`index.html`, GitHub Pages)와, 이 컴퓨터에서 AI가 대화로 사주를 보게 하는 명령줄 엔진(`saju.mjs`)으로 되어 있다. 엔진 소스는 `engine/`에 있고, `saju.mjs`는 그것을 묶은 파일이라 받은 그대로 쓴다.

## 설치해 달라고 하면
1. 저장소를 받는다(`git clone https://github.com/Byom-Byom/saju`, git이 없으면 GitHub에서 ZIP으로 받아 푼다).
2. `node --version`으로 Node.js 20 이상인지 본다. 없으면 사용자 승인을 받아 설치한다(Windows `winget install OpenJS.NodeJS.LTS`, macOS `brew install node`).
3. 저장소 맨 위 폴더에서 `node saju.mjs manifest --out manifest.json`이 "Saved to"를 출력하면 준비가 끝난 것이다. 등록이나 앱 재시작은 필요 없다. 확인용 `manifest.json`은 지운다.

## 엔진 부르는 법
- `node saju.mjs <도구> <입력>`으로 부른다. 입력은 JSON 파일 경로, `-`(표준 입력), 따옴표로 감싼 JSON 중 하나다. 셸 따옴표가 번거로우면 JSON 파일로 넘긴다. Windows PowerShell에서는 따옴표 JSON과 `-`에서 한글이 깨지므로 UTF-8로 저장한 JSON 파일로 넘긴다.
- 결과는 `{"content":[{"type":"text","text":요약}],"structuredContent":결과}` 한 줄 JSON이며, 입력이 틀리면 `isError: true`와 이유가 온다.
- 결과가 길면 `--out 결과.json`으로 파일에 받아 나눠 읽는다. `evidence`·`debug` 모드는 수만 자가 된다.
- 도구: `read_fortune`(일반 운세), `analyze_compatibility`(궁합), `select_dates`(택일), `cast_divination`(기문둔갑·대육임·주역 점), `analyze_name`(성명학), `interpret_dream`(해몽), `run_methods`(유파·산법 지정), `capabilities`(산법 찾기), `manifest`(엔진 목록), `card_natal`·`card_timeline`·`card_compatibility`·`card_fortune`(카드 값).
- 입력 항목의 정확한 이름과 조건은 `engine/src/tools.ts`의 스키마(`readingSchema` 등)에 있다. 생년월일은 `birth: { year, month, day, hour, minute, calendar: "solar"|"lunar", isLeapMonth, gender: "남"|"여", birthTimeAccuracy }`이며 `hour`는 24시간제 현지 시각이다.

## 도구 고르는 법
- 일반 운세는 `read_fortune`을 쓴다. `question`에 사용자의 요청을 그대로 넣고, 올해·현재 운세면 `targetDate`에 오늘 날짜를 넣는다.
- `detailLevel`은 계산 범위, `outputMode`는 반환 형식이다. 기본 `consumer`의 readingSummary·verdicts·sections·recommendations·timeline을 쓰고, 행동만 필요하면 `action_only`를 쓴다.
- `verdicts`의 왕쇠·격국(성패 포함)·용신 후보(조후·격국·부억 관법 분리)를 해석의 뼈대로 쓴다.
- `evidenceIndex`는 응답에 싣지 않은 계산 근거의 색인이다. 근거가 더 필요하면 같은 입력에 `claimIds`로 필요한 ID만 넣어 다시 부르고, 전부 당기지 않는다.
- 계산 근거·원문·출처 전반이 필요할 때만 `outputMode: "evidence"`로 다시 부른다. `debug`는 개발자 점검용이다.
- 특정 유파나 산법을 지목하면 `capabilities`에서 ID를 찾아 `run_methods`의 `requestedCapabilities`에 넣는다.
- 택일은 사용자가 좋은 날을 고르라고 할 때만, 점은 구체적인 질문이 있을 때만 쓴다.

## 사주를 볼 때
- 사용자가 생년월일시(양력·음력), 성별, 출생지(한국·외국)를 말하면 `local/card-template.md`를 읽고 따른다. 시각 보정, 쓸 도구, 카드 틀이 모두 거기 있다.
- 풀이는 엔진이 준 근거 안에서 한다. 출생 시각을 모르면 후보를 나눠 보여 준다.
- 사주 상담가처럼 쉬운 말로 풀어 주고, 사용자가 이어서 묻는 것에 답한다.

## 그 밖
- `index.html`, `saju-engine.js`, `assets/`는 사이트 파일이라 로컬 상담에는 쓰지 않는다.
- 엔진을 고쳤으면 `npm ci`, `npm run build`로 `saju.mjs`와 `saju-engine.js`를 다시 만들고 `npm test`로 확인한다. 받아서 쓰기만 할 때는 필요 없다.
- 엔진 출처와 라이선스는 `NOTICE.md`에 있다.
