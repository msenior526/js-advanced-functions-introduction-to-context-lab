// Your code here
const createEmployeeRecord = (array) => {
    const newObj = {
        firstName: array[0],
        familyName: array[1],
        title: array[2], 
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return newObj;
}

const createEmployeeRecords = (arrayofArrays) =>  {
    return arrayofArrays.map(element => 
       createEmployeeRecord(element))
}

let createTimeInEvent = function(employeeRecord, dateStamp){
    let [date, time] = dateStamp.split(' ')

    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(time, 10),
        date: date,
    })

    return employeeRecord
}

const createTimeOutEvent = (employeeRecord, dateStamp) => {
    let date = dateStamp.split(' ')[0];
    let time = dateStamp.split(' ')[1];

    employeeRecord.timeOutEvents.push({
        type: 'TimeOut', 
        hour: parseInt(time, 10),
        date: date
    })
    return employeeRecord;
}

const hoursWorkedOnDate = (employeeRecord, date) => {
    const timeInEvent = employeeRecord.timeInEvents.find((element) => {
        return element.date === date
    });
    const clockedInAt = timeInEvent.hour;

    const timeOutEvent = employeeRecord.timeOutEvents.find((element) => {
        return element.date === date
    });
    const clockedOutAt = timeOutEvent.hour;

    let numOfHoursWorked = (clockedOutAt - clockedInAt)/100;
    
    return numOfHoursWorked;
}

const wagesEarnedOnDate = (employeeRecord, date) => {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const dayPay = hoursWorked * employeeRecord.payPerHour;
    return dayPay;
}

const allWagesFor = (employee) => {
    const dates = employee.timeInEvents.map((element) => {
        return wagesEarnedOnDate(employee, element.date)
    })

    const fullPayCheck = dates.reduce((total, element) => {
        return total += element;
    }, 0)

    return fullPayCheck;
}

const findEmployeeByFirstName = (srcArray, firstName) => {
   return srcArray.find((el) => {
        return el.firstName.toString() === firstName;
    })
}

const calculatePayroll = (arrayOfEmployees) => {
    const juc = arrayOfEmployees.map((element) => {
        return allWagesFor(element)
    })

    const payrollSum = juc.reduce((total, element) => {
        return total += element;
    }, 0)
    
    return payrollSum;
}