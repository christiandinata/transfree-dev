import dateFormat from "dateformat";
// import { Toast } from "native-base";

module.exports = {
  connectionStatus: true,
  token: null,
  isDoneRegistration: false,

  headers() {
    return {}
  },

  replaceNullToEmpty(value) {
    if (value == undefined) {
      value = ''
    }

    value = JSON.parse(JSON.stringify(value).replace(/null/g, '""'))

    return value;
  },

  connectionAvailability() {
    console.log(this.connectionStatus)
    if (this.connectionStatus) {
      return true;
    } else {
      // Toast.show({
      //   text: 'No Connection !',
      //   position: 'bottom',
      //   buttonText: 'Okay',
      //   type: 'danger'
      // })
      return false;
    }
  },

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  },

  addCommasOnly(intNum) {
    return (intNum + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  },

  displayTime(hours, minutes) {
    let hour = "";
    let minute = "";

    if (hours < 10) {
      hour = `0${hours}`;
    } else {
      hour = `${hours}`;
    }

    if (minutes < 10) {
      minute = `0${minutes}`;
    } else {
      minute = `${minutes}`;
    }

    return `${hour}:${minute}`;
  },

  formatDateToDisplay(date) {
    var dateFormatted = '';
    if (date != "" && date != "0000-00-00")
      dateFormatted = dateFormat(date, "dd mmm yyyy");
    else {
      dateFormatted = "";
    }
    return dateFormatted;
  },

}
