package com.refill.account.util;

import com.refill.account.entity.ClientType;
import org.springframework.core.convert.converter.Converter;

public class StringToEnumConverter implements Converter<String, ClientType> {

    @Override
    public ClientType convert(String source) {
        return ClientType.valueOf(source.toUpperCase());
    }
}
