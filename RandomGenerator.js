    randomNumWithXDigits(n) {
        var y = findMaxFromPlace(n);
        var x = findPlace(y);
        return Math.floor(Math.random() * (y - x) + x);
    }
