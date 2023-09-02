package com.refill.account.client;

import com.refill.account.dto.request.LoginIdFindRequest;
import com.refill.account.dto.request.LoginPasswordRequest;
import com.refill.account.dto.request.LoginRequest;
import com.refill.account.dto.response.TokenResponse;
import com.refill.account.entity.ClientType;
import com.refill.account.exception.AccountException;
import com.refill.global.exception.ErrorCode;
import java.util.EnumMap;
import java.util.Optional;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;
import org.springframework.stereotype.Component;

@Component
public class AccountClientComposite{

    private final EnumMap<ClientType, Client> clientEnumMap;

    public AccountClientComposite(Set<Client> clients) {
        clientEnumMap = clients.stream()
                         .collect(
                             Collectors.toMap(
                                 Client::getClientType,
                                 Function.identity(),
                                 (existing, replacement) -> existing,
                                 () -> new EnumMap<ClientType, Client>(ClientType.class)
                             )
                         );
    }

    public TokenResponse login(ClientType clientType, LoginRequest loginRequest) {
        return getClient(clientType).login(loginRequest);
    }

    public String findLoginId(ClientType clientType, LoginIdFindRequest loginIdFindRequest) {
        return getClient(clientType).findLoginId(loginIdFindRequest);
    }

    public String findPassword(ClientType clientType, LoginPasswordRequest loginPasswordRequest) {
        return getClient(clientType).findPassword(loginPasswordRequest);
    }

    private Client getClient(ClientType clientType) {
        return Optional.ofNullable(clientEnumMap.get(clientType))
                       .orElseThrow(() -> new AccountException(ErrorCode.ILLEGAL_CLIENT_TYPE));
    }
}
