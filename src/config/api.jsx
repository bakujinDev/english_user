export const URL = "https://bakujin.com:5324";
// export const URL = "http://localhost:5324";

export const API = {
  SIGNUP: URL + "/auth/signup", //type
  LOGIN: URL + "/auth/login",
  CHK_TOKEN: URL + "/auth/chktoken",

  CLASS_SUBMIT: URL + "/class/submit",
  CLASS_GETDATA: URL + "/class/getdata", // class

  DATA_LIST: URL + "/admin/dataList", // table / limit / offset
  WORD_DETDATA: URL + "/word/getdata", //table / id

  RECORD: URL + "/record",
};
