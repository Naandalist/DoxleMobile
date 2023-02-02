import axios, { AxiosError } from 'axios'

export const checkErrorType = (error: Error | AxiosError) => {
  if (axios.isAxiosError(error)) {
    return 'axios-error'
  } else return 'stock-error'
}

//handling typing error returned from server
export const HandleAxiosError = (error: AxiosError) => {
  if (error.response) {
    if (error.response.status === 401) return 'TOKEN_ISSUE'
    else if (error.response.status > 500) return 'SERVER_FAILED'
    else if (error.response.status === 400) return 'DATA_ISSUE'
    else if (error.response.status === 403) return 'UNAUTHORISED_ACTION'
    else return 'UNKNOWN_SERVER_ISSUE'
  } else return 'UNKNOWN_SERVER_ISSUE'
}

export interface IAxiosErrorReturnType {
  errorType:
    | 'TOKEN_ISSUE'
    | 'SERVER_FAILED'
    | 'DATA_ISSUE'
    | 'UNKNOWN_SERVER_ISSUE'
    | 'UNAUTHORISED_ACTION'
}

export const HandleFrontendErrorWithAxiosType = (
  errorReturn: IAxiosErrorReturnType,
  setErrorMessage?: Function,
  errorMessage?: string
) => {
  if (errorMessage) {
    if (setErrorMessage) setErrorMessage(errorMessage)
  } else {
    if (errorReturn.errorType === 'SERVER_FAILED') {
      //handle server failed
      if (setErrorMessage)
        setErrorMessage('SERVER FAILED, Please comeback later')
    }

    //handle unauthorised actions
    else if (errorReturn.errorType === 'UNAUTHORISED_ACTION') {
      if (setErrorMessage) setErrorMessage('Unauthorise Action')
    } else if (errorReturn.errorType === 'TOKEN_ISSUE') {
      if (setErrorMessage) setErrorMessage('PROBLEM WITH AUTHORISING ACTION')
    } else {
      if (setErrorMessage) setErrorMessage('SOMETHING WRONG WITH SERVER')
    }
  }
}
