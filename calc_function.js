var start = 0;
var yearInvestAmount = 0;
var interest = 0;
var years = 0;

document.getElementById("start").addEventListener("input", OnInput);
document.getElementById("yearInvestAmount").addEventListener("input", OnInput);
document.getElementById("interest").addEventListener("input", OnInput);
document.getElementById("years").addEventListener("input", OnInput);

function OnInput(event) {
    calculateResult();
}

class barDataCollector {
    constructor(id, title, xlabel, ylabel, plotOrientation, mode) {
        this.id = id;
        this.title = title;
        this.xlabel = xlabel;
        this.ylabel = ylabel;
        this.plotOrientation = plotOrientation;
        this.mode = mode;
        this.data = [];
        this.layout = {
            barmode: this.mode,
            xaxis: {title: this.xlabel},
            yaxis: {title: this.ylabel},
            title: this.title,
            plot_bgcolor: 'rgba(0,0,0,0)',
            paper_bgcolor: 'rgba(0,0,0,0)',
            font: {color: 'rgb(187, 187, 187)', size: 20}
        };
    }

    collectData(xdata, ydata, dataLabel, hexColorCode) {
        let aData = {
            x: xdata,
            y: ydata,
            type: "bar",
            orientation: this.plotOrientation,
            name: dataLabel,
            barmode: this.mode,
            marker: {color: hexColorCode}
        }
        this.data.push(aData);
    }

    plotBarData() {
        Plotly.newPlot(this.id, this.data, this.layout);
    }
}

function calculateResult() {
    start = parseFloat(document.getElementById("start").value);
    yearInvestAmount = parseFloat(document.getElementById("yearInvestAmount").value);
    interest = parseFloat(document.getElementById("interest").value);
    years = parseFloat(document.getElementById("years").value);


    let totalArr = [];
    let yearInvestAmountArr = [];

    let total = start;
    let compoundInterest = 1 + (interest/100.0);
    for (let i=0; i<years; i++) {
        total = (total+yearInvestAmount) * compoundInterest;
        totalArr.push(total);
        yearInvestAmountArr.push(start + yearInvestAmount*(i+1));
    // console.log("years ", i+1, ": ", total);
    }

    let totalInvestAmount = start + years*yearInvestAmount;
    let result = `總投入資金: ${(totalInvestAmount).toFixed(2)}` + "\n" 
                + `淨報酬(總報酬-總投入資金): ${(total - totalInvestAmount).toFixed(2)}` + "\n"
                + `總報酬: ${total.toFixed(2)}`;


    document.getElementById("result").innerText = result;

    if (isNaN(start) || isNaN(yearInvestAmount) || isNaN(interest) || isNaN(years)) {
        return;
    }
    let plotResult = new barDataCollector(
        id="investPlot",
        title="投資結果", 
        xlabel="報酬", 
        ylabel="年", 
        plotOrientation="h", 
        mode="overlay"
    );
    
    let years_arr = Array.from(Array(years+1).keys());
    years_arr.shift(); // remove first element
    console.log("years: ", years_arr);
    console.log("yearInvestAmountArr: ", yearInvestAmountArr);
    console.log("totalArr: ", totalArr);

    plotResult.collectData(totalArr, years_arr, "總報酬", "#88C");
    plotResult.collectData(yearInvestAmountArr, years_arr, "總投入資金", "#448");
    plotResult.plotBarData();



    // plot_result(years, totalArr, "總報酬", "totalAmount");
    // plot_result(years, yearInvestAmountArr, "總投入資金", "totalInvestAmount");
}

function plot_result(year, amount_arr, title_label, xlabel) {
    if (isNaN(start) || isNaN(year)) {
        return 0;
    } else {
        amount_arr = amount_arr.reverse();
        let years_arr = Array.from(Array(year).keys()).reverse();
        let data = [{
            x: amount_arr,
            y: years_arr,
            type: "bar",
            orientation: "h"
        }];
        let layout = {
            xaxis: {title: xlabel},
            yaxis: {range: years_arr, title: "year"},
            title: title_label
        };
        Plotly.newPlot(xlabel, data, layout);
    }
}