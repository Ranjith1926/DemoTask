/* eslint-disable indent */
/**
 * Return json parsed response
 * @param response
 * @returns {*} json
 */

export function isNumeric(e) {
  const keyCode = e.which ? e.which : e.keyCode
  return (keyCode >= 48 && keyCode <= 57) ||
    (keyCode >= 96 && keyCode <= 105) ||
    keyCode === 8
    ? true
    : e.preventDefault()
}
// export function parseJSON(response) {
//   return response.json() || response
// }
export function parser(response) {
  return JSON.parse(response)
}
export function parseDate(dayMonthYear) {
  // Split the input string by '-'
  const [day, month, year] = dayMonthYear.split('-').map(Number);
  
  // JavaScript months are 0-indexed, so subtract 1 from the month
  return new Date(year, month - 1, day);
}
export function parseJSON(response) {
  if (response.json) {
    return response.json();
  } else {
    return response;
  }
}

export function stringifier(response) {
  return JSON.stringify(response)
}
export function isEmpty(obj) {
  return  Object.keys(obj).length === 0
}
/**
 * Check the response status and return
 * response or throw error
 * @param response
 * @returns {*} response or throw error
 */
export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  // if api sends back failure status code,
  // throws response and treated as error in the catch block
  throw response
}

export function jsonToUrlEncoded(json) {
  return Object.entries(json)
    .map((e) => e.join('='))
    .join('&')
}
export function fetchZuluFormat(dte) {
  return new Date(`${dte}Z`).toLocaleString();
}

export function isEmailValid(email) {
  // eslint-disable-next-line max-len
  const re =
    /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

export function regexValid(reg, txt) {
  return !reg.test(txt)
}
export function keyValidator(e) {
  const key = e.keyCode ? e.keyCode : e.which
  return (key >= 48 && key < 57) || key === 8 ? true : e.preventDefault()
}

export function validateField(value, { isRequired, isEmail }) {
  let error = ''

  if (isRequired) {
    error = !value.length ? 'Please enter the information' : ''
  }

  if (isEmail) {
    error = !isEmailValid(value) ? 'Please enter a valid email' : ''
  }

  return error
}
/**
 * swapping object index in object Array
 */
export function objectSwapper(arr, objTitle, txt) {
  arr.map((x, y) => {
    if (x[objTitle].toLowerCase().match(txt) !== null) {
      const temp = arr[0]
      arr[0] = x
      arr[y] = temp
    }
    return x
  })
  return arr
}
/**
 * Return dynamic Form request object
 */
export function requestObject(arr) {
  const obj = {}
  const validationObj = {}
  const len = arr.length
  for (let i = 0; i < len; i += 1) {
    'name' in arr[i] && arr[i].name && (obj[arr[i].name] = arr[i].value)
    arr[i].getAttribute('pattern') &&
      (validationObj[arr[i].name] = regexValid(
        RegExp(arr[i].getAttribute('pattern', 'g')),
        arr[i].value
      ))
  }
  return [obj, validationObj]
}
export function requestFormikObj(arr) {
  const validationObj = {}
  const len = arr.length
  for (let i = 0; i < len; i += 1) {
    arr[i].getAttribute('pattern') &&
      (validationObj[arr[i].name] = regexValid(
        RegExp(arr[i].getAttribute('pattern', 'g')),
        arr[i].value
      ))
  }
  return validationObj
}
export function fetchElementValues(arr, obj) {
  const len = arr.length
  const objKeys = Object.keys(obj)
  for (let i = 0; i < len; i += 1) {
    objKeys.map((keyName) => {
      arr[i].name === keyName &&
        keyName !== 'image' &&
        (arr[i].value = obj[keyName])
      return keyName
    })
  }
}

export function objToQueryString(params) {
  return Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join('&')
}

/**
 * Scroll Top animation
 */

export function scrollToTop(scrollDuration) {
  const scrollStep = -window.scrollY / (scrollDuration / 15)
  const scrollInterval = setInterval(() => {
    window.scrollY !== 0
      ? window.scrollBy(0, scrollStep)
      : clearInterval(scrollInterval)
  }, 15)
}

export function convertNumberToArray(len) {
  return Array.from(Array(len), (x, i) => i + 1)
}

export function imageFinder(txt) {
  return /jpeg|jpg|png/.test(txt)
}
/**
 * Date format
 */
export function currentTimeStamp(isDate) {
  return isDate
    ? new Date().toISOString().split('T')[0]
    : new Date().toISOString().slice(0, 19).replace('T', ' ');
}
export function formatDate(date, dayMonth = false) {
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec'
  ]
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat']
  const day = date.getDay()
  const dates = date.getDate()
  const monthIndex = date.getMonth()
  return dayMonth
    ? `${dates} ${monthNames[monthIndex]}`
    : `${weekDays[day]} ${dates} ${monthNames[monthIndex]}`
}
export function dateAccept(dateStr) {
  ;[dateStr[0], dateStr[dateStr.length - 1]] = [
    dateStr[dateStr.length - 1],
    dateStr[0]
  ]
  return dateStr.join('-')
}

export function generateMonths(n) {
  const monthArr = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec'
  ]
  return [...Array(n)].map((_, index) => ({
    name: monthArr[index],
    val: new Date().getMonth() - 1 + index
  }))
}
export function dateFetcher(dte) {
  return (dte && new Date(dte)) || new Date()
}

export function dateComparer(dte) {
  return (
    dateFetcher().getMonth() === dateFetcher(dte).getMonth() &&
    dateFetcher().getDate() === dateFetcher(dte).getDate()
  )
}

export function generateNumbers(n) {
  return [...Array(n)]
    .map((_, index) => index + 1)
    .toString()
    .split(',')
}
export function generateYears(yr, n) {
  return [...Array(n)]
    .map((_, index) => new Date(yr).getFullYear() + index)
    .toString()
    .split(',')
}

export function dateBeautifier(dateObj, timebool) {
  let dateSpliter = ''
  if (dateObj !== null && dateObj !== '') {
    const month = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec'
    ]
    dateSpliter = dateFetcher(dateObj)
    if (timebool) {
      dateSpliter = `${dateSpliter.getDate()} ${
        month[dateSpliter.getMonth()]
      } ${dateSpliter.getFullYear()} ${dateSpliter.getHours()}:${dateSpliter.getMinutes()}: ${dateSpliter.getSeconds()}:${dateSpliter.getMilliseconds()} ${
        dateSpliter.getHours() >= 12 ? 'PM' : 'AM'
      }`
    } else {
      dateSpliter = `${dateSpliter.getDate()} ${
        month[dateSpliter.getMonth()]
      } ${dateSpliter.getFullYear()}`
    }
  }
  return dateSpliter
}

export function dateReverse(dateStr) {
  const parts = dateStr.split('-');  // Split by '-'
  return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
}

export function formatDateWithHyphens(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${day}-${Number(month)}-${year}`;
}

export function compareId(a, b) {
  if (a.person_id < b.person_id) return 1
  if (b.person_id < a.person_id) return -1
  return 0
}

export function scrollBottomDetect(e) {
  return {
    bottomDetect:
      document.body.offsetHeight <= window.scrollY + window.innerHeight,
    scrollTopDetect: e.scrollTop
  }
}

export function muiDateFormat(date) {
  let years = date && date?.getFullYear()
  let months = date && date?.getMonth() + 1
  let dt = date && date?.getDate()
  if (dt < 10) {
      dt = '0' + dt
  }
  if (months < 10) {
      months = '0' + months
  }
  let outputDate = years + '-' + months + '-' + dt
  return outputDate
}