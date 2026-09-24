# 사주 카드 틀

대화로 사주를 볼 때 보여 주는 카드의 고정 틀. 값만 채워 띄운다.

## 띄우는 법
- 대화 안에 HTML을 그리는 도구가 있으면(Claude 앱의 `show_widget` 등) 그것으로 띄운다. `show_widget`은 세션 첫 사용 전에 `read_me`의 `mockup`을 부른다.
- 그런 도구가 없으면 `local/cards/`에 `날짜 이름 카드.html`로 저장하고 브라우저로 연다. 파일로 만들 때는 공통 스타일과 카드를 `<body style="background:#0b111a;padding:24px;max-width:720px;margin:auto">` 안에 넣는다.

## 채우는 법
- 입력 시각은 사이트와 같게 보정한다. 한국 출생은 서울 경도(동경 127도) 기준으로 지금 표준시 −32분, 1954~1961년 UTC+8:30 시기 −2분, 서머타임 기간은 여기서 60분을 더 뺀다. 외국 출생은 보정하지 않는다. 날짜가 바뀌면 날짜도 바꾼다.
- 값은 legend-saju 도구에서 받는다(앱에 따라 `mcp__legend-saju__` 같은 접두어가 붙는다). 원국은 `legend_saju_card_natal`, 대운은 `legend_saju_card_timeline`, 궁합은 `legend_saju_card_compatibility`의 `structuredContent`를 쓴다. 풀이 근거는 `legend_saju_read_fortune`으로 따로 받는다.
- 오행 글자 색: 목 `#7cc79a`, 화 `#ec7a6a`, 토 `#dcb45e`, 금 `#cfd4de`, 수 `#7ea7ea`. 간지 글자마다 그 오행 색을 입힌다.
- `{{한 줄 풀이}}`는 AI가 계산 근거로 쓴 한두 문장이다. 자세한 풀이는 카드 밖 본문에 쓴다.
- 원국 카드는 사주를 볼 때마다 띄우고, 대운·궁합 카드는 요청이 있거나 그 주제를 풀 때 띄운다.

## 공통 스타일
세 카드 모두 맨 앞에 넣는다.

```html
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;600&display=swap" rel="stylesheet">
<style>
.sj{background:#0f1622;border:1px solid rgba(201,164,92,.35);border-radius:12px;padding:20px 22px;color:#eee8da;font-family:var(--font-sans,'Noto Sans KR','Malgun Gothic',sans-serif)}
.sj .sf{font-family:'Noto Serif KR',serif}
.sj .hd{display:flex;justify-content:space-between;align-items:baseline;gap:8px;flex-wrap:wrap}
.sj .tt{font-size:18px;font-weight:500}.sj .tt span,.sj .gd{color:#c9a45c}
.sj .mt{font-size:12px;color:#847e72}
.sj .k{font-size:11px;color:#b8b1a2}
.sj .pl{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin:14px 0}
.sj .p{border:1px solid rgba(201,164,92,.45);text-align:center;padding:8px 4px 10px;position:relative;background:#141d2b}
.sj .p.me{border-color:#c9a45c}
.sj .g{font-size:34px;line-height:1.15}
.sj .seal{position:absolute;right:-7px;top:-9px;width:22px;height:22px;border-radius:50%;background:#b23b2e;color:#f6e4dc;font-size:11px;line-height:22px}
.sj .st{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));border:1px solid rgba(201,164,92,.45);border-radius:8px}
.sj .st>div{padding:9px 12px}.sj .st>div+div{border-left:1px solid rgba(201,164,92,.25)}
.sj .v{color:#e6cf98;font-size:15px}
.sj .ch{display:inline-block;font-size:12px;border:1px solid rgba(201,164,92,.3);border-radius:99px;padding:1px 9px;margin:0 4px 5px 0;color:#b8b1a2}
.sj .ai{margin-top:10px;border-top:1px solid rgba(201,164,92,.25);padding-top:12px}
.sj .ai .l{font-size:11px;color:#c9a45c;letter-spacing:.08em;margin-bottom:4px}
.sj .ai .t{font-size:15px;line-height:1.6}
.sj .dy{display:grid;grid-template-columns:repeat(auto-fill,minmax(84px,1fr));gap:8px;margin:14px 0 4px}
.sj .d{border:1px solid rgba(201,164,92,.3);text-align:center;padding:10px 4px 8px;position:relative;background:#141d2b}
.sj .d.now{border-color:#c9a45c}
.sj .d .b{position:absolute;top:-9px;left:50%;transform:translateX(-50%);background:#b23b2e;color:#f6e4dc;font-size:11px;padding:0 8px;border-radius:99px;white-space:nowrap}
.sj .pr{display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);gap:12px;align-items:center;margin:14px 0}
.sj .sd{border:1px solid rgba(201,164,92,.45);background:#141d2b;text-align:center;padding:12px 6px}
</style>
<h2 class="sr-only">{{카드 요약 한 문장}}</h2>
```

## 원국 카드
기둥 순서는 시·일·월·년이다. 일주 칸에만 `me`와 도장을 단다. 오행 띠의 폭은 각 오행 가중치의 비율(%)이다.

