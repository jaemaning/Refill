package com.refill.global.config;

import org.hibernate.resource.jdbc.spi.StatementInspector;

public class ApiQueryInspector implements StatementInspector {

    private final ApiQueryCounter apiQueryCounter;

    public ApiQueryInspector(final ApiQueryCounter apiQueryCounter) {
        this.apiQueryCounter = apiQueryCounter;
    }

    @Override
    public String inspect(final String sql) {
        apiQueryCounter.increaseCount();
        return sql;
    }
}
