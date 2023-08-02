package com.refill.aidiagnosis.entity;

import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum HairLossType {

    TYPE1(1, 0),
    TYPE2(2, 15),
    TYPE3(3, 30),
    TYPE4(4, 45),
    TYPE5(5, 60),
    TYPE6(6, 75),
    TYPE7(7, 90);

    private final int typeNumber;
    private final int score;

    private static final Map<Integer, HairLossType> TYPES = Stream.of(HairLossType.values())
                                                                  .collect(Collectors.toMap(
                                                                      HairLossType::getTypeNumber,
                                                                      type -> type));

    public static HairLossType getType(String type) {

        return TYPES.get(Integer.parseInt(type.split(" ")[1]));

    }

    public static int scoreGenerator(HairLossType hairLossType, String surveyResult) {

        int sumScore = Stream.of(surveyResult.split(""))
                             .mapToInt(Integer::parseInt)
                             .filter(x -> x == 1)
                             .sum();

        return sumScore + hairLossType.getScore();
    }
}
