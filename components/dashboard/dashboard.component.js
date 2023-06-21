"use strict";

angular.module("component").component("dashboard", {
  templateUrl: "components/dashboard/dashboard.template.html",
  controller: [
    "$scope",
    "$location",
    "$routeParams",
    // "RevenueService",
    // "DashboardService",
    "Constant",
    function DashboardController(
      $scope,
      $location,
      $routeParams,
      // RevenueService,
      // DashboardService,
      Constant
    ) {
      var ctrl = this;
      ctrl.dashboard = {};
      ctrl.user = { full_name: "", user_type_id: "", user_type_name: "" };
      ctrl.Constant = Constant;
      ctrl.revnueData = [];
      ctrl.amountRefundedAndCancelled;
      ctrl.amountRecievedAndRemaining;
      ctrl.revenue;

      ctrl.$onInit = function () {
        ctrl.user.full_name = localStorage.getItem("full_name");
        if(ctrl.user.full_name == undefined){
          window.location.href = config.APP_URL + '#!/auth/signin';
        }
        // ctrl.user.user_type_id = localStorage.getItem("user_type_id");
        // ctrl.user.user_type_name = localStorage.getItem("user_type_name");

        // ctrl.get();
        // ctrl.getRevenue();
      };

      // ctrl.init = function (settings) {
      //   console.log("dashboard.init()");
      //   ctrl.settings = settings;
      //   console.log(settings);
      //   ctrl.amountRefundedAndCancelled = settings.pieChart2;
      //   ctrl.amountRecievedAndRemaining = settings.pieChart;
      //   ctrl.revenue = settings.barGraph;
      // };

      // ctrl.get = function () {
      //   DashboardService.get().then(
      //     function success(response) {
      //       ctrl.dashboard = response.data.dashboard;
      //       console.log(ctrl.dashboard);
      //       ctrl.dashboard.today = new Date(ctrl.dashboard.today);
      //       ctrl.dashboard.tomorrow = new Date(ctrl.dashboard.tomorrow);
      //       ctrl.dashboard.this_week_start = new Date(ctrl.dashboard.this_week_start);
      //       ctrl.dashboard.this_week_end = new Date(ctrl.dashboard.this_week_end);
      //       ctrl.dashboard.this_month = new Date(ctrl.dashboard.this_month);
      //       ctrl.dashboard.this_year = new Date(ctrl.dashboard.this_year);
      //       console.log(ctrl.dashboard);
      //       ctrl.constructRefundAndCancelAmountGraph();
      //       ctrl.constructRecievedAndRemainingAmountGraph();
      //     },
      //     function error(response) {}
      //   );
      // };

      // ctrl.getRevenue = function () {
      //   RevenueService.findAll().then(
      //     function success(response) {
      //       ctrl.revnueData = response.data.data;
      //       console.log(ctrl.revnueData);
      //       ctrl.constructRevenueGraph();
      //     },
      //     function error(response) {}
      //   );
      // };

      // ctrl.constructRefundAndCancelAmountGraph = function(){
      //   // cancel and refund amount 
      //   console.log(ctrl.amountRefundedAndCancelled);
      //   var myChart = echarts.init(document.getElementById(ctrl.amountRefundedAndCancelled));

      //   var options = {
      //     tooltip: {
      //       trigger: "item",
      //     },
      //     legend: {
      //       top: "5%",
      //       left: "center",
      //     },
      //     series: [
      //       {
      //         name: "Access From",
      //         type: "pie",
      //         radius: ["40%", "70%"],
      //         avoidLabelOverlap: false,
      //         itemStyle: {
      //           borderRadius: 10,
      //           borderColor: "#fff",
      //           borderWidth: 2,
      //         },
      //         label: {
      //           show: false,
      //           position: "center",
      //           color: "#000000",
      //         },
      //         emphasis: {
      //           label: {
      //             show: true,
      //             fontSize: "40",
      //             fontWeight: "bold",
      //           },
      //         },
      //         labelLine: {
      //           show: false,
      //         },
      //         data: [
      //           {name: 'Cancelled Amount', value: ctrl.dashboard.cancel_amount},
      //           {name: 'Refunded Amount', value: ctrl.dashboard.refunded_amount}
      //         ],
      //       },
      //     ],

      //     color: ["#5AB1EF", "#2EC7C9"],
      //   };

      //   myChart.setOption(options);
      // }

      // ctrl.constructRecievedAndRemainingAmountGraph = function(){
      //   // cancel and refund amount 
      //   var myChart = echarts.init(document.getElementById(ctrl.amountRecievedAndRemaining));

      //   var options = {
      //     tooltip: {
      //         trigger: 'item'
      //     },
      //     legend: {
      //         top: '5%',
      //         left: 'center'
      //     },
      //     series: [
      //         {
      //             name: 'Access From',
      //             type: 'pie',
      //             radius: ['40%', '70%'],
      //             avoidLabelOverlap: false,
      //             itemStyle: {
      //                 borderRadius: 10,
      //                 borderColor: '#fff',
      //                 borderWidth: 2
      //             },
      //             label: {
      //                 show: false,
      //                 position: 'center',
      //                 color: '#000000'
      //             },
      //             emphasis: {
      //                 label: {
      //                     show: true,
      //                     fontSize: '40',
      //                     fontWeight: 'bold'
      //                 }
      //             },
      //             labelLine: {
      //                 show: false
      //             },
      //             data: [
      //                 { value: ctrl.dashboard.recieved_amount, name: 'Recieved' },
      //                 { value: ctrl.dashboard.payments_expected, name: 'Remaining' },
      //             ]
      //         }
      //     ],
  
      //     color: ['#5AB1EF', '#2EC7C9']
      // };

      //   myChart.setOption(options);
      // }

      // ctrl.constructRevenueGraph = function(){
      //   // cancel and refund amount 
      //   console.log(ctrl.revenue);
      //   var myChart = echarts.init(document.getElementById(ctrl.revenue));

      //   var options = {
      //     legend: {},
      //     tooltip: {},
      //     dataset: {
      //         dimensions: ['date', 'Revenue', 'Expense', 'Net Profit'],
      //         source: [
      //             { date: moment(ctrl.revnueData[0].on_date).format('YYYY-MM-DD dddd') , 'Revenue': ctrl.revnueData[0].revenue, 'Expense': ctrl.revnueData[0].expense, 'Net Profit': ctrl.revnueData[0].net_profit },
      //             { date: moment(ctrl.revnueData[1].on_date).format('YYYY-MM-DD dddd'), 'Revenue': ctrl.revnueData[1].revenue, 'Expense': ctrl.revnueData[0].expense, 'Net Profit': ctrl.revnueData[1].net_profit },
      //             { date: moment(ctrl.revnueData[2].on_date).format('YYYY-MM-DD dddd'), 'Revenue': ctrl.revnueData[2].revenue, 'Expense': ctrl.revnueData[0].expense, 'Net Profit': ctrl.revnueData[2].net_profit },
      //             { date: moment(ctrl.revnueData[3].on_date).format('YYYY-MM-DD dddd'), 'Revenue': ctrl.revnueData[3].revenue, 'Expense': ctrl.revnueData[0].expense, 'Net Profit': ctrl.revnueData[3].net_profit },
      //             { date: moment(ctrl.revnueData[4].on_date).format('YYYY-MM-DD dddd'), 'Revenue': ctrl.revnueData[4].revenue, 'Expense': ctrl.revnueData[0].expense, 'Net Profit': ctrl.revnueData[4].net_profit },
      //             { date: moment(ctrl.revnueData[5].on_date).format('YYYY-MM-DD dddd'), 'Revenue': ctrl.revnueData[5].revenue, 'Expense': ctrl.revnueData[0].expense, 'Net Profit': ctrl.revnueData[5].net_profit },
      //         ]
      //     },
      //     xAxis: { type: 'category' },
      //     yAxis: {
      //         min: 100,
      //         max: 400000
      //     },
      //     // Declare several bar series, each will be mapped
      //     // to a column of dataset.source by default.
      //     series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }],
      //     color: ['#D6C5A2', '#CAAA69', '#AB9362']
      // };

      //   myChart.setOption(options);
      // }
    },
  ],
});
