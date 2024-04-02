package com.refill.account.entity;

import java.util.Locale;

public enum ClientType {
    MEMBER, HOSPITAL, ADMIN;

    public static ClientType getName(String clientType) {
        return ClientType.valueOf(clientType.toUpperCase(Locale.ENGLISH));
    }
}
