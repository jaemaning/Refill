package com.refill.hospital.util;

import static java.lang.Math.asin;
import static java.lang.Math.cos;
import static java.lang.Math.pow;
import static java.lang.Math.sin;
import static java.lang.Math.sqrt;
import static java.lang.Math.toRadians;

import java.math.BigDecimal;

public class DistanceCalculator {
    private static final int EARTH_RADIUS = 6371; // Approx Earth radius in KM

    public static double calculateDistance(BigDecimal lat1, BigDecimal lon1, BigDecimal lat2, BigDecimal lon2) {
        double lat1_rad = toRadians(lat1.doubleValue());
        double lon1_rad = toRadians(lon1.doubleValue());
        double lat2_rad = toRadians(lat2.doubleValue());
        double lon2_rad = toRadians(lon2.doubleValue());

        double deltaLat = lat2_rad - lat1_rad;
        double deltaLon = lon2_rad - lon1_rad;

        double a = pow(sin(deltaLat / 2), 2)
            + pow(sin(deltaLon / 2), 2) * cos(lat1_rad) * cos(lat2_rad);
        double c = 2 * asin(sqrt(a));

        return Math.ceil(EARTH_RADIUS * c * 10.00) / 10.00;
    }

}
