package com.refill.global.service;

import com.amazonaws.services.simpleemail.AmazonSimpleEmailService;
import com.amazonaws.services.simpleemail.model.Body;
import com.amazonaws.services.simpleemail.model.Content;
import com.amazonaws.services.simpleemail.model.Destination;
import com.amazonaws.services.simpleemail.model.Message;
import com.amazonaws.services.simpleemail.model.SendEmailRequest;
import com.amazonaws.services.simpleemail.model.SendEmailResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class AmazonSESService {

    private final AmazonSimpleEmailService amazonSimpleEmailService;

    public void sendTempPassword(String email, String tempPassword) {
        String subject = "요청하신 임시 비밀번호입니다.";
        String text = String.format("비밀번호는 '%s'입니다.", tempPassword);

        SendEmailRequest request = new SendEmailRequest()
            .withDestination(new Destination().withToAddresses(email))
            .withMessage(new Message()
                .withBody(new Body().withText(new Content().withData(text)))
                .withSubject(new Content().withData(subject)))
            .withSource("dnjsml10@gmail.com");

        try {
            SendEmailResult result = amazonSimpleEmailService.sendEmail(request);
            log.info("이메일 전송 결과: {}", result.getMessageId());
        } catch (Exception e) {
            log.error("이메일 전송 중 오류 발생:", e);
            // 예외 처리 로직 추가
        }
    }

    public void sendLoginId(String email, String loginId) {
        String subject = "요청하신 아이디입니다.";
        String text = String.format("아이디는 '%s'입니다.", loginId);

        SendEmailRequest request = new SendEmailRequest()
            .withDestination(new Destination().withToAddresses(email))
            .withMessage(new Message()
                .withBody(new Body().withText(new Content().withData(text)))
                .withSubject(new Content().withData(subject)))
            .withSource("dnjsml10@gmail.com");

        try {
            SendEmailResult result = amazonSimpleEmailService.sendEmail(request);
            log.info("이메일 전송 결과: {}", result.getMessageId());
        } catch (Exception e) {
            log.error("이메일 전송 중 오류 발생:", e);

        }
    }
}
