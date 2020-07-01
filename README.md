# boiler-plate-ko

## 파일 구조도
- [client\src](#1-clientsrc)
   - [index.js](#11-indexjs)
   - [App.js](#12-appjs)
   - [setupProxy.js](#13-setupProcxyjs)
   - [_reducers](#14-_reducers)
     - [index.js](#141-indexjs)
     - [user_reducer.js](#142-user_reducerjs)
   - [_actions](#15-_actions)
     - [type.js](#151-typejs)
     - [user_action.js](#152-user_actionjs)
   - [components\views](#16-componentsviews)
     - LandingPage
       - [LandingPage.js](#161-LandingPagejs)
     - LoginPage
       - [LoginPage.js](#162-LoginPagejs)
     - RegisterPage
       - [RegisterPage.js](#163-RegisterPagejs)
   - [hoc](#17-hoc)
     - [auth.js](#171-authjs)
- [server](#2-server)
  - [config](#21-config)
    - [key.js](#211-keyjs)
    - [db.js](#212-dbjs)
    - [prod.js](#213-prodjs)
  - [middlewares](#22-middlewares)
    - [auth.js](#221-authjs)
  - [models](#23-models)
    - [User.js](#231-userjs)
  - [index.js](#24-indexjs)
  
  
  ### 1. client\src
  frontend는 react를 바탕으로 구현
  
  #### 1.1 index.js
  - App.js를 렌더링하는 가장 상위 파일
  - Provider(from 'react-redux')를 통해 App.js에서 사용하는 store를 지정해줄 수 있다.
  - store = createStore(Reducer)
    - Reducer = function(state, action){}
    - Reducer는 _reducers/index.js 에서 가져온다.
    - Redux를 사용하므로서 어느 페이지에서나 유저의 정보를 사용할 수 있다.
  
  #### 1.2 App.js
  - 각 화면을 담고 있는 파일
  - LandingPage/ LoginPage/ RegisterPage 화면을 BrowserRouter/ Switch/ Route ( from 'react-router-dom')을 통해 해당하는 url에 Route 시켜줌
    - ex) <Route exact path="/" component={LandingPage}/>
    
  #### 1.3 setupProxy.js
  - backend와 frontend의 포트 번호를 맞춰 주기 위해 작성한 코드
  - createProxyMiddleware( from 'http-proxy-middleware')에서 target에 backend의 포트 번호를 작성해준다.
  
  #### 1.4 _reducers
  - Reducer를 관리하는 폴더
  
  ##### 1.4.1 index.js
  - combineReducers (from 'redux')를 통해서 하위 reducer 들을 결합해준다.
  
  ##### 1.4.2 user_reducer.js
  - index.js의 하위 reducer이다.
  - 각각의 action.type(LOGIN_USER, REGISTER_USER, AUTH_USER)에 맞는 리턴 값을 준다.
    - 각각의 Component에서 _actions/user_action.js에 있는 함수를 사용하여 리턴 값을 받아온다.
      - ex) return { type:LOGIN_USER, payload:request}
    - dispatch ( =  import {userDispatch} from 'react-redux') 를 통해 user_reducer.js로 값이 이동한다.
      - Provider에서 store에 Reducer를 _reducers/index.js로 지정해 줬기 때문에
      
  #### 1.5 _actions
  - 각각의 Component에서 필요한 dispatch의 인자값을 생성하는 파일을 관리하는 폴더
  
  ##### 1.5.1 types.js
  - type을 상수로 정장해두는 파일
  
  ##### 1.5.2 user_action.js
  - user와 관련된(login/ register/ auth) dispatch의 인자 값을 리턴 해주는 파일
    - request에 response.data를 저장
      - axios를 통해 url에 접근한 후 해당 router에 리턴 값을 request에 저장
    - ex) return {type:LOGIN_USER, payload:request}
  - backend의 url에 접근한다.(axios를 통해서)
    - ex) axios.post('/api/users/login', dataToSubmit)
  
  #### 1.6 components\views
  - App.js에서 사용하는 component들을 관리하는 폴더
  
  ##### 1.6.1 LandingPage.js
  - 시작 페이지 관련 component
  - userEffect : 리액트 컴포넌트가 렌더링 될 때마다 특정 작업을 수행하도록 설정 할 수 있는 Hook
  
  ##### 1.6.2 LoginPage.js
  - 로그인 페이지 관련 component
  - useState는 state를 등록해주는 Hook
    - ex) const[Email, setEmail] = userState("");
      - 초기값은 "" 
      - setState({Email:'newEmail'}); => setEmail('newEmail');
  - login 버튼을 클릭하면 dispatch에 _actions/user_auction/{loginUser}의 리턴 값이 들어간다.
    - dispatch = (import {useDispatch} from 'react-redux')
  
  ##### 1.6.3 RegisterPage.js
  - 등록 페이지 관련 component
  - 등록 버튼을 클릭하면 dispatch에 _actions/user_auction/{registerUser}의 리턴 값이 들어간다.
  
  #### 1.7 hoc
  - Higher Order Component
  - 
  
  ### 2. server
  backend는 nodejs를 바탕으로 expressjs 프레임워크를 통해서 구현
  
  ***
  
  #### 2.1. config
  - db연결과 관련된 파일들이 있는 폴더
  - db는 mongoDB를 사용하였고 mongoose를 사용하여 연결
  
  ##### 2.1.1 key.js
  - process.env.NODE_ENV를 통해 개발환경이 Local인지 배포 후(production)인지 확인하여 비밀 정보를 사용하는 코드
  
  ##### 2.1.2 db.js
  - local mongodb와 연결하는 코드
  - mongoose.connect()에 첫번째 인자는 앞에 'mongodb://'가 들어가야한다.
  - mongoose.connect()에 두번째 인자는 옵션 값이 오며 dbName:'dbName'으로 사용 할 dbName을 지정 할 수 있다.
  
  ##### 2.1.3 prod.js
  - 배포 후 mongodb 비밀 정보를 지정해주는 코드
  
  ***
  
  #### 2.2 middlewares
  - middleware를 보관하는 폴더
  
  ##### 2.2.1 auth.js
  - 인증 관련 미들웨어
  - 클라이언트 쿠키에서 토큰을 가져옴 (server에 index 코드에서 로그인시 쿠키에 등록)
  - 토큰을 복호화 한 후 유저를 찾음 (복호화 관련 코드는 models에 User.js에서 함수로 만듬)
  - 유저가 없으면 res.json()을 통해 인증X
  - 유저가 있으면 request.user에 user를 넣어주고 auth를 사용한 함수에서 콜백함 수를 실행함
  
  ***
  
  #### 2.3 models
  - DB의 collection과 관련된 코드 폴더
  
  ##### 2.3.1 User.js
  - moogoose.Schema()를 통해 userSchema를 만들어 줌
    - schema는 mongoose에서 제공하는 것으로 mongoDB에는 테이블이 없고 아무 값이나 들어가기 때문에 문제가 될수 있으므로 shcema를 통해 필드의 속성을 지정해주어 어긋나는 데이터의 삽입을 막아줌
  - mongoose.model('User',userSchema)를 통해서 User 객체를 만들어 줌
    - 첫번째 인자 값으로 users라는 collection이 만들어 진다.(원하는 이름이 있다면 세번째 인자에 넣어준다.)
  - userSchma.pre('save',cb)을 통해 save전에 password의 변경을 감지하여 bcrypt를 통해 password를 암호화 해준다. 
  - userSchame.comparePassword(inputPw, cb)를 통해서 로그인시 입력되는 password와 db의 password를 비교한다.(bcrypt.compare(inputPw,password,cb)를 통해)
  - userSchema.generateToken()을 통해서 토큰을 생성한다.
    - jsonwebtoken.sign(userid, secretOrPrivateKey)를 통해 token을 만들어 준다.
    - server에서 token을 만들어서 로그인시에 clien 쿠키에 token을 전달해주고 해당하는 user의 db에 token을 저장해 주어 인증(auth)이 필요한 부분에서 서로를 대조하여 인증을 해줄수 있다.
    - 로그아웃시에는 user의 db에서 token을 지워준다.
  - userSchema.findByToken()
    - 인증(auth.js)에서 token을 받아와 복호화 한 후 user를 찾아서 리턴 해준다.
    
***

#### 2.4 index.js
- backend에서 이루어 지는 흐름을 정리해둔 코드
  - 회원가입/ 로그인/ 로그아웃/ 
    
***
  
