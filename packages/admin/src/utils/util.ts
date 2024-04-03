export const validateFiled = (value: any) => {
  if (!value) {
    return `This field is required`
  }

  return ''
}

export const validatePhone = (value: any) => {
  if (!value) {
    return 'Phone is required'
  } else if (!/^\+?\d+$/.test(value)) {
    return 'Phone number is invalid'
  } else if (value.startsWith('+88')) {
    if (value.length !== 14) {
      return 'Phone number must be exactly 11 or 14 digits for +88 prefix'
    }
  } else if (value.length !== 11) {
    return 'Phone number must be exactly 11 digits'
  }

  return ''
}

export const validateEmail = (value: any) => {
  if (!value) {
    return 'Email is required'
  } else if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return 'Email is invalid'
  }

  return ''
}

export const validatePassword = (value: any) => {
  const specialCharacters = /[!@#\$%\^&\*()_+\{\[\]:;<>,\.\?~\\\-=/|]+/

  // Check for at least one capital letter
  const capitalLetter = /[A-Z]/

  // const regEx = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/

  if (!value) {
    return 'Password is required'
  }
  if (value.length < 8) {
    return 'Password must be at least 8 characters long and contain at least one special character and one capital letter'
  }

  if (!specialCharacters.test(value)) {
    return 'Password must be at least 8 characters long and contain at least one special character and one capital letter'
  }

  if (!capitalLetter.test(value)) {
    return 'Password must be at least 8 characters long and contain at least one special character and one capital and small letter'
  }

  return ''
}

export const validateConfirmPassword = (value: any, password: string) => {
  if (value !== password) {
    return 'Passwords do not match'
  }

  return ''
}

export const sleep = async (ms: number): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, ms))
}

export const USER_ROLE = {
  INSTRUCTOR: 'INSTRUCTOR',
  ADMIN: 'ADMIN',
  STUDENT: 'STUDENT'
}

export const USER_STATUS = {
  ACTIVE: true,
  INACTIVE: false
}

export const COURSE_TYPE = {
  COURSE: 'COURSE',
  MODEL_TEST: 'MODEL_TEST'
}

export const COURSE_STATUS = {
  APPROVED: 'Approved',
  PENDING: 'Pending'
}
