# Server

## API 설명입니다

### Petinfo
API | Method | Address
:-----|:------:|:------|
반려동물 정보입력 API | POST | http://sleepdog.mintpass.kr:3000/PetinfoAPI/ |
반려동물 정보 LIST API | GET | http://sleepdog.mintpass.kr:3000/PetinfoAPI/ |
PetId 선택해서 출력 | GET | http://sleepdog.mintpass.kr:3000/PetinfoAPI/:id |
반려동물 정보수정 API | PATCH | http://sleepdog.mintpass.kr:3000/PetinfoAPI/:id |
반려동물 정보 삭제 API | DELETE | http://sleepdog.mintpass.kr:3000/PetinfoAPI/:id |


### HealthAPI
API | Method | Address
:-----|:------:|:------|
건강상태 리스트 가져오는 API | GET | http://sleepdog.mintpass.kr:3000/HealthAPI/ |
유저정보,건강상태 정보입력 API| POST | http://sleepdog.mintpass.kr:3000/HealthAPI/ |
평균값 가져오는 API | GET | http://sleepdog.mintpass.kr:3000/HealthAPI/:id |
건강상태 정보전체삭제 API | DELETE | http://sleepdog.mintpass.kr:3000/HealthAPI/ |


### POST
반려동물 정보입력 API
```
{
    "KakaoId" : "value", // 카카오 id
    "Petname" : "value", // 이름
    "Happy" : "value", // 생일
    "Kind" : "value", // 종류
    "Gender" : "value", // 성별
    "Weight" : "value", // 몸무게
    "PetId" : "auto_increment", // 생성시 자동으로 1씩 증가하는 ID값
    "CreateAt" : "value" // 생성 날짜 , 시간
}
```

반려동물 건강상태및 수면상태 API
```
 {
    "Product": "value", // 아두이노 측에서 전송하는 목밴드 ID값
    "DATE": "value", // 생성날짜
    "Time": "value", // 생성시간
    "Bpm": "value", // 심박수
    "Temp": "value", // 체온
    "CHK": "value" // 수면상태 체크
 }
```
### GET
수면상태 체크 API
```
{
    "_id"{"Product": "value"}, //목밴드ID
    "Time" : "value",
    "CHK_avg" : "value" // 수면상태 평균값
    "Bpm_avg": "value" // 심박수 평균값
    "Temp_avg" "value" // 체온 평균값
}
``` 


