 function monthDiff(d1, d2) {
      var months;
      months = (d2.getFullYear() - d1.getFullYear()) * 12;
      months -= d1.getMonth() + 1;
      months += d2.getMonth();
      return months <= 0 ? 0 : months;
    }

    $(function() {

      var array = ["2016-07-26", "2016-08-17", "2016-08-18", "2016-08-19", "2016-08-20", "2016-08-30", "2016-08-31", "2016-09-01", "2016-09-02", "2016-09-15", "2016-09-16", "2016-09-17", "2016-09-20", "2016-09-21", "2016-09-22", "2016-10-05", "2016-10-06", "2016-10-07", "2016-10-12", "2016-10-13", "2016-10-14", "2016-11-17", "2016-11-18", "2016-11-19", "2016-11-20", "2016-11-21", "2016-11-22"];

      $(".datepicker").datepicker({
        showOtherMonths: false,
        selectOtherMonths: true,
        dateFormat: "dd-mm-yy",

        minDate: 0,
        maxDate: "+12M +10D",
        beforeShowDay: function(date) {
          var string = jQuery.datepicker.formatDate('yy-mm-dd', date);

          //alert(date+"  "+array.indexOf(string));
          var day = date.getDay();

          if (array.indexOf(string) != -1) {
            return [array.indexOf(string) == -1, 'holiday red', jQuery.datepicker.formatDate('dd-mm-yy', date) + ' is booked'];
          } else {
            if (day == 0 || day == 6)
              return [array.indexOf(string) == -1, '', 'For the Saturday or Sunday selection, the start date (Collection) should be before Saturday and end date (Return) should be after Sunday.\n\nFor weekend package: \nWeekend is from Fri to Mon [Total 2 days], Collection is on Friday and Return is on Monday.'];
            else
              return [array.indexOf(string) == -1];
          }

        },
        onSelect: function(dateText, inst) {

          $(this).data('datepicker').inline = false;

          var obj_id = $(this).attr("id");

          if (obj_id == "start_date" || obj_id == "end_date") {
            // Weekend select STARTS
            var pattern = /(\d{2})\-(\d{2})\-(\d{4})/;
            var dt = new Date(dateText.replace(pattern, "$3-$2-$1"));
            var day = dt.getDay();

            if (day == 0 || day == 6) {
              alert("For the Saturday or Sunday selection, the start date (Collection) should be before Saturday and end date (Return) should be after Sunday.\n\nFor weekend package: \nWeekend is from Fri to Mon [Total 2 days], Collection is on Friday and Return is on Monday.");
              $(this).val("");
              $(this).data('datepicker').inline = true;
            }
            // Weekend select ENDS


            // Calculation	STARTS
            var calc_flag = 1;
            var start_date = $("#start_date").val();
            var end_date = $("#end_date").val();

            if (start_date == "" || end_date == "")
              calc_flag = 0;

            // Get the vehicle rates
            var hid_daily_rate = $("#hid_daily_rate").val();
            var hid_weekend_rate = $("#hid_weekend_rate").val();
            var hid_weekly_rate = $("#hid_weekly_rate").val();
            var hid_monthly_rate = $("#hid_monthly_rate").val();

            var rental_fee = 0;


            // Testing	STARTS
            if (calc_flag) {
              // get the start and end date		
              var dateStart = $("#start_date").datepicker("getDate");
              var dateEnd = $("#end_date").datepicker("getDate");
              var totalmonths = monthDiff(dateStart, dateEnd);


              var totalmonths1 = dateEnd.getMonth() - dateStart.getMonth() + (12 * (dateEnd.getFullYear() - dateStart.getFullYear()));

              var totalDays = (dateEnd - dateStart) / 24 / 60 / 60 / 1000; //get total days

              console.log(dateStart + "\n" + dateEnd + "\ntotalmonths=" + totalmonths + "," + totalmonths1 + " totalDays=" + totalDays);
            }
            // Testing	ENDS


            if (calc_flag) {
              var a = $("#start_date").datepicker("getDate").getTime(),
                b = $("#end_date").datepicker("getDate").getTime(),
                c = 24 * 60 * 60 * 1000,
                diffDays = Math.round(Math.abs((a - b) / (c)));
              //console.log(diffDays); //show difference

              //alert(diffDays);


              rental_fee = hid_daily_rate * diffDays;

              $("#rental_fee").html('$' + rental_fee);


            }
            // Calculation	ENDS

          }

        }

      });


    });
