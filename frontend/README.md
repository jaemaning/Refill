# Front 버전 호환 관리

node --version 18.16.1
tsc --version 5.1.6

react-create-app 으로 생성

yarn vite vs npm CRA


mui.com
data-grid
pagenation 자동

# 폴더 구조 기본 설명

## refill
my-app
├── node_modules
├── public
├── src
├── .gitignore
└── package.json

### node_modules
현재 프로젝트에 포함된 라이브러리들이 설치되어 있는 폴더로 보통 깃과 같은 저장소에 올릴 때는 이 폴더를 함께 올리지 않습니다.

### public
index.html과 같은 정적 파일이 포함되는 곳으로 컴파일이 필요 없는 파일들이 위치하는 폴더입니다.

### src
리액트 내부에서 작성하는 거의 모든 파일들이 이 폴더 내부에서 작성되며 이 폴더에 있는 파일들은 명령어에 따라 JS로 컴파일이 진행됩니다.

### .gitignore
깃에 포함하고 싶지 않은 파일의 이름 혹은 폴더등을 입력하는 파일입니다.

### package.json
프로젝트에 관련된 기본적인 내용(프로젝트의 이름, 버전 등)과 라이브러리들의 목록이 포함되어 있습니다.
라이브러리가 설치된 node_modules 대신에 이 package.json을 깃에 포함하여 올리게 되며 후에 누군가가 프로젝트를 클론할 때 이 package.json에 적혀있는 라이브러리의 목록을 기준으로 npm에서 설치하게 됩니다.


## src 내부 폴더구조
└─ src
 ├─ components
 ├─ assets 
 ├─ hooks (= hoc)
 ├─ pages
 ├─ constants
 ├─ config
 ├─ styles
 ├─ services (= api)
 ├─ utils
 ├─ contexts
 ├─ App.js
 └─ index.js
### components
재사용 가능한 컴포넌트들이 위치하는 폴더입니다.
컴포넌트는 매우 많아질 수 있기 때문에 이 폴더 내부에서 하위폴더로 추가로 분류하는 경우가 많습니다.

### assets
이미지 혹은 폰트와 같은 파일들이 저장되는 폴더입니다.
이미지와 같은 파일들을 public에 직접 넣는 경우도 있는데 둘의 차이는 컴파일시에 필요한지 여부입니다.
파비콘과 같이 index.html내부에서 직접 사용하여 컴파일 단계에서 필요하지 않은 파일들은 public에
반면, 컴포넌트 내부에서 사용하는 이미지 파일인 경우 이 assets 폴더에 위치시켜야 합니다.

### hooks (= hoc)
커스텀 훅이 위치하는 폴더입니다.

### pages
react router등을 이용하여 라우팅을 적용할 때 페이지 컴포넌트를 이 폴더에 위치시킵니다.

### styles
css 파일들이 포함되는 폴더입니다.

### services (= api)
보통 api관련 로직의 모듈 파일이 위치하며 auth와 같이 인증과 관련된 파일이 포함되기도 합니다.

### utils
정규표현식 패턴이나 공통함수 등 공통으로 사용하는 유틸 파일들이 위치하는 폴더입니다.

### store 
redux 사용을 위한 폴더입니다.