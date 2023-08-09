package com.refill.global.service;

import com.amazonaws.services.simpleemail.AmazonSimpleEmailService;
import com.amazonaws.services.simpleemail.model.CreateTemplateRequest;
import com.amazonaws.services.simpleemail.model.Destination;
import com.amazonaws.services.simpleemail.model.GetTemplateRequest;
import com.amazonaws.services.simpleemail.model.SendTemplatedEmailRequest;
import com.amazonaws.services.simpleemail.model.SendTemplatedEmailResult;
import com.amazonaws.services.simpleemail.model.Template;
import com.google.gson.Gson;
import com.refill.global.dto.response.MailTemplateResponse;
import com.refill.global.exception.AmazonException;
import com.refill.global.exception.ErrorCode;
import java.util.HashMap;
import java.util.Map;
import javax.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class AmazonSESService {

    private final AmazonSimpleEmailService amazonSimpleEmailService;
    private static final String TEMPLATE_NAME = "REFILL";

    @PostConstruct
    public void initializeTemplate() {

        try {
            amazonSimpleEmailService.getTemplate(new GetTemplateRequest().withTemplateName(TEMPLATE_NAME));
        } catch(Exception e) {
            String content = MailTemplateResponse.template;

            Template template = new Template();
            template.setTemplateName(TEMPLATE_NAME);
            template.setSubjectPart("REFILL에서 보내드립니다.");
            template.setHtmlPart(content);
            template.setTextPart(null);

            CreateTemplateRequest templateRequest = new CreateTemplateRequest().withTemplate(template);
            amazonSimpleEmailService.createTemplate(templateRequest);
        }
    }

    private void sendEmailWithTemplate(String email, Map<String, String> data) {

        String templateDate = new Gson().toJson(data);

        SendTemplatedEmailRequest request = new SendTemplatedEmailRequest()
            .withDestination(new Destination().withToAddresses(email))
            .withTemplate(TEMPLATE_NAME)
            .withTemplateData(templateDate)
            .withSource("dnjsml10@gmail.com");

        try {
            SendTemplatedEmailResult result = amazonSimpleEmailService.sendTemplatedEmail(request);
            log.info("이메일 전송 결과: {}", result.getMessageId());
        } catch (Exception e) {
            log.error("이메일 전송 중 오류 발생:", e);
            throw new AmazonException(ErrorCode.MAIL_SEND_FAIL);
        }
    }

    public void sendTempPassword(String email, String tempPassword) {
        String subject = "임시 비밀번호를 전송해드립니다.";
        String message = "비밀번호는 '%s' 입니다.".formatted(tempPassword);

        Map<String, String> data = new HashMap<>();
        data.put("Subject", subject);
        data.put("Message", message);
        sendEmailWithTemplate(email, data);
    }

    public void sendLoginId(String email, String loginId) {
        String subject = "요청하신 아이디를 전송해드립니다.";
        String message = "아이디는 '%s'입니다.".formatted(loginId);

        Map<String, String> data = new HashMap<>();
        data.put("Subject", subject);
        data.put("Message", message);
        sendEmailWithTemplate(email, data);
    }

//    public void sendTempPassword(String email, String tempPassword) {
//        String subject = "요청하신 임시 비밀번호입니다.";
//        String text = String.format("비밀번호는 '%s'입니다.", tempPassword);
//
//        SendEmailRequest request = new SendEmailRequest()
//            .withDestination(new Destination().withToAddresses(email))
//            .withMessage(new Message()
//                .withBody(new Body().withText(new Content().withData(text)))
//                .withSubject(new Content().withData(subject)))
//            .withSource("dnjsml10@gmail.com");
//
//        try {
//            SendEmailResult result = amazonSimpleEmailService.sendEmail(request);
//            log.info("이메일 전송 결과: {}", result.getMessageId());
//        } catch (Exception e) {
//            log.error("이메일 전송 중 오류 발생:", e);
//            throw new AmazonException(ErrorCode.MAIL_SEND_FAIL);
//        }
//    }
//
//    public void sendLoginId(String email, String loginId) {
//        String subject = "요청하신 아이디입니다.";
//        String text = String.format("아이디는 '%s'입니다.", loginId);
//
//        SendEmailRequest request = new SendEmailRequest()
//            .withDestination(new Destination().withToAddresses(email))
//            .withMessage(new Message()
//                .withBody(new Body().withText(new Content().withData(text)))
//                .withSubject(new Content().withData(subject)))
//            .withSource("dnjsml10@gmail.com");
//
//        try {
//            SendEmailResult result = amazonSimpleEmailService.sendEmail(request);
//            log.info("이메일 전송 결과: {}", result.getMessageId());
//        } catch (Exception e) {
//            log.error("이메일 전송 중 오류 발생:", e);
//            throw new AmazonException(ErrorCode.MAIL_SEND_FAIL);
//        }
//    }
}
