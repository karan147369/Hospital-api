# Hospital-api

1.  /doctors/register  -> POST request with body as {usename: '', passowrd:''};
2.  /doctors/login     -> GET request with body as {usename: '', passowrd:''};
3.  /patients/register -> POST request with body as {token:'doctor's jwt token',phoneNo: 'as a number', name:'name of patient'};
4.  /patients/:id/create_report -> POST request with body as {token:'doctor's jwt token',status:'status of patient's report positive/negative...'} , :id in url is patient phoneNumber.
5.  /patients/:id/all_reports -> GET request with body as {token:'doctor's jwt token}, :id in url is patient's phoneNumber
6.  /reports/:status  -> GET request with body as {token:""} and status in url as status of report
