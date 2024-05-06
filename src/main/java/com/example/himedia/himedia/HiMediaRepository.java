package com.example.himedia.himedia;

import org.springframework.data.jpa.repository.JpaRepository;

public interface HiMediaRepository extends JpaRepository<HiMediaEntity, Long> {
    HiMediaEntity findByUserId(String userId);
}
