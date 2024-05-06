package com.example.himedia.himedia;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class HiMediaController {
    private final HiMediaService hiMediaService;

    @Autowired
    public HiMediaController(HiMediaService hiMediaService) {
        this.hiMediaService = hiMediaService;
    }

    @Autowired
    private HiMediaService HiMediaService;

    @GetMapping("/userIdAvailability")
    @ResponseBody
    public String checkUsernameAvailability(@RequestParam String userId) {
        boolean isAvailable = HiMediaService.isUsernameAvailable(userId);
        return isAvailable ? "사용 가능한 아이디 입니다." : "이미 사용 중인 아이디 입니다.";
    }

    @PostMapping("/register")
    public String registerUser(@RequestParam("emailTextBox1") String emailPart1,
                               @RequestParam(value = "emailTextBox2", required = false) String emailPart2,
                               @RequestParam("mobileTextBox1") String mobilePart1,
                               @RequestParam("mobileTextBox2") String mobilePart2,
                               @RequestParam("mobileTextBox3") String mobilePart3,
                               @ModelAttribute HiMediaEntity hiMediaEntity) {
       // 이메일 주소 조합
        String email2 = emailPart1 + "@" + emailPart2;
        // 이메일 주소를 HiMediaEntity에 설정
        hiMediaEntity.setUserEmail(email2);

        // 연락처 조합
        String mobile2 = mobilePart1 + mobilePart2 + mobilePart3;
        // 연락처를 HiMediaEntity에 설정
        hiMediaEntity.setUserMobile(mobile2);

        hiMediaService.addUser(hiMediaEntity);
        return "HiMediaInfoList";
    }

    @GetMapping("/Member")
    public String login(){
        return "HiMediaMember";
    }

    @GetMapping("/InfoList")
    public String InfoList(){
        return "HiMediaInfoList";
    }

}