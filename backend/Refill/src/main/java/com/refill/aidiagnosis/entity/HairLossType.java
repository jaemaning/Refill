package com.refill.aidiagnosis.entity;

import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum HairLossType {

    TYPE1(1),
    TYPE2(2),
    TYPE3(3),
    TYPE4(4),
    TYPE5(5),
    TYPE6(6),
    TYPE7(7);

    private final int typeNumber;

    private static final Map<Integer, HairLossType> TYPES = Stream.of(HairLossType.values())
                                                                  .collect(Collectors.toMap(HairLossType::getTypeNumber, type -> type));
    public HairLossType getType(String type) {

        return TYPES.get(Integer.parseInt(type.split(" ")[1]));

    }
}
