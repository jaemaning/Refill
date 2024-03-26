package com.refill.account.util;

import java.util.Random;

public class AccountUtil {

    public static String getRandomCode(int length) {
        // 숫자 0
        final int leftLimit = 48;
        // 소문자 'z'
        final int rightLimit = 122;

        Random random = new Random();
        return random.ints(leftLimit, rightLimit + 1)
                     .filter(x -> (x <= 57 || x >= 65) && (x <= 90 || x >= 97))
                     .limit(length)
                     .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                     .toString();
    }

}
