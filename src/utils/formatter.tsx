const smallFormatter = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

export function smallUsdFormatter(num: number) {
    return smallFormatter.format(num);
}