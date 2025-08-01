var colors = ["#3073F1", "#0acf97"],
    dataColors = document.querySelector("#crm-project-statistics").dataset
        .colors,
    options = {
        chart: { height: 350, type: "bar", toolbar: { show: !1 } },
        plotOptions: {
            bar: { horizontal: !1, endingShape: "rounded", columnWidth: "25%" },
        },
        dataLabels: { enabled: !1 },
        stroke: { show: !0, width: 3, colors: ["transparent"] },
        colors: (colors = dataColors ? dataColors.split(",") : colors),
        series: [
            { name: "Projects", data: [56, 38, 85, 72, 28, 69, 55, 52, 69] },
            {
                name: "Working Hours",
                data: [176, 185, 256, 240, 187, 205, 191, 114, 194],
            },
        ],
        xaxis: {
            categories: [
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
            ],
        },
        legend: { offsetY: 7 },
        fill: { opacity: 1 },
        grid: {
            row: { colors: ["transparent", "transparent"], opacity: 0.2 },
            borderColor: "#9ca3af20",
            padding: { bottom: 5 },
        },
    },
    chart = new ApexCharts(
        document.querySelector("#crm-project-statistics"),
        options
    ),
    colors = (chart.render(), ["#3073F1", "#0acf97"]),
    options = {
        chart: { height: 280, type: "donut" },
        legend: { show: !1 },
        stroke: { colors: ["transparent"] },
        series: [82, 37],
        labels: ["Done Projects", "Pending Projects"],
        colors: (colors = (dataColors =
            document.querySelector("#monthly-target").dataset.colors)
            ? dataColors.split(",")
            : colors),
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: { width: 200 },
                    legend: { position: "bottom" },
                },
            },
        ],
    },
    colors =
        ((chart = new ApexCharts(
            document.querySelector("#monthly-target"),
            options
        )).render(),
            ["#3073F1", "#0acf97", "#fa5c7c", "#ffbc00"]),
    options = {
        chart: { height: 350, type: "radialBar" },
        colors: (colors = (dataColors = document.querySelector(
            "#project-overview-chart"
        ).dataset.colors)
            ? dataColors.split(",")
            : colors),
        series: [85, 70, 80, 65],
        labels: [
            "Product Design",
            "Web Development",
            "Illustration Design",
            "UI/UX Design",
        ],
        plotOptions: { radialBar: { track: { margin: 5 } } },
    };
(chart = new ApexCharts(
    document.querySelector("#project-overview-chart"),
    options
)).render();
