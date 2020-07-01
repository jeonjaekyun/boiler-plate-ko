# boiler-plate-ko

## 파일 구조도
[- client](#1-client)
  - src
    - _actions
      - type.js
      - user_action.js
    - _reducers
      - index.js
      - user_reducer.js
    - components\views
      - LandingPage
        - LandingPage.js
      - LoginPage
        - LoginPage.js
      - RegisterPage
        - RegisterPage.js
    - hoc
      - auth.js
    - index.js
    - App.js
    - setupProxy.js

[- server](#2-server)

  [- config](#21-config)
  
    [- key.js](#211-keyjs)
    
    [- db.js](#212-db.js)
    
    [- prod.js](#213-prodjs)
    
  [- middlewares](#22-middlewares)
  
    [- auth.js](#221-authjs)
    
  [- models](#23-models)
  
    [- User.js](#231-userjs)
    
  [- index.js](#24-indexjs)
  
  
  ### 1. client
  
  ### 2. server
  backend는 nodejs를 바탕으로 expressjs 프레임워크를 통해서 구현
  
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
  
  #### 2.2 middlewares
  - middleware를 보관하는 폴더
  
  ##### 2.2.1 auth.js
  - 
  
  
