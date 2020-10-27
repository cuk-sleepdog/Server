# Server

## API 설명입니다

### Petinfo
API | Method | Address
:-----|:------:|:------|
반려동물 정보입력 API | POST | sleepdog.mintpass.kr:3000/PetinfoAPI/ |
반려동물 정보 LIST API | GET | sleepdog.mintpass.kr:3000/PetinfoAPI/ |
PetId 선택해서 출력 | GET | sleepdog.mintpass.kr:3000/PetinfoAPI/:id |
반려동물 정보수정 API | PATCH | sleepdog.mintpass.kr:3000/PetinfoAPI/:id |
반려동물 정보 삭제 API | DELETE | sleepdog.mintpass.kr:3000/PetinfoAPI/:id |

```
GET에서만 PetId사용 가능하며 PATCH와 DELETE는 _id사용해야 합니다.(오브젝트id)
```

### HealthAPI
API | Method | Address
:-----|:------:|:------|
유저정보,건강상태 정보입력 API| POST | sleepdog.mintpass.kr:3000/HealthAPI/ |
HealthId 선택해서 건강상태 출력 API | GET | sleepdog.mintpass.kr:3000/HealthAPI/:id |
건강상태 정보삭제 API | DELETE | sleepdog.mintpass.kr:3000/HealthAPI/:id |

```
GET에서만 Product사용 가능하며 DELETE는 _id사용해야 합니다.(오브젝트id)
```

### POST
반려동물 정보입력 API
```
{
    "User" : [{
   "KakaoId" : "value" // 카카오 id
   "DOGS" : "value" // 강아지들 이름
   }],
    "Petname" : "value", // 이름
    "Happy" : "value", // 생일
    "Kind" : "value", // 종류
    "Gender" : "value", // 성별
    "Weight" : "value" // 몸무게
    "PetId" : "auto_increment" // 생성시 자동으로 1씩 증가하는 id값
    "CreateAt" : "value" // 생성 날짜 , 시간
}
```

반려동물 건강상태및 수면상태 API
```
 {
   "Product": "value", // 목밴드ID
    "Temp": "value", // 온도
    "Bpm": "value", // 심박수
    "Sleep": "value", // 수면상태체크
    "Date": "value" // 생성날짜
    "Time": "value" //생성시간
 }
```

