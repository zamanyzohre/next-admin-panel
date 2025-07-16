"use client"

import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useEffect } from "react";

export default function AmChart({chartData}) {

   useEffect(() => {
    am5.ready(function() {
    var root = am5.Root.new("chartdiv");

    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    var chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
        layout: root.verticalLayout
      })
    );

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
      xRenderer.labels.template.setAll({
        rotation: -90,
        centerY: am5.p50,
        centerX: am5.p100,
        paddingRight: 15,
        direction: "rtl",
        fontFamily: "Vazir"
    });
      var yRenderer = am5xy.AxisRendererY.new(root, {});
        yRenderer.labels.template.setAll({
          direction: "rtl",
          fontFamily: "Vazir",
          paddingRight:15
      });

      var xtooltipRtl = am5.Tooltip.new(root, {})
        xtooltipRtl.label.setAll({
          direction: "rtl",
          fontFamily: "Vazir"
      })
     

    // Define data
    // var data = chartData;
      var data = [{
                month: "فروردین",
                value: 202
            }, {
                month: "اردیبهشت",
                value: 1882
            }, {
                month: "خرداد",
                value: 1809
            }, {
                month: "تیر",
                value: 1722
            }, {
                month: "مرداد",
                value: 1522
            }, {
                month: "شهریور",
                value: 1414
            }, {
                month: "مهر",
                value: 1120
            }, {
                month: "آبان",
                value: 998
            }, {
                month: "آذر",
                value: 875
            }, {
                month: "دی",
                value: 789
            }, {
                month: "بهمن",
                value: 658
            }, {
                month: "اسفند",
                value: 598
            }];
    

    // Create Y-axis
    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer:yRenderer,
        categoryField: "value",
        maxDeviation: 0.3
      })
    );

    // Create X-Axis
    var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
      renderer:xRenderer,
      categoryField: "month",
      tooltip: xtooltipRtl,
      maxDeviation: 0.3
      })
    );
    xAxis.data.setAll(data);

    var tooltipRtl = am5.Tooltip.new(root, {
      labelText: "{valueY}"
    })
    tooltipRtl.label.setAll({
      direction: "rtl",
      fontFamily: "Vazir"
    })

    // Create series
    var series = chart.series.push(am5xy.ColumnSeries.new(root, {
        name: "جدول",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        categoryXField: "month",
        sequencedInterpolation: true,
        tooltip: tooltipRtl
      })
    );
    series.data.setAll(data);

    series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5 });
      series.columns.template.adapters.add("fill", function (fill, target) {
        return chart.get("colors").getIndex(series.columns.indexOf(target));
    });

    series.columns.template.adapters.add("stroke", function (stroke, target) {
      return chart.get("colors").getIndex(series.columns.indexOf(target));
    });

    // Make stuff animate on load
            // https://www.amcharts.com/docs/v5/concepts/animations/
            series.appear(1000);
            chart.appear(1000, 100);

     
  })
  }, [chartData]);

   return (
    <div id="chartdiv" style={{height: "300px" }}></div>
  );

}
