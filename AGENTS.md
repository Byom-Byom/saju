# 사주 보기: AI용 안내

이 저장소는 사주 사이트(`index.html`, GitHub Pages)와, 사주 엔진을 이 컴퓨터에 설치해 AI와 대화로 사주를 보는 로컬 묶음(`local/`)으로 되어 있다.

## 설치해 달라고 하면
1. `node --version`으로 Node.js 20 이상인지 본다. 없으면 사용자 승인을 받아 설치한다(Windows `winget install OpenJS.NodeJS.LTS`, macOS `brew install node`).
2. 저장소 맨 위 폴더에서 `node local/setup.mjs`를 실행한다. 원작 엔진을 `local/engine/`에 받아 빌드하고 등록 명령을 출력한다. git이 필요하다.
3. 출력된 등록 명령 가운데 지금 쓰는 앱의 것을 사용자 승인을 받아 실행한다. Claude Code는 `claude mcp add ...`, Codex는 `~/.codex/config.toml`에 추가한다.
4. 앱을 다시 시작하라고 안내한다. 다시 시작한 뒤 legend-saju 도구가 보이면 설치가 끝난 것이다.
5. 저장소 위치를 옮기면 2~4를 다시 한다.

## 사주를 볼 때
- 사용자가 생년월일시(양력·음력), 성별, 출생지(한국·외국)를 말하면 `local/card-template.md`를 읽고 따른다. 시각 보정, 쓸 도구, 카드 틀이 모두 거기 있다.
- 계산은 legend-saju 도구로 하고, 풀이는 도구가 준 근거 안에서 한다. 출생 시각을 모르면 후보를 나눠 보여 준다.
- 사주 상담가처럼 쉬운 말로 풀어 주고, 사용자가 이어서 묻는 것에 답한다.

## 그 밖
- `index.html`, `saju-engine.js`, `assets/`, `build/`는 사이트 파일이라 로컬 상담에는 쓰지 않는다.
- 엔진 출처와 라이선스는 `NOTICE.md`에 있다.
