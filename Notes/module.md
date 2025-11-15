## NestJS의 모듈 구조 정리

NestJS 애플리케이션은 모듈(Module)을 기반으로 구성된다.
애플리케이션에는 반드시 하나의 루트 모듈(AppModule) 이 존재하며,
그 외에 기능별로 UserModule, OrderModule, ChatModule 등으로 분리하여 관리할 수 있다.

각 기능 모듈은 반드시 AppModule(또는 다른 상위 모듈)의 imports 배열에 등록해야 애플리케이션에서 사용할 수 있다.

## 모듈의 구성 요소

NestJS의 모듈은 보통 다음 두 가지로 구성된다:

### Controller

클라이언트의 요청(Request)을 받아 처리할 메서드를 정의

요청(Req) → 서비스 호출 → 응답(Res) 반환

### Provider (Service 포함)

비즈니스 로직 처리 담당

데이터 조작, DB 접근 등의 역할 수행

Controller에서 주입(inject)받아 사용됨

NestJS 초기 생성 프로젝트에서도 다음처럼 확인할 수 있다:

```js
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
```

## 요청 흐름

NestJS의 기본 요청 처리 흐름은 다음과 같다:

```txt
Client(Request)
    ↓
Controller
    ↓
Provider(Service)
    ↓
Controller
    ↓
Client(Response)
```

Controller와 Provider가 하나의 기능 단위로 묶여 하나의 Module을 이룬다.

## 모듈의 종류

Nest에서는 모듈을 크게 아래처럼 구분해볼 수 있다:

### 1. Feature Module

도메인/기능 단위로 나눈 모듈  
~~(내가 만든 Cats, User 모듈이 이에 해당한다.)~~

### 2. Shared Module

여러 모듈에서 재사용되는 공통 로직 모듈  
(공통 유틸, 공통 서비스 등)

### Global Module

애플리케이션 전체에서 자동으로 사용 가능한 모듈  
@Global() 데코레이터 사용  
(자주 사용하는 모듈은 글로벌로 사용할 수 있다).  
ex:

1. 로깅
2. 환경변수
3. DB 연결

하지만 다만 Global Module은 모듈 간 경계를 흐리게 만들 수 있어
필요한 경우에만 사용하는 것이 권장된다.  
특히 도메인 분리가 중요한 구조(DDD 등)에서는 남용하지 않는 것이 좋다.
