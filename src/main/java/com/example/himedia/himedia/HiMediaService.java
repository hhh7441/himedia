package com.example.himedia.himedia;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HiMediaService {
    private final HiMediaRepository hiMediaRepository;

    @Autowired
    public HiMediaService(HiMediaRepository hiMediaRepository) {
        this.hiMediaRepository = hiMediaRepository;
    }

    public boolean isUsernameAvailable(String userId) {
        HiMediaEntity user = hiMediaRepository.findByUserId(userId);
        return user == null;
    }

    public HiMediaEntity addUser(HiMediaEntity saveUser) {
        return hiMediaRepository.save(saveUser); // 이 부분에서 save() 메서드를 호출합니다.
    }
}
