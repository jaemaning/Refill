package com.refill.account.client;

import com.refill.account.entity.ClientType;
import com.refill.account.dto.request.LoginIdFindRequest;
import com.refill.account.dto.request.LoginPasswordRequest;
import com.refill.account.dto.request.LoginRequest;
import com.refill.account.dto.response.TokenResponse;

public interface Client {

    ClientType getClientType();

    TokenResponse login(LoginRequest loginRequest);

    String findLoginId(LoginIdFindRequest loginIdFindRequest);

    String findPassword(LoginPasswordRequest loginPasswordRequest);

}
