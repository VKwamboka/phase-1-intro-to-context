// Your code here
//create employee record
const createEmployeeRecord = (employeeData) => {
    const empData = {
        firstName: employeeData[0],
        familyName: employeeData[1],
        title: employeeData[2],
        payPerHour: employeeData[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return empData
}

//create employee records
const createEmployeeRecords = (arr) => {
    let employeeArray = arr.map(records =>{
        return createEmployeeRecord(records)
    })
    return employeeArray
}

//create time in e
const createTimeInEvent = (records, timestamp) =>{
    const duration = {
        type: "TimeIn",
        date: timestamp.split(" ")[0],
        hour: parseInt(timestamp.slice(-4), 10)
    }
    records.timeInEvents.push(duration)
    return records
}

// create time out
const createTimeOutEvent = (employeeRecord, dateStamp) =>{
    let newEmployeeRecord = employeeRecord
    newEmployeeRecord.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(dateStamp.split("").slice(11).join("")),
        date: dateStamp.split("").slice(0, 10).join("")
    })
    return newEmployeeRecord
}

//hours worked
const hoursWorkedOnDate = (employeeRecord, dateStamp) =>{
    let timeIn = employeeRecord.timeInEvents.find(function (e) {
        return e.date === dateStamp
    })
    let timeOut = employeeRecord.timeOutEvents.find(function (e) {
        return e.date === dateStamp
    })
    return (timeOut.hour - timeIn.hour) / 100
}

//wages earned
const wagesEarnedOnDate = (employeeRecord, dateStamp) => {
    return (hoursWorkedOnDate(employeeRecord, dateStamp) * employeeRecord.payPerHour)
}

// all wages
const allWagesFor = (employeeRecord) => {
    let sum = 0
    for (let i = 0; i < employeeRecord.timeInEvents.length; i++) {
        let payPerDay = wagesEarnedOnDate(employeeRecord, employeeRecord.timeInEvents[i].date)
        sum += payPerDay
    }
    return sum
}

// pay roll
function calculatePayroll(arr){
   const totalPay = arr.reduce((accumulated, employeeRecord) => {
        const totalPay = allWagesFor(employeeRecord)
        return accumulated + totalPay
    }, 0)
    return totalPay
}


