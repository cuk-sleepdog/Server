# Server

## API 설명입니다

### Petinfo
API | Method | Address
:-----|:------:|:------|
반려동물 정보입력 API | POST | sleepdog.mintpass.kr:3000/PetinfoAPI/ |
반려동물 정보 LIST API | GET | sleepdog.mintpass.kr:3000/PetinfoAPI/ |
반려동물 이름 선택해서 출력 | GET | sleepdog.mintpass.kr:3000/PetinfoAPI/:Petname |
반려동물 정보수정 API | PUT | sleepdog.mintpass.kr:3000/PetinfoAPI/:id |
반려동물 정보 삭제 API | DELETE | sleepdog.mintpass.kr:3000/PetinfoAPI/:id |

### Health
API | Method | Address
:-----|:------:|:------|
유저정보,건강상태 정보입력 API| POST | sleepdog.mintpass.kr:3000/Health/ |
건강상태 정보 LIST API | GET | sleepdog.mintpass.kr:3000/Health/ |
id선택해서 건강상태 출력 API | GET | sleepdog.mintpass.kr:3000/Health/:id |
건강상태 정보수정 API | PATCH | sleepdog.mintpass.kr:3000/Health/:id |
건강상태 정보삭제 API | DELETE | sleepdog.mintpass.kr:3000/Health/:id |

### POST
반려동물 정보입력 API
```
{
    "Petname" : "value", // 이름
    "Happy" : "value", // 생일
    "Kind" : "value", // 종류
    "Gender" : "value", // 성별
    "Weight" : "value" // 몸무게
}
```

유저정보,건강상태 입력 API
이 API는 User를 입력하고 User에 따라서 건강상태를 입력하는 것으로 바꿔야할듯 분리가 필요
```
 {
   "User" : [{
   "KakaoId" : "value" // 카카오 id
   "DOGS" : "value" // 강아지들 이름
   }],
   "Heat" : "value" // 온도
   "Heart" : "value" // 심박수
 }
```

