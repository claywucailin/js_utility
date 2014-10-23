Date.prototype.Format = function(fmt) { // author: meizz
	var o = {
		"M+" : this.getMonth() + 1, // 月份
		"d+" : this.getDate(), // 日
		"h+" : this.getHours(), // 小时
		"m+" : this.getMinutes(), // 分
		"s+" : this.getSeconds(), // 秒
		"q+" : Math.floor((this.getMonth() + 3) / 3), // 季度
		"S" : this.getMilliseconds()
	// 毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	for ( var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
					: (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}
Date.prototype.increaseByDay = function(days) {
	var dayCount = [ 0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
	var year = new Date().getFullYear();
	var date = this.getDate();
	var month = this.getMonth()
	
	if (year % 4 == 0 || year % 400 == 0) {
		dayCount[2] = 29;
	}
	if ((date + days) / dayCount[month + 1] < 1) {
		this.setDate(date + days);
	} else {
        if(days+date-dayCount[month + 1]>dayCount[month + 2]){
            var overDays = days+date-dayCount[month + 1];
            month++;
            var initialDays = dayCount[month%12 + 1];
            while( initialDays < overDays){
                if(this.getMonth()==11){
                   var tmp = this.getFullYear() + 1;
                   if(tmp % 4 == 0 || tmp % 400 == 0){
                        dayCount[2] = 29;
                   } 
                }
                this.setMonth(this.getMonth()+1);
                initialDays = initialDays + dayCount[this.getMonth() + 1];
            }
            this.setDate(overDays-initialDays+dayCount[this.getMonth() + 1]);
            return this.Format('yyyy-MM-dd');
        }
		this.setDate((date + days) % dayCount[month + 1]);
		this.setMonth(month + 1);
	}
	return this.Format('yyyy-MM-dd');
}
Date.prototype.increaseByMonth = function(months) {
	var current_month = this.getMonth();
	this.setMonth(current_month + months);
	return this.Format('yyyy-MM-dd');
}
Date.prototype.increaseBySeason = function(seasons) {
	var current_month = this.getMonth();
	this.setMonth(current_month + seasons * 3);
	return this.Format('yyyy-MM-dd');
}
Date.prototype.increaseByHalfYear = function(years) {
	var currentYear = this.getFullYear();
	this.setFullYear(currentYear + years * 6);
	return this.Format('yyyy-MM-dd');
}
Date.prototype.increaseByYear = function(years) {
	var currentYear = this.getFullYear();
	this.setFullYear(currentYear + years);
	return this.Format('yyyy-MM-dd');
}
Date.prototype.totalDaysByMonth = function(endDateTime, months) {
	var dayCount = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

	var currentMonth = this.getMonth();
	var endMonth = endDateTime.getMonth();
	var currentYear = this.getMonth();
	var endYear = endDateTime.getMonth();
	var days = 0;
	if (currentYear % 4 == 0 || currentYear % 400 == 0) {
		dayCount[1] = 29;
	}
	if (endDateTime.getFullYear != this.getFullYear() && endMonth >= 2) {
		if (endYear % 4 == 0 || endYear % 400 == 0) {
			dayCount[1] = 29;
		}
	}
	for (var i = 0; i < months; i++) {
		days = days + dayCount[(++currentMonth) % 12];
	}
	return days - this.getDate();
}

Date.prototype.totalDaysByYear = function(currentYear, years) {
	var days = 0;
	// var year = endDateTime.getFullYear();
	for (var i = 0; i <= years; i++) {
		days = days + 365;
		if (currentYear % 4 == 0 || currentYear % 400 == 0) {
			days++;
		}
		currentYear++;
	}
	return days;
}