```html
<div class="sj">
  <div class="hd"><div class="sf tt">사주 <span>원국</span></div><div class="mt">{{계산 날짜·시각}} (보정) · {{시지}}시 · {{성별}}</div></div>
  <div style="display:flex;align-items:baseline;gap:10px;margin-top:10px">
    <span class="sf" style="font-size:19px;font-weight:500;color:{{일간 오행 색}}">{{일간 한자}}{{일간 오행 한자}} 일간</span>
    <span style="font-size:13px;color:#b8b1a2">{{dayMaster.detail}}</span>
  </div>
  <div class="pl sf">
    <div class="p"><div class="gd" style="font-size:12px">時柱</div><div class="k">{{시주 십신}}</div><div class="g" style="color:{{색}}">{{시간}}</div><div class="g" style="color:{{색}}">{{시지}}</div><div class="k">{{12운성}}</div></div>
    <div class="p me"><span class="seal">나</span><div class="gd" style="font-size:12px">日柱</div><div class="k">본인</div><div class="g" style="color:{{색}}">{{일간}}</div><div class="g" style="color:{{색}}">{{일지}}</div><div class="k">{{12운성}}</div></div>
    <div class="p"><div class="gd" style="font-size:12px">月柱</div><div class="k">{{월주 십신}}</div><div class="g" style="color:{{색}}">{{월간}}</div><div class="g" style="color:{{색}}">{{월지}}</div><div class="k">{{12운성}}</div></div>
    <div class="p"><div class="gd" style="font-size:12px">年柱</div><div class="k">{{년주 십신}}</div><div class="g" style="color:{{색}}">{{년간}}</div><div class="g" style="color:{{색}}">{{년지}}</div><div class="k">{{12운성}}</div></div>
  </div>
  <div style="display:flex;height:10px;border:1px solid rgba(201,164,92,.3);margin-bottom:4px">
    <div style="width:{{목%}}%;background:#7cc79a"></div><div style="width:{{화%}}%;background:#ec7a6a"></div><div style="width:{{토%}}%;background:#dcb45e"></div><div style="width:{{금%}}%;background:#cfd4de"></div><div style="width:{{수%}}%;background:#7ea7ea"></div>
  </div>
  <div class="k" style="margin-bottom:12px">목 {{목%}}% · 화 {{화%}}% · 토 {{토%}}% · 금 {{금%}}% · 수 {{수%}}%</div>
  <div class="st">
    <div><div class="k">왕쇠</div><div class="sf v">{{왕쇠 label}}</div><div class="k">{{왕쇠 detail}}</div></div>
    <div><div class="k">격국</div><div class="sf v">{{격국 label}}</div><div class="k">{{격국 detail}}</div></div>
    <div><div class="k">용신 후보</div><div class="sf v">{{용신 label}}</div><div class="k">{{용신 detail}}</div></div>
  </div>
  <div style="margin-top:12px">{{신살·관계마다 <span class="ch">…</span>}}</div>
  <div class="ai"><div class="l">한 줄 풀이</div><div class="sf t">{{한 줄 풀이}}</div></div>
</div>
```

## 대운 카드
대운마다 `.d`를 하나씩 둔다. 현재 대운에만 `now`와 연도 표시를 단다.

```html
<div class="sj">
  <div class="hd"><div class="sf tt">대운 <span>흐름</span></div><div class="mt">{{기준 연도}}년 세운 <span class="sf">{{세운 간지(색)}}</span> · {{일간}} 일간</div></div>
  <div class="dy sf">
    <div class="d"><div style="font-size:26px;line-height:1.15">{{간지(글자마다 색)}}</div><div style="font-size:12px;font-family:var(--font-sans,sans-serif)">{{ageRange}}</div><div class="mt" style="font-family:var(--font-sans,sans-serif)">{{years}}</div><div class="k" style="font-family:var(--font-sans,sans-serif)">{{tenGod}}</div></div>
    <div class="d now"><span class="b" style="font-family:var(--font-sans,sans-serif)">{{기준 연도}}년</span>…</div>
  </div>
  <div class="ai"><div class="l">한 줄 풀이</div><div class="sf t">{{한 줄 풀이}}</div></div>
</div>
```

## 궁합 카드
신호는 `signals`마다 한 줄, 엔진 판정 문장은 있으면 그 아래에 둔다.

```html
<div class="sj">
  <div class="hd"><div class="sf tt">궁합 <span>카드</span></div><div class="mt">두 사람의 일주와 합·충</div></div>
  <div class="pr">
    <div class="sd"><div class="sf" style="font-size:15px">{{A 이름}}</div><div class="sf" style="font-size:40px;line-height:1.15">{{A 일주(색)}}</div><div class="k">{{personA.label}}</div></div>
    <div class="sf gd" style="font-size:22px">×</div>
    <div class="sd"><div class="sf" style="font-size:15px">{{B 이름}}</div><div class="sf" style="font-size:40px;line-height:1.15">{{B 일주(색)}}</div><div class="k">{{personB.label}}</div></div>
  </div>
  <div style="font-size:13px;line-height:1.7">{{신호마다 <div><span class="ch" style="color:#e6cf98;border-color:#c9a45c">{{type}}</span>{{text}}</div>}}</div>
  <div class="ai"><div class="l">한 줄 풀이</div><div class="sf t">{{한 줄 풀이}}</div></div>
</div>
```
