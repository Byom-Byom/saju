# 출처와 라이선스

이 저장소는 아래 원작 엔진의 소스를 가져와 고친 사주 엔진과, 그 엔진으로 도는 사이트를 담은 비공식 개인 저장소입니다. 원작자와 관계가 없으며 수익을 목적으로 하지 않습니다.

## 원작 엔진
- 이름: Legend Saju
- 만든 사람: SihyeonJeon (Copyright 2026 Jeon Sihyeon)
- 원본 저장소: https://github.com/SihyeonJeon/legend-saju
- 라이선스: Apache License 2.0 (전문은 이 저장소의 `LICENSE` 파일)
- 가져온 버전: 원본 저장소 커밋 `f589500` (2026-08-25). 이후 원본의 변경은 따라가지 않고 이 저장소에서 따로 관리합니다.

## 원작에서 바꾼 것
- `engine/`: 원작의 `src/`, `data/`, `tests/`, `docs/`와 출처 문서(`THIRD_PARTY_NOTICES.md`, `DATA_LICENSES.md`, `SOURCE_SNAPSHOT.json`)를 가져왔습니다. 원작의 git 기록, 배포 설정, 빌드 결과물은 가져오지 않았습니다.
- `engine/src/tools.ts`: 원작 `src/mcp.ts`에서 MCP 서버와 ChatGPT 위젯 부분을 덜어 내고, 도구 이름과 처리 함수를 잇는 표를 더했습니다. 계산과 입력 검사는 원작과 같습니다.
- 지운 파일: `src/mcp.ts`, `src/http.ts`, `src/mcp-output-schema.ts`, `src/widgets/`, `tests/mcp-http.test.ts`. 위 변경에 맞춰 `tests/resolver.test.ts`를 고치고 `tests/mcp-widgets.test.ts`를 `tests/card-tools.test.ts`로 줄였습니다. 고친 파일 첫 줄에 바꾼 내용을 적었습니다.
- `saju.mjs`: `engine/`을 명령줄에서 쓰도록 묶은 파일입니다. 원작의 MCP 도구 13가지를 같은 입력과 결과로 부릅니다.
- `saju-engine.js`: `engine/`의 원국·대운·궁합 카드 계산, 규칙 기반 해석, 음력 변환 함수를 브라우저용 파일 하나로 묶었습니다.
- 묶는 방법은 `build/` 폴더와 `package.json`에 있습니다.

## 사이트에서 새로 만든 것
- `index.html`: 화면을 새로 만들었고, 한국 출생자의 시각 보정(서울 경도 기준, 과거 표준시와 서머타임 반영)을 더했습니다.
- `assets/bg.png`: 원작 저장소의 `assets/og-background.png`를 그대로 썼습니다.
- `assets/og.png`: 위 배경 그림에 이 사이트의 제목을 얹어 새로 만들었습니다.

## 엔진 안에 들어 있는 자료
- 엔진에 포함된 공개 자료의 출처와 조건은 `engine/THIRD_PARTY_NOTICES.md`와 `engine/DATA_LICENSES.md`에 있습니다.
- 주공해몽 자료(`engine/data/dreams/zhougong-primary.json`)는 중국어 위키문헌의 「周公解夢」(https://zh.wikisource.org/zh-hans/周公解夢, 판 7907671)을 원작자가 항목별로 정리한 것입니다. 원저작물은 공개 도메인이고, 위키문헌 전사·편집분의 저작자는 Chinese Wikisource contributors이며 CC BY-SA 4.0(https://creativecommons.org/licenses/by-sa/4.0/)을 따릅니다. Apache License 2.0이 이 조건을 대신하지 않습니다. 이 자료는 `saju.mjs`와 `saju-engine.js` 안에도 들어 있습니다.
- Artemidorus 1644 EEBO-TCP 전사본은 CC0 1.0입니다.

## 함께 묶인 부품의 라이선스
`saju.mjs`와 `saju-engine.js`에는 아래 부품의 코드가 들어 있으며, 세 부품 모두 MIT License를 따릅니다.

- `lunar-typescript`: Copyright (c) 2020 6tail
- `iztro`: Copyright (c) 2023 All Contributors
- `zod`: Copyright (c) 2025 Colin McDonnell

MIT License 본문:

> Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
