import moment from 'moment'
import DatePicker from "react-datepicker"
import '../styles/components/CustomDatePicker.css'


//Untuk mengimplementasi pilih tanggal, terdapat di halaman register dan edit profile
const CustomDatePickerMobile = ({ value, onClick }) => <input className="custom-date-picker-mobile" value={ value } readOnly onClick={ onClick } />
const CustomDatePickerButton = ({ onClick }) => <div className="custom-date-picker-desktop-button" onClick={ onClick } />

function CustomDatePicker (props) {
  const date = moment(props.date ? props.date : new Date())
  //Validasi tanggal
  function validateDate(inputDate) {
    if (inputDate < 1) {
      date.date(1)
      return
    }//Jika tanggal yang dimasukkan kurang dari 1, kembalikan tanggal jadi 1

    if (inputDate > date.daysInMonth()) {
      date.date(date.daysInMonth())
      return
    }/*Jika tanggal yang dimasukkan lebih besar dari maksimal tanggal, kembalikan tanggal jadi maksimal 
    tanggal pada bulan tersebut*/

    date.date(inputDate)
  }
  //Validasi Bulan
  function validateMonth(inputMonth) {
    if (inputMonth >= 1 && inputMonth <= 12) {
      date.month(inputMonth)
    }
  }//Jika input tanggal dari 1 sampai 12, berarti input valid

  //Validasi tahun
  function validateYear(inputYear) {
    if (inputYear < 0) {
      date.year(0)
      return
    }//Tahun minimum 0

    if (inputYear > 99999) {
      date.year(99999)
      return
    }//Tahun maksimum 99999

    date.year(inputYear)
  }

  function setDate(inputDate) {
    validateDate(inputDate)
    props.onChange(date.toDate())
  }//Mengganti tanggal berdasarkan masukan

  function setMonth(inputMonth) {
    validateMonth(inputMonth)
    validateDate(date.date())
    props.onChange(date.toDate())
  }//Mengganti bulan berdasarkan masukan

  function setYear(inputYear) {
    validateYear(inputYear)
    props.onChange(date.toDate())
  }//Mengganti tahun berdasarkan masukan

  return(
    <div className='custom-date-picker'>
      <DatePicker
        selected={ date.toDate() }
        onChange={ (newDate) => props.onChange(newDate) }
        customInput={ <CustomDatePickerMobile /> }
        dateFormat="dd/MM/yyyy"
        peekNextMonth
        showMonthDropdown
        showYearDropdown
        dropdownMode='select'
      />
      <div className='custom-date-picker-desktop'>
        <input
          className='custom-date-picker-date'
          value={ date.date() }
          onChange={ (e) => setDate(e.target.value) }
        />

        <select
          className='custom-date-picker-month'
          value={ date.month() }
          onChange={ (e) => setMonth(e.target.value) }
        >
          {
            moment.months().map((name, index) => (
              <option value={ index }>
                { name }
              </option>
            ))
          }
        </select>

        <input
          className='custom-date-picker-year'
          value={ date.year() }
          onChange={ (e) => setYear(e.target.value) }
        />

        <DatePicker
          selected={ date.toDate() }
          onChange={ (newDate) => props.onChange(newDate) }
          customInput={ <CustomDatePickerButton /> }
          dateFormat="dd/MM/yyyy"
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode='select'
        />
      </div>
    </div>
  )
}

export default CustomDatePicker
