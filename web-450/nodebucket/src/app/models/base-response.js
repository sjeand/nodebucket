/*
=======================================================
  Title: Nodebucket
  Author: Professor Krasso
  Date: 11/04/2021
  Modified by: Sarah Jean Baptiste
  Description: base response
========================================================
*/

class BaseResponse{
  constructor(code, msg, data) {
    this.code = code;
    this.msg = msg;
    this.data = data;
  }

  toObject() {
    return {
      'code': this.code,
      'msg': this.msg,
      'data': this.data,
      'timestamp': new Date().toLocaleDateString()
    }
  }
}

module.exports = BaseResponse;
