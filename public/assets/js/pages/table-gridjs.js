class GridDatatable {
    init() {
        this.basicTableInit();
    }
    basicTableInit() {
        document.getElementById("table-gridjs") &&
            new gridjs.Grid({
                columns: [
                    {
                        name: "ID",
                        formatter: function (e) {
                            return gridjs.html(
                                '<span class="fw-semibold">' + e + "</span>"
                            );
                        },
                    },
                    "Name",
                    {
                        name: "Email",
                        formatter: function (e) {
                            return gridjs.html('<a href="">' + e + "</a>");
                        },
                    },
                    "Position",
                    "Company",
                    "Country",
                    {
                        name: "Actions",
                        width: "120px",
                        formatter: function (e) {
                            return gridjs.html(
                                "<a href='#' class='text-reset text-decoration-underline'>Details</a>"
                            );
                        },
                    },
                ],
                pagination: { limit: 5 },
                sort: !0,
                search: !0,
                data: [
                    [
                        "01",
                        "Jonathan",
                        "jonathan@example.com",
                        "Senior Implementation Architect",
                        "Hauck Inc",
                        "Holy See",
                    ],
                    [
                        "02",
                        "Harold",
                        "harold@example.com",
                        "Forward Creative Coordinator",
                        "Metz Inc",
                        "Iran",
                    ],
                    [
                        "03",
                        "Shannon",
                        "shannon@example.com",
                        "Legacy Functionality Associate",
                        "Zemlak Group",
                        "South Georgia",
                    ],
                    [
                        "04",
                        "Robert",
                        "robert@example.com",
                        "Product Accounts Technician",
                        "Hoeger",
                        "San Marino",
                    ],
                    [
                        "05",
                        "Noel",
                        "noel@example.com",
                        "Customer Data Director",
                        "Howell - Rippin",
                        "Germany",
                    ],
                    [
                        "06",
                        "Traci",
                        "traci@example.com",
                        "Corporate Identity Director",
                        "Koelpin - Goldner",
                        "Vanuatu",
                    ],
                    [
                        "07",
                        "Kerry",
                        "kerry@example.com",
                        "Lead Applications Associate",
                        "Feeney, Langworth and Tremblay",
                        "Niger",
                    ],
                    [
                        "08",
                        "Patsy",
                        "patsy@example.com",
                        "Dynamic Assurance Director",
                        "Streich Group",
                        "Niue",
                    ],
                    [
                        "09",
                        "Cathy",
                        "cathy@example.com",
                        "Customer Data Director",
                        "Ebert, Schamberger and Johnston",
                        "Mexico",
                    ],
                    [
                        "10",
                        "Tyrone",
                        "tyrone@example.com",
                        "Senior Response Liaison",
                        "Raynor, Rolfson and Daugherty",
                        "Qatar",
                    ],
                ],
            }).render(document.getElementById("table-gridjs")),
            document.getElementById("table-card") &&
            new gridjs.Grid({
                columns: [
                    "Name",
                    "Email",
                    "Position",
                    "Company",
                    "Country",
                ],
                sort: !0,
                pagination: { limit: 5 },
                data: [
                    [
                        "Jonathan",
                        "jonathan@example.com",
                        "Senior Implementation Architect",
                        "Hauck Inc",
                        "Holy See",
                    ],
                    [
                        "Harold",
                        "harold@example.com",
                        "Forward Creative Coordinator",
                        "Metz Inc",
                        "Iran",
                    ],
                    [
                        "Shannon",
                        "shannon@example.com",
                        "Legacy Functionality Associate",
                        "Zemlak Group",
                        "South Georgia",
                    ],
                    [
                        "Robert",
                        "robert@example.com",
                        "Product Accounts Technician",
                        "Hoeger",
                        "San Marino",
                    ],
                    [
                        "Noel",
                        "noel@example.com",
                        "Customer Data Director",
                        "Howell - Rippin",
                        "Germany",
                    ],
                    [
                        "Traci",
                        "traci@example.com",
                        "Corporate Identity Director",
                        "Koelpin - Goldner",
                        "Vanuatu",
                    ],
                    [
                        "Kerry",
                        "kerry@example.com",
                        "Lead Applications Associate",
                        "Feeney, Langworth and Tremblay",
                        "Niger",
                    ],
                    [
                        "Patsy",
                        "patsy@example.com",
                        "Dynamic Assurance Director",
                        "Streich Group",
                        "Niue",
                    ],
                    [
                        "Cathy",
                        "cathy@example.com",
                        "Customer Data Director",
                        "Ebert, Schamberger and Johnston",
                        "Mexico",
                    ],
                    [
                        "Tyrone",
                        "tyrone@example.com",
                        "Senior Response Liaison",
                        "Raynor, Rolfson and Daugherty",
                        "Qatar",
                    ],
                ],
            }).render(document.getElementById("table-card")),
            document.getElementById("table-pagination") &&
            new gridjs.Grid({
                columns: [
                    {
                        name: "ID",
                        width: "120px",
                        formatter: function (e) {
                            return gridjs.html(
                                '<a href="" class="fw-medium">' + e + "</a>"
                            );
                        },
                    },
                    "Name",
                    "Date",
                    "Total",
                    "Status",
                    {
                        name: "Actions",
                        width: "100px",
                        formatter: function (e) {
                            return gridjs.html(
                                "<button type='button' class='btn btn-sm btn-light'>Details</button>"
                            );
                        },
                    },
                ],
                pagination: { limit: 5 },
                data: [
                    [
                        "#VL2111",
                        "Jonathan",
                        "07 Oct, 2021",
                        "$24.05",
                        "Paid",
                    ],
                    ["#VL2110", "Harold", "07 Oct, 2021", "$26.15", "Paid"],
                    [
                        "#VL2109",
                        "Shannon",
                        "06 Oct, 2021",
                        "$21.25",
                        "Refund",
                    ],
                    ["#VL2108", "Robert", "05 Oct, 2021", "$25.03", "Paid"],
                    ["#VL2107", "Noel", "05 Oct, 2021", "$22.61", "Paid"],
                    ["#VL2106", "Traci", "04 Oct, 2021", "$24.05", "Paid"],
                    ["#VL2105", "Kerry", "04 Oct, 2021", "$26.15", "Paid"],
                    [
                        "#VL2104",
                        "Patsy",
                        "04 Oct, 2021",
                        "$21.25",
                        "Refund",
                    ],
                    ["#VL2103", "Cathy", "03 Oct, 2021", "$22.61", "Paid"],
                    ["#VL2102", "Tyrone", "03 Oct, 2021", "$25.03", "Paid"],
                ],
            }).render(document.getElementById("table-pagination")),
            document.getElementById("table-search") &&
            new gridjs.Grid({
                columns: [
                    "Name",
                    "Email",
                    "Position",
                    "Company",
                    "Country",
                ],
                pagination: { limit: 5 },
                search: !0,
                data: [
                    [
                        "Jonathan",
                        "jonathan@example.com",
                        "Senior Implementation Architect",
                        "Hauck Inc",
                        "Holy See",
                    ],
                    [
                        "Harold",
                        "harold@example.com",
                        "Forward Creative Coordinator",
                        "Metz Inc",
                        "Iran",
                    ],
                    [
                        "Shannon",
                        "shannon@example.com",
                        "Legacy Functionality Associate",
                        "Zemlak Group",
                        "South Georgia",
                    ],
                    [
                        "Robert",
                        "robert@example.com",
                        "Product Accounts Technician",
                        "Hoeger",
                        "San Marino",
                    ],
                    [
                        "Noel",
                        "noel@example.com",
                        "Customer Data Director",
                        "Howell - Rippin",
                        "Germany",
                    ],
                    [
                        "Traci",
                        "traci@example.com",
                        "Corporate Identity Director",
                        "Koelpin - Goldner",
                        "Vanuatu",
                    ],
                    [
                        "Kerry",
                        "kerry@example.com",
                        "Lead Applications Associate",
                        "Feeney, Langworth and Tremblay",
                        "Niger",
                    ],
                    [
                        "Patsy",
                        "patsy@example.com",
                        "Dynamic Assurance Director",
                        "Streich Group",
                        "Niue",
                    ],
                    [
                        "Cathy",
                        "cathy@example.com",
                        "Customer Data Director",
                        "Ebert, Schamberger and Johnston",
                        "Mexico",
                    ],
                    [
                        "Tyrone",
                        "tyrone@example.com",
                        "Senior Response Liaison",
                        "Raynor, Rolfson and Daugherty",
                        "Qatar",
                    ],
                ],
            }).render(document.getElementById("table-search")),
            document.getElementById("table-sorting") &&
            new gridjs.Grid({
                columns: [
                    "Name",
                    "Email",
                    "Position",
                    "Company",
                    "Country",
                ],
                pagination: { limit: 5 },
                sort: !0,
                data: [
                    [
                        "Jonathan",
                        "jonathan@example.com",
                        "Senior Implementation Architect",
                        "Hauck Inc",
                        "Holy See",
                    ],
                    [
                        "Harold",
                        "harold@example.com",
                        "Forward Creative Coordinator",
                        "Metz Inc",
                        "Iran",
                    ],
                    [
                        "Shannon",
                        "shannon@example.com",
                        "Legacy Functionality Associate",
                        "Zemlak Group",
                        "South Georgia",
                    ],
                    [
                        "Robert",
                        "robert@example.com",
                        "Product Accounts Technician",
                        "Hoeger",
                        "San Marino",
                    ],
                    [
                        "Noel",
                        "noel@example.com",
                        "Customer Data Director",
                        "Howell - Rippin",
                        "Germany",
                    ],
                    [
                        "Traci",
                        "traci@example.com",
                        "Corporate Identity Director",
                        "Koelpin - Goldner",
                        "Vanuatu",
                    ],
                    [
                        "Kerry",
                        "kerry@example.com",
                        "Lead Applications Associate",
                        "Feeney, Langworth and Tremblay",
                        "Niger",
                    ],
                    [
                        "Patsy",
                        "patsy@example.com",
                        "Dynamic Assurance Director",
                        "Streich Group",
                        "Niue",
                    ],
                    [
                        "Cathy",
                        "cathy@example.com",
                        "Customer Data Director",
                        "Ebert, Schamberger and Johnston",
                        "Mexico",
                    ],
                    [
                        "Tyrone",
                        "tyrone@example.com",
                        "Senior Response Liaison",
                        "Raynor, Rolfson and Daugherty",
                        "Qatar",
                    ],
                ],
            }).render(document.getElementById("table-sorting")),
            document.getElementById("table-loading-state") &&
            new gridjs.Grid({
                columns: [
                    "Name",
                    "Email",
                    "Position",
                    "Company",
                    "Country",
                ],
                pagination: { limit: 5 },
                sort: !0,
                data: function () {
                    return new Promise(function (e) {
                        setTimeout(function () {
                            e([
                                [
                                    "Jonathan",
                                    "jonathan@example.com",
                                    "Senior Implementation Architect",
                                    "Hauck Inc",
                                    "Holy See",
                                ],
                                [
                                    "Harold",
                                    "harold@example.com",
                                    "Forward Creative Coordinator",
                                    "Metz Inc",
                                    "Iran",
                                ],
                                [
                                    "Shannon",
                                    "shannon@example.com",
                                    "Legacy Functionality Associate",
                                    "Zemlak Group",
                                    "South Georgia",
                                ],
                                [
                                    "Robert",
                                    "robert@example.com",
                                    "Product Accounts Technician",
                                    "Hoeger",
                                    "San Marino",
                                ],
                                [
                                    "Noel",
                                    "noel@example.com",
                                    "Customer Data Director",
                                    "Howell - Rippin",
                                    "Germany",
                                ],
                                [
                                    "Traci",
                                    "traci@example.com",
                                    "Corporate Identity Director",
                                    "Koelpin - Goldner",
                                    "Vanuatu",
                                ],
                                [
                                    "Kerry",
                                    "kerry@example.com",
                                    "Lead Applications Associate",
                                    "Feeney, Langworth and Tremblay",
                                    "Niger",
                                ],
                                [
                                    "Patsy",
                                    "patsy@example.com",
                                    "Dynamic Assurance Director",
                                    "Streich Group",
                                    "Niue",
                                ],
                                [
                                    "Cathy",
                                    "cathy@example.com",
                                    "Customer Data Director",
                                    "Ebert, Schamberger and Johnston",
                                    "Mexico",
                                ],
                                [
                                    "Tyrone",
                                    "tyrone@example.com",
                                    "Senior Response Liaison",
                                    "Raynor, Rolfson and Daugherty",
                                    "Qatar",
                                ],
                            ]);
                        }, 2e3);
                    });
                },
            }).render(document.getElementById("table-loading-state")),
            document.getElementById("table-fixed-header") &&
            new gridjs.Grid({
                columns: [
                    "Name",
                    "Email",
                    "Position",
                    "Company",
                    "Country",
                ],
                sort: !0,
                pagination: !0,
                fixedHeader: !0,
                height: "400px",
                data: [
                    [
                        "Jonathan",
                        "jonathan@example.com",
                        "Senior Implementation Architect",
                        "Hauck Inc",
                        "Holy See",
                    ],
                    [
                        "Harold",
                        "harold@example.com",
                        "Forward Creative Coordinator",
                        "Metz Inc",
                        "Iran",
                    ],
                    [
                        "Shannon",
                        "shannon@example.com",
                        "Legacy Functionality Associate",
                        "Zemlak Group",
                        "South Georgia",
                    ],
                    [
                        "Robert",
                        "robert@example.com",
                        "Product Accounts Technician",
                        "Hoeger",
                        "San Marino",
                    ],
                    [
                        "Noel",
                        "noel@example.com",
                        "Customer Data Director",
                        "Howell - Rippin",
                        "Germany",
                    ],
                    [
                        "Traci",
                        "traci@example.com",
                        "Corporate Identity Director",
                        "Koelpin - Goldner",
                        "Vanuatu",
                    ],
                    [
                        "Kerry",
                        "kerry@example.com",
                        "Lead Applications Associate",
                        "Feeney, Langworth and Tremblay",
                        "Niger",
                    ],
                    [
                        "Patsy",
                        "patsy@example.com",
                        "Dynamic Assurance Director",
                        "Streich Group",
                        "Niue",
                    ],
                    [
                        "Cathy",
                        "cathy@example.com",
                        "Customer Data Director",
                        "Ebert, Schamberger and Johnston",
                        "Mexico",
                    ],
                    [
                        "Tyrone",
                        "tyrone@example.com",
                        "Senior Response Liaison",
                        "Raynor, Rolfson and Daugherty",
                        "Qatar",
                    ],
                ],
            }).render(document.getElementById("table-fixed-header")),
            document.getElementById("table-hidden-column") &&
            new gridjs.Grid({
                columns: [
                    "Name",
                    "Email",
                    "Position",
                    "Company",
                    { name: "Country", hidden: !0 },
                ],
                pagination: { limit: 5 },
                sort: !0,
                data: [
                    [
                        "Jonathan",
                        "jonathan@example.com",
                        "Senior Implementation Architect",
                        "Hauck Inc",
                        "Holy See",
                    ],
                    [
                        "Harold",
                        "harold@example.com",
                        "Forward Creative Coordinator",
                        "Metz Inc",
                        "Iran",
                    ],
                    [
                        "Shannon",
                        "shannon@example.com",
                        "Legacy Functionality Associate",
                        "Zemlak Group",
                        "South Georgia",
                    ],
                    [
                        "Robert",
                        "robert@example.com",
                        "Product Accounts Technician",
                        "Hoeger",
                        "San Marino",
                    ],
                    [
                        "Noel",
                        "noel@example.com",
                        "Customer Data Director",
                        "Howell - Rippin",
                        "Germany",
                    ],
                    [
                        "Traci",
                        "traci@example.com",
                        "Corporate Identity Director",
                        "Koelpin - Goldner",
                        "Vanuatu",
                    ],
                    [
                        "Kerry",
                        "kerry@example.com",
                        "Lead Applications Associate",
                        "Feeney, Langworth and Tremblay",
                        "Niger",
                    ],
                    [
                        "Patsy",
                        "patsy@example.com",
                        "Dynamic Assurance Director",
                        "Streich Group",
                        "Niue",
                    ],
                    [
                        "Cathy",
                        "cathy@example.com",
                        "Customer Data Director",
                        "Ebert, Schamberger and Johnston",
                        "Mexico",
                    ],
                    [
                        "Tyrone",
                        "tyrone@example.com",
                        "Senior Response Liaison",
                        "Raynor, Rolfson and Daugherty",
                        "Qatar",
                    ],
                ],
            }).render(document.getElementById("table-hidden-column"));
    }
}
document.addEventListener("DOMContentLoaded", function (e) {
    new GridDatatable().init();
});
