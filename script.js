
//FORMAT IN VSCODE SHIFT + ALT + F
//MULTI CURSOR ALT+CLICK / CTRL+SHIFT+L / CTRL + ALT DOWN

//get the json file, and THEN execute gotData function as soon as data is ready
$.getJSON("sqVol.json", gotData);

function gotData(data) {


  //SQUATS
  var SquatVolumen = [];
  var SquatSatzLabels = [];
  var SquatDates = [];
  var VolumeCounter = 0;
  var SatzLabel = "";
  //Iterate over JSON Object, for each DATE check if SQUATS are present, if so calculate the volume of the day and add it to the Volume Array
  Object.keys(data).forEach(function (Date) {
    if (data[Date].hasOwnProperty('Squats')) {
      console.log("Squat found. Date: " + Date);
      //add the date to an array for use in chart
      SquatDates.push(Date);
      Object.keys(data[Date].Squats).forEach(function (sqKey) {
        console.log(data[Date].Squats[sqKey]);
        VolumeCounter = VolumeCounter + (parseInt(sqKey) * data[Date].Squats[sqKey]);
        SatzLabel = JSON.stringify(data[Date].Squats);
      });
      SquatVolumen.push(VolumeCounter);
      SquatSatzLabels.push(SatzLabel);
      SatzLabel = "";
      VolumeCounter = 0;
    }
  });

  SquatSatzLabels.forEach(element => {
    console.log(element);
  });

  var chart1 = new Chart(SquatChart, {
    type: 'bar',
    data: {
      labels: SquatDates,
      datasets: [{
        label: 'Volumen',
        data: SquatVolumen
      }]
    },
    options: {
      tooltips: {
        callbacks: {
          afterLabel: function (tooltipItem, data) {
            return toolto;
          }
        }
      }
    }

  });

  /* LOGGING

Object.keys(data).forEach(function (Date) {
      console.log("Dates: " + Date);
      console.log("Squats: ");
      console.log(data[Date].Squats);
      console.log("OHP: ");
      console.log(data[Date].OHP);
      Object.keys(data[Date].Squats).forEach(function (sq) {
        console.log(sq);})
    });

  console.log("Arrays:");
  SquatVolumen.forEach(element => {
    console.log("VolumeSquats: " + element);
  });
  SquatDates.forEach(element => {
    console.log("SquatDates: " + element)
  }); */



  //OHP
  var OHPVolumen = [];
  var OHPDates = [];
  var VolumeCounter = 0;
  //feed array with data for chart
  Object.keys(data).forEach(function (Date) {
    if (data[Date].hasOwnProperty('OHP')) {
      console.log("OHP found. Date: " + Date);
      //add the date to an array for use in chart
      OHPDates.push(Date);
      Object.keys(data[Date].OHP).forEach(function (OHPKey) {
        console.log(data[Date].OHP[OHPKey]);
        VolumeCounter = VolumeCounter + (parseInt(OHPKey) * data[Date].OHP[OHPKey]);
      });
      OHPVolumen.push(VolumeCounter);
      VolumeCounter = 0;
    }
  });

  var chart2 = new Chart(OHPChart, {
    type: 'bar',
    data: {
      labels: OHPDates,
      datasets: [{
        label: 'Volumen',
        data: OHPVolumen
      }]
    },
    options: {}

  });


  //Maus Over für einzelne Sets - Sets in der Chart einlesen und addieren? 

}

