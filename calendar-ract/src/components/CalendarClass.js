'use strict';

function test(test = ''){
    console.log(test);
}

function ucFirst(str) {
    if (!str) return str;
    return str[0].toUpperCase() + str.slice(1);
}

function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}


export default function Calendar({ date }){
    let formatter = new Intl.DateTimeFormat(['ru'], {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });




    let dayOfWeek = formatter.format(date).toString().split(',')[0];
    let currentDay = formatter.format(date).toString().split(',')[1].split(' ')[1];
    let currentMonthLocal = ucFirst(formatter.format(date).toString().split(',')[1].split(' ')[2]);
    let currentYear = formatter.format(date).toString().split(',')[1].split(' ')[3];
    let currentMonthName = (date) => {let tmp = new Intl.DateTimeFormat(['ru'], {month: 'long'}); return(tmp.format(date))};
    let currentMonthNumber = (date) => {let tmp = new Intl.DateTimeFormat(['ru'], {month: 'numeric'}); return(tmp.format(date))};
    let daysInPreviousMonth = (date) => {let tmp = new Intl.DateTimeFormat(['ru'], {year: "numeric"});
        return(daysInMonth(currentMonthNumber(date)-1, tmp.format(date)));
    };
    let dayOfWeekNumeric = date.getDay();

    function TableRowWithPrevMonth({ date }){
        let daysFromPreviousMonth = new Date(currentYear-0,currentMonthNumber(date)-0,1).getDay();
        // test((daysFromPreviousMonth.getDay()))
        let firstWeek = [];
        for(let i = 1; i <= daysFromPreviousMonth;i++) firstWeek.push({number: daysInPreviousMonth(date)+i-daysFromPreviousMonth, variant: 'ui-datepicker-other-month'});
        for(let i = 1; i <= 7-daysFromPreviousMonth;i++)
            if(i===(currentDay-0))
                firstWeek.push({number: i,variant:"ui-datepicker-today"})
            else firstWeek.push({number: i})
        return(
            <tr>
                {firstWeek.map((item,idx)=>{
                    return(<td className={item.variant} key={idx}>{item.number}</td>)
                })}
            </tr>
        )
    }

    function TableRows({ date }){
        let firstMonthdayDayOfWeek = new Date(currentYear-0,currentMonthNumber(date)-0,1).getDay();
        let secondWeekStartPos = 7 - firstMonthdayDayOfWeek;
        let daysInCurrentMonth = daysInMonth(currentMonthNumber(date),currentYear);
        let weeksInMonth = Math.floor(daysInCurrentMonth / 7);
        let weeks = [];
        for(let i = 2;i<=weeksInMonth+1;i++) {
            let currentWeekDays = []
            for(let j = secondWeekStartPos+7*(i-2);j<secondWeekStartPos+7*(i-1)&&j<=daysInCurrentMonth;j++){
                if(j===(currentDay-0))
                currentWeekDays.push({number: j,variant:'ui-datepicker-today'})
                else currentWeekDays.push({number: j})
            }
            weeks.push({week: i, days: currentWeekDays})
        }
        return(
            <tbody>
                <TableRowWithPrevMonth date = {date} />
                {weeks.map((item)=>{
                    return(
                        <tr>
                            {
                                item.days.map((item,idx)=>{
                                    return(<td className={item.variant} key={idx}> {item.number} </td>)
                                })
                            }
                        </tr>
                    )
                })}
            </tbody>
        )
    }

    return(
      <>
          <div className="ui-datepicker">
              <div className="ui-datepicker-material-header">
                  <div className="ui-datepicker-material-day">{dayOfWeek}</div>
                  <div className="ui-datepicker-material-date">
                      <div className="ui-datepicker-material-day-num">{currentDay}</div>
                      <div className="ui-datepicker-material-month">{currentMonthLocal}</div>
                      <div className="ui-datepicker-material-year">{currentYear}</div>
                  </div>
              </div>
              <div className="ui-datepicker-header">
                  <div className="ui-datepicker-title">
                      <span className="ui-datepicker-month">{currentMonthName(date)}</span>&nbsp;<span
                      className="ui-datepicker-year">{currentYear}</span>
                  </div>
              </div>
              <table className="ui-datepicker-calendar">
                  <colgroup>
                      <col/>
                      <col/>
                      <col/>
                      <col/>
                      <col/>
                      <col className="ui-datepicker-week-end"/>
                      <col className="ui-datepicker-week-end"/>
                  </colgroup>
                  <thead>
                  <tr>
                      <th scope="col" title="Понедельник">Пн</th>
                      <th scope="col" title="Вторник">Вт</th>
                      <th scope="col" title="Среда">Ср</th>
                      <th scope="col" title="Четверг">Чт</th>
                      <th scope="col" title="Пятница">Пт</th>
                      <th scope="col" title="Суббота">Сб</th>
                      <th scope="col" title="Воскресенье">Вс</th>
                  </tr>
                  </thead>
                  <TableRows date = {date} />
              </table>
          </div>
      </>
    );
}

